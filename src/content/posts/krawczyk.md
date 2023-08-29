---
layout: "../../layouts/Article.astro"
title: クラフチック法について
release: "2023-08-14T00:00:00+00:00"
update: "2023-08-29T00:00:00+00:00"
description: 非線形方程式の精度保証つき数値計算に活用されるクラフチック法の説明．
tags: ["精度保証", "数値計算", "数学"]
---

### 目次

### はじめに

この記事では，非線形方程式の解を精度保証つき数値計算で求めるのによく使われる，**クラフチック法** (Krawczyk method) を証明する．

### 記法のリスト

1. 集合$S\subseteq\mathbb{R}$の直径$\sup\lbrace\lvert x-y\rvert\mid x,y\in S\rbrace$を$\operatorname{diam}S$と書く．
2. 集合$S\subseteq\mathbb{R}^{n}$の内部を$\operatorname{int}S$と書く．
3. 写像$f$の始域に含まれる集合$A$について，像$\lbrace f(a)\mid a\in A\rbrace$を$f(A)$と書く．

次の記法は独自のものなので，注意されたい．ベクトル値関数
$$
  f(\bm{x}) = \mathopen{}\mathclose{\left(\begin{matrix}f_{1}(\bm{x})\\ f_{2}(\bm{x})\\ \vdots\\ f_{n}(\bm{x})\end{matrix}\right)}\quad(\bm{x}=(\begin{matrix}x_{1} & x_{2} & \cdots & x_{n}\end{matrix})^{\mathsf{T}})
$$
に対して，$\bm{I_{\mathnormal{f}}}(\bm{X})$を
$$
  \bm{I_{\mathnormal{f}}}(\bm{X})
  = \mathopen{}\mathclose{\left(\begin{matrix}(\nabla f_{1}(\bm{x_{\mathrm{1}}}))^{\mathsf{T}}\\ (\nabla f_{2}(\bm{x_{\mathrm{2}}}))^{\mathsf{T}}\\ \vdots\\ (\nabla f_{n}(\bm{x_{\mathnormal{n}}}))^{\mathsf{T}}\end{matrix}\right)}\quad(\bm{X}=(\begin{matrix}\bm{x_{\mathrm{1}}} & \bm{x_{\mathrm{2}}}& \cdots & \bm{x_{\mathnormal{n}}}\end{matrix}))
$$
で定義する．$\bm{x_{\mathrm{1}}}=\bm{x_{\mathrm{2}}}=\dotsb=\bm{x_{\mathnormal{n}}}=\bm{x}$のとき，$\bm{I_{\mathnormal{f}}}(\bm{X})$は$f(\bm{x})$のヤコビ行列である．

### クラフチック法

クラフチック法を示す前に，補題を一つ証明する．

<math-theorem data-type="補題" data-level="4" data-label="平均値の定理">

$I=\lbrack\bm{a},\bm{b}\rbrack\subseteq\mathbb{R}^{n}$を内部が空でない有界閉区間とする．また，関数$f\colon I\to\mathbb{R}^{n}$は$I$で連続，$\operatorname{int}I$で偏微分可能とする．このとき，行列$\bm{C}\in\operatorname{int}(
I)^{n}$が存在して
$$
  f(\bm{b})-f(\bm{a}) = \bm{I_{\mathnormal{f}}}(\bm{C})(\bm{b}-\bm{a})
$$
を満たす．

</math-theorem>

<math-proof data-open>

ベクトル$f(\bm{x})$の第$i$成分を$f_{i}(\bm{x})$とおく．仮定から，関数$g_{i}(t)=f_{i}(\bm{a}+t(\bm{b}-\bm{a}))$は閉区間$\lbrack 0,1\rbrack$上で連続，開区間$(0,1)$上で微分可能である．よって，平均値の定理より$g_{i}(1)-g_{i}(0)=g_{i}'(\theta_i)$を満たす$\theta_{i}\in(0,1)$が存在する．$\bm{c_{\mathnormal{i}}}=\bm{a}+\theta_{i}(\bm{b}-\bm{a})$とおくと
$$
  f_{i}(\bm{b})-f_{i}(\bm{a}) = (\nabla f_{i}(\bm{x}))^{\mathsf{T}}\rvert_{\bm{x}=\bm{c_{\mathnormal{i}}}}(\bm{b}-\bm{a})
$$
なので，$\bm{C}=(\begin{matrix}\bm{c_{\mathrm{1}}} & \bm{c_{\mathrm{2}}} & \cdots & \bm{c_{\mathnormal{n}}}\end{matrix})$とおくと
$$
  f(\bm{b})-f(\bm{a}) = \bm{I_{\mathnormal{f}}}(\bm{C})(\bm{b}-\bm{a})
$$
である．

</math-proof>

