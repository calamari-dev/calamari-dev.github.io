---
layout: "../../layouts/Article.astro"
title: 常微分方程式の精度保証付き数値計算について
release: "2023-12-17T00:00:00+00:00"
update: "2023-12-18T00:00:00+00:00"
description: 計算機で解析解の存在範囲を厳密に特定する「精度保証付き数値計算」について紹介する．
tags: ["数値計算", "精度保証", "ODE"]
---

### はじめに

この記事では，常微分方程式の精度保証付き数値計算のさわりを解説する．

精度保証付き数値計算 (validated numerics) は「数値計算によって得られた結果に対して，数学的に厳密な誤差限界を与える手法」である（荻田・柏木・劉，2018）．こう聞くと，精度保証付き数値計算は「従来の数値解法に誤差評価を付け加える理論」であるかのように思われるかもしれない．しかし，それは精度保証付き数値計算のほんの一面にすぎない．

誤差を評価するには，まず解の存在を証明しなければならない．計算の目的によっては，解が一意であることも示す必要があるだろう．こうした要件から，従来の数値解法をそのまま精度保証付き数値解法に修正できるとは限らず，しばしば精度保証ならではのアプローチが必要になる．この記事によって，この記事によって，精度保証付き数値計算が持つそうした特徴を少しでも伝えられたら嬉しい．

