import { expect, Page } from '@playwright/test';

export class TitlePage {
  constructor(private readonly page: Page) {}

  async expectSiteTitle() {
    await expect(this.page.locator('h1')).toContainText('Simple commerce');
  }

  async expectLoginTitle() {
    await expect(this.page.locator('h2')).toContainText('Connexion');
  }
}