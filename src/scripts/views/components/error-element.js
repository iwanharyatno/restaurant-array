import { LitElement, html, css } from 'lit';

class ErrorElement extends LitElement {
  static styles = css`
    .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 0;
    }
    p {
      color: var(--color-secondary-dark);
      text-transform: capitalize;
    }
  `;

  static properties = {
    status: {},
    message: {},
  };

  constructor() {
    super();

    this.status = 500;
    this.message = 'Something went wrong';
  }

  render() {
    return html`
    <div class="error">
      <h1>Error ${this.status}</h1>
      <p>${this.message}</p>
    </div>
    `;
  }
}
customElements.define('error-element', ErrorElement);

export default ErrorElement;
