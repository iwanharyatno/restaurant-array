import { LitElement, html, css } from 'lit';
import AppConfig from '../../config/app';

class RestaurantItem extends LitElement {
  static styles = css`
  .restaurant-card {
    background-color: #ffffff;
    border: 1px solid var(--color-secondary);
    border-radius: 0.5rem;
    max-width: inherit;
    margin: inherit;
    overflow: hidden;
  }

  .restaurant-image {
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .restaurant-summary {
    padding: 1rem;
  }

  .summary-heading {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .summary-title {
    margin: 0;
  }

  .summary-location {
    grid-row: 2/3;
    grid-column: 1/2;
    margin: 0;
    color: var(--color-secondary-dark);
  }

  .summary-rating {
    grid-row: 1/3;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    color: #ddb700;
  }

  .detail-link {
    display: block;
    padding: 1.3rem;
    text-align: center;
    text-decoration: none;
    border-top: 1px solid var(--color-secondary);
    color: var(--color-primary);
    transition: background-color 0.5s;
  }

  .detail-link:hover {
    text-decoration: underline;
  }

  .detail-link:focus {
    background-color: var(--color-primary);
    color: #ffffff;
  }
  `;

  static properties = {
    restaurant: {
      converter: (attrValue) => {
        if (typeof attrValue === 'object') return attrValue;
        if (typeof attrValue === 'string') return JSON.parse(attrValue);
        return undefined;
      },
    },
  };

  constructor(restaurant) {
    super();
    this.restaurant = restaurant || {};
  }

  render() {
    return html`
    <div class="restaurant-card">
      <picture>
        <source media="(min-width: 992px)" srcset="${AppConfig.BASE_IMAGE_API_URL}/large/${this.restaurant?.pictureId}">
        <source media="(min-width: 768px)" srcset="${AppConfig.BASE_IMAGE_API_URL}/medium/${this.restaurant?.pictureId}">
        <img class="restaurant-image" src="${AppConfig.BASE_IMAGE_API_URL}/small/${this.restaurant?.pictureId}" alt="View of ${this.restaurant?.name}" loading="lazy">
      </picture>
      <article class="restaurant-summary">
        <div class="summary-heading">
          <h3 class="summary-title">${this.restaurant?.name}</h3>
          <p class="summary-location">${this.restaurant?.city}</p>
          <div class="summary-rating">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <span aria-label="rating ${this.restaurant?.rating}" role="rating">${this.restaurant?.rating}</span>
          </div>
        </div>
      </article>
      <a class="detail-link" href="/#/detail/${this.restaurant?.id}">
        SEE DETAIL
      </a>
    </div>
    `;
  }
}
customElements.define('restaurant-item', RestaurantItem);

export default RestaurantItem;
