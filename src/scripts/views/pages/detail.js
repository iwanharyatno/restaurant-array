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
    document.getElementById('main-content').focus();
    const restaurantDetailField = document.querySelector('#restaurant-detail');

    const fetchData = async () => {
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
    };

    restaurantDetailField.innerHTML = '<restaurant-detail skeleton></restaurant-detail>';
    await fetchData();
  },
};

export default Detail;
