---
layout: "../../layouts/Article.astro"
title: クラフチック法について
release: "2023-08-14T00:00:00+09:00"
description: 非線形方程式の精度保証つき数値計算に活用されるクラフチック法の説明．
tags: ["精度保証", "数値計算", "数学"]
---

### 目次

### はじめに

この記事では，非線形方程式の解を精度保証つき数値計算で求めるのによく使われる，**クラフチック法** (Krawczyk method) を証明する．なお，この記事では以下の記法を用いる．

1. 集合$S\subseteq\mathbb{R}$の直径$\sup\lbrace\lvert x-y\rvert\mid x,y\in S\rbrace$を$\operatorname{diam}S$と書く．
2. 集合$S\subseteq\mathbb{R}^{n}$の内部を$\operatorname{int}S$と書く．
3. 写像$f$の始域に含まれる集合$A$について，像$\lbrace f(a)\mid a\in A\rbrace$を$f(A)$と書く．

次の記法は独自のものなので，注意されたい．ベクトル値関数
$$
  f(\boldsymbol{x}) = \mathopen{}\mathclose{\left(\begin{matrix}f_{1}(\boldsymbol{x})\\ f_{2}(\boldsymbol{x})\\ \vdots\\ f_{n}(\boldsymbol{x})\end{matrix}\right)}\quad(\boldsymbol{x}=(\begin{matrix}x_{1} & x_{2} & \cdots & x_{n}\end{matrix})^{\mathsf{T}})
$$
に対して，$\boldsymbol{I}_{f}(\boldsymbol{X})$を
$$
  \boldsymbol{I}_{f}(\boldsymbol{X})
  = \mathopen{}\mathclose{\left(\begin{matrix}(\nabla f_{1}(\boldsymbol{x}_{1}))^{\mathsf{T}}\\ (\nabla f_{2}(\boldsymbol{x}_{2}))^{\mathsf{T}}\\ \vdots\\ (\nabla f_{n}(\boldsymbol{x}_{n}))^{\mathsf{T}}\end{matrix}\right)}\quad(\boldsymbol{X}=(\begin{matrix}\boldsymbol{x}_{1} & \boldsymbol{x}_{2}& \cdots & \boldsymbol{x}_{n}\end{matrix}))
$$
で定義する．$\boldsymbol{x}_{1}=\boldsymbol{x}_{2}=\dotsb=\boldsymbol{x}_{n}=\boldsymbol{x}$のとき，$\boldsymbol{I}_{f}(\boldsymbol{X})$は$f(\boldsymbol{x})$のヤコビ行列である．

<math-theorem data-type="補題" data-level="3" data-label="平均値の定理">

$I=\lbrack\boldsymbol{a},\boldsymbol{b}\rbrack\subseteq\mathbb{R}^{n}$を内部が空でない有界閉区間とする．また，関数$f\colon I\to\mathbb{R}^{n}$は$I$で連続，$\operatorname{int}I$で偏微分可能とする．このとき，行列$\boldsymbol{C}\in\operatorname{int}(
I)^{n}$が存在して
$$
  f(\boldsymbol{b})-f(\boldsymbol{a}) = \boldsymbol{I}_{f}(\boldsymbol{C})(\boldsymbol{b}-\boldsymbol{a})
$$
を満たす．

</math-theorem>

<math-proof data-open>

ベクトル$f(\boldsymbol{x})$の第$i$成分を$f_{i}(\boldsymbol{x})$とおく．仮定から，関数$g_{i}(t)=f_{i}(\boldsymbol{a}+t(\boldsymbol{b}-\boldsymbol{a}))$は閉区間$\lbrack 0,1\rbrack$上で連続，開区間$(0,1)$上で微分可能である．よって，平均値の定理より$g_{i}(1)-g_{i}(0)=g_{i}'(\theta_i)$を満たす$\theta_{i}\in(0,1)$が存在する．$\boldsymbol{c}_{i}=\boldsymbol{a}+\theta_{i}(\boldsymbol{b}-\boldsymbol{a})$とおくと
$$
  f_{i}(\boldsymbol{b})-f_{i}(\boldsymbol{a}) = (\nabla f_{i}(\boldsymbol{x}))^{\mathsf{T}}\rvert_{\boldsymbol{x}=\boldsymbol{c}_{i}}(\boldsymbol{b}-\boldsymbol{a})
$$
なので，$\boldsymbol{C}=(\begin{matrix}\boldsymbol{c}_1 & \boldsymbol{c}_2& \cdots & \boldsymbol{c}_n\end{matrix})$とおくと
$$
  f(\boldsymbol{b})-f(\boldsymbol{a}) = \boldsymbol{I}_f(\boldsymbol{C})(\boldsymbol{b}-\boldsymbol{a})
$$
である．

</math-proof>

### クラフチック法

<math-theorem data-type="定理" data-level="3" data-label="クラフチック法">

