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
    border: 1px solid var(--color-secondary);
    width: 100%;
    min-height: 10rem;
    overflow: hidden;
    background-color: var(--color-skeleton);
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

  .container.skeleton .content {
    background-color: var(--color-skeleton);
    color: var(--color-skeleton);
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
    skeleton: { type: Boolean },
  };

  constructor(restaurant) {
    super();

    this.restaurant = restaurant || {};
    this.skeleton = false;
  }

  static _renderSkeleton() {
    const foods = Array(10).fill('food');
    const drinks = Array(10).fill('drink');
    const customerReviews = Array(3).fill({});

    return html`
    <div class="container skeleton">
      <section class="overview">
        <h1 class="content">name</h1>
        <div class="image-container">
        </div>
        <article class="detail-column">
          <h2>City</h2>
          <p class="content">city</p>
        </article>
        <article class="detail-column">
          <h2>Address</h2>
          <p class="content">address</p>
        </article>
        <article class="overview-description">
          <h2>Description</h2>
          <p class="content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.</p>
        </article>
        <h2>Menus</h2>
        <div class="menus-list">
          <article>
            <h3>Foods</h3>
            <menus-ul skeleton>
              ${foods.map((food) => html`
              <li>${food}</li>
              `)}
            </menus-ul>
          </article>
          <article>
            <h3>Drinks</h3>
            <menus-ul skeleton>
              ${drinks.map((drink) => html`
              <li>${drink}</li>
              `)}
            </menus-ul>
          </article>
        </div>
      </section>

      <section class="reviews">
        <h2>Customer Reviews</h2>
        ${customerReviews.map(() => html`<review-card skeleton></review-card>`)}
      </section>
    </div>
    `;
  }

  _renderActual() {
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

  render() {
    if (this.skeleton) {
      return RestaurantDetail._renderSkeleton();
    }
    return this._renderActual();
  }
}

customElements.define('restaurant-detail', RestaurantDetail);

export default RestaurantDetail;
