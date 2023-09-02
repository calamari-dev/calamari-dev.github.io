---
layout: "../../layouts/Article.astro"
title: 瞬時周波数の定義について
release: "2023-08-30T00:00:00+00:00"
update: "2023-09-02T00:00:00+00:00"
description: 瞬時周波数が矛盾なく定義できることの証明．
tags: ["瞬時周波数", "時間周波数解析", "数学"]
---

### 目次

### はじめに

この記事では，瞬時周波数が数学的に矛盾なく定義できることを証明する．Flandrin (2008) や森勢（2018）など，多くの文献において，複素数値関数$f(t)$の瞬時角周波数は次のような形で定義される．
$$
  \omega(t) = \frac{\mathrm{d}}{\mathrm{d}t}\arg f(t)
$$

ただし，偏角$\arg f(t)$の主値は$t$についてなめらかに変化するように選ぶ．この操作を位相アンラッピングという．この記事では，偏角を含まない瞬時角周波数の式を導出し，適切な仮定の下では位相アンラッピングが可能であることを示す．

### 瞬時周波数

まず，より正確に瞬時周波数を定義する．

<math-theorem data-type="定義" data-level="4">

$f(t)$を$C^{1}$級複素数値関数とする．時刻$t_{0}$において$f(t_{0})\neq 0$ならば，$t_{0}$のある開近傍で条件$f(t)=\lvert f(t)\rvert\mathrm{e}^{\mathrm{i}\varphi(t)}$を満たす，$C^{1}$級実数値関数$\varphi(t)$が存在する．$\varphi(t)$の微分係数
$$
  \omega(t_{0}) = \frac{\mathrm{d}}{\mathrm{d}t}\biggl\lvert_{t=t_{0}}\varphi(t)
$$
を，関数$f(t)$の時刻$t_{0}$における**瞬時角周波数** (instantaneous angular frequency) という．また，瞬時角周波数を$2\pi$で割った値を**瞬時周波数** (instantaneous frequency) という．

</math-theorem>

この定義で問題になるのは，関数$\varphi(t)$の存在と，瞬時角周波数$\omega(t_{0})$のwell-definednessである．このうち，瞬時角周波数のwell-definednessはすぐ示せる．実際，関数$\varphi_{1}(t)$，$\varphi_{2}(t)$が$\varphi(t)$の条件を満たすとき
$$
  \mathrm{e}^{\mathrm{i}(\varphi_{1}(t)-\varphi_{2}(t))} = 1,
  \quad\varphi_{1}(t)-\varphi_{2}(t) \equiv 0\pmod{2\pi}
$$
であり，関数$\varphi_{1}(t)$，$\varphi_{2}(t)$は連続なので，$\varphi_{1}(t)-\varphi_{2}(t)$は定数関数である．よって
$$
  \frac{\mathrm{d}}{\mathrm{d}t}\varphi_{1}(t) = \frac{\mathrm{d}}{\mathrm{d}t}\varphi_{2}(t)
$$
である．

関数$\varphi(t)$の存在を示すのに複素対数関数を使うので，少しだけ複素対数関数について説明する．$0$でない複素数$z$の関数$\operatorname{Log}z$を，式
$$
  \operatorname{Log}z = \ln\lvert z\rvert+\mathrm{i}\operatorname{Arg}z
$$
で定義する．ただし，$\ln\lvert z\rvert$は自然対数，$\operatorname{Arg}z$は偏角の主値であり，条件$-\pi\lt\operatorname{Arg}z\leq\pi$を満たすとする．$\operatorname{Log}z$を**複素対数関数** (complex logarithm) の主値という．関数$\operatorname{Log}z$は領域$\lbrace z\in\mathbb{C}\mid z\notin(-\infty,0\rbrack\rbrace$で正則であり，実数の自然対数と同じ式
$$
  \mathrm{e}^{\operatorname{Log}z} = z,
  \quad\operatorname{Log}(1+z) = \sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}z^{n}\quad(\lvert z\rvert\lt 1)
$$
が成り立つ．ただし，偏角の不定性が原因で$\operatorname{Log}(\mathrm{e}^{z})=z$が成り立つとは限らない．

