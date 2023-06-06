import puppeteer from 'puppeteer';
import { ParseResult } from './types';

const url = 'https://www.perekrestok.ru/shops/volgograd';

export const getDataFromPerekrestok = async (
  products: string[],
): Promise<ParseResult> => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
  });

  const context = browser.defaultBrowserContext();

  await context.overridePermissions(url, ['geolocation', 'notifications']);

  const page = await browser.newPage();
  await page.goto(url);

  const input = await page.$('input[name=search]');
  console.log(input);
  await input?.click();
  await input?.type('картошка');

  await page.waitForSelector('.search-suggest__items');

  const results: ParseResult = {};

  for (const product of products) {
    const priceElem = await page.$x(
      `//p[contains(@class, 'search-suggest__title-text') and text()='${product}']/ancestor::div[contains(@class, 'search-suggest__info')]/descendant::div[contains(@class, 'price-new')]`,
    );

    const priceString = await page.evaluate(
      (element) => element?.textContent,
      priceElem[0],
    );

    if (priceString) {
      results[product] = parseFloat(
        priceString.replace(/[^\d.,]/g, '').replace(',', '.'),
      );
    }
  }

  await browser.close();

  return results;
};
