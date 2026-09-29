import { expect, type Page } from '@playwright/test';

export class BasketPage {
  constructor(private readonly page: Page) {}

  async addProduct(productId: number) {
    await this.page.getByTestId(`product-pod-add-button-${productId}`).click();
  }

  async clearExistingProducts() {
    const header = this.page.locator('#top_page');
    const basketButton = this.page.getByRole('button', { name: /Basket|Panier/ });
    const basketCountMatch = (await header.innerText()).match(
      /(?:Basket|Panier)\s*\((\d+)\)/,
    );

    await basketButton.click();

    if (basketCountMatch && Number(basketCountMatch[1]) > 0) {
      const viewBasketLink = this.page.getByRole('link', { name: /View basket|Voir le panier/ });
      await expect(viewBasketLink).toBeVisible();
      await viewBasketLink.click();
      const removeLinks = this.page.getByRole('link', { name: /Remove|Supprimer|Enlever/ });

      while (await removeLinks.count()) {
        const previousCount = await removeLinks.count();
        await this.removeProduct();
        await expect(removeLinks).toHaveCount(previousCount - 1);
      }
    }

    await this.expectEmpty();
  }

  async openFromHeader() {
    await this.page.getByRole('button', { name: /Basket|Panier/ }).click();
    await this.page.getByRole('link', { name: /View basket|Voir le panier/ }).click();
  }

  async proceedToCheckout() {
    await this.page
      .getByRole('link', { name: /Proceed to checkout|Procéder au paiement/ })
      .click();
  }

  async expectBasketContents(productName: string) {
    await expect(this.page.locator('#default')).toContainText(/Basket|Panier/);
    await expect(this.page.locator('#basket_formset')).toContainText(productName);
    await expect(this.page.locator('#content_inner')).toContainText(
      /Proceed to checkout|Procéder au paiement/,
    );
  }

  async expectCount(count: number) {
    await expect(this.page.locator('#top_page')).toContainText(
      new RegExp(`(?:Basket|Panier)\\s*\\(${count}\\)`),
    );
  }

  async removeProduct() {
    const acceptConfirmation = async (dialog: import('@playwright/test').Dialog) => {
      await dialog.accept();
    };
    this.page.once('dialog', acceptConfirmation);
    await this.page.getByRole('link', { name: /Remove|Supprimer|Enlever/ }).click();
    this.page.off('dialog', acceptConfirmation);
  }

  async expectEmpty() {
    await expect(
      this.page.getByText(
        /Your basket is empty\.|Votre panier est vide\./,
      ),
    ).toBeVisible();
  }
}
