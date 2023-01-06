const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Favoriting a Restaurant', async ({ I }) => {
  I.see('Your Favorite Restaurants', 'h1');
  I.waitForVisible('.restaurant-list p', 3);

  I.amOnPage('/#');
  I.seeElement('.restaurant-card .detail-link');

  I.clickLink(locate('.restaurant-card .detail-link').first());
  I.seeElement('favorite-button');
  I.click('favorite-button');

  I.amOnPage('/#/favorite');
  I.see('Your Favorite Restaurants', 'h1');
  I.waitForVisible('.restaurant-card', 3);

  const numberOfLikedRestaurant = await I.grabNumberOfVisibleElements('restaurant-item');
  assert.strictEqual(numberOfLikedRestaurant, 1);
});

Scenario('Favoriting and Removing a Restaurant from Favorite', async ({ I }) => {
  I.see('Your Favorite Restaurants', 'h1');
  I.waitForVisible('.restaurant-list p', 3);

  // Favoriting a Restaurant
  I.amOnPage('/#');
  I.seeElement('.restaurant-card .detail-link');

  const detailLink = locate('.restaurant-card .detail-link').first();

  I.clickLink(detailLink);
  I.seeElement('favorite-button');
  I.click('favorite-button');

  I.amOnPage('/#/favorite');
  I.see('Your Favorite Restaurants', 'h1');
  I.waitForVisible('.restaurant-card', 3);

  const numberOfLikedRestaurant = await I.grabNumberOfVisibleElements('restaurant-item');
  assert.strictEqual(numberOfLikedRestaurant, 1);

  // Remove a Restaurant from Favorite
  I.seeElement(detailLink);
  I.clickLink(detailLink);
  I.seeElement('favorite-button');
  I.click('favorite-button');

  I.amOnPage('/#/favorite');
  I.see('Your Favorite Restaurants', 'h1');
  I.waitForVisible('.restaurant-list p', 3);
});
