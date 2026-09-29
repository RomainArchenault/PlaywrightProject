import { test } from '../support/fixtures';

test('récupérer le panier après reconnexion', async ({
  accountPage,
  basketPage,
  credentials,
  loginPage,
  productPage,
}) => {
  await productPage.openCatalogue();
  await accountPage.openLoginPage();
  await loginPage.fillEmail(credentials.email);
  await loginPage.fillPassword(credentials.password);
  await loginPage.submitLogin();

  // suppression de tous les produits du panier abant de lancer le test
  await basketPage.clearExistingProducts();

  await productPage.openCatalogue();
  await basketPage.addProduct(4);
  await basketPage.openFromHeader();
  await basketPage.expectBasketContents("The Hitchhiker's Guide to the Galaxy");

  await accountPage.logout(credentials.email);
  await accountPage.openLoginPage();
  await loginPage.fillEmail(credentials.email);
  await loginPage.fillPassword(credentials.password);
  await loginPage.submitLogin();

  await basketPage.expectCount(1);
  await basketPage.openFromHeader();
  await basketPage.expectBasketContents("The Hitchhiker's Guide to the Galaxy");

  // suppression du produit pour ne pas laisser de trace dans le panier
  await basketPage.removeProduct();
  await basketPage.expectEmpty();
  await accountPage.logout(credentials.email);
  await productPage.expectProductsVisible();
});