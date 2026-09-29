import { expect, type Page } from '@playwright/test';

export class AccountPage {
  constructor(private readonly page: Page) {}

  async openLoginPage() {
    await this.page.getByRole('link', { name: /Compte|Account/ }).click();
  }

  async logout(email: string) {
    await this.page.getByRole('button', { name: new RegExp(email) }).click();
    await this.page.getByRole('link', { name: /Logout|Déconnexion/ }).click();
  }

  async reload() {
    await this.page.reload();
  }

  async expectLoggedInAs(email: string) {
    await expect(this.page.getByRole('button', { name: new RegExp(email) })).toBeVisible();
  }
}
