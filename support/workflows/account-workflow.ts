import { AccountPage } from '../pages-objects/account-page';
import { LoginPage } from '../pages-objects/login-page';

export class AccountWorkflow {
  constructor(
    private readonly accountPage: AccountPage,
    private readonly loginPage: LoginPage,
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
}