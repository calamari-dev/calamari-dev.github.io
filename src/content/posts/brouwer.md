---
layout: "../../layouts/Article.astro"
title: ブラウワーの不動点定理について
release: "2023-08-29T00:00:00+00:00"
description: ブラウワーの不動点定理の初等的な証明．
tags: ["不動点定理", "数学"]
---

### 目次

### はじめに

この記事では，ブラウワーの不動点定理を証明する．ブラウワーの不動点定理は「閉球体$\bar{B}^{n}=\lbrace\bm{x}\in\mathbb{R}^{n}\mid\lVert\bm{x}\rVert\leq 1\rbrace$から$\bar{B}^{n}$への連続関数は不動点を持つ」という定理である．一般的に，ブラウワーの不動点定理はホモロジーを利用して証明される（原，2007）．この記事では，Milnor (1978) とRogers (1980) によって発明された，微分積分学に基づくブラウワーの不動点定理の初等的な証明を紹介する．

### 記法のリスト

1. $\bm{x},\bm{y}\in\mathbb{R}^{n}$について，$\langle\bm{x},\bm{y}\rangle$は標準内積$\bm{x^{\mathsf{T}}}\mskip1mu\bm{y}$，$\lVert\bm{x}\rVert$はユークリッドノルム$\sqrt{\langle\bm{x},\bm{x}\rangle}$を表す．
2. $\bar{B}^{n}$は閉球体$\lbrace\bm{x}\in\mathbb{R}^{n}\mid\lVert\bm{x}\rVert\leq 1\rbrace$，$S^{n-1}$は球面$\lbrace\bm{x}\in\mathbb{R}^{n}\mid\lVert\bm{x}\rVert=1\rbrace$を表す．
3. 正方行列$\bm{A}$について，$\lVert\bm{A}\rVert_{2}$は行列ノルム$\max\lbrace\lVert\bm{A}\bm{x}\rVert\mid\bm{x}\in S^{n-1}\rbrace$を表す．
4. ベクトル値多変数関数$\bm{y}=\bm{f}(\bm{x})$について，$\bm{J_{\bm{f}}}(\bm{x})$はヤコビ行列$(\partial y_{i}/\partial x_{j})$を表す．

### ブラウワーの不動点定理

ブラウワーの不動点定理を示す前に，補題を一つ証明する．

<math-theorem data-type="補題" data-level="4">

$C^{1}$級関数$\bm{f}\colon\bar{B}^{n}\to S^{n-1}$で条件 ($\bm{n}\in S^{n-1}\implies\bm{f}(\bm{n})=\bm{n}$) を満たすものは存在しない．

</math-theorem>

さきに証明の流れを示しておく．$\bm{f}$が仮定を満たすとき，恒等写像と$\bm{f}$を結ぶ連続変形
$$
  \bm{f_{\mathnormal{t}}}(\bm{x}) = (1-t)\bm{x}+t\bm{f}(\bm{x})\quad(0\leq t\leq 1)
$$
は，量
$$
  U = \int_{\lVert\bm{x}\rVert\leq 1}\det(\bm{J_{\bm{f_{\mathnormal{t}}}}}(\bm{x}))\,\mathrm{d}V
$$
を保存する（すなわち$\mathrm{d}U/\mathrm{d}t=0$である）ことが証明できる．$\bm{f_{\mathnormal{t}}}$が単射かつ$\det\bm{J_{\bm{f_{\mathnormal{t}}}}}(\bm{x})\gt 0$なら
$$
  U = \int_{\bm{u}\in\bm{f_{\mathnormal{t}}}(\bar{B}^{n})}1\,\mathrm{d}V
  = \operatorname{vol}(\bm{f_{\mathnormal{t}}}(\bar{B}^{n}))\quad(\bm{u}=\bm{f_{\mathnormal{t}}}(\bm{x}))
$$
である．このことと，球体$\bar{B}^{n}=\bm{f_{\mathrm{0}}}(\bar{B}^{n})$の体積は正で，球面$S^{n-1}=\bm{f_{\mathrm{1}}}(\bar{B}^{n})$の体積は$0$であることから，矛盾が導かれる．

<math-proof>

条件を満たす関数$\bm{f}$があると仮定する．
$$
  \bm{f_{\mathnormal{t}}}(\bm{x}) = (1-t)\bm{x}+t\bm{f}(\bm{x})\quad(0\leq t\leq 1)
