import { LitElement, html, css } from 'lit';

class MenusUl extends LitElement {
  static styles = css`
  ::host {
    padding: inherit;
  }

  ul {
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
  `;

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
    <ul>
      <slot></slot>
    </ul>
    `;
  }
}

customElements.define('menus-ul', MenusUl);

export default MenusUl;