複素対数関数を利用して，$z$と$z+\varDelta z$の位相差を一次近似しよう．位相差は不定性
$$
  \arg(z+\varDelta z)-\arg z = \operatorname{Arg}\biggl(\frac{z+\varDelta z}{z}\biggr)+2k\pi\quad(k\in\mathbb{Z})
$$
があるので，$\lvert\varDelta z\rvert\ll\lvert z\rvert$のとき絶対値が最小である
$$
  \operatorname{Arg}\frac{z+\varDelta z}{z}
$$
を一次近似すると
$$
  \begin{gathered}
    \operatorname{Log}\frac{z+\varDelta z}{z} = \operatorname{Log}\biggl(1+\frac{\varDelta z}{z}\biggr)
    \simeq \frac{\varDelta z}{z},\\
	\operatorname{Arg}\frac{z+\varDelta z}{z} \simeq \operatorname{Im}\frac{\varDelta z}{z}
  \end{gathered}
$$
となる．よって，$z$が実数$t$の関数であるとき
$$
  \begin{gathered}
    \frac{\operatorname{Arg}((z+\varDelta z)/z)}{\varDelta t} \simeq \operatorname{Im}\biggl(\frac{1}{z}\frac{\varDelta z}{\varDelta t}\biggr),\\
    \lim_{\varDelta t\to 0}\frac{\operatorname{Arg}((z+\varDelta z)/z)}{\varDelta t} = \operatorname{Im}\biggl(\frac{1}{z}\frac{\mathrm{d}z}{\mathrm{d}t}\biggr)
  \end{gathered}
$$
である．これは位相の変化率の極限だから，瞬時角周波数に相当するはずである．そこで，関数$z=f(t)$に対して
$$
  \begin{gathered}
    \omega(t) = \operatorname{Im}\biggl(\frac{1}{z}\frac{\mathrm{d}z}{\mathrm{d}t}\biggr),\\
    \varphi(t) = \operatorname{Arg}(f(t_{0}))+\int_{t_{0}}^{t}\omega(\tau)\,\mathrm{d}\tau
  \end{gathered}
$$
とおく（ただし$f(t_{0})\neq 0$とする）．このとき，次の命題が成立する．

<math-theorem data-type="命題" data-level="4">

正数$\delta$を，$\lvert t-t_{0}\rvert\lt\delta$であるすべての$t$について
$$
  f(t) \neq 0,
  \quad\biggl\lvert\operatorname{Arg}\frac{f(t)}{f(t_{0})}\biggr\rvert \lt \pi
$$
が成立するように十分小さくとる．このとき，命題
$$
  \lvert t-t_{0}\rvert \lt \delta
  \implies f(t) = \lvert f(t)\rvert\mathrm{e}^{\mathrm{i}\varphi(t)}
$$
が成立する．

</math-theorem>

<math-proof data-open>

$r=\lvert f(t)\rvert$，$x=\operatorname{Re}f(t)$，$y=\operatorname{Im}f(t)$とおく．$\lvert t_{1}-t_{0}\rvert\lt\delta$ならば
$$
    \ln\biggl\lvert\frac{f(t_{1})}{f(t_{0})}\biggr\rvert = \int_{\lvert f(t_{0})\rvert}^{\lvert f(t_{1})\rvert}\frac{\mathrm{d}r}{r}
    = \int_{t_{0}}^{t_{1}}\frac{1}{r}\frac{\mathrm{d}r}{\mathrm{d}t}\,\mathrm{d}t
$$
より
$$
  \begin{aligned}
    &\lvert f(t_{1})\rvert\mathrm{e}^{\mathrm{i}\varphi(t_{1})}\\
    &= \lvert f(t_{0})\rvert\exp\biggl(\ln\biggl\lvert\frac{f(t_{1})}{f(t_{0})}\biggr\rvert+\mathrm{i}\varphi(t_{1})\biggr)\\
	&= \lvert f(t_{0})\rvert\exp\biggl(\mathrm{i}\operatorname{Arg}(f(t_{0}))+\int_{t_{0}}^{t_{1}}\biggl(\frac{1}{r}\frac{\mathrm{d}r}{\mathrm{d}t}+\mathrm{i}\omega(t)\biggr)\,\mathrm{d}t\biggr)\\
	&= 	f(t_0)\exp\biggl(\int_{t_{0}}^{t_{1}}\biggl(\frac{1}{r}\frac{\mathrm{d}r}{\mathrm{d}t}+\mathrm{i}\omega(t)\biggr)\,\mathrm{d}t\biggr)
  \end{aligned}