<math-theorem data-type="定理" data-level="4" data-label="クラフチック法">

$I=I_{1}\times I_{2}\times\dotsb\times I_{n}\subseteq\mathbb{R}^{n}$を内部が空でない有界閉区間，$\bm{c}$をその中心とする．また，$\mathbb{R}^{n}$値関数$f$は$I$を含むある開区間上で定義され，$C^{1}$級であるとする．仮に，ある$n$次正方行列$\bm{A}$が存在し，関数
$$
  K(\bm{X},\bm{y}) = \bm{c}-\bm{A}f(\bm{c})+(\bm{I}-\bm{A}\bm{I_{\mathnormal{f}}}(\bm{X}))(\bm{y}-\bm{c})
$$
が条件$K(I^{n}\times I)\subseteq\operatorname{int}I$を満たすのであれば，$I$上に$f$の零点がただ一つ存在する．

</math-theorem>

<math-proof data-open>

仮定が成り立つとき，関数$g(\bm{x})=\bm{x}-\bm{A}f(\bm{x})$（$\bm{x}\in I$）は縮小写像かつ，$\bm{A}$は正則であることを示す．これが示せれば，バナッハの不動点定理から$\bm{x^{\mathnormal{\ast}}}-\bm{A}f(\bm{x^{\mathnormal{\ast}}})=\bm{x^{\mathnormal{\ast}}}$を満たす$\bm{x^{\mathnormal{\ast}}}\in I$がただ一つ存在するので，定理が示せたことになる．

まず$g(I)\subseteq I$を示す．任意に$\bm{x}\in I$をとる．平均値の定理より，$f(\bm{x})-f(\bm{c})=\bm{I_{\mathnormal{f}}}(\bm{C})(\bm{x}-\bm{c})$を満たす$\bm{C}\in I^{n}$が存在する．
$$
  \begin{aligned}
    g(\bm{x}) &= \bm{x}-\bm{A}(f(\bm{x})-f(\bm{c}))-\bm{A}f(\bm{c})\\
    &= \bm{x}-\bm{A}\bm{I_{\mathnormal{f}}}(\bm{C})(\bm{x}-\bm{c})-\bm{A}f(\bm{c})\\
    &= \bm{c}-\bm{A}f(\bm{c})+(\bm{I}-\bm{A}\bm{I_{\mathnormal{f}}}(\bm{C}))(\bm{x}-\bm{c})
  \end{aligned}
$$
なので$g(\bm{x})=K(\bm{C},\bm{x})\in\operatorname{int}I$である．これで$g(I)\subseteq I$が示せた．

次に，$g$が縮小写像であることを示す．任意に$\bm{x},\bm{y}\in I$をとる．$g(\bm{x})-g(\bm{y})=\bm{I_{\mathnormal{g}}}(\bm{C})(\bm{x}-\bm{y})$を満たす$\bm{C}\in I^{n}$が存在するから
$$
  \begin{aligned}
    \lVert g(\bm{x})-g(\bm{y})\rVert &\leq \lVert\bm{I_{\mathnormal{g}}}(\bm{C})\rVert_{\mathrm{op}}\lVert\bm{x}-\bm{y}\rVert\\
    &\leq \sup_{\bm{X}\in I^{n}}\lVert\bm{I_{\mathnormal{g}}}(\bm{X})\rVert_{\mathrm{op}}\lVert\bm{x}-\bm{y}\rVert
  \end{aligned}
$$
である（$\lVert\mathord{\,\cdot\,}\rVert_{\mathrm{op}}$は作用素ノルム）．$f$が$C^1$級なので，$\bm{X}$の関数$\lVert\bm{I_{\mathnormal{g}}}(\bm{X})\rVert_{\mathrm{op}}$は有界閉集合$I^{n}\subseteq\mathbb{R}^{n\times n}$上で最大値をとる．よって，$\lVert\bm{I_{\mathnormal{g}}}(\bm{X})\rVert_{\mathrm{op}}\lt 1$（$\bm{X}\in I^{n}$）を証明できれば，$g$が縮小写像といえる．

$\bm{X}\in I^{n}$を任意にとる．新たにノルム$\lVert\mathord{\,\cdot\,}\rVert_I$を
$$
  \lVert(\begin{matrix}x_{1} & x_{2} & \cdots & x_{n}\end{matrix})^{\mathsf{T}}\rVert_{I} = \max_{1\leq k\leq n}\frac{\lvert x_{k}\rvert}{\phi_{k}}\quad(\phi_{k}=\operatorname{diam}I_{k})
