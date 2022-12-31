import Restaurant from '../../data/restaurant';
import RestaurantItem from '../components/restaurant-item';

const Home = {
  render() {
    return `
    <div class="hero">
      <picture>
        <source media="(max-width: 600px)" srcset="images/hero-image_4-small.jpg" type="image/jpg">
        <img class="hero-image" src="images/hero-image_4.jpg" alt="">
      </picture>
      <article class="hero-description">
        <h1>Find your next Dining Site</h1>
        <p>We have collected various data of many of the best restaurant that might interest you.</p>
      </article>
    </div>
    <section id="random-pick-section">
      <h2 class="section-title">Random Pick</h2>
      <div id="random-pick">
      </div>
    </section>
    <section>
      <h2 class="section-title">All Restaurants</h2>
      <div class="restaurant-list">
      </div>
    </section>
    <section id="contact">
      <h2 class="section-title">Need Help?</h2>
      <p>If you cannot decide on what should be your next site, we have community with a lot of people to help you decide on what should be your next dining site.</p>
      <p>And also with proffesional local guides we can bring you explore various types of restaurant listed in here.</p>
      <div class="contact-links">
        <a href="#" class="wide-link">Visit Comunity</a>
        <a href="#" class="wide-link">Contact Local Guide</a>
      </div>
    </section>
    `;
  },
  async postRender() {
    document.title = 'Restorray - Find your next dining site.';
    const restaurantListField = document.querySelector('.restaurant-list');
    const randomRestaurantField = document.querySelector('#random-pick');

    let retryTimeout;

    const fetchData = async () => {
      try {
        if (retryTimeout) clearTimeout(retryTimeout);

        const restaurants = await Restaurant.getAll(fetchData) || [];

        const randomRestaurant = new RestaurantItem();
        randomRestaurant.restaurant = Restaurant.getRandom(restaurants);

        restaurantListField.innerHTML = '';
        randomRestaurantField.innerHTML = '';

        randomRestaurantField.appendChild(randomRestaurant);
        restaurants
          .filter((restaurant) => (restaurant.id !== randomRestaurant.restaurant.id))
          .forEach((otherRestaurant) => {
            restaurantListField.appendChild(
              new RestaurantItem(otherRestaurant),
            );
          });
      } catch (error) {
        retryTimeout = setTimeout(fetchData, 500);
      }
    };

    let skeletonItem = new RestaurantItem();
    skeletonItem.skeleton = true;

    randomRestaurantField.appendChild(skeletonItem);

    for (let i = 0; i < 18; i++) {
      skeletonItem = new RestaurantItem();
      skeletonItem.skeleton = true;
      restaurantListField.appendChild(skeletonItem);
    }
    await fetchData();
  },
};

export default Home;