$$
である．被積分関数は
$$
  \begin{gathered}
    \begin{aligned}
      \frac{1}{r}\frac{\mathrm{d}r}{\mathrm{d}t} &= \frac{1}{\sqrt{x^{2}+y^{2}}}\frac{\mathrm{d}}{\mathrm{d}t}\sqrt{x^{2}+y^{2}}\\
      &= \frac{x}{x^{2}+y^{2}}\frac{\mathrm{d}x}{\mathrm{d}t}+\frac{y}{x^{2}+y^{2}}\frac{\mathrm{d}y}{\mathrm{d}t}\\
	  &= \operatorname{Re}\biggl(\frac{\bar{z}}{\lvert z\rvert^{2}}\frac{\mathrm{d}z}{\mathrm{d}t}\biggr),
    \end{aligned}\\
    \begin{aligned}
      \frac{1}{r}\frac{\mathrm{d}r}{\mathrm{d}t}+\mathrm{i}\omega(t) &= \operatorname{Re}\biggl(\frac{1}{z}\frac{\mathrm{d}z}{\mathrm{d}t}\biggr)+\mathrm{i}\operatorname{Im}\biggl(\frac{1}{z}\frac{\mathrm{d}z}{\mathrm{d}t}\biggr)\\
	  &= \frac{1}{z}\frac{\mathrm{d}z}{\mathrm{d}t}
    \end{aligned}
  \end{gathered}
$$
と変形できるので
$$
  \int_{t_{0}}^{t_{1}}\biggl(\frac{1}{r}\frac{\mathrm{d}r}{\mathrm{d}t}+\mathrm{i}\omega(t)\biggr)\,\mathrm{d}t = \int_{t_{0}}^{t_{1}}\frac{1}{z}\frac{\mathrm{d}z}{\mathrm{d}t}\,\mathrm{d}t
  = \int_{\gamma}\frac{\mathrm{d}z}{z}
$$
である．ただし，$\gamma$は曲線$\gamma(s)=f((1-s)t_{0}+st_{1})$（$0\leq s\leq 1$）である．

曲線$\gamma$は関数$\operatorname{Log}(z/f(t_{0}))$が正則である領域の内部にあり，また
$$
  \frac{\mathrm{d}}{\mathrm{d}z}\operatorname{Log}\frac{z}{f(t_{0})} = \frac{1}{z}
$$
だから，コーシーの積分定理より
$$
  \int_{\gamma}\frac{\mathrm{d}z}{z} = \biggl\lbrack\operatorname{Log}\frac{z}{f(t_{0})}\biggr\rbrack_{f(t_{0})}^{f(t_{1})}
  = \operatorname{Log}\frac{f(t_{1})}{f(t_{0})}
$$
である．よって
$$
  \lvert f(t_{1})\rvert\mathrm{e}^{\mathrm{i}\varphi(t_{1})} = f(t_{0})\exp\biggl(\operatorname{Log}\frac{f(t_{1})}{f(t_{0})}\biggr)
  = f(t_{1})
$$
である．

</math-proof>

### 参考文献

1. Flandrin, Patrick. “Time-Frequency Energy Distributions: An Introduction”. _Time-Frequency Analysis: Concepts and Methods_. Hlawatsch, Franz; Auger, François, eds. Wiley-ISTE, 2008, p. 18-36.
2. 森勢将雅. 日本音響学会編. 音声分析合成. コロナ社, 2018, 272p., (音響テクノロジーシリーズ, 2).
3. 矢田部浩平ほか. 小特集, 位相情報を考慮した音声音響信号処理: 位相変換による複素スペクトログラムの表現. 日本音響学会誌. 2019, vol. 75, no. 3, p. 147-155. <https://www.jstage.jst.go.jp/article/jasj/75/3/75_147/_article/-char/ja/>, (参照 2023-08-30).
