import { test } from '../support/fixtures';

test('add to basket from product page', async ({ productPage }) => {
  await productPage.openCatalogue();
  await productPage.expectBasketVisible();
  await productPage.openProduct();
  await productPage.expectBasketVisible();
  await productPage.addToBasket();
  await productPage.expectBasketCount(1);
  await productPage.expectProductInBasket();
  await productPage.expectSuccessMessage();
});