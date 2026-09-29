import { Page, type APIRequestContext } from '@playwright/test';
import { AccountPage } from '../pages-objects/account-page';
import { LoginPage } from '../pages-objects/login-page';

export class AccountWorkflow {
  constructor(
    private readonly accountPage: AccountPage,
    private readonly loginPage: LoginPage,
    private readonly page: Page,
  ) {}

  async login(email: string, password: string): Promise<void> {
    await this.accountPage.openLoginPage();
    await this.loginPage.fillEmail(email);
    await this.loginPage.fillPassword(password);
    await this.loginPage.submitLogin();
  }

  async logout(email: string): Promise<void> {
    await this.accountPage.logout(email);
  }

  async loginWithAPI(username: string, password: string): Promise<void> {
    const response = await this.page.request.post('/api/login/', {
      data: { username, password },
    });

    if (!response.ok()) {
      throw new Error(`API login failed with HTTP ${response.status()}`);
    }

    await this.accountPage.reload();
    await this.accountPage.expectLoggedInAs(username);
  }
}