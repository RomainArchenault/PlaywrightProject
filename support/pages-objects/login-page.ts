import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'Adresse électronique *' }).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Mot de passe *' }).fill(password);
  }

  async submitLogin() {
    await this.page.getByRole('button', { name: 'Connexion' }).click();
  }

  async expectLoginErrorSummary() {
    await expect(this.page.locator('#login_form')).toContainText(
      'Oups ! Nous avons trouvé des erreurs - veuillez vérifier les messages d\'erreur ci-dessous et réessayer',
    );
  }

  async expectInvalidCredentialsError() {
    await expect(this.page.locator('#login_form')).toContainText(
      'Saisissez un nom d’utilisateur et un mot de passe valides. Remarquez que chacun de ces champs est sensible à la casse (différenciation des majuscules/minuscules).',
    );
  }
}