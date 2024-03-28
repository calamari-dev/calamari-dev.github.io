---
layout: "../../layouts/Article.astro"
title: 不動点定理について
release: "2024-03-28T00:00:00+00:00"
description: 不動点定理の証明集．
tags: ["不動点定理", "数学"]
---

### 目次

### はじめに

不動点定理とは，方程式$x=f(x)$の解の存在を主張する定理の総称である．この記事では，無限次元の不動点定理を中心に，それらの主張と証明を紹介する．

Googleドライブから，この記事の[PDF版](https://drive.google.com/file/d/1Mn2Np9d-DBiYUSs_8oltYXYDzqF0b6DY/view?usp=sharing)をダウンロードできる．印刷して読みたい方にはPDF版をおすすめする．

### バナッハの不動点定理

バナッハの不動点定理は，最も単純かつ強力な不動点定理の一つである．不動点定理の多くが解の存在しか主張できないのに対して，バナッハの不動点定理からは解の一意性もしたがうという特徴がある．

<math-theorem data-type="定義" data-level="4" data-label="縮小写像">

$\mathcal{X}$を距離$d$に関する距離空間とする．写像$T\colon\mathcal{X}\to\mathcal{X}$が**縮小写像** (contraction) であるとは，ある$q\in\lbrack 0,1)$が存在して
$$
  d(T(x),T(x')) \leq qd(x,x')\mskip18mu\relax\textrm{for all}\mskip6mu\relax x,x'\in\mathcal{X}
$$
を満たすことをいう．

</math-theorem>

<math-theorem data-type="定理" data-level="4" data-label="バナッハの不動点定理">

$\mathcal{X}$を距離$d$に関する完備距離空間とする．このとき，写像$T\colon\mathcal{X}\to\mathcal{X}$が縮小写像であれば，$T$は不動点$x^{\ast}$をただ一つ有する．また，反復$x_{n+1}=T(x_{n})$は初期値$x_{0}$の値によらず$x^{\ast}$に収束する．すなわち
$$
  \lim_{n\to\infty}T^{n}(x_{0}) = x^{\ast}\mskip18mu\relax\textrm{for all}\mskip6mu\relax x_{0}\in\mathcal{X}
$$
が成立する．これを**バナッハの不動点定理** (Banach fixed-point theorem) という．

</math-theorem>

<math-proof data-open>

まず，不動点が存在することを示す．任意に$x_{0}\in\mathcal{X}$をとる．$m\lt n$のとき
$$
  \begin{aligned}
    d(T^{m}(x_{0}),T^{n}(x_{0})) &\leq \sum_{i=m}^{n-1}d(T^{i}(x_{0}),T^{i+1}(x_{0}))\\
    &\leq \sum_{i=m}^{\infty}q^{i}d(x_{0},T(x_{0}))\\
    &= \frac{q^{m}}{1-q}d(x_{0},T(x_{0}))
  \end{aligned}
$$
であり，$m\to\infty$では$q^{m}\to 0$だから，点列$\lbrace T^{n}(x_{0})\rbrace$はコーシー列である．よって，極限点$x^{\ast}$が存在する．また
$$
  \begin{aligned}
    d(x^{\ast},T(x^{\ast})) &\leq d(x^{\ast},T^{n}(x_{0}))+d(T^{n}(x_{0}),T(x^{\ast}))\\
    &\leq d(x^{\ast},T^{n}(x_{0}))+qd(T^{n-1}(x_{0}),x^{\ast})
    \end{aligned}
$$
であり，右辺は$n\to\infty$のとき$0$に収束する．よって$d(x^{\ast},T(x^{\ast}))=0$，$x^{\ast}=T(x^{\ast})$である．

最後に，不動点が一意であることを示す．$x^{\ast},x^{\ast\ast}\in\mathcal{X}$を$T$の不動点とすると
$$
  d(x^{\ast},x^{\ast\ast}) = d(T(x^{\ast}),T(x^{\ast\ast})) 
  \leq qd(x^{\ast},x^{\ast\ast})
$$
なので$d(x^{\ast},x^{\ast\ast})/(1-q)\leq 0$，$x^{\ast}=x^{\ast\ast}$である．

</math-proof>

### ブラウワーの不動点定理

ブラウワーの不動点定理は「$d$次元閉球体から$d$次元閉球体への連続関数は不動点を持つ」という定理である．この記事では，Milnor (1978) とRogers (1980) により考案された，微分積分学に基づく初等的な証明を紹介する．

本節において，記号は以下の通りとする．

1. $\bm{x},\bm{y}\in\mathbb{R}^{d}$について，$\langle\bm{x},\bm{y}\rangle$は標準内積$\bm{x}^{\mathsf{T}}\mskip1mu\bm{y}$，$\lVert\bm{x}\rVert$はユークリッドノルム$\sqrt{\langle\bm{x},\bm{x}\rangle}$を表す．
2. $\bar{B}^{d}$は閉球体$\lbrace\bm{x}\in\mathbb{R}^{d}\mid\lVert\bm{x}\rVert\leq 1\rbrace$，$S^{d-1}$は球面$\lbrace\bm{x}\in\mathbb{R}^{d}\mid\lVert\bm{x}\rVert=1\rbrace$を表す．
3. 行列$\bm{A}$について，$\lVert\bm{A}\rVert_{2}$は行列ノルム$\max\lbrace\lVert\bm{A}\bm{x}\rVert\mid\lVert\bm{x}\rVert=1\rbrace$を表す．
4. ベクトル値の多変数関数$\bm{y}=\bm{f}(\bm{x})$について，$\bm{J}_{\bm{f}}(\bm{x})$はヤコビ行列$(\partial y_{i}/\partial x_{j})$を表す．

ブラウワーの不動点定理を示す前に，補題を2つ証明する．

<math-theorem data-type="補題" data-level="4">

位相空間$X$の開集合$O_{1}$，$O_{2}$が$O_{1}\subseteq O_{2}$を満たすとする．このとき ($O_{1}\neq O_{2}\implies O_{2}\cap\partial O_{1}\neq\emptyset$) である．

</math-theorem>

<math-proof data-open>

対偶を示す．$O_{2}\cap\partial O_{1}=\emptyset$とする．このとき$O_{2}\cap\bar{O}_{1}\cap O_{1}^{\mathrm{c}}=\emptyset$より，$O_{2}\cap\bar{O}_{1}\subseteq O_{1}$である．よって$O_{2}\subseteq O_{1}$だから，$O_{1}=O_{2}$である．

</math-proof>

<math-theorem data-type="補題" data-level="4">

$C^{1}$級関数$\bm{f}\colon\bar{B}^{d}\to S^{d-1}$で条件 ($\bm{n}\in S^{d-1}\implies\bm{f}(\bm{n})=\bm{n}$) を満たすものは存在しない．

</math-theorem>

さきに証明の流れを示しておく．$\bm{f}$が仮定を満たすとき，恒等写像と$\bm{f}$を結ぶ連続変形
$$
  \bm{f}_{t}(\bm{x}) = (1-t)\bm{x}+t\bm{f}(\bm{x})\quad(0\leq t\leq 1)
$$
は，量
$$
  U = \int_{\lVert\bm{x}\rVert\leq 1}\det(\bm{J}_{\bm{f}_{t}}(\bm{x}))\,\mathrm{d}V
$$
を保存する（すなわち$\mathrm{d}U/\mathrm{d}t=0$である）ことが証明できる．$\bm{f}_{t}$が単射かつ$\det\bm{J}_{\bm{f}_{t}}(\bm{x})\gt 0$なら
$$
  U = \int_{\bm{u}\in\bm{f}_{t}(\bar{B}^{d})}1\,\mathrm{d}V
  = \operatorname{vol}(\bm{f}_{t}(\bar{B}^{d}))\quad(\bm{u}=\bm{f}_{t}(\bm{x}))
$$
である．このことと，球体$\bar{B}^{d}=\bm{f}_{0}(\bar{B}^{d})$の体積は正で，球面$S^{d-1}=\bm{f}_{1}(\bar{B}^{d})$の体積は$0$であることから，矛盾が導かれる．

<math-proof data-open>

条件を満たす関数$\bm{f}$があると仮定する．
$$
  \bm{f}_{t}(\bm{x}) = (1-t)\bm{x}+t\bm{f}(\bm{x})\quad(0\leq t\leq 1)
$$
とおくと，任意の$\bm{x}\in\bar{B}^{d}$，$\bm{n}\in S^{d-1}$に対して
$$
  \begin{gathered}
    \lVert\bm{f}_{t}(\bm{x})\rVert \leq (1-t)\lVert\bm{x}\rVert+t\lVert\bm{f}(\bm{x})\rVert
    \leq 1,\\
    \bm{f}_{t}(\bm{n}) = (1-t)\bm{n}+t\bm{n}
    = \bm{n}
  \end{gathered}
$$
である．つまり，$\bm{f}_{t}$は$\bar{B}^{d}$から$\bar{B}^{d}$への関数であり，$S^{d-1}$上の点を変えない．また，$\bm{g}(\bm{x})=\bm{f}(\bm{x})-\bm{x}$に関して
$$
  \begin{aligned}
    &\bm{g}(\bm{x}_{2})-\bm{g}(\bm{x}_{1})\\
    &= \int_{0}^{1}\biggl(\frac{\mathrm{d}}{\mathrm{d}t}\bm{g}((1-t)\bm{x}_{1}+t\bm{x}_{2})\biggr)\,\mathrm{d}t\\
    &= \int_{0}^{1}\bm{J}_{\bm{g}}((1-t)\bm{x}_{1}+t\bm{x}_{2})(\bm{x}_{2}-\bm{x}_{1})\,\mathrm{d}t
  \end{aligned}
$$
なので，$C=\max\lbrace\lVert\bm{J}_{\bm{g}}(\bm{x})\rVert_{2}\mid\lVert\bm{x}\rVert\leq 1\rbrace$とおくと
$$
  \lVert\bm{g}(\bm{x}_{2})-\bm{g}(\bm{x}_{1})\rVert \leq C\lVert\bm{x}_{2}-\bm{x}_{1}\rVert
$$
である．

仮に，異なる$\bm{x}_{1},\bm{x}_{2}\in\bar{B}^{d}$の組で$\bm{f}_{t}
(\bm{x}_{1})=
\bm{f}_{t}(\bm{x}_{2})$を満たすものがあれば，$\bm{f}_{t}(\bm{x})=\bm{x}+t\bm{g}(\bm{x})$より
$$
  \begin{gathered}
    \lVert\bm{x}_{2}-\bm{x}_{1}\rVert = t\lVert\bm{g}(\bm{x}_{2})-\bm{g}(\bm{x}_{1})\rVert
    \leq tC\lVert\bm{x}_{2}-\bm{x}_{1}\rVert,\\
    t \geq \frac{1}{C}
  \end{gathered}
$$
となる．よって，$t\lt 1/C$のとき$\bm{f}_{t}$は単射である．また，$tC\lt 1$のとき$\bm{J}_{\bm{f}_{t}}(\bm{x})=\bm{I}+t\bm{J}_{\bm{g}}(\bm{x})$の逆行列はノイマン級数
$$
  \bm{J}_{\bm{f}_{t}}(\bm{x})^{-1} = \sum_{k=0}^{\infty}(-t\bm{J}_{\bm{g}}(\bm{x}))^{k}
$$
で書ける．よって，逆関数定理より$\bm{f}_{t}^{-1}$は$\bm{f}_{t}(B^{d})$全体で$C^{1}$級だから，制限$\bm{f}_{t}\rvert_{B^{d}}$は像$\bm{f}_{t}(B^{d})$との同相写像である．特に，像$\bm{f}_{t}(B^{d})$は開集合である．

$t\lt 1/C$の下で$\bm{f}_{t}(B^{d})=B^{d}$を示す．$\bm{f}_{t}(B^{d})\neq B^{d}$を仮定する．このとき，補題から$B^{d}\cap\partial(\bm{f}_{t}(B^{d}))$上の点$\bm{u}$が存在する．$\bm{u}\in\partial(\bm{f}_{t}(B^{d}))$なので，条件
$$
  \bm{x}_{1},\bm{x}_{2},\dotsc \in B^{d},
  \quad\lim_{n\to\infty}\bm{f}_{t}(\bm{x}_{n}) = \bm{u}
$$
を満たす点列$\lbrace\bm{x}_{n}\rbrace$がある．$\bar{B}^{d}$の点列コンパクト性から$\lbrace\bm{x}_{n}\rbrace$は収束部分列を持つ．この極限点を$\bm{a}$とおくと
$$
  \bm{f}_{t}(\bm{a}) = \bm{u}
  \in \partial(\bm{f}_{t}(B^{d}))
$$
である．$\bm{f}_{t}(B^{d})$は開集合だから境界と交わらない．よって，$\bm{a}$は$B^{d}$に属さないので，$\bar{B}^{d}\setminus B^{d}=S^{d-1}$に属する．すると$\bm{u}=\bm{f}_{t}(\bm{a})=\bm{a}$だが，これは$\bm{u}\in B^{d}$に矛盾する．したがって$\bm{f}_{t}(B^{d})=B^{d}$である．

ここで
$$
  U(t) = \int_{\lVert\bm{x}\rVert\leq 1}\det(\bm{J}_{\bm{f}_{t}}(\bm{x}))\,\mathrm{d}V
$$
とおく．$\det\bm{J}_{\bm{f}_{t}}(\bm{x})=\det((1-t)\bm{I}+t\bm{J}_{\bm{f}}(\bm{x}))$は$t$の多項式関数であるから，$U(t)$も$t$の多項式関数である．

$\det\bm{J}_{0}(\bm{x})=\det\bm{I}=1$かつ，$t\lt 1/C$のとき$\bm{J}_{\bm{f}_{t}}(\bm{x})$は正則行列なので，中間値の定理より
$$
  0 \leq t \lt \frac{1}{C}
  \implies\det\bm{J}_{\bm{f}_{t}}(\bm{x}) \gt 0
$$
である．よって，変数変換$\bm{u}=\bm{f}_{t}(\bm{x})$により
$$
  U(t) = \int_{\lVert\bm{u}\rVert\leq 1}1\,\mathrm{d}V
  = \operatorname{vol}(\bar{B}^{d})
$$
となる．右辺の値は$t$によらないから，区間$0\leq t\lt 1/C$では$U'(t)=0$である．この条件を満たす多項式関数は定数関数のほかにないので，すべての$t$について$U(t)=\operatorname{vol}(\bar{B}^{d})$である．

$\bm{f}_{1}(\bm{x})=\bm{f}(\bm{x})\in S^{d-1}$だから，関数$\lVert\bm{f}(\bm{x})\rVert^{2}$の方向微分
$$
  \mathop{\vphantom{}\nabla_{\bm{v}}}(\lVert\bm{f}(\bm{x})\rVert^{2}) = \frac{\mathrm{d}}{\mathrm{d}t}\biggr\rvert_{t=0}\lVert\bm{f}(\bm{x}+t\bm{v})\rVert^{2}\quad(\bm{v}\in\mathbb{R}^{d})
$$
は常に$0$である．$\mathop{\vphantom{}\nabla_{\bm{v}}}(\lVert\bm{f}(\bm{x})\rVert^{2})$を計算すると
$$
  \begin{aligned}
    \mathop{\vphantom{}\nabla_{\bm{v}}}(\lVert\bm{f}(\bm{x})\rVert^{2}) &= \mathop{\vphantom{}\nabla_{\bm{v}}}\langle\bm{f}(\bm{x}),\bm{f}(\bm{x})\rangle\\
    &= \langle\mathop{\vphantom{}\nabla_{\bm{v}}}\bm{f}(\bm{x}),\bm{f}(\bm{x})\rangle+\langle\bm{f}(\bm{x}),\mathop{\vphantom{}\nabla_{\bm{v}}}\bm{f}(\bm{x})\rangle\\
    &= 2\langle\bm{f}(\bm{x}),\bm{J}_{\bm{f}}(\bm{x})\bm{v}\rangle
  \end{aligned}
$$
となるので
$$
  \langle\bm{f}(\bm{x}),\bm{J}_{\bm{f}}(\bm{x})\bm{v}\rangle = 0\mskip18mu\relax\mathrel{\textrm{for all}}\mskip6mu\relax\bm{v}\in\mathbb{R}^{d}
$$
である．よって，線形写像$T_{\bm{x}}\colon\bm{v}\mapsto\bm{J}_{\bm{f}}(\bm{x})\bm{v}$の像は$\operatorname{span}\lbrace\bm{f}(\bm{x})\rbrace$の直交補空間に含まれるから，$\operatorname{rank}\bm{J}_{\bm{f}}(\bm{x})=\operatorname{dim}(\operatorname{im}T_{\bm{x}})\lt n$である．すると$\det\bm{J}_{\bm{f}}(\bm{x})=0$，$U(1)=0$だが，これは$U(1)=\operatorname{vol}(\bar{B}^{d})$に矛盾する．したがって，条件を満たす関数$\bm{f}$は存在しない．

</math-proof>

<math-theorem data-type="定理" data-level="4" data-label="ブラウワーの不動点定理">

すべての連続関数$\bm{f}\colon\bar{B}^{d}\to\bar{B}^{d}$は不動点を持つ．これを**ブラウワーの不動点定理** (Brouwer fixed-point theorem) という．

</math-theorem>

<math-proof data-open>

$\bm{f}\colon\bar{B}^{d}\to\bar{B}^{d}$を連続関数とする．ワイエルシュトラスの近似定理より，各成分が$\bm{x}$の多項式関数である関数$\bm{p}_{n}(\bm{x})$を
$$
  \max_{\lVert\bm{x}\rVert\leq 1}\lVert\bm{p}_{n}(\bm{x})-\bm{f}(\bm{x})\rVert \leq \frac{1}{2n}
$$
が成立するようにとれる．$\bm{q}_{n}(\bm{x})=n\bm{p}_{n}(\bm{x})/(n+1)$とおくと
$$
  \begin{gathered}
    \begin{aligned}
      \lVert\bm{q}_{n}(\bm{x})\rVert &\leq \frac{n}{n+1}(\lVert\bm{f}(\bm{x})\rVert+\lVert\bm{p}_{n}(\bm{x})-\bm{f}(\bm{x})\rVert)\\
      &\leq \frac{n}{n+1}\biggl(1+\frac{1}{2n}\biggr)
      = \frac{2n+1}{2n+2}\\
      &\lt 1,
    \end{aligned}\\
    \begin{aligned}
      \lVert\bm{q}_{n}(\bm{x})-\bm{f}(\bm{x})\rVert &= \biggl\lVert\frac{n(\bm{p}_{n}(\bm{x})-\bm{f}(\bm{x}))}{n+1}-\frac{\bm{f}(\bm{x})}{n+1}\biggr\rVert\\
      &\leq \frac{n\lVert\bm{p}_{n}(\bm{x})-\bm{f}(\bm{x})\rVert+\lVert\bm{f}(\bm{x})\rVert}{n+1}\\
      &\leq \frac{3/2}{n+1}
    \end{aligned}
  \end{gathered}
$$
なので，$\lbrace\bm{q}_{n}\rbrace$は$C^{1}(\bar{B}^{d},\bar{B}^{d})$上の関数列であり，$\bm{f}$に一様収束する．

各$\bm{q}_{n}$が不動点を持つことを示す．不動点がないと仮定する．このとき，$\lambda$に関する2次方程式
$$
  \lVert\bm{q}_{n}(\bm{x})+\lambda(\bm{x}-\bm{q}_{n}(\bm{x}))\rVert^{2}-1 = 0
$$
は，$\lambda=0$のとき左辺の値が負なので，正の解と負の解を1つずつ持つ．正の解を$\lambda(\bm{x})$とおくと，関数$\bm{g}(\bm{x})=\bm{q}_{n}(\bm{x})+\lambda(\bm{x})(\bm{x}-\bm{q}_{n}(\bm{x}))$は$C^{1}(\bar{B}^{d},S^{d-1})$に属する．また，$\bm{n}\in S^{d-1}$のとき
$$
  \lVert\bm{q}_{n}(\bm{n})+(\bm{n}-\bm{q}_{n}(\bm{n}))\rVert^{2} = 1
$$
より$\lambda(\bm{n})=1$，$\bm{g}(\bm{n})=\bm{n}$である．これは補題に矛盾するので，$\bm{q}_{n}$は不動点を持つ．

各$n=1,2,\dotsc$に対して，関数$\bm{q}_{n}$の不動点を1つずつ選び，点列$\lbrace\bm{x}_{n}\rbrace$を定める．$\bar{B}^{d}$の点列コンパクト性から，点列$\lbrace\bm{x}_{n}\rbrace$の収束部分列$\lbrace\bm{x}_{n'}\rbrace$が存在する．この極限点を$\bm{a}$とおくと
$$
  \begin{aligned}
    \lVert\bm{a}-\bm{f}(\bm{x}_{n'})\rVert &\leq \lVert\bm{a}-\bm{q}_{n'}(\bm{x}_{n'})\rVert\\
    &\hphantom{{}\leq{}}+\lVert\bm{q}_{n'}(\bm{x}_{n'})-\bm{f}(\bm{x}_{n'})\rVert\\
    &\leq \lVert\bm{a}-\bm{x}_{n'}\rVert+\frac{3/2}{n'+1}
  \end{aligned}
$$
なので，$n\to\infty$によって$\lVert\bm{a}-\bm{f}(\bm{a})\rVert\leq 0$が得られる．したがって，$\bm{a}$が$\bm{f}$の不動点である．

</math-proof>

### シャウダーの不動点定理

シャウダーの不動点定理は，ブラウワーの不動点定理を無限次元へと拡張する定理である．

<math-theorem data-type="定理" data-level="4" data-label="シャウダーの不動点定理">

$\mathcal{X}$をノルム空間，$K\subseteq\mathcal{X}$を空でない凸集合，$T\colon K\to K$を連続写像とする．このとき，以下に示す2条件のうち最低1つが満たされれば，$T$は不動点を持つ．これを**シャウダーの不動点定理** (Schauder fixed-point theorem) という．

1. $T(K)$がコンパクト集合である．
2. $K$が閉集合で，$T(K)$が相対コンパクト集合である．

</math-theorem>

<math-proof data-open>

正の整数$n$を任意にとる．いずれの場合も$T(K)$は全有界なので，開球の族$\lbrace B_{1/n}(x_{n\mskip2mu\relax i})\rbrace_{i\in I}$が$T(K)$を被覆する有限点列$\lbrace x_{n\mskip2mu\relax i}\rbrace_{i\in I}\subseteq T(K)$が存在する．
$$
  \begin{gathered}
    w_{n\mskip2mu\relax i}(x) = \max\biggl\lbrace 0,\frac{1}{n}-\lVert x_{n\mskip2mu\relax i}-x\rVert\biggr\rbrace,\\
	\lambda_{n\mskip2mu\relax i}(x) = \frac{w_{n\mskip2mu\relax i}(x)}{\sum_{k\in I}w_{n\mskip2mu\relax k}(x)},\\
    \phi_{n}(x) = \sum_{i\in I}\lambda_{n\mskip2mu\relax i}(x)x_{n\mskip2mu\relax i}
  \end{gathered}
$$
とおくと，すべての$x\in\mathcal{X}$について$\phi_{n}(x)$は凸包$\operatorname{co}\lbrace x_{n\mskip2mu\relax i}\mid i\in I\rbrace$に属する．また，$\lVert x_{n\mskip2mu\relax i}-x\rVert\leq 1/n$でなければ$\lambda_{n\mskip2mu\relax i}(x)=0$だから
$$
  \lVert\phi_{n}(x)-x\rVert \leq \sum_{i\in I}\lambda_{n\mskip2mu\relax i}(x)\lVert x_{n\mskip2mu\relax i}-x\rVert
  \leq \frac{1}{n}
$$
である．

$\operatorname{\overline{co}}\lbrace x_{n\mskip2mu\relax i}\mid i\in I\rbrace$は有限次元ベクトル空間$\operatorname{span}\lbrace x_{n\mskip2mu\relax i}\mid i\in I\rbrace$のコンパクト凸部分集合である．さらに，写像$\phi_{n}\circ T$の値域は$\operatorname{\overline{co}}\lbrace x_{n\mskip2mu\relax i}\mid i\in I\rbrace$に含まれる．よって，ブラウワーの不動点定理より，$\operatorname{\overline{co}}\lbrace x_{n\mskip2mu\relax i}\mid i\in I\rbrace$上に$\phi_{n}\circ T$の不動点が存在する．各$n=1,2,\dotsc$に対して，写像$\phi_{n}\circ T$の不動点を1つずつ選び，点列$\lbrace a_{n}\rbrace$を定める．

まず，$T(K)$がコンパクト集合であるとき，$T$は不動点を持つことを証明する．$T(K)$が点列コンパクトなので，$\lbrace a_{n}\rbrace$は収束部分列$\lbrace a_{n'}\rbrace$を持つ．この極限点を$\alpha$とおくと，$\phi_{n}(T(a_{n}))=a_{n}$より
$$
  \begin{aligned}
    \lVert\alpha-T(\alpha)\rVert &= \lim_{n\to\infty}\lVert a_{n'}-T(a_{n'})\rVert\\
    &= \lim_{n\to\infty}\lVert\phi_{n'}(T(a_{n'}))-T(a_{n'})\rVert
  \end{aligned}
$$
となる．$\lVert\phi_{n}(x)-x\rVert\leq 1/n$より極限値は$0$だから，$\alpha=T(\alpha)$である．

続いて，$K$が閉集合で，$T(K)$が相対コンパクト集合であるとき，$T$は不動点を持つことを証明する．$T(K)$の閉包が点列コンパクトなので，点列$\lbrace T(a_{n})\rbrace$は収束部分列$\lbrace T(a_{n'})\rbrace$を持つ．この極限点を$\alpha$とおくと，$\phi_{n}(T(a_{n}))=a_{n}$，$\lVert\phi_{n}(x)-x\rVert\leq 1/n$より
$$
  \begin{aligned}
    \lVert a_{n'}-\alpha\rVert &\leq \lVert a_{n'}-T(a_{n'})\rVert+\lVert T(a_{n'})-\alpha\rVert\\
	&= \lVert \phi_{n'}(T(a_{n'}))-T(a_{n'})\rVert+\lVert T(a_{n'})-\alpha\rVert\\
	&\leq \frac{1}{n'}+\lVert T(a_{n'})-\alpha\rVert
  \end{aligned}
$$
となる．よって，点列$\lbrace a_{n'}\rbrace$は$\alpha$に収束する．$K$が閉集合なので$\alpha\in K$であり，$T$は連続だから
$$
  T(\alpha) = \lim_{n\to\infty}T(a_{n'})
  = \alpha
$$
である．

</math-proof>

### サドフスキーの不動点定理

シャウダーの不動点定理は，値域のコンパクト性を必要とする．サドフスキーの不動点定理は，この仮定を緩める定理である．

以下，$\mathcal{X}$をバナッハ空間とする．

<math-theorem data-type="定義" data-level="4">

$S$を$\mathcal{X}$に含まれる任意の集合とする．直径が$\delta$以下の集合からなる$S$の有限被覆が存在する，正数$\delta$の下限を$\alpha(S)$とおく．写像$\alpha\colon 2^{\mathcal{X}}\to\lbrack 0,+\infty\rbrack$を**非コンパクト性のクラトフスキー測度** (Kuratowski measure of non-compactness) という．

</math-theorem>

完備距離空間において，相対コンパクト性と全有界性は同値である．よって，$S$が相対コンパクト集合であることと$\alpha(S)=0$は同値である．また，次の命題が成りたつ．

<math-theorem data-type="命題" data-level="4">

$S$を$\mathcal{X}$の有界な部分集合とし，$S$の凸包を$\operatorname{cl}(S)$と表す．このとき$\alpha(\operatorname{cl}(S))=\alpha(S)$である．

</math-theorem>

<math-proof data-open>

集合族$\lbrace U_{i}\rbrace$が$S$を被覆するとき，任意の$\varepsilon\gt 0$について$U_{i}'=\lbrace u+v\mid u\in U_{i}\;\mathrel{\textrm{and}}\;v\in B_{0}(\varepsilon)\rbrace$が$\operatorname{cl}(S)$の被覆となることに注意すればよい．

</math-proof>

<math-theorem data-type="命題" data-level="4">

$S$を$\mathcal{X}$の有界な部分集合とする．このとき$\alpha(\operatorname{co}(S))=\alpha(S)$である．

</math-theorem>

<math-proof data-open>

$\alpha(\operatorname{co}(S))\geq\alpha(S)$は$\operatorname{co}(S)\supseteq S$から直ちにしたがう．$\alpha(\operatorname{co}(S))\leq\alpha(S)$を示す．$\varepsilon\gt 0$を任意にとる．$\alpha(S)$の定義より，$S$の有限被覆$\lbrace U_{k}\rbrace_{k=1}^{n}$で
$$
  \operatorname{diam}(U_{k}) \leq \alpha(S)+\varepsilon\mskip18mu\relax\textrm{for all}\mskip6mu\relax k=1,2,\dotsc,n
$$
を満たすものが存在する．$U_{k}$を$\operatorname{co}(U_{k})$に置き換えても直径は変わらない（付録を見よ）ので，$U_{k}$は初めから凸集合であると仮定しておく．

$\varDelta$を標準($n-1$)-単体
$$
  \varDelta = \Biggl\lbrace(\lambda_{1},\lambda_{2},\dotsc,\lambda_{n})\Biggm\vert\lambda_{k}\geq 0\;\mathrel{\textrm{and}}\;\sum_{k=1}^{n}\lambda_{k}=1\Biggr\rbrace
$$
とする．$\varDelta$は$\mathbb{R}^{n}$のコンパクト集合だから，有限点列$\lbrace\bm{\eta}_{i}\rbrace_{i\in I}\subseteq\varDelta$が存在して
$$
  \min_{i\in I}\Biggl(\sum_{k=1}^{n}\lvert\lambda_{k}-\eta_{i\mskip2mu\relax k}\rvert\Biggr) \leq \frac{\varepsilon}{2M}\mskip18mu\relax\textrm{for all}\mskip6mu\relax\bm{\lambda}\in\varDelta
$$
を満たす．ただし
$$
  M = \max_{1\leq k\leq n}\biggl(\sup_{u\in U_{k}}\lVert u\rVert\biggr)
$$
である．ここで
$$
  V_{i} = \Biggl\lbrace\sum_{k=1}^{n}\eta_{i\mskip2mu\relax k}u_{k}\Biggm\vert u_{k}\in U_{k}\Biggr\rbrace
$$
とおく．

証明は後に回すが，任意の$x\in\operatorname{co}(S)$に対して，$n$個の点$u_{k}\in U_{k}$（$k=1,2,\dotsc,n$）が存在し，$x$はこれらの凸結合で書ける．この凸結合を$x=\sum\lambda_{k}u_{k}$とおく．すると，$V_{i}$の元$v_{i}=\sum\eta_{i\mskip2mu\relax k}u_{k}$について
$$
  \lVert x-v_{i}\rVert \leq \sum_{k=1}^{n}\lvert\lambda_{k}-\eta_{i\mskip2mu\relax k}\rvert\lVert u_{k}\rVert
  \leq M\sum_{k=1}^{n}\lvert\lambda_{k}-\eta_{i\mskip2mu\relax k}\rvert
$$
となるから，$\min_{i\in I}\lVert x-v_{i}\rVert\leq\varepsilon/2$である．よって，$\operatorname{co}(S)$は集合族
$$
  V_{i}' = \Bigl\lbrace v+w\Bigm\vert v\in V_{i}\;\mathrel{\textrm{and}}\;w\in\bar{B}_{0}\Bigl(\frac{\varepsilon}{2}\Bigr)\Bigr\rbrace\quad(i\in I)
$$
により被覆される．
$$
  \begin{aligned}
    \operatorname{diam}(V_{i}') &\leq \sum_{k=1}^{n}\eta_{i\mskip2mu\relax k}\operatorname{diam}(U_{k})+\varepsilon\\
    &\leq \sum_{k=1}^{n}\eta_{i\mskip2mu\relax k}(\alpha(S)+\varepsilon)+\varepsilon\\
    &= \alpha(S)+2\varepsilon
  \end{aligned}
$$
なので$\alpha(\operatorname{co}(S))\leq\alpha(S)+2\varepsilon$である．$\varepsilon\to 0^{+}$で$\alpha(\operatorname{co}(S))\leq\alpha(S)$がしたがう．

後回しにした部分を証明する．$u_{k}\in U_{k}$（$k=1,2,\dotsc,n$）の凸結合の全体集合を$C$とする．すなわち
$$
  C = \bigcup_{(u_{1},u_{2},\dotsc,u_{n})\in\prod U_{k}}\operatorname{co}\lbrace u_{1},u_{2},\dotsc,u_{n}\rbrace
$$
とおく．$C$は$S$を含むから，$C$が凸集合であることを示せれば，$\operatorname{co}(S)\subseteq C$がしたがうので，証明が完結する．$x,x'\in C$と$t\in\lbrack 0,1\rbrack$を任意にとる．$C$の定義から，$x$および$x'$は凸結合で
$$
  x = \sum_{k=1}^{n}\lambda_{k}u_{k},
  \quad y = \sum_{k=1}^{n}\lambda_{k}'u_{k}'\quad(u_{k},u_{k}'\in U_{k})
$$
と書ける．ここで
$$
  \xi_{k} = (1-t)\lambda_{k}+t\lambda_{k}',
  \quad t_{k} = \begin{cases}t\lambda_{k}'/\xi_{k} & (\xi_{k}\gt 0),\\ 0 & (\xi_{k}=0)\end{cases}
$$
とおくと
$$
  \begin{aligned}
    (1-t)x+tx' &= \sum_{k=1}^{n}((1-t)\lambda_{k}u_{k}+t\lambda_{k}'u_{k}')\\
	&= \sum_{k=1}^{n}\xi_{k}((1-t_{k})u_{k}+t_{k}u_{k}')
  \end{aligned}
$$
となる．各$U_{k}$は凸集合だから$(1-t_{k})u_{k}+t_{k}u_{k}'\in U_{k}$であり，$\sum\xi_{k}=1$なので，$(1-t)x+tx'$は$C$に属する．よって，$C$は凸集合である．

</math-proof>

<math-theorem data-type="定義" data-level="4">

$T\colon D\to\mathcal{X}$（$D\subseteq\mathcal{X}$）を連続写像とする．

1. ある$q\in\lbrack 0,1)$が存在し，任意の有界な$S\subseteq D$に対して$\alpha(T(S))\leq q\alpha(S)$が成立するとき，$T$は$\alpha$-**contraction**であるという．
2. 有界だが相対コンパクトでない任意の$S\subseteq D$に対して$\alpha(T(S))\lt\alpha(S)$が成立するとき，$T$は$\alpha$-**condensing**であるという．

</math-theorem>

すべての縮小写像は$\alpha$-contractionである．すなわち，$\alpha$-contractionはcontractionの拡張である．

<math-theorem data-type="定理" data-level="4" data-label="サドフスキーの不動点定理">

$\mathcal{X}$をバナッハ空間，$K$を$\mathcal{X}$の空でなく有界な閉凸部分集合とする．このとき，連続写像$T\colon K\to\mathcal{X}$が$\alpha$-condensingかつ$T(K)\subseteq K$を満たせば，$T$は不動点を有する．これを**サドフスキーの不動点定理** (Sadovskii&rsquo;s fixed-point theorem) という．

</math-theorem>

<math-proof data-open>

任意に$a\in K$をとる．また，$K$に含まれる閉凸集合$C$で，$a\in C$と$T(C)\subseteq C$を満たすものの全体集合を$\Sigma$とおく．

$K\in\Sigma$より$\Sigma$は空でない．また，$\Sigma$に属するすべての集合は$a$を元に持つ．よって，共通部分$B=\bigcap_{C\in\Sigma}C$は$a$を元に持ち，かつ$K$に含まれる閉凸集合となる．さらに
$$
  T(B) \subseteq \bigcap_{C\in\Sigma}T(C)
  \subseteq \bigcap_{C\in\Sigma}C
  = B
$$
である．よって，$B$は$\Sigma$に属する最小の集合である．

$S=T(B)\cup\lbrace a\rbrace$とおくと，$\operatorname{\overline{co}}(S)$は$\Sigma$に属する．一方，$S\subseteq B$より$\operatorname{\overline{co}}(S)\subseteq B$なので，$B$の最小性から$\operatorname{\overline{co}}(S)=B$である．よって
$$
  \alpha(B) = \alpha(\operatorname{\overline{co}}(T(B)\cup\lbrace a\rbrace))
  = \alpha(T(B))
$$
であるが，$T$が$\alpha$-condensingだから，$B$は相対コンパクト集合でなければならない．$B$に含まれる$T(B)$も相対コンパクト集合なので，シャウダーの不動点定理より$T$は$B$上に不動点を有する．

</math-proof>

<math-theorem data-type="系" data-level="4" data-label="クラスノセルスキーの不動点定理">

$\mathcal{X}$をバナッハ空間，$K$を$\mathcal{X}$の空でなく有界な閉凸部分集合とする．また，$A\colon K\to\mathcal{X}$を縮小写像，$B\colon K\to\mathcal{X}$をコンパクト写像とする．写像$T\colon K\to\mathcal{X}$を
$$
  T(x) = A(x)+B(x)
$$
で定める．このとき，値域$T(K)=\lbrace A(x)+B(x)\mid x\in K\rbrace$が$K$に含まれれば，$T$は不動点を有する．これを**クラスノセルスキーの不動点定理** (Krasnosel&rsquo;skiĭ fixed-point theorem) という．

</math-theorem>

<math-proof data-open>

任意の有界集合$S\subseteq K$に対して，$\alpha(B(S))=0$より
$$
  \begin{aligned}
    \alpha(T(S)) &\leq \alpha(A(S)\cup B(S))\\
	&= \max\lbrace\alpha(A(S)),\alpha(B(S))\rbrace\\
	&= \alpha(A(S))
  \end{aligned}
$$
であり，$A$は縮小写像だから$\alpha(A(S))\lt\alpha(S)$である．

</math-proof>

### 付録（凸集合の事項）

<math-theorem data-type="定義" data-level="4">

$C$をベクトル空間$\mathcal{X}$の部分集合とする．すべての$x,y\in C$と$t\in\lbrack 0,1\rbrack$について$(1-t)x+ty\in C$であるとき，$C$を$\mathcal{X}$の**凸集合** (convex set) という．

</math-theorem>

<math-theorem data-type="定義" data-level="4">

$x_{1},x_{2},\dotsc,x_{n}$は$\mathcal{X}$上の点，$\lambda_{1},\lambda_{2},\dotsc,\lambda_{n}$は非負実数であり，条件
$$
  \lambda_{1}+\lambda_{2}+\dotsb+\lambda_{n} = 1
$$
を満たすとする．このとき，式
$$
  \lambda_{1}x_{1}+\lambda_{2}x_{2}+\dotsb+\lambda_{n}x_{n}
$$
を$x_{1},x_{2},\dotsc,x_{n}$の**凸結合** (convex combination) という．

</math-theorem>

<math-theorem data-type="命題" data-level="4">

$C$を$\mathcal{X}$の凸集合とする．このとき，任意の$x_{1},x_{2},\dotsc,x_{n}\in C$に対して，これらの凸結合は$C$に属する．

</math-theorem>

<math-proof data-open>

$n$に関する帰納法で示す．$n=2$では自明に成り立つ．$n=k$での成立を仮定し，凸結合
$$
  x = \lambda_{1}x_{1}+\lambda_{2}x_{2}+\dotsb+\lambda_{k+1}x_{k+1}
$$
が$C$に属することを証明する．$\lambda_{k+1}=1$のときは$x=x_{k+1}\in C$である．$\lambda_{k+1}\lt 1$のときは，帰納法の仮定から
$$
  y = \sum_{i=1}^{k}\frac{\lambda_{i}}{1-\lambda_{k+1}}x_{i}
$$
が$C$に属するので$x=(1-\lambda_{k+1})y+\lambda_{k+1}x_{k+1}\in C$である．

</math-proof>

<math-theorem data-type="定義" data-level="4">

$S$を$\mathcal{X}$の部分集合とする．このとき，$S$を含む凸集合で，包含関係の順序について最も小さいものが存在する．この凸集合を$S$の**凸包** (convex hull) といい，$\operatorname{co}(S)$と表す．

</math-theorem>

$S$を含む凸集合の全体を$\Sigma$とおくと，$\operatorname{co}(S)$は
$$
  \operatorname{co}(S) = \bigcap_{C\in\Sigma}C
$$
と書ける．また，凸包は次のようにも特徴づけられる．

<math-theorem data-type="定義" data-level="4">

$S$を$\mathcal{X}$の部分集合とする．このとき，$\operatorname{co}(S)$は$S$の元の凸結合の全体集合である．

</math-theorem>

<math-proof data-open>

$S$を含む任意の凸集合は，$S$の元の凸結合すべてを元に持つ．したがって，$S$の元の凸結合の全体集合$C$が凸集合であれば，$C$は$S$を含む最も小さい凸集合であり，$C=\operatorname{co}(S)$となる．$S$の元の凸結合
$$
  x = \sum_{i=1}^{m}\lambda_{i}x_{i},
  \quad y = \sum_{i=1}^{n}\eta_{i}x_{i}\quad(m\leq n)
$$
を任意にとる．$m\lt i\leq n$では$\lambda_{i}=0$とおく．実数$t$は区間$0\leq t\leq 1$を動くものとし
$$
  \xi_{i} = (1-t)\lambda_{i}+t\eta_{i},
  \quad t_{i} = \begin{cases}t\eta_{i}/\xi_{i} & (\xi_{i}\gt 0),\\ 0 & (\xi_{i}=0)\end{cases}
$$
とおくと
$$
  \begin{aligned}
    (1-t)x+ty &= \sum_{i=1}^{n}((1-t)\lambda_{i}x_{i}+t\eta_{i}y_{i})\\
	&= \sum_{i=1}^{n}\xi_{i}((1-t_{i})x_{i}+t_{i}y_{i})
  \end{aligned}
$$
となる．$(1-t_{i})x_{i}+t_{i}y_{i}$は$x_{i},y_{i}$の凸結合なので$C$に属する．よって，それらの凸結合で表される$(1-t)x+ty$も$C$に属するから，$C$は凸集合である．

</math-proof>

<math-theorem data-type="命題" data-level="4">

$S$をノルム空間$\mathcal{X}$の部分集合とする．このとき$\operatorname{diam}(\operatorname{co}(S))=\operatorname{diam}(S)$である．

</math-theorem>

<math-proof data-open>

$\operatorname{diam}(\operatorname{co}(S))\geq\operatorname{diam}(S)$は明らかなので，$\operatorname{diam}(\operatorname{co}(S))\leq\operatorname{diam}(S)$を示す．$x,y\in\operatorname{co}(S)$を任意にとる．凸包の性質から，$x$および$y$は$S$の元の凸結合で表せる．それを
$$
  x = \sum_{i=1}^{m}\lambda_{i}x_{i},
  \quad y = \sum_{j=1}^{n}\eta_{j}y_{j}
$$
とおく．すると
$$
  \begin{aligned}
    \lVert x-y\rVert &= \Biggl\lVert\sum_{i=1}^{m}\lambda_{i}(x_{i}-y)\Biggr\rVert\\
	&\leq \sum_{i=1}^{m}\lambda_{i}\lVert x_{i}-y\rVert
	= \sum_{i=1}^{m}\lambda_{i}\Biggl\lVert\sum_{j=1}^{n}\eta_{j}(x_{i}-y_{j})\Biggr\rVert\\
	&\leq \sum_{i=1}^{m}\lambda_{i}\sum_{j=1}^{n}\eta_{j}\lVert x_{i}-y_{j}\rVert\\
	&\leq \sum_{i=1}^{m}\lambda_{i}\sum_{j=1}^{n}\eta_{j}\operatorname{diam}(S)
	= \operatorname{diam}(S)
  \end{aligned}
$$
なので$\operatorname{diam}(\operatorname{co}(S))\leq\operatorname{diam}(S)$である．

</math-proof>

### 参考文献

1. Ayerbe-Toledano, Jose Maria; Domínguez-Benavides, Tomas; López-Acedo, Genaro. *Measures of Noncompactness in Metric Fixed Point Theory*. Springer-Verlag, 1997, 216p.
2. Milnor, John. Analytic Proofs of the &ldquo;Hairy Ball Theorem&rdquo; and the Brouwer Fixed Point Theorem. *Am. Math. Mon*. 1978, vol. 85, no. 7, p. 521-524.
3. Rogers, Claude A. A Less Strange Version of Milnor&rsquo;s Proof of Brouwer&rsquo;s Fixed-Point Theorem. *Am. Math. Mon*. 1980, vol. 87, no. 7, p. 525-527.
4. Sadovskii, Boris N. A fixed-point principle. *Funct. Anal. Appl*. 1967, vol. 1, p. 151-153.
