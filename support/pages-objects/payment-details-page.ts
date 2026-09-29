import { expect, type Page } from '@playwright/test';

export class PaymentDetailsPage {
  constructor(private readonly page: Page) {}

  async continueToPreview() {
    await expect(this.page).toHaveURL(/\/checkout\/payment-details\//);
    await expect(
      this.page.getByRole('heading', {
        name: /Enter payment details|Saisissez les détails du paiement/,
      }),
    ).toBeVisible();
    await this.page.getByRole('link', { name: /Continue|Continuer/ }).click();
    await expect(this.page).toHaveURL(/\/checkout\/preview\//);
  }
}