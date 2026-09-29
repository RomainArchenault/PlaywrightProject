import { expect, type Page } from '@playwright/test';

type ShippingAddressField =
  | 'firstName'
  | 'lastName'
  | 'address'
  | 'city'
  | 'postalCode'
  | 'country';

const shippingAddressLabels: Record<ShippingAddressField, RegExp> = {
  firstName: /First name|Prénom/,
  lastName: /Last name|Nom/,
  address: /First line of address|Première ligne d'adresse/,
  city: /City|Ville/,
  postalCode: /Post\/Zip-code|Code postal/,
  country: /Country|Pays/,
};

export const shippingAddressValues: Record<ShippingAddressField, string> = {
  firstName: 'Test',
  lastName: 'Automation',
  address: '10 Test Street',
  city: 'Paris',
  postalCode: '75001',
  country: 'France',
};

export class ShippingAddressPage {
  constructor(private readonly page: Page) {}

  private getField(field: ShippingAddressField) {
    const label = shippingAddressLabels[field];

    if (field === 'country') {
      return this.page.getByRole('combobox', { name: label });
    }

    return this.page.getByRole('textbox', { name: label });
  }

  async expectShippingAddressPage() {
    await expect(this.page).toHaveURL(/\/checkout\/shipping-address\//);
    await expect(
      this.page.getByRole('heading', { name: /Shipping address|Adresse de livraison/ }),
    ).toBeVisible();
  }

  async fillField(field: ShippingAddressField, value: string) {
    const locator = this.getField(field);

    if (field === 'country') {
      await locator.selectOption({ label: value });
      return;
    }

    await locator.fill(value);
  }

  async fillAllFieldsExcept(fieldToSkip?: ShippingAddressField) {
    for (const [field, value] of Object.entries(shippingAddressValues) as [
      ShippingAddressField,
      string,
    ][]) {
      if (field === fieldToSkip) {
        continue;
      }

      await this.fillField(field, value);
    }
  }

  async continue() {
    await this.page.getByRole('button', { name: /Continue|Continuer/ }).click();
  }

  async expectRequiredFieldError(field: ShippingAddressField) {
    const locator = this.getField(field);

    await expect(locator).toHaveAttribute('required', '');
    await this.continue();
    await expect(this.page).toHaveURL(/\/checkout\/shipping-address\//);
    await expect(locator).toHaveJSProperty('validity.valueMissing', true);
    await expect
      .poll(async () => {
        return await locator.evaluate((element) => {
          const input = element as HTMLInputElement | HTMLSelectElement;
          return input.validationMessage;
        });
      })
      .toMatch(/Veuillez renseigner ce champ|Please fill out this field/i);
  }

  async completeAddress() {
    await this.expectShippingAddressPage();

    await this.fillAllFieldsExcept();
    await this.continue();
    await expect(this.page).toHaveURL(/\/checkout\/payment-details\//);
  }
}