$$
で定義し，ベクトル$K(\bm{X},\bm{y})$の第$i$成分を$K_i(\bm{y})$とおく．
$$
  \begin{gathered}
    \bm{I_{\mathnormal{g}}}(\bm{X}) = \bm{I}-\bm{A}\bm{I_{\mathnormal{f}}}(\bm{X}),\\
    K(\bm{X},\bm{y}) = \bm{I_{\mathnormal{g}}}(\bm{X})\bm{y} +\bm{c}-\bm{A}f(\bm{c})-\bm{I_{\mathnormal{g}}}(\bm{X})\bm{c}
  \end{gathered}
$$
より，$\bm{I_{\mathnormal{g}}}(\bm{X})$の第$i$行ベクトルを$\bm{g_{\mathnormal{i}}^{\mathsf{T}}}$とおくと
$$
  \begin{aligned}
    \operatorname{diam}K_{i}(I) &= \operatorname{diam}\lbrace\bm{g_{\mathnormal{i}}^{\mathsf{T}}}\bm{y}\mid\bm{y}\in I\rbrace\\
    &= \sup\lbrace\lvert\bm{g_{\mathnormal{i}}^{\mathsf{T}}}(\bm{y_{\mathrm{1}}}-\bm{y_{\mathrm{2}}})\rvert\mid\bm{y_{\mathrm{1}}},\bm{y_{\mathrm{2}}}\in I\rbrace\\
    &= \sup\lbrace\lvert\bm{g_{\mathnormal{i}}^{\mathsf{T}}}(\begin{matrix}\delta_{1} & \delta_{2} & \cdots & \delta_{n}\end{matrix})^{\mathsf{T}}\rvert\mid\lvert\delta_{k}\rvert\leq\phi_{k}\rbrace\\
    &= \sup\lbrace\lvert\bm{g_{\mathnormal{i}}^{\mathsf{T}}}\bm{\delta}\rvert\mid\lVert\bm{\delta}\rVert_{I}\leq 1\rbrace
  \end{aligned}
$$
だから$\operatorname{diam}K_{i}(I)=\max\lbrace\lvert\bm{g_{\mathnormal{i}}^{\mathsf{T}}}\bm{e}\rvert\mid\lVert\bm{e}\rVert_{I}\leq 1\rbrace$である．よって
$$
  \begin{aligned}
      \max_{1\leq i\leq n}\frac{\operatorname{diam}K_{i}(I)}{\phi_{i}} &= \max_{1\leq i\leq n}\biggl(\frac{1}{\phi_{i}}\max_{\lVert\bm{e}\rVert_{I}\leq 1}\lvert\bm{g_{\mathnormal{i}}^{\mathsf{T}}}\bm{e}\rvert\biggr)\\
      &= \max_{\lVert\bm{e}\rVert_{I}\leq 1}\max_{1\leq i\leq n}\frac{\lvert\bm{g_{\mathnormal{i}}^{\mathsf{T}}}\bm{e}\rvert}{\phi_{i}}\\
      &= \max_{\lVert\bm{e}\rVert_{I}\leq 1}\lVert\bm{I_{\mathnormal{g}}}(\bm{X})\bm{e}\rVert_{I}\\
      &= \lVert\bm{I_{\mathnormal{g}}}(\bm{X})\rVert_{\mathrm{op}}
  \end{aligned}
$$
である．

一方，$n$変数関数$K_{i}(\bm{y})$は有界閉区間$I$上の連続関数なので，$I$上で最大値と最小値に達する．そのため，仮定$K(I^{n}\times I)\subseteq\operatorname{int}I$から
$$
  \operatorname{diam}K_{i}(I) \lt \operatorname{diam}I_{i}
  = \phi_{i},
  \quad\frac{\operatorname{diam}K_{i}(I)}{\phi_{i}} \lt 1
$$
である．よって$\lVert\bm{I_{\mathnormal{g}}}(\bm{X})\rVert_{\mathrm{op}}\lt 1$である．これで$g$が縮小写像であることが示せた．

最後に，$\bm{A}$が正則であることを示す．$\bm{A}$が正則でないと仮定する．このとき$\bm{A}\bm{I_{\mathnormal{f}}}(\bm{X})$も正則でないから，連立1次方程式$\bm{A}\bm{I_{\mathnormal{f}}}(\bm{X})\bm{v}=\bm{0}$は非自明な解$\bm{v}\neq\bm{0}$を持つ．すると$\bm{I_{\mathnormal{g}}}(\bm{X})\bm{v}=\bm{v}$であるが，これは$\lVert\bm{I_{\mathnormal{g}}}(\bm{X})\rVert_{\mathrm{op}}\lt 1$に反する．

</math-proof>

### 参考文献

1. Krawczyk, Robert. Newton-Algorithmen zur Bestimmung von Nullstellen mit Fehlerschranken: Newton-algorithms for evaluation of roots with error bounds. _Computing_. 1969, vol. 4, p. 187-201.
2. 大石進一ほか. 精度保証付き数値計算の基礎. コロナ社, 2018, 311p.
