import { test, expect } from '@playwright/test';

test.describe('test_de_login', () => {});

  test.beforeEach('Nav', async ({ page }) => {
    await page.goto('/fr/catalogue/');
  });

  test('Login_OK', async ({ page }) => {
    await page.getByRole('link', { name: ' Compte' }).click();
    await expect(page.locator('h1')).toContainText('Simple commerce');
    await expect(page.locator('h2')).toContainText('Connexion');
    await page.getByRole('textbox', { name: 'Adresse électronique *' }).fill('ra01@test.test');
    await page.getByRole('textbox', { name: 'Mot de passe *' }).fill('ra01@test.test');
    await page.getByRole('button', { name: 'Connexion' }).click();
    await expect(page.locator('#top_page')).toContainText('ra01@test.test');
    await expect(page.locator('#default')).toContainText('Tous les produits');
  });

  test('Login_Erroné', async ({ page }) => {
    await page.getByRole('link', { name: ' Compte' }).click();
    await expect(page.locator('h1')).toContainText('Simple commerce');
    await expect(page.locator('h2')).toContainText('Connexion');
    await page.getByRole('textbox', { name: 'Adresse électronique *' }).fill('ra01@test.test');
    await page.getByRole('textbox', { name: 'Mot de passe *' }).fill('Erroné');
    await page.getByRole('button', { name: 'Connexion' }).click();
    await expect(page.locator('#login_form')).toContainText('Oups ! Nous avons trouvé des erreurs - veuillez vérifier les messages d\'erreur ci-dessous et réessayer');
    await expect(page.locator('#login_form')).toContainText('Saisissez un nom d’utilisateur et un mot de passe valides. Remarquez que chacun de ces champs est sensible à la casse (différenciation des majuscules/minuscules).');
    await expect(page.locator('h1')).toContainText('Simple commerce');
    await expect(page.locator('h2')).toContainText('Connexion');
  });
