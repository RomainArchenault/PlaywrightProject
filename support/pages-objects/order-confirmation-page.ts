import { expect, type Page } from '@playwright/test';

type OrderDetails = {
  items: Array<{ name: string; quantity: string }>;
  customerName: string;
  postalCode: string;
  basketTotal: string;
  orderTotal: string;
};

export class OrderConfirmationPage {
  constructor(private readonly page: Page) {}

  async printOrderAndVerifyDetails(details: OrderDetails) {
    await expect(this.page).toHaveURL(/\/checkout\/(?:thank-you|confirmation)\//);
    const receipt = this.page.locator('#default');
    await expect(
      this.page.getByRole('heading', {
        name: /(?:Order|Commande) \d+ : confirmation/,
      }),
    ).toBeVisible();

    for (const item of details.items) {
      await expect(receipt).toContainText(item.name);
      await expect(receipt.getByText(item.quantity, { exact: true })).toBeVisible();
    }

    await expect(receipt).toContainText(details.customerName);
    await expect(receipt).toContainText(details.postalCode);
    await expect(receipt).toContainText(details.basketTotal);
    await expect(receipt).toContainText(details.orderTotal);

    await this.page.evaluate(() => {
      window.print = () => {
        document.body.dataset.printRequested = 'true';
      };
    });
    await this.page.getByRole('link', { name: /Print this page|Imprimer cette page/ }).click();
    await expect(this.page.locator('body')).toHaveAttribute('data-print-requested', 'true');
  }

  async returnToShopping() {
    await this.page
      .getByRole('link', { name: /Continue shopping|Continuer vos achats|Retour aux achats/ })
      .click();
    await expect(this.page).toHaveURL(/\/fr\/catalogue\/$/);
  }
}