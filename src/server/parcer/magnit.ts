import puppeteer from 'puppeteer';
import { ParseResult } from './types';

const url = 'https://dostavka.magnit.ru/';

export const getDataFromMagnit = async (
  products: string[],
): Promise<ParseResult> => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
  });

  const context = browser.defaultBrowserContext();

  await context.overridePermissions(url, ['geolocation', 'notifications']);

  const page = await browser.newPage();

  await page.goto(`${url}search/?q=картошка`);

  const results: ParseResult = {};

  for (const product of products) {
    const elems = await page.$x(
      `//*[@data-test-id='product-item-title' and @title='${product}']/ancestor::div[contains(@class, 'product-card__inner')]/descendant::div[contains(@class, 'm-price__current')]`,
    );

    if (elems.length) {
      for (const elem of elems) {
        const children = await elem.$$('span');

        const [priceString, additionalDataString] = await Promise.all(
          children.map((element) =>
            element.evaluate((node) => node.textContent),
          ),
        );

        const price = Number(priceString);

        const multiplier = additionalDataString
          ? parseFloat(
              additionalDataString.replace(/[^\d.,]/g, '').replace(',', '.'),
            )
          : null;

        results[product] = multiplier ? price / multiplier : price;
      }
    }
  }

  await browser.close();

  return results;
};
