import { LitElement, html, css } from 'lit';

import AppConfig from '../../config/app';

import './menus-ul';
import ReviewCard from './review-card';

class RestaurantDetail extends LitElement {
  static styles = css`
  .container {
    display: grid;
    grid-template-columns: 1fr;
  }

  img {
    width: 100%;
  }

  .image-container {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid var(--color-secondary);
  }

  .detail-column {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 0.5rem;
    border: 1px solid var(--color-secondary);
  }
  .detail-column * {
    font-size: 1rem;
    margin: 0;
    padding: 1rem;
  }
  .detail-column h2 {
    grid-column: 1/2;
    border-right: 1px solid var(--color-secondary);
  }
  .detail-column p {
    grid-column: 2/4;
  }

  .overview {
    margin-bottom: 1.5rem;
  }

  .menus-list {
    display: grid;
    grid-template-columns: 1fr;
  }

  review-card {
    margin: 1rem 0;
  }

  @media screen and (min-width: 768px) {
    .container > section {
      width: 40rem;
      margin: 0 auto;
    }

    .menus-list {
      grid-template-columns: 1fr 1fr;
    }
    .menus-list article {
      padding: 0 1rem;
    }
  }

  @media screen and (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 1fr;
      max-width: 900px;
      margin: auto;
    }

    .container > section {
      width: auto;
      margin: initial;
    }

    .overview {
      grid-column: 1/2;
    }

    .reviews {
      grid-column: 2/3;
      grid-row: 1/2;
      padding: 0 1rem;
    }
  `;

  static properties = {
    restaurant: {},
  };

  constructor(restaurant) {
    super();

    this.restaurant = restaurant || {};
  }

  render() {
    return html`
    <div class="container">
      <section class="overview">
        <h1>${this.restaurant.name}</h1>
        <div class="image-container">
          <img src="${AppConfig.BASE_IMAGE_API_URL}/large/${this.restaurant.pictureId}" alt="View of ${this.restaurant.name}" />
        </div>
        <article class="detail-column">
          <h2>City</h2>
          <p>${this.restaurant.city}</p>
        </article>
        <article class="detail-column">
          <h2>Address</h2>
          <p>${this.restaurant.address}</p>
        </article>
        <article class="overview-description">
          <h2>Description</h2>
          <p>${this.restaurant.description}</p>
        </article>
        <h2>Menus</h2>
        <div class="menus-list">
          <article>
            <h3>Foods</h3>
            <menus-ul>
              ${this.restaurant.menus.foods.map((food) => html`
              <li>${food.name}</li>
              `)}
            </menus-ul>
          </article>
          <article>
            <h3>Drinks</h3>
            <menus-ul>
              ${this.restaurant.menus.drinks.map((drink) => html`
              <li>${drink.name}</li>
              `)}
            </menus-ul>
          </article>
        </div>
      </section>

      <section class="reviews">
        <h2>Customer Reviews</h2>
        ${this.restaurant.customerReviews.map((customerReview) => new ReviewCard(customerReview))}
      </section>
    </div>
    `;
  }
}

customElements.define('restaurant-detail', RestaurantDetail);

export default RestaurantDetail;
