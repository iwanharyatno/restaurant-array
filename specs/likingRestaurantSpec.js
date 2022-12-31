import FavoriteButton from '../src/scripts/views/components/favorite-button';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Like a restaurant', () => {
  it('should show the add to favorite button label when the restaurant has not been favorited', (done) => {
    const favoriteButton = new FavoriteButton({ id: 1 }, () => {
      expect(favoriteButton.label).toEqual('add to favorite');
      done();
    });
  });

  it('should not show the remove from favorite button label when the restaurant has not been favorited', (done) => {
    const favoriteButton = new FavoriteButton({ id: 1 }, () => {
      expect(favoriteButton.label).not.toEqual('remove from favorite');
      done();
    });
  });

  it('should be able to like the restaurant', (done) => {
    const favoriteButton = new FavoriteButton({ id: 1 }, async () => {
      favoriteButton.dispatchEvent(new Event('click'));

      const favoritedRestaurant = await FavoriteRestaurantIdb.get(1);
      expect(favoritedRestaurant).toEqual({ id: 1 });

      await FavoriteRestaurantIdb.delete(1);

      done();
    });
  });

  it('should not add the restaurant if it has been liked', (done) => {
    const favoriteButton = new FavoriteButton({ id: 1 }, async () => {
      await FavoriteRestaurantIdb.put({ id: 1 });

      favoriteButton.dispatchEvent(new Event('click'));

      expect(await FavoriteRestaurantIdb.getAll())
        .toEqual([{ id: 1 }]);

      await FavoriteRestaurantIdb.delete(1);

      done();
    });
  });

  it('should not add the restaurant if it has no id', (done) => {
    const favoriteButton = new FavoriteButton({}, async () => {
      favoriteButton.dispatchEvent(new Event('click'));

      const favoritedRestaurants = await FavoriteRestaurantIdb.getAll();
      expect(favoritedRestaurants).toEqual([]);

      done();
    });
  });
});
