import FavoriteButton from '../src/scripts/views/components/favorite-button';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Unlike a restaurant', () => {
  beforeEach(async () => {
    await FavoriteRestaurantIdb.put({ id: 1 });
  });

  it('should show the remove from favorite button label when the restaurant has been favorited', (done) => {
    const favoriteButton = new FavoriteButton({ id: 1 }, () => {
      expect(favoriteButton.label).toEqual('remove from favorite');
      done();
    });
  });

  it('should not show the add to favorite button label when the restaurant has been favorited', (done) => {
    const favoriteButton = new FavoriteButton({ id: 1 }, () => {
      expect(favoriteButton.label).not.toEqual('add to favorite');
      done();
    });
  });

  it('should be able to remove the restaurant from favorite', (done) => {
    const favoriteButton = new FavoriteButton({ id: 1 }, async () => {
      favoriteButton.dispatchEvent(new Event('click'));

      expect(await FavoriteRestaurantIdb.getAll()).toEqual([]);

      done();
    });
  });

  it('should not fail if the removed restaurant is not favorited before', (done) => {
    const favoriteButton = new FavoriteButton({ id: 1 }, async () => {
      await FavoriteRestaurantIdb.delete(1);

      favoriteButton.dispatchEvent(new Event('click'));

      expect(await FavoriteRestaurantIdb.getAll())
        .toEqual([]);

      done();
    });
  });
});
