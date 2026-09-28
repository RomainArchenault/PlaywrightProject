import { expect, Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  async openCatalogue() {
    await this.page.goto('/fr/catalogue/');
  }

  async openLoginPage() {
    await this.page.getByRole('link', { name: ' Compte' }).click();
  }

  async expectLoggedInAs(email: string) {
    await expect(this.page.locator('#top_page')).toContainText(email);
  }

  async expectProductsVisible() {
    await expect(this.page.locator('#default')).toContainText('All products');
  }

  async expectBasketVisible() {
    await expect(this.page.locator('#top_page')).toContainText('Panier');
  }

  async openProduct() {
    await this.page.getByRole('link', { name: "The Hitchhiker's Guide to …" }).click();
  }

  async addToBasket() {
    await this.page.getByRole('button', { name: 'Ajouter au panier' }).click();
  }

  async expectBasketCount(count: number) {
    await expect(this.page.locator('#top_page')).toContainText(`Panier (${count})`);
  }

  async expectProductInBasket() {
    await expect(this.page.getByText("× The Hitchhiker's Guide to")).toBeVisible();
  }

  async expectSuccessMessage() {
    await expect(this.page.locator('#messages')).toContainText(
      'The Hitchhiker\'s Guide to the Galaxy a été ajouté à votre panier.',
    );
  }
}