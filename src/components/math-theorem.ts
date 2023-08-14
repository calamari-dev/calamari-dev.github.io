import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";

@customElement("math-theorem")
export class MathTheorem extends LitElement {
  @property({ attribute: "data-type" })
  type?: string;

  @property({ attribute: "data-level", type: Number })
  level?: number;

  @property({ attribute: "data-label" })
  label?: string;

  static styles = css`
    .theorem {
      border: solid 1px;
      box-sizing: border-box;
      padding: calc(1em - 0.375em) 1em;
    }

    .theorem__title {
      font-size: 1rem;
      line-height: 1.75;
      margin: 0;
    }
  `;

  render() {
    if ([this.type, this.level].some((x) => typeof x === "undefined")) {
      return html`<div style="color: red">[illegal properties]</div>`;
    }

    const label = `${this.type}${this.label ? `（${this.label}）` : ""}`;

    return html`<section class="theorem">
      ${choose(this.level, [
        [3, () => html`<h3 class="theorem__title">${label}</h3>`],
        [4, () => html`<h4 class="theorem__title">${label}</h4>`],
        [5, () => html`<h5 class="theorem__title">${label}</h5>`],
        [6, () => html`<h6 class="theorem__title">${label}</h6>`],
      ])}
      <slot></slot>
    </section>`;
  }
}
