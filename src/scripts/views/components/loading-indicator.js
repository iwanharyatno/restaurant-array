import { LitElement, css, html } from 'lit';

class LoadingIndicator extends LitElement {
  static styles = css`
  .loading-container {
    width: 100%;
    height: 0.2rem;
    position: fixed;
    top: 0;
    left: 0;
  }

  .loading-value {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      var(--color-loading), 
      #ffffff,
      var(--color-loading));
    background-size: 200%;
    box-shadow: 0 0 4px var(--color-loading);
    animation:
      bg-slide 1s ease-in-out infinite,
      load 30s cubic-bezier(.03,.45,.41,1.02);
    animation-direction: alternate;
    animation-fill-mode: forwards;
  }

  @keyframes bg-slide {
    from {
      background-position: 0%;
    }

    to {
      background-position: 100%;
    }
  }
  @keyframes load {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  `;

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
    <div class="loading-container">
      <div class="loading-value finished"></div>
    </div>
    `;
  }
}
customElements.define('loading-indicator', LoadingIndicator);

export default LoadingIndicator;
