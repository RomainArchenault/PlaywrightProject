import { test } from '../support/fixtures';

test('récupérer le panier après reconnexion', async ({
  accountPage,
  basketAPI,
  basketPage,
  loginPage,
  productPage,
}) => {
  const apiLogin = 'ra01@test.test';
  const apiPassword = 'ra01@test.test';
  const email = 'ra01@test.test';
  const password = 'ra01@test.test';

  //API de suppression du panier avant de lancer le test pour ne pas laisser de trace dans le panier
  await basketAPI.clearBasket(apiLogin, apiPassword);

  // Ouverture de la page catalogue
  await productPage.openCatalogue();

  // Se connecter
  await accountPage.openLoginPage();
  await loginPage.fillEmail(email);
  await loginPage.fillPassword(password);
  await loginPage.submitLogin();

  // Ajouter dans le panier
  await productPage.openCatalogue();
  await basketPage.addProduct(4);
  await basketPage.openFromHeader();
  await basketPage.expectBasketContents("The Hitchhiker's Guide to the Galaxy");

  // Deconnexion
  await accountPage.logout(email);
  await accountPage.openLoginPage();

  // Se connecter
  await loginPage.fillEmail(email);
  await loginPage.fillPassword(password);
  await loginPage.submitLogin();

  // Verification de la présence du produit dans le panier
  await basketPage.expectCount(1);
  await basketPage.openFromHeader();
  await basketPage.expectBasketContents("The Hitchhiker's Guide to the Galaxy");

  // suppression du produit pour ne pas laisser de trace dans le panier
  await basketPage.removeProduct();
  await basketPage.expectEmpty();
  await accountPage.logout(email);
  await productPage.expectProductsVisible();
});