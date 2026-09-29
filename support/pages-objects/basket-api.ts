import { type APIRequestContext } from '@playwright/test';

const basketApiUrl =
  '/api/basket/';

export class BasketAPI {
  constructor(private readonly request: APIRequestContext) {}

  async clearBasket(login: string, password: string): Promise<void> {
    const authorization = Buffer.from(`${login}:${password}`).toString('base64');
    const response = await this.request.delete(basketApiUrl, {
      headers: { Authorization: `Basic ${authorization}` },
    });

    if (!response.ok()) {
      throw new Error(`Basket API cleanup failed with HTTP ${response.status()}`);
    }
  }
}