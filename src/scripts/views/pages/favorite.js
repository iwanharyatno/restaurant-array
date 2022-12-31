import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import RestaurantItem from '../components/restaurant-item';

const Favorite = {
  render() {
    return `
      <section>
        <h1>Your Favorite Restaurants</h1>
        <div class="restaurant-list"></div>
      </section>
    `;
  },
  async postRender() {
    document.title = 'Your Favorite Restaurants';

    const fetchData = async () => {
      const favoritedRestaurantsContainer = document.querySelector('.restaurant-list');
      const favoritedRestaurants = await FavoriteRestaurantIdb.getAll(fetchData);
      if (favoritedRestaurants.length === 0) {
        favoritedRestaurantsContainer.innerHTML = '<p>No data</p>';
      }
      favoritedRestaurants.forEach((favoritedRestaurant) => {
        favoritedRestaurantsContainer.appendChild(
          new RestaurantItem(favoritedRestaurant),
        );
      });
    };

    await fetchData();
  },
};

export default Favorite;
