import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("math-proof")
export class MathProof extends LitElement {
  @property({ attribute: "data-open", type: Boolean })
  open = false;

  static styles = css`
    .proof {
      display: flow-root;
    }

    .proof__begin {
      font-weight: bold;
    }

    .proof__end {
      border-bottom: solid 1px;
      border-right: solid 1px;
      box-sizing: border-box;
      float: right;
      font-weight: bold;
    }
  `;

  render() {
    return html`<details class="proof" ?open=${this.open}>
      <summary class="proof__begin">証明</summary>
      <slot></slot>
      <div class="proof__end">（証明終）</div>
    </details>`;
  }
}
