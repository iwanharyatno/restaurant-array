import { LitElement, html, css } from 'lit';

class MenusUl extends LitElement {
  static styles = css`
  ::host {
    padding: inherit;
  }

  .nospace {
    margin: 0;
    padding: 0;
  }

  ::slotted(li:first-child) {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  ::slotted(li:last-child) {
    border-radius: 0 0 0.5rem 0.5rem;
    border-width: 1px;
  }

  ::slotted(li) {
    list-style-type: none;
    display: block;
    padding: 1rem;
    border-width: 1px 1px 0 1px;
    border-style: solid;
    border-color: var(--color-secondary);
  }

  .skeleton ::slotted(li) {
    background-image: linear-gradient(90deg, var(--color-skeleton) 20%, var(--color-skeleton-shine), var(--color-skeleton));
    background-size: 200%;
    color: transparent;
    animation: shine 1s ease-out infinite;
  }

  @keyframes shine {
    from {
      background-position: 200%;
    }
    
    to {
      background-position: 0%;
    }
  }
  `;

  static properties = {
    skeleton: { type: Boolean },
  };

  constructor() {
    super();
    this.skeleton = false;
  }

  render() {
    return html`
    <ul class="nospace ${this.skeleton ? 'skeleton' : ''}">
      <slot></slot>
    </ul>
    `;
  }
}

customElements.define('menus-ul', MenusUl);

export default MenusUl;
