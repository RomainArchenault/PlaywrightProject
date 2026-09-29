import { test } from '../support/fixtures';

test('ajouter deux produits différents dont un en double', async ({
  accountWorkflow,
  basketAPI,
  basketPage,
  checkoutPage,
  credentials,
  productPage,
}) => {
  await productPage.openCatalogue();
  await accountWorkflow.loginWithAPI(credentials.email, credentials.password);
  await basketAPI.clearBasket(credentials.email, credentials.password);

  try {
    await productPage.openCatalogue();
    await basketPage.addProduct(1);
    await basketPage.addProduct(1);
    await basketPage.addProduct(2);

    await basketPage.expectCount(3);
    await basketPage.openFromHeader();
    await basketPage.expectBasketContents('Snow Crash');
    await basketPage.expectBasketContents('Neuromancer.');

    await checkoutPage.startCheckout();
    await checkoutPage.completeShippingAddress();
    await checkoutPage.continueToOrderPreview();
    await checkoutPage.placeOrder();
    await checkoutPage.printOrderAndVerifyDetails();
    await checkoutPage.returnToShopping();
    await productPage.expectProductsVisible();
  } finally {
    await basketAPI.clearBasket(credentials.email, credentials.password);
  }
});