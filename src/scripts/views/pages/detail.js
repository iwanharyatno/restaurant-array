import UrlParser from '../../routes/url-parser';
import Restaurant from '../../data/restaurant';

import RestaurantDetail from '../components/restaurant-detail';
import FavoriteButton from '../components/favorite-button';

const Detail = {
  render() {
    return `
      <section id="restaurant-detail"></section>
      <div class="favorite-button"></div>
    `;
  },
  async postRender() {
    this._scrollTop();
    const restaurantDetailField = document.querySelector('#restaurant-detail');

    let retryTimeout;

    const fetchData = async () => {
      if (retryTimeout) clearTimeout(retryTimeout);

      try {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await Restaurant.get(url.id, fetchData);
        const restaurantDetail = new RestaurantDetail(restaurant);

        restaurantDetailField.innerHTML = '';
        restaurantDetailField.appendChild(restaurantDetail);

        const favoriteButtonContainer = document.querySelector('.favorite-button');
        favoriteButtonContainer.innerHTML = '';
        const favoriteButton = new FavoriteButton(restaurant, () => {
          favoriteButtonContainer.appendChild(favoriteButton);
        });

        document.title = `Restorray Detail - ${restaurant.name}`;
      } catch (error) {
        retryTimeout = setTimeout(fetchData, 500);
      }
    };

    restaurantDetailField.innerHTML = '<restaurant-detail skeleton></restaurant-detail>';
    await fetchData();
  },
  _scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
};

export default Detail;