$$
とおくと，任意の$\bm{x}\in\bar{B}^{n}$，$\bm{n}\in S^{n-1}$に対して
$$
  \begin{gathered}
    \lVert\bm{f_{\mathnormal{t}}}(\bm{x})\rVert \leq (1-t)\lVert\bm{x}\rVert+t\lVert\bm{f}(\bm{x})\rVert
    = (1-t)\lVert\bm{x}\rVert+t
    \leq 1,\\
    \bm{f_{\mathnormal{t}}}(\bm{n}) = (1-t)\bm{n}+t\bm{n}
    = \bm{n}
  \end{gathered}
$$
である．つまり，関数$\bm{f_{\mathnormal{t}}}\colon\bar{B}^{n}\to\bar{B}^{n}$は$S^{n-1}$上の点を変えない．また，$\bm{g}(\bm{x})=\bm{f}(\bm{x})-\bm{x}$に関して
$$
  \begin{aligned}
    \bm{g}(\bm{x_{\mathrm{2}}})-\bm{g}(\bm{x_{\mathrm{1}}}) &= \int_{0}^{1}\biggl(\frac{\mathrm{d}}{\mathrm{d}t}\bm{g}((1-t)\bm{x_{\mathrm{1}}}+t\bm{x_{\mathrm{2}}})\biggr)\,\mathrm{d}t\\
    &= \int_{0}^{1}\bm{J_{\bm{g}}}((1-t)\bm{x_{\mathrm{1}}}+t\bm{x_{\mathrm{2}}})(\bm{x_{\mathrm{2}}}-\bm{x_{\mathrm{1}}})\,\mathrm{d}t
  \end{aligned}
$$
なので，$C=\max\lbrace\lVert\bm{J_{\bm{g}}}(\bm{x})\rVert_{2}\mid\lVert\bm{x}\rVert\leq 1\rbrace$とおくと
$$
  \lVert\bm{g}(\bm{x_{\mathrm{2}}})-\bm{g}(\bm{x_{\mathrm{1}}})\rVert \leq C\lVert\bm{x_{\mathrm{2}}}-\bm{x_{\mathrm{1}}}\rVert
$$
である．

仮に，異なる$\bm{x_{\mathrm{1}}},\bm{x_{\mathrm{2}}}\in\bar{B}^{n}$の組で$\bm{f_{\mathnormal{t}}}
(\bm{x_{\mathrm{1}}})=
\bm{f_{\mathnormal{t}}}(\bm{x_{\mathrm{2}}})$を満たすものがあれば，$\bm{f_{\mathnormal{t}}}(\bm{x})=\bm{x}+t\bm{g}(\bm{x})$より
$$
  \begin{gathered}
    \lVert\bm{x_{\mathrm{2}}}-\bm{x_{\mathrm{1}}}\rVert = t\lVert\bm{g}(\bm{x_{\mathrm{2}}})-\bm{g}(\bm{x_{\mathrm{1}}})\rVert
    \leq tC\lVert\bm{x_{\mathrm{2}}}-\bm{x_{\mathrm{1}}}\rVert,\\
    t \geq \frac{1}{C}
  \end{gathered}
$$
である．よって，$t\lt 1/C$のとき$\bm{f_{\mathnormal{t}}}$は単射である．また，$tC\lt 1$のとき$\bm{J_{\bm{f_{\mathnormal{t}}}}}(\bm{x})=\bm{I}+t\bm{J_{\bm{g}}}(\bm{x})$の逆行列はノイマン級数
$$
  \bm{J_{\bm{f_{\mathnormal{t}}}}}(\bm{x})^{-1} = \sum_{k=0}^{\infty}(-t\bm{J_{\bm{g}}}(\bm{x}))^{k}
$$
で書ける．このとき，逆関数定理より$\bm{f_{\mathnormal{t}}^{\mathrm{-1}}}$は$\bm{f_{\mathnormal{t}}}(B^{n})$全体で$C^{1}$級だから，制限$\bm{f_{\mathnormal{t}}}\rvert_{B^{n}}$は像$\bm{f_{\mathnormal{t}}}(B^{n})$との同相写像である．よって，$\bm{f_{\mathnormal{t}}}(B^{n})$は開集合である．

