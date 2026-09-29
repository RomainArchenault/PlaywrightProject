import { expect, type Page } from '@playwright/test';

export class OrderPreviewPage {
  constructor(private readonly page: Page) {}

  async placeOrder() {
    await expect(this.page).toHaveURL(/\/checkout\/preview\//);
    await expect(
      this.page.getByRole('heading', { name: /Preview order|Aperçu de la commande/ }),
    ).toBeVisible();
    await this.page
      .getByRole('button', { name: /Place order|Passer commande|Confirmer/ })
      .click();
    await expect(this.page).toHaveURL(/\/checkout\/(?:thank-you|confirmation)\//);
  }
}