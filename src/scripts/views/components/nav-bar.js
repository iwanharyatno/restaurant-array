import { LitElement, html, css } from 'lit';

class Navbar extends LitElement {
  static styles = css`
  .nav {
    display: flex;
    flex-direction: column;
    background-color: var(--color-primary);
    color: #ffffff;
  }
  
  .nav h2 {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
  }
  
  .nav-bar {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-menu {
    display: none;
  }
  
  .nav-items {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-link {
    display: block;
    padding: 1rem;
    text-decoration: none;
    color: var(--color-secondary);
  }
  .nav-link:active {
    background-color: var(--color-primary-dark);
  }
  .nav-link:hover {
    text-decoration: underline;
    color: #ffffff;
  }
  .nav-link:focus {
    outline: 1px solid var(--color-secondary);
  }
  
  .nav-toggler {
    border: none;
    background: transparent;
    color: #ffffff;
    transition: all 0.5s;
    padding-top: 0.2rem;
    padding-bottom: 0;
    border-radius: 0.2rem;
  }
  .nav-toggler:active {
    background-color: var(--color-primary-dark);
  }
  .nav-toggler:hover {
    transform: scale(1.1);
  }
  .nav-toggler:focus {
    outline: 1px solid var(--color-secondary);
  }
  
  .open {
    display: block;
  }

  @media screen and (min-width: 768px) {
    .nav-toggler {
      display: none;
    }
    
    .nav {
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
    }
  
    .nav-menu {
      display: block;
      width: calc(20% * 992px);
    }
  
    .nav-bar {
      width: calc(80% * 992px);
    }
  
    .nav-items {
      flex-direction: row;
      align-items: center;
    }
  }
  `;

  static properties = {
    title: {},
    navigationOpen: {},
  };

  constructor() {
    super();
    this.title = 'Navbar';
    this.navigationOpen = false;
  }

  render() {
    return html`
    <nav class="nav">
      <div class="nav-bar">
        <h2 class="bar-title">${this.title}</h2>
        <button class="nav-toggler" aria-label="Toggle Navigation" @click="${this._toggleNavbar}" aria-expanded="${this.navigationOpen}">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16" style="display: inline">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>
      </div>
      <div class="nav-menu ${this.navigationOpen ? 'open' : ''}" id="main-menu">
        <ul class="nav-items">
          <li class="nav-item"><a class="nav-link" href="/#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="/#/favorite">Favorite</a></li>
          <li class="nav-item"><a class="nav-link" href="https://github.com/iwanharyatno" target="_blank" rel="noreferrer">About Us</a></li>
        </ul>
      </div>
    </nav>
    `;
  }

  _toggleNavbar() {
    this.navigationOpen = !this.navigationOpen;
  }
}

customElements.define('nav-bar', Navbar);
