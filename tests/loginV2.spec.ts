import { test } from '../support/fixtures';

test.describe('test_de_login', () => {
  test.beforeEach('Nav', async ({ loginPage }) => {
    await loginPage.openCatalogue();
  });

  test('Login_OK', async ({ loginPage }) => {
    await loginPage.openLoginForm();
    await loginPage.expectSiteTitle();
    await loginPage.expectLoginTitle();
    await loginPage.fillEmail('ra01@test.test');
    await loginPage.fillPassword('ra01@test.test');
    await loginPage.submitLogin();
    await loginPage.expectLoggedInAs('ra01@test.test');
    await loginPage.expectProductsVisible();
  });

  test('Login_Erroné', async ({ loginPage }) => {
    await loginPage.openLoginForm();
    await loginPage.expectSiteTitle();
    await loginPage.expectLoginTitle();
    await loginPage.fillEmail('ra01@test.test');
    await loginPage.fillPassword('Erroné');
    await loginPage.submitLogin();
    await loginPage.expectLoginErrorSummary();
    await loginPage.expectInvalidCredentialsError();
    await loginPage.expectSiteTitle();
    await loginPage.expectLoginTitle();
  });
});
