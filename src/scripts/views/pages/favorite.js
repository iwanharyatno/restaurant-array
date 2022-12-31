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
    const favoritedRestaurantsContainer = document.querySelector('.restaurant-list');

    let retryTimeout;

    const fetchData = async () => {
      if (retryTimeout) clearTimeout(retryTimeout);

      try {
        const favoritedRestaurants = await FavoriteRestaurantIdb.getAll(fetchData);

        favoritedRestaurantsContainer.innerHTML = '';

        if (favoritedRestaurants.length === 0) {
          favoritedRestaurantsContainer.innerHTML = '<p>No data</p>';
        }
        favoritedRestaurants.forEach((favoritedRestaurant) => {
          favoritedRestaurantsContainer.appendChild(
            new RestaurantItem(favoritedRestaurant),
          );
        });
      } catch (error) {
        retryTimeout = setTimeout(fetchData, 500);
      }
    };

    let skeletonItem = new RestaurantItem();
    skeletonItem.skeleton = true;

    for (let i = 0; i < 6; i++) {
      skeletonItem = new RestaurantItem();
      skeletonItem.skeleton = true;
      favoritedRestaurantsContainer.appendChild(skeletonItem);
    }

    await fetchData();
  },
};

export default Favorite;
