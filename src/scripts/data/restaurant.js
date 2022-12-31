import AppConfig from '../config/app';

import fetchWithEvent from '../utils/fetch-with-event';

const ALL_RESTAURANT = `${AppConfig.BASE_API_URL}/list`;
const SINGLE_RESTAURANT = `${AppConfig.BASE_API_URL}/detail`;

const Restaurant = {
  async getAll(failedCallback = null) {
    const data = await fetchWithEvent(ALL_RESTAURANT, { failedCallback });
    return data.restaurants;
  },

  getRandom(restaurants) {
    const randomIndex = Math.floor(
      Math.random() * restaurants.length,
    );

    return restaurants[randomIndex];
  },

  async get(id, failedCallback = null) {
    const data = await fetchWithEvent(`${SINGLE_RESTAURANT}/${id}`, { failedCallback });
    return data.restaurant;
  },
};

export default Restaurant;
