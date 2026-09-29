import { test } from '../support/fixtures';

test('Récupérer le panier après reconnexion', async ({
  accountWorkflow,
  basketAPI,
  basketPage,
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

  // Connexion via l'API
  await accountWorkflow.loginWithAPI(email, password);

  // Ajouter dans le panier
  await productPage.openCatalogue();
  await basketPage.addProduct(4);
  await basketPage.openFromHeader();
  await basketPage.expectBasketContents("The Hitchhiker's Guide to the Galaxy");

  // Deconnexion / Reconnexion
  await accountWorkflow.logout(email);
  await accountWorkflow.loginWithAPI(email, password);

  // Verification de la présence du produit dans le panier
  await basketPage.expectCount(1);
  await basketPage.openFromHeader();
  await basketPage.expectBasketContents("The Hitchhiker's Guide to the Galaxy");

  // suppression du produit pour ne pas laisser de trace dans le panier
  await basketPage.removeProduct();
  await basketPage.expectEmpty();
  await accountWorkflow.logout(email);
  await productPage.expectProductsVisible();
});