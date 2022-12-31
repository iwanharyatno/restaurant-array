import { LitElement, css, html } from 'lit';

class SpinnerBorder extends LitElement {
  static styles = css`
  .spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 999;
    padding-top: 4rem;
  }

  .fullwidth {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .spinner-border {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border-style: solid;
    border-width: 0.2rem;
    border-color:
      var(--color-primary)
      var(--color-primary)
      var(--color-primary)
      transparent;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  `;

  static properties = {
    text: {},
    fullwidth: {},
  };

  constructor() {
    super();
    this.text = 'Loading...';
  }

  render() {
    return html`
    <div class="spinner-container ${this.fullwidth ? 'fullwidth' : ''}">
      <div class="spinner-border" role="status">
      </div>
      <p class="spinner-status">${this.text}</p>
    </div>
    `;
  }
}
customElements.define('spinner-border', SpinnerBorder);

export default SpinnerBorder;
