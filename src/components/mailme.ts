import { CryptoXor } from "crypto-xor";

const k = "t1X6p3wYb4FTPI58";
const c = "1950315a045c4d3a17403238352f5c4b1c1f3557045b373e0f552f387e2a5a55";
const m = CryptoXor.decrypt(c, k);

class MailMe extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<a href="${m}">${this.innerHTML}</a>`;
    this.setAttribute("style", "display: contents");
  }
}

customElements.define("mail-me", MailMe);
