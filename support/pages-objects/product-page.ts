import { expect, Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  async openCatalogue() {
    await this.page.goto('/fr/catalogue/');
  }

  async openLoginPage() {
    await this.page.getByRole('link', { name: /Compte|Account/ }).click();
  }

  async expectLoggedInAs(email: string) {
    await expect(this.page.locator('#top_page')).toContainText(email);
  }

  async expectProductsVisible() {
    await expect(this.page.locator('#default')).toContainText(/All products|Tous les produits/);
  }

  async expectBasketVisible() {
    await expect(this.page.locator('#top_page')).toContainText(/Basket|Panier/);
  }

  async openProduct() {
    await this.page.getByRole('link', { name: "The Hitchhiker's Guide to …" }).click();
  }

  async addToBasket() {
    await this.page.getByRole('button', { name: /Add to basket|Ajouter au panier/ }).click();
  }

  async expectBasketCount(count: number) {
    await expect(this.page.locator('#top_page')).toContainText(
      new RegExp(`(?:Basket|Panier)\\s*\\(${count}\\)`),
    );
  }

  async expectProductInBasket() {
    await expect(this.page.getByText("× The Hitchhiker's Guide to")).toBeVisible();
  }

  async expectSuccessMessage() {
    await expect(this.page.locator('#messages')).toContainText(
      /The Hitchhiker's Guide to the Galaxy (a été ajouté à votre panier|has been added to your basket)\./,
    );
  }
}