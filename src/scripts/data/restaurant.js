import AppConfig from '../config/app';

const ALL_RESTAURANT = `${AppConfig.BASE_API_URL}/list`;
const SINGLE_RESTAURANT = `${AppConfig.BASE_API_URL}/detail`;

const Restaurant = {
  async getAll(failedCallback = null) {
    const response = await fetch(ALL_RESTAURANT, { failedCallback });
    const data = await response.json();
    return data.restaurants;
  },

  getRandom(restaurants) {
    const randomIndex = Math.floor(
      Math.random() * restaurants.length,
    );

    return restaurants[randomIndex];
  },

  async get(id, failedCallback = null) {
    const response = await fetch(`${SINGLE_RESTAURANT}/${id}`, { failedCallback });
    const data = await response.json();
    return data.restaurant;
  },
};

export default Restaurant;
