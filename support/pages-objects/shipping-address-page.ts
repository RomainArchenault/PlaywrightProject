import { expect, type Page } from '@playwright/test';

export class ShippingAddressPage {
  constructor(private readonly page: Page) {}

  async completeAddress() {
    await expect(this.page).toHaveURL(/\/checkout\/shipping-address\//);
    await expect(
      this.page.getByRole('heading', { name: /Shipping address|Adresse de livraison/ }),
    ).toBeVisible();

    await this.page.getByRole('textbox', { name: /First name|Prénom/ }).fill('Test');
    await this.page.getByRole('textbox', { name: /Last name|Nom/ }).fill('Automation');
    await this.page
      .getByRole('textbox', { name: /First line of address|Première ligne d'adresse/ })
      .fill('10 Test Street');
    await this.page.getByRole('textbox', { name: /City|Ville/ }).fill('Paris');
    await this.page
      .getByRole('textbox', { name: /Post\/Zip-code|Code postal/ })
      .fill('75001');
    await this.page
      .getByRole('combobox', { name: /Country|Pays/ })
      .selectOption({ label: 'France' });
    await this.page.getByRole('button', { name: /Continue|Continuer/ }).click();
    await expect(this.page).toHaveURL(/\/checkout\/payment-details\//);
  }
}