$t\lt 1/C$の下で$\bm{f_{\mathnormal{t}}}(B^{n})=B^{n}$を示す．$\bm{f_{\mathnormal{t}}}(B^{n})
\subsetneq B^{n}$を仮定する．このとき，$\partial(\bm{f_{\mathnormal{t}}}(B^{n}))\cap B^{n}$上の点$\bm{a}$が存在する．$\bm{a}\in\partial(\bm{f_{\mathnormal{t}}}(B^{n}))$なので，条件
$$
  \bm{x_{\mathnormal{i}}} \in B^{n},
  \quad\lim_{i\to\infty}\bm{f_{\mathnormal{t}}}(\bm{x_{\mathnormal{i}}}) = \bm{a}
$$
を満たす点列$(\bm{x_{\mathnormal{i}}})_{i=1}^{\infty}$がある．さらに，$\bar{B}^{n}$の点列コンパクト性から$(\bm{x_{\mathnormal{i}}})_{i=1}^{\infty}$は収束する部分列$(\bm{x_{\mathnormal{i}}^{\mathnormal{\prime}}})_{i=1}^{\infty}$を持つ．この極限点を$\bm{x_{\mathnormal{\infty}}^{\mathnormal{\prime}}}$とおく．$\bm{f_{\mathnormal{t}}}(\bm{x_{\mathnormal{\infty}}^{\mathnormal{\prime}}})=\bm{a}\in\partial(\bm{f_{\mathnormal{t}}}(B^{n}))$であり，$\bm{f_{\mathnormal{t}}}(B^{n})$は開集合だから境界と交わらない．よって$\bm{x_{\mathnormal{\infty}}^{\mathnormal{\prime}}}\in\bar{B}^{n}\setminus B^{n}=S^{n-1}$である．すると$\bm{a}=\bm{f_{\mathnormal{t}}}(\bm{x_{\mathnormal{\infty}}^{\mathnormal{\prime}}})=\bm{x_{\mathnormal{\infty}}^{\mathnormal{\prime}}}$だが，これは$\bm{a}\in B^{n}$に矛盾する．したがって$\bm{f_{\mathnormal{t}}}(B^{n})=B^{n}$である．

各$t\in\lbrack 0,1\rbrack$に対して
$$
  U(t) = \int_{\lVert\bm{x}\rVert\leq 1}\det(\bm{J_{\bm{f_{\mathnormal{t}}}}}(\bm{x}))\,\mathrm{d}V
$$
とおく．$\det\bm{J_{\bm{f_{\mathnormal{t}}}}}(\bm{x})=\det((1-t)\bm{I}+t\bm{J_{\bm{f}}}(\bm{x}))$は$t$の多項式関数であるから，$U(t)$も$t$の多項式関数である．

$\det\bm{J_{\bm{f_{\mathrm{0}}}}}(\bm{x})=\det\bm{I}=1$かつ，$t\lt 1/C$のとき$\bm{J_{\bm{f_{\mathnormal{t}}}}}(\bm{x})$は正則なので，中間値の定理より
$$
  0 \leq t \lt \frac{1}{C}
  \implies\det\bm{J_{\bm{f_{\mathnormal{t}}}}}(\bm{x}) \gt 0
$$
である．よって，変数変換$\bm{u}=\bm{f_{\mathnormal{t}}}(\bm{x})$により
$$
  U(t) = \int_{\lVert\bm{u}\rVert\leq 1}1\,\mathrm{d}V
  = \operatorname{vol}(\bar{B}^{n})
$$
となる．右辺の値は$t$によらないから，区間$0\leq t\lt 1/C$では$U'(t)=0$である．この条件を満たす多項式関数は定数関数のほかにないので，すべての$t$について$U(t)=\operatorname{vol}(\bar{B}^{n})$である．

$\bm{f_{\mathrm{1}}}(\bm{x})=\bm{f}(\bm{x})\in S^{n-1}$だから，関数$\lVert\bm{f}(\bm{x})\rVert^{2}$の方向微分
$$
  \mathop{\vphantom{}\nabla_{\bm{v}}}(\lVert\bm{f}(\bm{x})\rVert^{2}) = \frac{\mathrm{d}}{\mathrm{d}t}\biggr\rvert_{t=0}\lVert\bm{f}(\bm{x}+t\bm{v})\rVert^{2}\quad(\bm{v}\in\mathbb{R}^{n})
