import { test as base } from '@playwright/test';
import { ProductPage } from './pages/productPage';

type Fixtures = {
  productPage: ProductPage;
};

export const test = base.extend<Fixtures>({
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});