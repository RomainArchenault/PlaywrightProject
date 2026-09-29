import { test } from '../support/fixtures';

test('ajouter deux produits différents dont un en double', async ({
  accountWorkflow,
  basketAPI,
  basketPage,
  credentials,
  orderConfirmationPage,
  orderPreviewPage,
  paymentDetailsPage,
  productPage,
  shippingAddressPage,
}) => {
  // Connexion API et remise à zéro du panier
  await productPage.openCatalogue();
  await accountWorkflow.loginWithAPI(credentials.email, credentials.password);
  await basketAPI.clearBasket(credentials.email, credentials.password);

  try {
    // Ajout de trois articles : deux références, dont une en double
    await productPage.openCatalogue();
    await basketPage.addProduct(1);
    await basketPage.addProduct(1);
    await basketPage.addProduct(2);

    // Vérification du panier avant le paiement
    await basketPage.expectCount(3);
    await basketPage.openFromHeader();
    await basketPage.expectBasketContents('Snow Crash');
    await basketPage.expectBasketContents('Neuromancer.');

    // Adresse de livraison, paiement puis aperçu de la commande
    await basketPage.proceedToCheckout();
    await shippingAddressPage.completeAddress();
    await paymentDetailsPage.continueToPreview();
    await orderPreviewPage.placeOrder();

    // Contrôle du bon de commande et retour au catalogue
    await orderConfirmationPage.printOrderAndVerifyDetails({
      items: [
        { name: 'Snow Crash', quantity: '2' },
        { name: 'Neuromancer.', quantity: '1' },
      ],
      customerName: 'Test Automation',
      postalCode: '75001',
      basketTotal: '23,97 €',
      orderTotal: '30,97 €',
    });
    await orderConfirmationPage.returnToShopping();
    await productPage.expectProductsVisible();
  } finally {
    // Nettoyage du panier pour les prochains tests
    await basketAPI.clearBasket(credentials.email, credentials.password);
  }
});