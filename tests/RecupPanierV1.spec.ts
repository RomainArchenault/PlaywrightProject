import { test } from '../support/fixtures';

test('récupérer le panier après reconnexion', async ({
  accountPage,
  basketPage,
  credentials,
  loginPage,
  productPage,
}) => {
  await productPage.openCatalogue();

  // Se connecter
  await accountPage.openLoginPage();
  await loginPage.fillEmail(credentials.email);
  await loginPage.fillPassword(credentials.password);
  await loginPage.submitLogin();

  // suppression de tous les produits du panier abant de lancer le test
  await basketPage.clearExistingProducts();

  //Ajouter dans le panier
  await productPage.openCatalogue();
  await basketPage.addProduct(4);
  await basketPage.openFromHeader();
  await basketPage.expectBasketContents("The Hitchhiker's Guide to the Galaxy");

  // Deconnexion
  await accountPage.logout(credentials.email);

  // Se connecter
  await accountPage.openLoginPage();
  await loginPage.fillEmail(credentials.email);
  await loginPage.fillPassword(credentials.password);
  await loginPage.submitLogin();

  // Verification de la présence du produit dans le panier
  await basketPage.expectCount(1);
  await basketPage.openFromHeader();
  await basketPage.expectBasketContents("The Hitchhiker's Guide to the Galaxy");

  // Suppression du produit pour ne pas laisser de trace pour les prochains tests
  await basketPage.removeProduct();
  await basketPage.expectEmpty();
  await accountPage.logout(credentials.email);
  await productPage.expectProductsVisible();
});