$$
の値は常に$0$である．左辺をライプニッツルールで計算すると
$$
  \begin{aligned}
    \mathop{\vphantom{}\nabla_{\bm{v}}}(\lVert\bm{f}(\bm{x})\rVert^{2}) &= \mathop{\vphantom{}\nabla_{\bm{v}}}\langle\bm{f}(\bm{x}),\bm{f}(\bm{x})\rangle\\
    &= \langle\mathop{\vphantom{}\nabla_{\bm{v}}}\bm{f}(\bm{x}),\bm{f}(\bm{x})\rangle+\langle\bm{f}(\bm{x}),\mathop{\vphantom{}\nabla_{\bm{v}}}\bm{f}(\bm{x})\rangle\\
    &= 2\langle\bm{f}(\bm{x}),\bm{J_{\bm{f}}}(\bm{x})\bm{v}\rangle
  \end{aligned}
$$
となるので
$$
  \langle\bm{f}(\bm{x}),\bm{J_{\bm{f}}}(\bm{x})\bm{v}\rangle = 0\;\mathrel{\textrm{for all}}\;\bm{v}\in\mathbb{R}^{n}
$$
である．よって，線形写像$T_{\bm{x}}(\bm{v})=\bm{J_{\bm{f}}}(\bm{x})\bm{v}$の像は$\operatorname{span}\lbrace\bm{f}(\bm{x})\rbrace$の直交補空間に含まれるから$\operatorname{rank}\bm{J_{\bm{f}}}(\bm{x})=\operatorname{dim}(\operatorname{im}T_{\bm{x}})\lt n$である．すると$\det\bm{J_{\bm{f}}}(\bm{x})=0$，$U(1)=\int 0\,\mathrm{d}V=0$だが，これは$U(1)=\operatorname{vol}(\bar{B}^{n})$に矛盾する．したがって，条件を満たす関数$\bm{f}$は存在しない．

</math-proof>

<math-theorem data-type="定理" data-level="4" data-label="ブラウワーの不動点定理">

すべての連続関数$\bm{f}\colon\bar{B}^{n}\to\bar{B}^{n}$は不動点を持つ．すなわち，条件$\bm{f}(\bm{x})=\bm{x}$を満たす点$\bm{x}\in\bar{B}^{n}$が存在する．このことを**ブラウワーの不動点定理** (Brouwer fixed-point theorem) という．

</math-theorem>

<math-proof data-open>

$\bm{f}\colon\bar{B}^{n}\to\bar{B}^{n}$を連続関数とする．ワイエルシュトラスの近似定理より，各成分が$\bm{x}$の多項式関数である関数$\bm{p_{\mathnormal{i}}}(\bm{x})$を
$$
  \max_{\lVert\bm{x}\rVert\leq 1}\lVert\bm{p_{\mathnormal{i}}}(\bm{x})-\bm{f}(\bm{x})\rVert \leq \frac{1}{2i}
$$
が成立するようにとれる．$\bm{q_{\mathnormal{i}}}(\bm{x})=(i/(i+1))\bm{p_{\mathnormal{i}}}(\bm{x})$とおくと
$$
  \begin{gathered}
    \begin{aligned}
      \lVert\bm{q_{\mathnormal{i}}}(\bm{x})\rVert &\leq \frac{i}{i+1}(\lVert\bm{f}(\bm{x})\rVert+\lVert\bm{p_{\mathnormal{i}}}(\bm{x})-\bm{f}(\bm{x})\rVert)\\
      &\leq \frac{i}{i+1}\biggl(1+\frac{1}{2i}\biggr)
      = \frac{2i+1}{2i+2}\\
      &\lt 1,
    \end{aligned}\\
    \begin{aligned}
      \lVert\bm{q_{\mathnormal{i}}}(\bm{x})-\bm{f}(\bm{x})\rVert &= \biggl\lVert\frac{i}{i+1}(\bm{p_{\mathnormal{i}}}(\bm{x})-\bm{f}(\bm{x}))-\frac{1}{i+1}\bm{f}(\bm{x})\biggr\rVert\\
      &\leq \frac{i\lVert\bm{p_{\mathnormal{i}}}(\bm{x})-\bm{f}(\bm{x})\rVert+\lVert\bm{f}(\bm{x})\rVert}{i+1}\\
      &\leq \frac{3/2}{i+1}
    \end{aligned}
  \end{gathered}
$$
なので，関数列$(\bm{q_{\mathnormal{i}}})_{i=1}^{\infty}$は$C^{1}(\bar{B}^{n},\bar{B}^{n})$上の列であり，$\bm{f}$に一様収束する．

