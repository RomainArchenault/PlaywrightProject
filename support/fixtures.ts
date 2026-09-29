import { test as base } from '@playwright/test';
import { LoginPage } from './pages-objects/login-page';
import { ProductPage } from './pages-objects/product-page';
import { TitlePage } from './pages-objects/title-page';
import { AccountPage } from './pages-objects/account-page';
import { BasketPage } from './pages-objects/basket-page';
import { BasketAPI } from './pages-objects/basket-api';
import { AccountWorkflow } from './workflows/account-workflow';

type Fixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  titlePage: TitlePage;
  accountPage: AccountPage;
  basketPage: BasketPage;
  basketAPI: BasketAPI;
  accountWorkflow: AccountWorkflow;
  credentials: { email: string; password: string };
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  titlePage: async ({ page }, use) => {
    await use(new TitlePage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  basketPage: async ({ page }, use) => {
    await use(new BasketPage(page));
  },
  basketAPI: async ({ request }, use) => {
    await use(new BasketAPI(request));
  },
  accountWorkflow: async ({ accountPage, loginPage, page }, use) => {
    await use(new AccountWorkflow(accountPage, loginPage, page));
  },
  credentials: async ({ baseURL }, use) => {
    void baseURL;
    await use({
      email: process.env.E2E_EMAIL ?? 'ra01@test.test',
      password: process.env.E2E_PASSWORD ?? 'ra01@test.test',
    });
  },
});