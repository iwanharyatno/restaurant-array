import { openDB } from 'idb';

import IdbConfig from '../config/idb';

const dbPromise = openDB(IdbConfig.DATABASE_NAME, IdbConfig.DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(IdbConfig.OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getAll() {
    return (await dbPromise).getAll(IdbConfig.OBJECT_STORE_NAME);
  },

  async get(id) {
    if (!id) return;
    return (await dbPromise).get(IdbConfig.OBJECT_STORE_NAME, id);
  },

  async put(restaurant) {
    if (!restaurant.hasOwnProperty('id')) return;
    return (await dbPromise).put(IdbConfig.OBJECT_STORE_NAME, restaurant);
  },

  async delete(id) {
    return (await dbPromise).delete(IdbConfig.OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestaurantIdb;