$I=I_{1}\times I_{2}\times\dotsb\times I_{n}\subseteq\mathbb{R}^{n}$を内部が空でない有界閉区間，$\boldsymbol{c}$をその中心とする．また，$\mathbb{R}^{n}$値関数$f$は$I$を含むある開区間上で定義され，$C^{1}$級であるとする．仮に，ある$n$次正方行列$\boldsymbol{A}$が存在し，関数
$$
  K(\boldsymbol{X},\boldsymbol{y}) = \boldsymbol{c}-\boldsymbol{A}f(\boldsymbol{c})+(\boldsymbol{I}-\boldsymbol{A}\boldsymbol{I}_f(\boldsymbol{X}))(\boldsymbol{y}-\boldsymbol{c})
$$
が条件$K(I^{n}\times I)\subseteq\operatorname{int}I$を満たすのであれば，$I$上に$f$の零点がただ一つ存在する．

</math-theorem>

<math-proof data-open>

仮定が成り立つとき，関数$g(\boldsymbol{x})=\boldsymbol{x}-\boldsymbol{A}f(\boldsymbol{x})$（$\boldsymbol{x}\in I$）は縮小写像かつ，$\boldsymbol{A}$は正則であることを示す．これが示せれば，バナッハの不動点定理から$\boldsymbol{x}^{\ast}-\boldsymbol{A}f(\boldsymbol{x}^{\ast})=\boldsymbol{x}^{\ast}$を満たす$\boldsymbol{x}^{\ast}\in I$がただ一つ存在するので，定理が示せたことになる．

まず$g(I)\subseteq I$を示す．任意に$\boldsymbol{x}\in I$をとる．平均値の定理より，$f(\boldsymbol{x})-f(\boldsymbol{c})=\boldsymbol{I}_{f}(\boldsymbol{C})(\boldsymbol{x}-\boldsymbol{c})$を満たす$\boldsymbol{C}\in I^{n}$が存在する．
$$
  \begin{aligned}
    g(\boldsymbol{x}) &= \boldsymbol{x}-\boldsymbol{A}(f(\boldsymbol{x})-f(\boldsymbol{c}))-\boldsymbol{A}f(\boldsymbol{c})\\
    &= \boldsymbol{x}-\boldsymbol{A}\boldsymbol{I}_f(\boldsymbol{C})(\boldsymbol{x}-\boldsymbol{c})-\boldsymbol{A}f(\boldsymbol{c})\\
    &= \boldsymbol{c}-\boldsymbol{A}f(\boldsymbol{c})+(\boldsymbol{I}-\boldsymbol{A}\boldsymbol{I}_{f}(\boldsymbol{C}))(\boldsymbol{x}-\boldsymbol{c})
  \end{aligned}
$$
なので$g(\boldsymbol{x})=K(\boldsymbol{C},\boldsymbol{x})\in\operatorname{int}I$である．これで$g(I)\subseteq I$が示せた．

次に，$g$が縮小写像であることを示す．任意に$\boldsymbol{x},\boldsymbol{y}\in I$をとる．$g(\boldsymbol{x})-g(\boldsymbol{y})=\boldsymbol{I}_{g}(\boldsymbol{C})(\boldsymbol{x}-\boldsymbol{y})$を満たす$\boldsymbol{C}\in I^{n}$が存在するから
$$
  \begin{aligned}
    \lVert g(\boldsymbol{x})-g(\boldsymbol{y})\rVert &\leq \lVert\boldsymbol{I}_{g}(\boldsymbol{C})\rVert_{\mathrm{op}}\lVert\boldsymbol{x}-\boldsymbol{y}\rVert\\
    &\leq \sup_{\boldsymbol{X}\in I^{n}}\lVert\boldsymbol{I}_{g}(\boldsymbol{X})\rVert_{\mathrm{op}}\lVert\boldsymbol{x}-\boldsymbol{y}\rVert
  \end{aligned}
$$
である（$\lVert\mathord{\,\cdot\,}\rVert_{\mathrm{op}}$は作用素ノルム）．$f$が$C^1$級なので，$\boldsymbol{X}$の関数$\lVert\boldsymbol{I}_{g}(\boldsymbol{X})\rVert_{\mathrm{op}}$は有界閉集合$I^{n}\subseteq\mathbb{R}^{n\times n}$上で最大値をとる．よって，$\lVert\boldsymbol{I}_{g}(\boldsymbol{X})\rVert_{\mathrm{op}}\lt 1$（$\boldsymbol{X}\in I^{n}$）を証明できれば，$g$が縮小写像といえる．

$\boldsymbol{X}\in I^{n}$を任意にとる．新たにノルム$\lVert\mathord{\,\cdot\,}\rVert_I$を
$$
  \lVert(\begin{matrix}x_{1} & x_{2} & \cdots & x_{n}\end{matrix})^{\mathsf{T}}\rVert_{I} = \max_{1\leq k\leq n}\frac{\lvert x_{k}\rvert}{\phi_{k}}\quad(\phi_{k}=\operatorname{diam}I_{k})
