import { LitElement, html, css } from 'lit';

import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

class FavoriteButton extends LitElement {
  static styles = css`
  button {
    padding-top: 0.25rem;
    width: 4rem;
    height: 4rem;
    border: none;
    border-radius: 50%;
    background-color: var(--color-primary);
    color: #ffffff;
    box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.7);
    transition: 0.3s all;
  }

  button:hover {
    box-shadow: 0 4px 18px 0px rgba(0, 0, 0, 0.7);
  }

  button:focus {
    transform: scale(1.15);
  }
  `;

  static properties = {
    favorited: {},
    restaurant: {},
    label: {},
  };

  constructor(restaurant, ready) {
    super();
    this.restaurant = restaurant || {};
    this.favorited = false;

    this._isCurrentRestaurantFavorited().then((favorited) => {
      this.favorited = favorited;
      this.label = this.favorited ? 'remove from favorite' : 'add to favorite';
      if (ready) ready();
    });

    this.addEventListener('click', () => this.toggleFavorite());
  }

  render() {
    const iconSize = 24;

    return html`
    <button aria-label="${this.label}">
    ${this.favorited ? html`
      <svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="currentColor" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
        <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
      </svg>
    ` : html`
      <svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
      </svg>
    `}
    </button>
    `;
  }

  async toggleFavorite() {
    this.favorited = !this.favorited;
    this.label = this.favorited ? 'remove from favorite' : 'add to favorite';

    if (this.favorited) {
      await FavoriteRestaurantIdb.put(this.restaurant);
    } else {
      await FavoriteRestaurantIdb.delete(this.restaurant.id);
    }
  }

  async _isCurrentRestaurantFavorited() {
    const favoritedRestaurant = await FavoriteRestaurantIdb.get(this.restaurant.id);
    return Boolean(favoritedRestaurant);
  }
}

customElements.define('favorite-button', FavoriteButton);

export default FavoriteButton;