各$\bm{q_{\mathnormal{i}}}$は$\bar{B}^{n}$上に不動点を持つことを示す．不動点がないと仮定する．このとき，$\lambda$に関する2次方程式
$$
  \begin{gathered}
    \lVert\bm{q_{\mathnormal{i}}}(\bm{x})+\lambda(\bm{x}-\bm{q_{\mathnormal{i}}}(\bm{x}))\rVert^{2} = 1,\\
    \lVert\bm{x}-\bm{q_{\mathnormal{i}}}(\bm{x})\rVert^{2}\,\lambda^{2}+2\langle\bm{q_{\mathnormal{i}}}(\bm{x}),\bm{x}-\bm{q_{\mathnormal{i}}}(\bm{x})\rangle\lambda+\lVert\bm{q_{\mathnormal{i}}}(\bm{x})\rVert^{2}-1 = 0
  \end{gathered}
$$
は，$\lambda=0$のとき左辺の値が負なので，正の解と負の解を一つずつ持つ．正の解を$\lambda(\bm{x})$とおくと，関数$\bm{g}(\bm{x})=\bm{q_{\mathnormal{i}}}(\bm{x})+\lambda(\bm{x})(\bm{x}-\bm{q_{\mathnormal{i}}}(\bm{x}))$は$C^{1}(\bar{B}^{n},S^{n-1})$に属する．また，$\bm{n}\in S^{n-1}$のとき
$$
  \lVert\bm{q_{\mathnormal{i}}}(\bm{n})+(\bm{n}-\bm{q_{\mathnormal{i}}}(\bm{n}))\rVert^{2} = 1
$$
より$\lambda(\bm{n})=1$，$\bm{g}(\bm{n})=\bm{n}$である．これは補題に矛盾するので，$\bm{q_{\mathnormal{i}}}$は$\bar{B}^{n}$上に不動点を持つ．

$\bar{B}^{n}$上にある$\bm{q_{\mathnormal{i}}}$の不動点の一つを$\bm{x_{\mathnormal{i}}}$とおく．$\bar{B}^{n}$の点列コンパクト性から，点列$(\bm{x_{\mathnormal{i}}})_{i=1}^{\infty}$は収束する部分列$(\bm{x_{\mathnormal{i(k)}}})_{k=1}^{\infty}$を持つ．極限点を$\bm{a}$とおくと
$$
  \begin{aligned}
    \lVert\bm{a}-\bm{f}(\bm{x_{\mathnormal{i(k)}}})\rVert &\leq \lVert\bm{a}-\bm{q_{\mathnormal{i(k)}}}(\bm{x_{\mathnormal{i(k)}}})\rVert\\
    &\hphantom{{}\leq{}}+\lVert\bm{q_{\mathnormal{i(k)}}}(\bm{x_{\mathnormal{i(k)}}})-\bm{f}(\bm{x_{\mathnormal{i(k)}}})\rVert\\
    &\leq \lVert\bm{a}-\bm{x_{\mathnormal{i(k)}}}\rVert+\frac{3}{2(i(k)+1)}
  \end{aligned}
$$
なので，$k\to\infty$によって$\lVert\bm{a}-\bm{f}(\bm{a})\rVert\leq 0$が得られる．したがって，$\bm{a}$が$\bm{f}$の不動点である．

</math-proof>

### 参考文献

1. 原靖浩. 不動点定理と一致点定理: 変換群の理論とその応用. 数理解析研究所講究録. 2007, vol. 1569, p. 63-68. <http://hdl.handle.net/2433/81249>, (参照 2023-08-29).
2. Howard, Ralph. “Seminar and class notes”. Ralph Howard. 2004. <http://ralphhoward.github.io/SemNotes/index.html>, (accessed 2023-08-16).
3. Milnor, John. Analytic Proofs of the “Hairy Ball Theorem” and the Brouwer Fixed Point Theorem. _Am. Math. Mon_. 1978, vol. 85, no. 7, p. 521-524. [available from Taylor & Francis Online](https://www.tandfonline.com/doi/abs/10.1080/00029890.1978.11994635), (accessed 2023-08-16).
4. Rogers, Claude A. A Less Strange Version of Milnor’s Proof of Brouwer’s Fixed-Point Theorem. _Am. Math. Mon_. 1980, vol. 87, no. 7, p. 525-527. [available from Taylor & Francis Online](https://www.tandfonline.com/doi/abs/10.1080/00029890.1980.11995082), (accessed 2023-08-16).
