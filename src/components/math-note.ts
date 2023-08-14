import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

@customElement("math-note")
export class MathNote extends LitElement {
  @property({ attribute: "data-label" })
  label?: string;

  static styles = css`
    .note {
      border-left: solid 0.5em var(--color-primary);
      box-sizing: border-box;
      display: flow-root;
      padding-left: 0.5em;
    }

    .note-label {
      float: left;
      font-weight: bold;
      margin-right: 1em;
    }
  `;

  render() {
    return html`<div class="note">
      ${when(
        !!this.label,
        () => html`<div class="note-label">${this.label}</div>`,
      )}
      <slot></slot>
    </div>`;
  }
}
