import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async startCheckout() {
    await this.page
      .getByRole('link', { name: /Proceed to checkout|Procéder au paiement/ })
      .click();
  }

  async completeShippingAddress() {
    await this.page.getByRole('textbox', { name: /First name|Prénom/ }).fill('Test');
    await this.page.getByRole('textbox', { name: /Last name|Nom/ }).fill('Automation');
    await this.page
      .getByRole('textbox', { name: /First line of address|Première ligne d'adresse/ })
      .fill('10 Test Street');
    await this.page.getByRole('textbox', { name: /City|Ville/ }).fill('Paris');
    await this.page
      .getByRole('textbox', { name: /Post\/Zip-code|Code postal/ })
      .fill('75001');
    await this.page.getByRole('combobox', { name: /Country|Pays/ }).selectOption({ label: 'France' });
    await this.page.getByRole('button', { name: /Continue|Continuer/ }).click();
  }

  async continueToOrderPreview() {
    await expect(
      this.page.getByRole('heading', {
        name: /Enter payment details|Saisissez les détails du paiement/,
      }),
    ).toBeVisible();
    await this.page.getByRole('link', { name: /Continue|Continuer/ }).click();
  }

  async placeOrder() {
    await expect(this.page.getByRole('heading', { name: /Preview order|Aperçu de la commande/ })).toBeVisible();
    await this.page.getByRole('button', { name: /Place order|Passer commande|Confirmer/ }).click();
    await expect(this.page).toHaveURL(/checkout\/(?:thank-you|confirmation)\//);
    await expect(this.page.locator('body')).toContainText(/order|commande/i);
  }

  async printOrderAndVerifyDetails() {
    const receipt = this.page.locator('#default');
    await expect(
      this.page.getByRole('heading', { name: /Commande \d+ : confirmation/ }),
    ).toBeVisible();
    await expect(receipt).toContainText('Snow Crash');
    await expect(receipt).toContainText('Neuromancer.');
    await expect(receipt).toContainText('Test Automation');
    await expect(receipt).toContainText('75001');
    await expect(receipt.getByText('2', { exact: true })).toBeVisible();
    await expect(receipt.getByText('1', { exact: true })).toBeVisible();
    await expect(receipt).toContainText('23,97 €');
    await expect(receipt).toContainText('30,97 €');
    await this.page.evaluate(() => {
      window.print = () => {
        document.body.dataset.printRequested = 'true';
      };
    });
    await this.page.getByRole('link', { name: /Print this page|Imprimer cette page/ }).click();
    await expect(this.page.locator('body')).toHaveAttribute('data-print-requested', 'true');
  }

  async returnToShopping() {
    await this.page.getByRole('link', { name: /Continue shopping|Continuer vos achats|Retour aux achats/ }).click();
    await expect(this.page).toHaveURL(/\/fr\/catalogue\/$/);
  }
}