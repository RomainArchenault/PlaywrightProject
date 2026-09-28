import { test } from '../support/fixtures';

test.describe('test_de_login', () => {
  test.beforeEach('Nav', async ({ productPage }) => {
    await productPage.openCatalogue();
  });

  test('Login_OK', async ({ productPage, loginPage, titlePage }) => {
    await productPage.openLoginPage();
    await titlePage.expectSiteTitle();
    await titlePage.expectLoginTitle();
    await loginPage.fillEmail('ra01@test.test');
    await loginPage.fillPassword('ra01@test.test');
    await loginPage.submitLogin();
    await productPage.expectLoggedInAs('ra01@test.test');
    await productPage.expectProductsVisible();
  });

  test('Login_Erroné', async ({ productPage, loginPage, titlePage }) => {
    await productPage.openLoginPage();
    await titlePage.expectSiteTitle();
    await titlePage.expectLoginTitle();
    await loginPage.fillEmail('ra01@test.test');
    await loginPage.fillPassword('Erroné');
    await loginPage.submitLogin();
    await loginPage.expectLoginErrorSummary();
    await loginPage.expectInvalidCredentialsError();
    await titlePage.expectSiteTitle();
    await titlePage.expectLoginTitle();
  });
});