$$
で定義し，ベクトル$K(\boldsymbol{X},\boldsymbol{y})$の第$i$成分を$K_i(\boldsymbol{y})$とおく．
$$
  \begin{gathered}
    \boldsymbol{I}_g(\boldsymbol{X}) = \boldsymbol{I}-\boldsymbol{A}\boldsymbol{I}_f(\boldsymbol{X}),\\
    K(\boldsymbol{X},\boldsymbol{y}) = \boldsymbol{I}_g(\boldsymbol{X})\boldsymbol{y} +\boldsymbol{c}-\boldsymbol{A}f(\boldsymbol{c})-\boldsymbol{I}_g(\boldsymbol{X})\boldsymbol{c}
  \end{gathered}
$$
より，$\boldsymbol{I}_g(\boldsymbol{X})$の第$i$行ベクトルを$\boldsymbol{g}_i^{\mathsf{T}}$とおくと
$$
  \begin{aligned}
    \operatorname{diam}K_{i}(I) &= \operatorname{diam}\lbrace\boldsymbol{g}_{i}^{\mathsf{T}}\boldsymbol{y}\mid\boldsymbol{y}\in I\rbrace\\
    &= \sup\lbrace\lvert\boldsymbol{g}_{i}^{\mathsf{T}}(\boldsymbol{y}_{1}-\boldsymbol{y}_{2})\rvert\mid\boldsymbol{y}_{1},\boldsymbol{y}_{2}\in I\rbrace\\
    &= \sup\lbrace\lvert\boldsymbol{g}_{i}^{\mathsf{T}}(\begin{matrix}\delta_{1} & \delta_{2} & \cdots & \delta_{n}\end{matrix})^{\mathsf{T}}\rvert\mid\lvert\delta_{k}\rvert\leq\phi_{k}\rbrace\\
    &= \sup\lbrace\lvert\boldsymbol{g}_{i}^{\mathsf{T}}\boldsymbol{\delta}\rvert\mid\lVert\boldsymbol{\delta}\rVert_{I}\leq 1\rbrace
  \end{aligned}
$$
だから$\operatorname{diam}K_{i}(I)=\max\lbrace\lvert\boldsymbol{g}_{i}^{\mathsf{T}}\boldsymbol{e}\rvert\mid\lVert\boldsymbol{e}\rVert_{I}\leq 1\rbrace$である．よって
$$
  \begin{aligned}
      \max_{1\leq i\leq n}\frac{\operatorname{diam}K_{i}(I)}{\phi_{i}} &= \max_{1\leq i\leq n}\biggl(\frac{1}{\phi_{i}}\max_{\lVert\boldsymbol{e}\rVert_{I}\leq 1}\lvert\boldsymbol{g}_{i}^{\mathsf{T}}\boldsymbol{e}\rvert\biggr)\\
      &= \max_{\lVert\boldsymbol{e}\rVert_{I}\leq 1}\max_{1\leq i\leq n}\frac{\lvert\boldsymbol{g}_{i}^{\mathsf{T}}\boldsymbol{e}\rvert}{\phi_{i}}\\
      &= \max_{\lVert\boldsymbol{e}\rVert_{I}\leq 1}\lVert\boldsymbol{I}_{g}(\boldsymbol{X})\boldsymbol{e}\rVert_{I}\\
      &= \lVert\boldsymbol{I}_{g}(\boldsymbol{X})\rVert_{\mathrm{op}}
  \end{aligned}
$$
である．

一方，$n$変数関数$K_{i}(\boldsymbol{y})$は有界閉区間$I$上の連続関数なので，$I$上で最大値と最小値に達する．そのため，仮定$K(I^{n}\times I)\subseteq\operatorname{int}I$から
$$
  \operatorname{diam}K_{i}(I) \lt \operatorname{diam}I_{i}
  = \phi_{i},
  \quad\frac{\operatorname{diam}K_{i}(I)}{\phi_{i}} \lt 1
$$
である．よって$\lVert\boldsymbol{I}_{g}(\boldsymbol{X})\rVert_{\mathrm{op}}\lt 1$である．これで$g$が縮小写像であることが示せた．

最後に，$\boldsymbol{A}$が正則であることを示す．$\boldsymbol{A}$が正則でないと仮定する．このとき$\boldsymbol{A}\boldsymbol{I}_{f}(\boldsymbol{X})$も正則でないから，連立1次方程式$\boldsymbol{A}\boldsymbol{I}_{f}(\boldsymbol{X})\boldsymbol{v}=\boldsymbol{0}$は非自明な解$\boldsymbol{v}\neq\boldsymbol{0}$を持つ．すると$\boldsymbol{I}_{g}(\boldsymbol{X})\boldsymbol{v}=\boldsymbol{v}$であるが，これは$\lVert\boldsymbol{I}_{g}(\boldsymbol{X})\rVert_{\mathrm{op}}\lt 1$に反する．

</math-proof>

### 参考文献

1. Krawczyk, Robert. Newton-Algorithmen zur Bestimmung von Nullstellen mit Fehlerschranken: Newton-algorithms for evaluation of roots with error bounds. _Computing_. 1969, 4, p.187-201.
2. 大石進一ほか. 精度保証付き数値計算の基礎. コロナ社, 2018, 311p.
