import { test as base } from '@playwright/test';
import { LoginPage } from './pages-objects/login-page';
import { ProductPage } from './pages-objects/product-page';
import { TitlePage } from './pages-objects/title-page';

type Fixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  titlePage: TitlePage;
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
});