Googleドライブから，[この記事のPDF版](https://drive.google.com/file/d/1396sFuqRKszkY27UDwqUwqJO8uz4Moa_/view?usp=sharing)をダウンロードできる．印刷して読みたい方にはPDF版をおすすめする．

### 浮動小数点演算

計算機において，実数の演算は**浮動小数点演算** (floating-point arithmetic; FP) という，$\mathbb{Q}$の部分集合における演算（と，そのちょっとした拡張）で近似される．いま流通しているほとんどのPCは，**IEEE 754-2008**という標準規格に則った浮動小数点演算を実装している．

この記事を読むには，浮動小数点演算について次のことを抑えていれば十分である．詳細を知りたければ[Boldo (2023)](https://www.cambridge.org/core/journals/acta-numerica/article/floatingpoint-arithmetic/287C4D5F6D4A43FBEEB1ABED2A405AAF) が参考になるだろう．

1. 浮動小数点数の全体集合$\mathbb{\bar{F}}$は，$\mathbb{Q}$のある部分集合$\mathbb{F}$と$\lbrace\pm\infty\rbrace$の和集合である．
2. $\mathbb{F}$は有限集合である．
3. ある自然数$p$が存在して，$\mathbb{F}$の元はすべて，二進法での桁数が$p$以下の整数に，$2^{\pm 1}$を何回か掛けた数である．このような$p$の最小値を**精度** (precision) という．

浮動小数点数でない実数$x$を浮動小数点数演算で扱うには，$\mathbb{\bar{F}}$から$x$に近い元を適切に選び出す必要がある．この操作を**丸め** (rounding) という．代表的な丸め関数は以下の3通りである．

1. $x$以下である$\mathbb{\bar{F}}$の元で最大のものを丸められた値$\operatorname{RD}(x)$とする．これを**負の無限大への丸め** (round towards negative infinity) という．
2. $x$以上である$\mathbb{\bar{F}}$の元で最小のものを丸められた値$\operatorname{RU}(x)$とする．これを**正の無限大への丸め** (round towards positive infinity) という．
3. $x$に最も近い$\mathbb{\bar{F}}$の元を丸められた値$\operatorname{RN}(x)$とする．ただし，最も近いものが2つある場合は別に対応規則を定める．これを**最近接丸め** (round to nearest) という．

<math-note>

最近接丸め関数は一意ではない．IEEE 754-2008にしたがうシステムは**偶数丸め** (round ties to even) という最近接丸めを実装しており，指定しない限り偶数丸めが使われる．

</math-note>

### 区間演算

$\mathbb{F}$は$\mathbb{R}$ではないから，浮動小数点演算には常に誤差がつきまとう．誤差を定量的に把握するため，精度保証付き数値計算では実数を$\mathbb{\bar{F}}$の2元で挟み
$$
  a \leq x \leq b\quad(a,b\in\mathbb{\bar{F}})
$$
の形で表現する．$x$に対する演算は，このような区間$\lbrack a,b\rbrack$に対する**区間演算** (interval arithmetic; IA) に置き換えて実行する．

はじめから浮動小数点演算の誤差まで考慮して区間演算を議論するのは面倒なので，この記事では$\mathbb{R}$における区間演算を定義してから，それを修正して$\mathbb{F}$における区間演算を定義する．

<math-theorem data-type="定義" data-level="4" data-label="閉区間">

$S$を$\mathbb{R}$の閉集合とする．任意の$x_{1},x_{2}\in S$（$x_{1}\leq x_{2}$）に対して
$$
  x_{1}\leq u\leq x_{2}
  \implies u\in S
$$
が成立するとき，$S$を1次元**閉区間** (closed interval) という．この定義のもとでは$\emptyset$，$\mathbb{R}$，$\lbrace a\rbrace$（$a\in\mathbb{R}$）はすべて閉区間である．

</math-theorem>

閉区間$S$の下限が$a$，上限が$b$であるとき，$S$を$\lbrack a,b\rbrack$と表す．すなわち
$$
  \lbrack a,b\rbrack \coloneqq \lbrace x\in\mathbb{R}\mid a\leq x\leq b\rbrace
$$
とする．また，しばしば実数$a$と閉区間$\lbrace a\rbrace=\lbrack a,a\rbrack$を同一視する．本稿の定義では，集合$\lbrack a,+\infty\rbrack$，$\lbrack-\infty,b\rbrack$に$\pm\infty$が属さないことに注意せよ．

<math-theorem data-type="定義" data-level="4">

$m\times n$行列の集合$S$が1次元閉区間の直積で表せるとき，$S$を$m\times n$**区間行列** (interval matrix) という．$m=1$または$n=1$のときは**区間ベクトル** (interval vector) ともいう．

</math-theorem>

以下では閉区間を$\lbrack x\rbrack$のように，ラベル$x$に角括弧をつけて表記する．すなわち
$$
  \lbrack x\rbrack = \lbrack x^{\triangledown},x^{\vartriangle}\rbrack\quad(x^{\triangledown}=\inf\lbrack x\rbrack\;\mathrel{\textrm{and}}\;x^{\vartriangle}=\sup\lbrack x\rbrack)
$$
とする．また，1次元閉区間の全体集合を$\mathbb{IR}$と表す．区間ベクトル，区間行列の全体集合も同様に
$$
  \mathbb{IR}^{n},
  \quad\mathbb{IR}^{m\times n}
$$
と書く．

区間行列は「各成分が閉区間である行列」とも「行列を端点とする閉区間」ともみなせる．そこで，次のように記号を定める．

<math-theorem data-type="定義" data-level="4">

$m\times n$区間行列$\lbrack\bm{X}\rbrack=\lbrace(u_{i\mskip2mu\relax j})\mid a_{i\mskip2mu\relax j}\leq u_{i\mskip2mu\relax j}\leq b_{i\mskip2mu\relax j}\rbrace$に対して，$m\times n$行列$\bm{X}^{\triangledown}$，$\bm{X}^{\vartriangle}$を
$$
  \bm{X}^{\triangledown} \coloneqq (a_{i\mskip2mu\relax j}),
  \quad\bm{X}^{\vartriangle} \coloneqq (b_{i\mskip2mu\relax j})
$$
で定義する．また，$\lbrack\bm{X}\rbrack$を
$$
  \lbrack\bm{X}\rbrack = \lbrack\bm{X}^{\triangledown},\bm{X}^{\vartriangle}\rbrack
  = (\lbrack x_{i\mskip2mu\relax j}\rbrack)
$$
とも表記する．ただし$\lbrack x_{i\mskip2mu\relax j}\rbrack=\lbrack x_{i\mskip2mu\relax j}^{\triangledown},x_{i\mskip2mu\relax j}^{\vartriangle}\rbrack=\lbrack a_{i\mskip2mu\relax j},b_{i\mskip2mu\relax j}\rbrack$である．

</math-theorem>

精度保証付き数値計算の文脈では，区間の下限を$\underline{x}$，上限を$\overline{x}$と書くほうが標準的である．しかし，この記法は組版が少し面倒なので，本稿では用いない．

<math-theorem data-type="定義" data-level="4" data-label="区間包">

$S$を$\mathbb{R}$の部分集合とする．$S$を含む閉区間$I\in\mathbb{IR}$で条件
$$
  J \supseteq S
  \implies J \supseteq I\quad(J\in\mathbb{IR})
$$
を満たすものを$S$の**区間包** (interval hull) といい，$\operatorname*{hull}S$と表す．ベクトルと行列についても同様に定義する．

</math-theorem>

任意の$S\subseteq\mathbb{R}$に対して，$S$の区間包はただ一つ存在する．実際，$S$の区間包は$\lbrack\inf S,\sup S\rbrack$である．$S$がなんらかのパラメータ$\theta$に関する像$\lbrace f(\theta)\mid\theta\in P\rbrace$である場合，$\operatorname*{hull}S$を
$$
  \operatorname*{hull}_{\theta\in P}f(\theta)
$$
とも表す．

<math-theorem data-type="定義" data-level="4" data-label="区間演算">

$\star$を$\mathbb{R}$上の（必ずしも全域で定義されない）2項演算とする．任意の$\lbrack x\rbrack,\lbrack y\rbrack\in\mathbb{IR}$に対して，閉区間$\lbrack x\rbrack\star\lbrack y\rbrack$を
$$
  \lbrack x\rbrack\star\lbrack y\rbrack \coloneqq \operatorname*{hull}\lbrace u\star v\mid(u,v)\in D\cap(\lbrack x\rbrack,\lbrack y\rbrack)\rbrace
$$
で定義する．ただし，$D$は$u\star v$が定義される$(u,v)\in\mathbb{R}^{2}$の全体集合である．

</math-theorem>

$\star$が加減算のとき，$\lbrack x\rbrack\star\lbrack y\rbrack$はより簡単に
$$
  \begin{gathered}
    \lbrack x\rbrack+\lbrack y\rbrack = \lbrack x^{\triangledown}+y^{\triangledown},x^{\vartriangle}+y^{\vartriangle}\rbrack,\\
    \lbrack x\rbrack-\lbrack y\rbrack = \lbrack x^{\triangledown}-y^{\vartriangle},x^{\vartriangle}-y^{\triangledown}\rbrack
  \end{gathered}
$$
と書ける．$\star$が乗除算のときはもう少し複雑であり
$$
  \begin{gathered}
    \lbrack x\rbrack\cdot\lbrack y\rbrack = \operatorname*{hull}\lbrace x^{\triangledown}y^{\triangledown},x^{\vartriangle}y^{\triangledown},x^{\triangledown}y^{\vartriangle},x^{\vartriangle}y^{\vartriangle}\rbrace,\\
	\frac{\lbrack x\rbrack}{\lbrack y\rbrack} = \operatorname*{hull}\biggl\lbrace\frac{x^{\triangledown}}{y^{\triangledown}},\frac{x^{\vartriangle}}{y^{\triangledown}},\frac{x^{\triangledown}}{y^{\vartriangle}},\frac{x^{\vartriangle}}{y^{\vartriangle}}\biggr\rbrace\mskip18mu\relax\textrm{if}\mskip6mu\relax 0\notin\lbrack y\rbrack
  \end{gathered}
$$
となる（$0\in\lbrack y\rbrack$の場合は付録）．

<math-note>

たとえば，$\lbrack x\rbrack=\lbrack 2,3\rbrack$，$\lbrack y\rbrack=\lbrack-5,-2\rbrack$のとき
$$
  \begin{gathered}
    \lbrack x\rbrack+\lbrack y\rbrack = \lbrack-3,1\rbrack,
    \quad\lbrack x\rbrack-\lbrack y\rbrack = \lbrack 4,8\rbrack,\\
	\lbrack x\rbrack\cdot\lbrack y\rbrack = \lbrack-15,-4\rbrack,
	\quad\frac{\lbrack x\rbrack}{\lbrack y\rbrack} = \lbrack-1.5,-0.4\rbrack
  \end{gathered}
$$
である．

</math-note>

区間演算における減算は加算の逆演算ではなく，除算は乗算の逆演算ではない．実際，$\lbrack x\rbrack=\lbrack 0,1\rbrack$，$\lbrack y\rbrack=\lbrack 2,5\rbrack$について
$$
  \lbrack x\rbrack-\lbrack x\rbrack = \lbrack-1,1\rbrack
  \neq 0,
  \quad\frac{\lbrack y\rbrack}{\lbrack y\rbrack} = \lbrack 0.4,2.5\rbrack
  \neq 1
$$
である．また，$\lbrack z\rbrack=\lbrack -1,3\rbrack$とすると
$$
  \begin{gathered}
    \lbrack x\rbrack\cdot(\lbrack y\rbrack+\lbrack z\rbrack) = \lbrack 0,1\rbrack\cdot\lbrack 1,8\rbrack
    = \lbrack 0,8\rbrack,\\
    \lbrack x\rbrack\cdot\lbrack y\rbrack+\lbrack x\rbrack\cdot\lbrack z\rbrack = \lbrack 0,5\rbrack+\lbrack -1,3\rbrack
    = \lbrack -1,8\rbrack
  \end{gathered}
$$
となるので，分配法則も成り立たない．その代わり，劣分配法則 (sub-distributive law)
$$
  \lbrack x\rbrack\cdot(\lbrack y\rbrack+\lbrack z\rbrack) \subseteq \lbrack x\rbrack\cdot\lbrack y\rbrack+\lbrack x\rbrack\cdot\lbrack z\rbrack
$$
が成立する．

区間ベクトルと区間行列に対しても，和と差は成分ごとに定義される．たとえば$\lbrack\bm{x}\rbrack=(\begin{matrix}\lbrack x_{1}\rbrack & \lbrack x_{2}\rbrack\end{matrix})^{\mathsf{T}}$，$\lbrack\bm{y}\rbrack=(\begin{matrix}\lbrack y_{1}\rbrack & \lbrack y_{2}\rbrack\end{matrix})^{\mathsf{T}}$のときは
$$
  \lbrack\bm{x}\rbrack\pm\lbrack\bm{y}\rbrack = (\begin{matrix}\lbrack x_{1}\rbrack\pm\lbrack y_{1}\rbrack & \lbrack x_{2}\rbrack\pm\lbrack y_{2}\rbrack\end{matrix})^{\mathsf{T}}
$$
である．

### 機械区間演算

区間演算を計算機に実装しようとすると，扱える数が浮動小数点数に制限される．上限と下限がともに$\mathbb{\bar{F}}$に属する閉区間を**機械区間** (machine interval) といい，全体集合を$\mathbb{IF}$と書く．機械区間に対する機械区間演算は，区間演算を修正して，次のように定義される．

<math-theorem data-type="定義" data-level="4" data-label="区間包">

$S$を$\mathbb{R}$の部分集合とする．$S$を含む閉区間$I\in\mathbb{IF}$で条件
$$
  J \supseteq S
  \implies J \supseteq I\quad(J\in\mathbb{IF})
$$
を満たすものを$S$の$\mathbb{F}$-区間包といい，$\operatorname{hull}_{\mathbb{F}}S$と表す．ベクトルと行列についても同様に定義する．

</math-theorem>

<math-theorem data-type="定義" data-level="4" data-label="区間演算">

$\star$を$\mathbb{R}$上の（必ずしも全域で定義されない）2項演算とする．任意の$\lbrack x\rbrack,\lbrack y\rbrack\in\mathbb{IF}$に対して，閉区間$\lbrack x\rbrack\star\lbrack y\rbrack$を
$$
  \lbrack x\rbrack\star\lbrack y\rbrack \coloneqq \operatorname{hull}_{\mathbb{F}}\lbrace u\star v\mid(u,v)\in D\cap(\lbrack x\rbrack,\lbrack y\rbrack)\rbrace
$$
で定義する．ただし，$D$は$u\star v$が定義される$(u,v)\in\mathbb{R}^{2}$の全体集合である．

</math-theorem>

機械区間演算について，$\star$が加減算のときは
$$
  \begin{gathered}
    \lbrack x\rbrack+\lbrack y\rbrack = \lbrack\operatorname{RD}(x^{\triangledown}+y^{\triangledown}),\operatorname{RU}(x^{\vartriangle}+y^{\vartriangle})\rbrack,\\
    \lbrack x\rbrack-\lbrack y\rbrack = \lbrack\operatorname{RD}(x^{\triangledown}-y^{\vartriangle}),\operatorname{RU}(x^{\vartriangle}-y^{\triangledown})\rbrack
  \end{gathered}
$$
となる．$\star$が乗除算のときは[Yamanaka (2015)](http://hdl.handle.net/2433/241301) を参照のこと．

### べき級数演算

区間演算は，実数の演算を浮動小数点数の演算で不等式評価する技法といえる．同様に，関数の演算を浮動小数点数係数多項式の演算で不等式評価する技法が，Kashiwagi (1994) のべき級数演算である．

簡単のため，この記事では$\mathbb{IR}$係数の区間多項式に関してべき級数演算を定義する．計算機に実装するときには，$\mathbb{IR}$と$\mathbb{IF}$の違いに応じた修正が必要となる．

<math-theorem data-type="定義" data-level="4" data-label="区間多項式">

文字$T$の式
$$
  f(T) = \lbrack a_{0}\rbrack+\lbrack a_{1}\rbrack T+\dotsb+\lbrack a_{n}\rbrack T^{n}\quad(\lbrack a_{i}\rbrack\in\mathbb{IR})
$$
を**区間多項式** (interval polynomial) という．

</math-theorem>

実数$t$の代入は，区間演算によって
$$
  f(t) \coloneqq \sum_{i=0}^{n}\lbrack a_{i}\rbrack t^{i}
  = \Biggl\lbrace\sum_{i=0}^{n}u_{i}t^{i}\Biggm\vert u_{i}\in\lbrack a_{i}\rbrack\Biggr\rbrace
$$
と定める．$f(t)$のことを$f(T)\rvert_{T=t}$とも表記する．

$f(T)$を区間多項式，$D$を1次元閉区間とする．グラフが2つの曲線$x=\inf f(t)$，$x=\sup f(t)$で挟まれる連続関数$x=\phi(t)$（$t\in D$）の全体集合を$\operatorname*{band}_{D}f(T)$と表す．

<math-theorem data-type="定義" data-level="4">

始域$X$，終域$Y$の連続関数の全体集合を$C(X,Y)$と表す．1次元閉区間$D$に対して，連続関数の集合$\operatorname*{band}_{D}f(T)$を
$$
  \operatorname*{band}_{D}f(T) \coloneqq \lbrace\phi\in C(D,\mathbb{R})\mid\phi(t)\in f(t)\mskip18mu\relax\textrm{for all}\mskip6mu\relax t\rbrace
$$
で定義する．$D$が文脈から明らかなら$\operatorname*{band}f(T)$とも書く．

</math-theorem>

<math-note>

たいていの文献で$\operatorname*{band}f(T)$と$f(T)$は同一視される．

</math-note>


連続関数$\phi(t)$が$\operatorname*{band}f(T)$に属する条件は
$$
  \inf f(t) \leq \phi(t)
  \leq \sup f(t)\mskip18mu\relax\textrm{for all}\mskip6mu\relax t
$$
が成り立つことだから，区間多項式は関数に対する不等式評価に相当する．

この節では，区間多項式に対して，以下の基本的な演算を定める．どの演算も，不等式評価と矛盾しないように定義されることが重要である．

1. 加減乗除
2. 関数合成
3. 積分
4. 減次

区間多項式$f(T)=\sum_{i=0}^{m}\lbrack a_{i}\rbrack T^{i}$，$g(T)=\sum_{i=0}^{n}\lbrack b_{i}\rbrack T^{i}$の加算・減算・乗算はそれぞれ
$$
  \begin{gathered}
    f(T)\pm g(T) \coloneqq \sum_{i=0}^{\max\lbrace m,n\rbrace}(\lbrack a_{i}\rbrack\pm\lbrack b_{i}\rbrack) T^{i},\\
	f(T)g(T) \coloneqq \sum_{i=0}^{m+n}\Biggl(\sum_{j=0}^{i}\lbrack a_{j}\rbrack\lbrack b_{i-j}\rbrack\Biggr)T^{i}
  \end{gathered}
$$
で定義される．ただし，$\lbrack a_{m+1}\rbrack=\lbrack a_{m+2}\rbrack=\dotsb=0$かつ$\lbrack b_{n+1}\rbrack=\lbrack b_{n+2}\rbrack=\dotsb=0$とする．

<math-theorem data-type="命題" data-level="4">

演算$\mathord{\star}$が加算・減算・乗算のいずれかであるとき，すべての$\phi_{1}\in\operatorname*{band}_{D}f(T)$と$\phi_{2}\in\operatorname*{band}_{D}g(T)$について，$t$の関数$\phi_{1}(t)\star\phi_{2}(t)$は$\operatorname*{band}_{D}(f(T)\star g(T))$に属する．

</math-theorem>

<math-proof>

$\star$が乗算の場合だけ証明する．$\phi_{1}\in\operatorname*{band}f(T)$，$\phi_{2}\in\operatorname*{band}g(T)$を任意にとる．定義から，任意の$t\in D$に対して，ある$u_{i}\in\lbrack a_{i}\rbrack$，$v_{j}\in\lbrack b_{j}\rbrack$が存在して
$$
  \phi_{1}(t) = \sum_{i=0}^{m}u_{i}t^{i},
  \quad\phi_{2}(t) = \sum_{j=0}^{n}v_{j}t^{j}
$$
を満たす．$k=i+j$とおくと
$$
  \begin{gathered}
    \phi_{1}(t)\phi_{2}(t) = \sum_{i=0}^{m}\sum_{j=0}^{n}u_{i}v_{j}t^{i+j}
    = \sum_{k=0}^{m+n}\sum_{i=0}^{k}u_{i}v_{k-i}t^{k},\\
    \sum_{k=0}^{m+n}\sum_{i=0}^{k}u_{i}v_{k-i}t^{k} \in \sum_{k=0}^{m+n}\Biggl(\sum_{i=0}^{k}\lbrack a_{i}\rbrack\lbrack b_{k-i}\rbrack\Biggr)t^{k}
  \end{gathered}
$$
なので$\phi_{1}(t)\phi_{2}(t)\in(f(T)g(T))\rvert_{T=t}$である．

</math-proof>

$D$を$0$が属する1次元閉区間とし，関数$y=\psi(x)$は区間$\lbrack R\rbrack=\bigcup_{t\in D}f(t)$を含む適当な開集合上で十分になめらかであるとする．このとき，$\psi(x)$のテイラー展開を利用して
$$
  \begin{aligned}
    \psi(f(T)) &\coloneqq \sum_{i=0}^{k-1}\frac{1}{i!}\operatorname*{hull}_{x\in\lbrack a_{0}\rbrack}\biggl(\frac{\mathrm{d}^{i}y}{\mathrm{d}x^{i}}\biggr)(\lbrack a_{1}\rbrack T+\lbrack a_{2}\rbrack T^{2}+\dotsb)^{i}\\
    &\hphantom{{}\coloneqq{}}+\frac{1}{k!}\operatorname*{hull}_{x\in\lbrack R\rbrack}\biggl(\frac{\mathrm{d}^{k}y}{\mathrm{d}x^{k}}\biggr)(\lbrack a_{1}\rbrack T+\lbrack a_{2}\rbrack T^{2}+\dotsb)^{k}
  \end{aligned}
$$
とおく．ただし，$k$は適当な自然数であり，$f(T)^{0}=1$とする．

<math-theorem data-type="命題" data-level="4">

すべての$\phi\in\operatorname*{band}_{D}f(T)$について，合成関数$\psi(\phi(t))$は$\operatorname*{band}_{D}\psi(f(T))$に属する．

</math-theorem>

<math-proof>

$t\in D$を任意にとり，$u_{i}\in\lbrack a_{i}\rbrack$を$\phi(t)=\sum u_{i}t^{i}$となるように選ぶ．$u_{0}\in f(0)\subseteq\lbrack R\rbrack$だから，$x_{0}=\phi(t)$に対して，ある$\xi\in\operatorname*{hull}\lbrace u_{0},x_{0}\rbrace$が存在し
$$
  \begin{aligned}
    \psi(x_{0}) &= \sum_{i=0}^{k-1}\frac{1}{i!}\frac{\mathrm{d}^{i}y}{\mathrm{d}x^{i}}\biggr\rvert_{x=u_{0}}(x_{0}-u_{0})^{i}\\
    &\hphantom{{}={}}+\frac{1}{k!}\frac{\mathrm{d}^{k}y}{\mathrm{d}x^{k}}\biggr\rvert_{x=\xi}(x_{0}-u_{0})^{k}
  \end{aligned}
$$
を満たす（テイラーの定理）．よって
$$
  \begin{aligned}
    \psi(\phi(t)) &= \sum_{i=0}^{k-1}\frac{1}{i!}\frac{\mathrm{d}^{i}y}{\mathrm{d}x^{i}}\biggr\rvert_{x=u_{0}}(u_{1}t+u_{2}t^{2}+\dotsb)^{i}\\
    &\hphantom{{}={}}+\frac{1}{k!}\frac{\mathrm{d}^{k}y}{\mathrm{d}x^{k}}\biggr\rvert_{x=\xi}(u_{1}t+u_{2}t^{2}+\dotsb)^{k}
  \end{aligned}
$$
なので$\psi(\phi(t))\in\psi(f(T))\rvert_{T=t}$である．

</math-proof>

この命題を使うと，区間多項式の除算を定義できる．$y=1/x$のとき
$$
  \frac{1}{i!}\frac{\mathrm{d}^{i}y}{\mathrm{d}x^{i}} = \frac{(-1)^{i}}{x^{i+1}}
$$
なので
$$
  \begin{gathered}
  	\frac{g(T)}{f(T)} \coloneqq g(T)\cdot\frac{1}{f(T)},\\
    \begin{aligned}
      \frac{1}{f(T)} &\coloneqq \sum_{i=0}^{k-1}\operatorname*{hull}_{x\in\lbrack a_{0}\rbrack}\biggl(\frac{(-1)^{i}}{x^{i+1}}\biggr)(\lbrack a_{1}\rbrack T+\lbrack a_{2}\rbrack T^{2}+\dotsb)^{i}\\
      &\hphantom{{}\coloneqq{}}+\operatorname*{hull}_{x\in\lbrack R\rbrack}\biggl(\frac{(-1)^{k}}{x^{k+1}}\biggr)(\lbrack a_{1}\rbrack T+\lbrack a_{2}\rbrack T^{2}+\dotsb)^{k}
    \end{aligned}
  \end{gathered}
$$
とすればよい．ただし，関数$y=1/x$が$\lbrack R\rbrack$でなめらかでなければならないから，$0\notin\lbrack R\rbrack$が必要である．特に$k=1$のとき
$$
  \frac{1}{f(T)} = \frac{1}{\lbrack a_{0}\rbrack}-\sum_{i=1}^{n}\frac{\lbrack a_{i}\rbrack}{\operatorname*{hull}_{x\in\lbrack R\rbrack}(x^{2})}T^{i}
$$
であり，$0\notin\lbrack R\rbrack$より
$$
  \frac{1}{f(T)} = \frac{1}{\lbrack a_{0}\rbrack}-\sum_{i=1}^{n}\frac{\lbrack a_{i}\rbrack}{\lbrack R\rbrack^{2}}T^{i}\quad({\textstyle\lbrack R\rbrack=\bigcup_{t\in D}f(t)})
$$
となる．

<math-theorem data-type="定義" data-level="4" data-label="積分">

区間多項式$f(T)=\sum_{i=0}^{n}\lbrack a_{i}\rbrack T^{i}$の積分を
$$
  \int f(T)\,\mathrm{d}T \coloneqq \sum_{i=0}^{n}\frac{\lbrack a_{i}\rbrack}{i+1}T^{i+1}
$$
で定義する．

</math-theorem>

$0\in D$のとき，すべての$\phi\in\operatorname*{band}_{D}f(T)$について，$t$の関数$\int_{0}^{t}\phi(t')\,\mathrm{d}t'$は$\operatorname*{band}_{D}(\int f(T)\,\mathrm{d}T)$に属する．このことは積分の単調性からただちにしたがう．

<math-theorem data-type="定義" data-level="4" data-label="減次">

区間多項式の$m$次への減次を
$$
  \sum_{i}\lbrack a_{i}\rbrack T^{i} \longrightarrow \sum_{i\lt m}\lbrack a_{i}\rbrack T^{i}+\Biggl(\bigcup_{t\in D}\sum_{i\geq m}\lbrack a_{i}\rbrack t^{i-m}\Biggr)T^{m}
$$
で定義する．

</math-theorem>

定義から，減次$f(T)\to g(T)$に関して
$$
  \operatorname*{band}_{D}f(T) \subseteq \operatorname*{band}_{D}g(T)
$$
が成立する．

以上で，$\mathbb{IR}$係数の区間多項式に対して，基本的な演算が定義された．$\mathbb{IR}^{d}$係数の区間多項式は，$\mathbb{IR}$係数の区間多項式を自然に拡張して定義される．

<math-theorem data-type="定義" data-level="4" data-label="区間多項式">

文字$T$の式
$$
  \bm{f}(T) = \lbrack\bm{a}_{0}\rbrack+\lbrack\bm{a}_{1}\rbrack T+\dotsb+\lbrack\bm{a}_{n}\rbrack T^{n}\quad(\lbrack\bm{a}_{i}\rbrack\in\mathbb{IR}^{d})
$$
を区間多項式という．

</math-theorem>

$\bm{f}(T)$に対して$\lbrack a_{i\mskip2mu\relax j}\rbrack$，$f_{i}(T)$を
$$
  \mathopen{}\mathclose{\left(\begin{matrix}\lbrack a_{1\mskip2mu\relax j}\rbrack \\ \lbrack a_{2\mskip2mu\relax j}\rbrack \\ \vdots \\ \lbrack a_{d\mskip2mu\relax j}\rbrack\end{matrix}\right)} = \lbrack\bm{a}_{j}\rbrack,
  \quad f_{i}(T) = \sum_{j=1}^{n}\lbrack a_{i\mskip2mu\relax j}\rbrack T^{j}
$$
で定めると，$\bm{f}(T)$は$f_{1}(T),f_{2}(T),\dotsc,f_{d}(T)$を並べてできるベクトル
$$
  \mathopen{}\mathclose{\left(\begin{matrix}f_{1}(T) \\ f_{2}(T) \\ \vdots \\ f_{d}(T)\end{matrix}\right)}
$$
と同一視できる．$\bm{f}(T)$に関する加算・減算・積分・減次は，この成分ごとの演算で定義される．

区間多項式と基本演算の組を**べき級数演算** (power series arithmetic; PSA) という．区間多項式の次数を$m$次に下げるとき，打ち切り
$$
  \sum_{i}\lbrack a_{i}\rbrack T^{i} \longrightarrow \sum_{i\leq m}\lbrack a_{i}\rbrack T^{i}
$$
で次数下げする算法を**Type-I PSA**といい，減次
$$
  \sum_{i}\lbrack a_{i}\rbrack T^{i} \longrightarrow \sum_{i\lt m}\lbrack a_{i}\rbrack T^{i}+\Biggl(\bigcup_{t\in D}\sum_{i\geq m}\lbrack a_{i}\rbrack t^{i-m}\Biggr)T^{m}
$$
で次数下げする算法を**Type-II PSA**という．

<math-note>

べき級数演算のこの定義は原形から少しずれている．本来の定義は柏木雅英（2018），または[柏木啓一郎・柏木雅英（2011）](https://www.jstage.jst.go.jp/article/jsiamt/21/1/21_KJ00007143946/_article/-char/ja/)を参照のこと．

</math-note>

次数下げをしなければ，べき級数演算によって区間多項式の次数は限りなく大きくなりうる．計算資源には限りがあるので，現実的にはどこかで次数下げが必要になる．Type-I PSAは，求めたいものが多項式の係数であり，$\operatorname*{band}f(T)$による関数の不等式評価を目的としない場合に使われる．対するType-II PSAは，求めたいものが関数の不等式評価である場合に使われる．

### ピカール反復

べき級数演算は，初期値問題の精度保証付き数値計算に応用される．この節では，初期値問題の数学について簡単に説明する．

微分方程式と初期条件の組
$$
  \begin{cases}
    \mathrm{d}\bm{x}/\mathrm{d}t = \bm{f}(\bm{x},t)\mskip12mu\relax\textrm{at}\mskip6mu\relax t\gt t_{0},\\
    \bm{x} = \bm{x}_{0}\mskip12mu\relax\textrm{at}\mskip6mu\relax t=t_{0}
  \end{cases}
$$
を**初期値問題** (initial value problem; IVP) という．$\mathrm{d}\bm{x}/\mathrm{d}t=\bm{f}(\bm{x},t)$の両辺を$t$で積分すると
$$
  \bm{x} = \int\frac{\mathrm{d}\bm{x}}{\mathrm{d}t}\,\mathrm{d}t
  = \int\bm{f}(\bm{x},t)\,\mathrm{d}t
$$
となるから，解$\bm{x}=\bm{\phi}(t)$は条件
$$
  \bm{\phi}(t) = \bm{x}_{0}+\int_{t_{0}}^{t}\bm{f}(\bm{\phi}(t'),t')\,\mathrm{d}t'
$$
を満たす．両辺を$t$で微分すれば，この式を満たす連続関数$\bm{\phi}$はすべて初期値問題の解であることもわかる．つまり，関数$\bm{\phi}$に対して関数$P_{\bm{f}}(\bm{\phi})$を
$$
  P_{\bm{f}}(\bm{\phi})\colon t \mapsto \bm{x}_{0}+\int_{t_{0}}^{t}\bm{f}(\bm{\phi}(t'),t')\,\mathrm{d}t'
$$
で定義すると，初期値問題を解くことは，連続関数$\bm{\phi}$の方程式
$$
  \bm{\phi} = P_{\bm{f}}(\bm{\phi})
$$
を解くことと同値である．$\bm{\phi}=P_{\bm{f}}(\bm{\phi})$となる$\bm{\phi}$を$P_{\bm{f}}$の**不動点** (fixed point) という．

以下では$t_{0}=0$とする．関数列$\bm{\phi}_{0},\bm{\phi}_{1},\dotsc$を帰納的に
$$
  \bm{\phi}_{0}(t) = \bm{x}_{0},
  \quad\bm{\phi}_{n+1}(t) = \bm{x}_{0}+\int_{0}^{t}\bm{f}(\bm{\phi}_{n}(t'),t')\,\mathrm{d}t'
$$
で定める．この関数列は$\bm{\phi}_{n+1}=P_{\bm{f}}(\bm{\phi}_{n})$を満たすから，$n\to\infty$では
$$
  \bm{\phi}_{\infty} = P_{\bm{f}}(\bm{\phi}_{\infty})
$$
となることが予想される．つまり，極限関数$\bm{\phi}_{\infty}$が初期値問題の解になる．解を構成するこの手続きを**ピカール反復** (Picard iteration) という．

ピカール反復について，次の定理が成り立つ．証明は付録に回す．

<math-theorem data-type="定理" data-level="4">

$U$を$\mathbb{R}^{d}$の部分集合，$\bm{x}_{0}$を$U$の元，$D=\lbrack 0,h\rbrack\subseteq\mathbb{R}$を内部が空でない有界閉区間とする．また，連続関数
$$
  \bm{f}\colon\lbrace(\bm{x},t)\mid\bm{x}\in U\;\mathrel{\textrm{and}}\;t\in D\rbrace \to \mathbb{R}^{d}
$$
はリプシッツ条件を満たすとする．すなわち，定数$L\gt 0$が存在し，すべての$\bm{x},\bm{x}'\in U$について
$$
  \sup_{t\in D}\lvert\bm{f}(\bm{x},t)-\bm{f}(\bm{x}',t)\rvert \leq L\lvert\bm{x}-\bm{x}'\rvert
$$
となると仮定する．一様ノルムに関する閉部分集合$K\subseteq C(D,\mathbb{R}^{d})$が以下の3条件を満たすとき，$K$の元で$P_{\bm{f}}$の不動点となるものがただ一つ存在する．また，その不動点はピカール反復の極限関数である．

1. $K\neq\emptyset$である．
2. すべての$\bm{\phi}\in K$，$t\in D$について$\bm{\phi}(t)\in U$である．
3. すべての$\bm{\phi}\in K$について$P_{\bm{f}}(\bm{\phi})\in K$である．

</math-theorem>

<math-note>

$K$が一様ノルムに関する閉部分集合であるとは，$K$に属する関数の列が一様収束するとき，その極限関数も$K$に属することをいう．

</math-note>

### 柏木の方法

この節では，Kashiwagi (1994) により提案された，初期値問題の精度保証付き数値解法の概要を示す．

重要なのは，$\bm{p}(T)$が区間多項式であるとき，$\operatorname*{band}_{D}\bm{p}(T)$は一様ノルムに関する$C(D,\mathbb{R}^{d})$の閉部分集合となることである．なんらかの方法で，解の不等式評価となることが期待できる区間多項式
$$
  \bm{p}(T) = \lbrack\bm{a}_{0}\rbrack+\lbrack\bm{a}_{1}\rbrack T+\dotsb+\lbrack\bm{a}_{n}\rbrack T^{n}
$$
を得たとする．$K=\operatorname{band}_{D}\bm{p}(T)$が定理の3条件を満たすことを示せば，$K$上に初期値問題の解がただ一つあると結論できる．

関数$\bm{\phi}\in\operatorname{band}_{D}\bm{p}(T)$を任意にとる．$P_{\bm{f}}(\bm{\phi})$が$\operatorname{band}_{D}\bm{p}(T)$に属する条件は，すべての$t\in D$について
$$
  \bm{x}_{0}+\int_{0}^{t}\bm{f}(\bm{\phi}(t'),t')\,\mathrm{d}t' \in \bm{p}(t)
$$
が成り立つことである．式
$$
  \bm{x}_{0}+\int\bm{f}(\bm{p}(T),T)\,\mathrm{d}T
$$
をType-II PSAで計算して，得られる区間多項式を$\bm{p}(T)'=\sum\lbrack\bm{a}_{i}'\rbrack T^{i}$とおく．各$i$について$\lbrack\bm{a}_{i}'\rbrack\subseteq\lbrack\bm{a}_{i}\rbrack$が確かめられれば
$$
  P_{\bm{f}}(\bm{\phi}) \in \operatorname*{band}_{D}\bm{p}(T)' \subseteq \operatorname*{band}_{D}\bm{p}(T)
$$
より，$K=\operatorname*{band}_{D}\bm{p}(T)$が定理の条件を満たすといえる．

$\bm{p}(T)$を見つける一つの方法は，Type-I PSAでピカール反復を計算することである．すなわち，式
$$
  \bm{p}_{0}(T) = \bm{x}_{0},
  \quad\bm{p}_{n+1}(T) = \bm{x}_{0}+\int\bm{f}(\bm{p}_{n}(T),T)\,\mathrm{d}T
$$
をType-I PSAで計算して$\bm{p}_{1}(T),\bm{p}_{2}(T),\dotsc$を定義する．ただし，各$\bm{p}_{n}(T)$は$n$次で打ち切る．このとき，$\bm{p}_{n}(T)$は解$\bm{x}=\bm{\phi}(t)$のテイラー多項式
$$
  \bm{x}_{0}+\frac{\bm{\phi}'(0)t}{1!}+\frac{\bm{\phi}''(0)t^{2}}{2!}+\dotsb+\frac{\bm{\phi}^{(n)}(0)t^{n}}{n!}
$$
を近似することがわかっている．そのため，ピカール反復を適当な回数$n$で止めて，より高次の項の寄与を含むように項$\lbrack\bm{v}\rbrack T^{n}$をうまく設定し
$$
  \bm{p}(T) = \bm{p}_{n}(T)+\lbrack\bm{v}\rbrack T^{n}
$$
と定めれば，先述の方法がうまく機能すると期待できる．$\lbrack\bm{v}\rbrack$の具体的な定め方は柏木雅英（2018）を見よ．

### おわりに

最後に，意欲的な方のために，本文では書けなかったキーワードをいくつか示しておく．

- 閉区間を中心と半径の組$\langle x\rangle=\langle c,r\rangle=\lbrack c-r,c+r\rbrack$で表現する中心・半径型区間演算があり，この記事で示した上端・下端型区間演算としばしば併用される．詳細は [Yamanaka (2015)](http://hdl.handle.net/2433/241301) を見よ．
- 関数の不等式評価を得る方法はType-II PSAだけではない．平均値形式や，[Makino & Berz (1999)](https://link.springer.com/article/10.1023/A:1026485406803) のテイラーモデルなどがよく知られている．
- 常微分方程式の精度保証付き数値解法では，Moore法とLohner法が有名である．Moore法の解説は[Alefeld & Mayer (2000)](https://www.sciencedirect.com/science/article/pii/S0377042700003423?via%3Dihub) に，Lohner法の解説は柏木雅英（2018）にある．
- この記事で説明した解法だけだと，長い区間$0\leq t\leq h$にわたる解の不等式評価を得ることができない．[柏木啓一郎・柏木雅英（2011）](https://www.jstage.jst.go.jp/article/jsiamt/21/1/21_KJ00007143946/_article/-char/ja/)はアフィン演算という技法を応用して，長い区間にわたる解の不等式評価を計算している．

### 付録A（0を元に持つ区間の除算）

$0\in\lbrack y\rbrack$の場合，$\lbrack x\rbrack/\lbrack y\rbrack$は次のようになる．

1. $\lbrack y\rbrack=0$なら$\lbrack x\rbrack/\lbrack y\rbrack=\emptyset$である．
2. $\lbrack y\rbrack\neq 0$，$\lbrack x\rbrack=0$なら$\lbrack x\rbrack/\lbrack y\rbrack=0$である．
3. $y^{\triangledown}\lt 0\lt y^{\vartriangle}$，$\lbrack x\rbrack\neq 0$なら$\lbrack x\rbrack/\lbrack y\rbrack=\lbrack-\infty,+\infty\rbrack$である．

いずれも成り立たないとき，$\lbrack x\rbrack/\lbrack y\rbrack$は次の表の通りである．

| | $y^{\triangledown}\lt y^{\vartriangle}=0$ | $0=y^{\triangledown}\lt y^{\vartriangle}$ |
| --- | --- | --- |
| $x^{\vartriangle}\lt 0$ | $\lbrack x^{\vartriangle}/y^{\triangledown},+\infty\rbrack$ | $\lbrack-\infty,x^{\vartriangle}/y^{\vartriangle}\rbrack$ |
| $x^{\triangledown}\lt x^{\vartriangle}=0$ | $\lbrack 0,+\infty\rbrack$ | $\lbrack-\infty,0\rbrack$ |
| $x^{\triangledown}\lt 0\lt x^{\vartriangle}$ | $\lbrack-\infty,+\infty\rbrack$ | $\lbrack-\infty,+\infty\rbrack$ |
| $0=x^{\triangledown}\lt x^{\vartriangle}$ | $\lbrack-\infty,0\rbrack$ | $\lbrack 0,+\infty\rbrack$ |
| $0\lt x^{\triangledown}$ | $\lbrack x^{\triangledown}/y^{\triangledown},+\infty\rbrack$ | $\lbrack-\infty,x^{\triangledown}/y^{\vartriangle}\rbrack$ |

$y^{\triangledown}\lt 0\lt y^{\vartriangle}$かつ ($x^{\vartriangle}\lt 0\;\mathrel{\textrm{or}}\;0\lt x^{\triangledown}$) であるとき，除算の値域
$$
  R = \biggl\lbrace\frac{u}{v}\biggm\vert u\in\lbrack x\rbrack\;\mathrel{\textrm{and}}\;v\in\lbrack y\rbrack\setminus\lbrace 0\rbrace\biggr\rbrace
$$
は閉区間の和集合で
$$
  \begin{aligned}
    R &= \lbrack-\infty,a\rbrack\cup\lbrack b,+\infty\rbrack\\
    &= \begin{cases}\lbrack-\infty,x^{\vartriangle}/y^{\vartriangle}\rbrack\cup\lbrack x^{\vartriangle}/y^{\triangledown},+\infty\rbrack & (x^{\vartriangle}\lt 0),\\ \lbrack-\infty,x^{\triangledown}/y^{\triangledown}\rbrack\cup\lbrack x^{\triangledown}/y^{\vartriangle},+\infty\rbrack & (x^{\triangledown}\gt 0)\end{cases}
  \end{aligned}
$$
と書ける．この場合，区間演算の定義通りに計算すると
$$
  \frac{\lbrack x\rbrack}{\lbrack y\rbrack} = \operatorname*{hull}R
  = \lbrack-\infty,+\infty\rbrack
$$
となる．しかし，この計算結果からは「値域が開区間$(a,b)$を含まない」という情報が抜け落ちてしまっている．それはもったいないので，$\lbrack-\infty,a\rbrack$と$\lbrack b,+\infty\rbrack$の組を計算結果とすることもある．

<math-note>

[CAPD](http://capd.ii.uj.edu.pl/) (version 5.2.0) のように，$0\in\lbrack y\rbrack$のとき$\lbrack x\rbrack/\lbrack y\rbrack$は不正な式とする実装もある．

</math-note>

### 付録B（解の存在と一意性）

本文では証明を省略した，ピカール反復に関する定理を示す．

<math-proof data-open>

$C(D,\mathbb{R}^{d})$のノルムを
$$
  \lVert\bm{\phi}\rVert = \sup_{t\in D}\lvert\mathrm{e}^{-2Lt}\bm{\phi}(t)\rvert
$$
で定める．一様ノルム$\lVert\bm{\phi}\rVert_{\infty}=\sup\lbrace\lvert\bm{\phi}(t)\rvert\mid t\in D\rbrace$との間に不等式
$$
  \mathrm{e}^{-2Lh}\lVert\bm{\phi}\rVert_{\infty} \leq \lVert\bm{\phi}\rVert \leq \lVert\bm{\phi}\rVert_{\infty}
$$
が成り立つので，$C(D,\mathbb{R}^{d})$はノルム$\lVert\mathord{\bullet}\rVert$に関するバナッハ空間であり，$K$はこのノルムについても閉集合である．よって，$P_{\bm{f}}$がバナッハ空間$(K,\lVert\mathord{\bullet}\rVert)$における縮小写像であれば，バナッハの不動点定理から定理の主張がしたがう．すべての$\bm{\phi}_{0},\bm{\phi}_{1}\in K$について
$$
  \begin{gathered}
    \begin{aligned}
      &\lVert P_{\bm{f}}(\bm{\phi}_{1})-P_{\bm{f}}(\bm{\phi}_{0})\rVert\\
      &\leq \sup_{t\in D}\biggl(\mathrm{e}^{-2Lt}\int_{0}^{t}\lvert\bm{f}(\bm{\phi}_{1}(t'),t')-\bm{f}(\bm{\phi}_{0}(t'),t')\rvert\,\mathrm{d}t'\biggr)\\
      &\leq \sup_{t\in D}\biggl(\mathrm{e}^{-2Lt}\int_{0}^{t}L\lvert\bm{\phi}_{1}(t')-\bm{\phi}_{0}(t')\rvert\,\mathrm{d}t'\biggr),
    \end{aligned}\\
    \begin{aligned}
      \int_{0}^{t}L\lvert\bm{\phi}_{1}(t')-\bm{\phi}_{0}(t')\rvert\,\mathrm{d}t' &\leq \int_{0}^{t}L\mathrm{e}^{2Lt'}\lVert\bm{\phi}_{1}-\bm{\phi}_{0}\rVert\,\mathrm{d}t'\\
      &= \frac{\mathrm{e}^{2Lt}-1}{2}\lVert\bm{\phi}_{1}-\bm{\phi}_{0}\rVert
    \end{aligned}
  \end{gathered}
$$
より
$$
  \begin{aligned}
    \lVert P_{\bm{f}}(\bm{\phi}_{1})-P_{\bm{f}}(\bm{\phi}_{0})\rVert &\leq \sup_{t\in D}\biggl(\frac{1-\mathrm{e}^{-2Lt}}{2}\biggr)\lVert\bm{\phi}_{1}-\bm{\phi}_{0}\rVert\\
    &\leq \frac{1}{2}\lVert\bm{\phi}_{1}-\bm{\phi}_{0}\rVert
  \end{aligned}  
$$
だから，$P_{\bm{f}}$は縮小写像である．

</math-proof>

### 参考文献

1. Alefeld, Götz; Mayer, Günter. Interval analysis: theory and applications. *J. Comput. Appl. Math*. 2000, vol. 121, p. 421-464. <https://doi.org/10.1016/S0377-0427(00)00342-3>, (accessed 2023-12-11).
2. Boldo, Sylvie et al. Floating-point arithmetic. *Acta Numerica*. 2023, vol. 32, p. 203-290. <https://doi.org/10.1017/S0962492922000101>, (accessed 2023-12-05).
3. Kapela, Tomasz et al. CAPD::DynSys: a flexible C++ toolbox for rigorous numerical analysis of dynamical systems. *Commun. Nonlinear Sci. Numer. Simul*. 2021, vol. 101, 105578.
4. 柏木啓一郎, 柏木雅英. 平均値形式とアフィン演算を用いた常微分方程式の精度保証法. 日本応用数理学会論文誌. 2011, vol. 21, no. 1, p. 37-58, (online), 入手先, [J-STAGE](https://www.jstage.jst.go.jp/article/jsiamt/21/1/21_KJ00007143946/_article/-char/ja/), (参照 2023-12-15).
5. Kashiwagi, Masahide. “Numerical Validation for Ordinary Differential Equations Using Power Series Arithmetic”. *Proc. 1994 Symposium on Nonlinear Theory and its Applications*. Kagoshima, Japan, 1994-10-06/08, IEICE, 1994, p. 243-246.
6. 柏木雅英. “常微分方程式の精度保証付き数値解法”. 精度保証付き数値計算の基礎. 大石進一編. コロナ社, 2018, p. 165-196.
7. 柏木雅英. kv. version 0.4.55, 2022-09-16. <http://verifiedby.me/kv/>, (参照 2023-12-06).
8. Makino, Kyoko; Berz, Martin. Efficient Control of the Dependency Problem Based on Taylor Model Methods. *Reliable Computing*. 1999, vol. 5, p. 3-12, (online), [available from SpringerLink](https://link.springer.com/article/10.1023/A:1026485406803), (accessed 2023-12-15).
9. 荻田武史, 柏木雅英, 劉雪峰. “序論”. 精度保証付き数値計算の基礎. 大石進一編. コロナ社, 2018, p. 11-32.
10. Yamanaka, Naoya; Oishi, Shin’ichi. Interval Arithmetic and Its Implementations. *RIMS Kôkyûroku Bessatsu*. 2015, B54, p. 71-98. <http://hdl.handle.net/2433/241301>, (accessed 2023-12-05).
11. IEEE Std 754: 2008. *Standard for Floating-Point Arithmetic*.
