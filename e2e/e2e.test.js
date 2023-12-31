import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: true, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  test('If card number would be invalid, suitable message would be shown', async () => {
    await page.goto(baseUrl);

    const message = await page.$('.message');
    const submitBtn = await page.$('.submit');
    const input = await page.$('.input');

    const number = '51657581612492';

    await input.type(number);
    await submitBtn.click();

    await message.textContent === 'Такой карты не существует';
  });

  test('If card number would be valid, suitable message would be shown', async () => {
    await page.goto(baseUrl);

    const message = await page.$('.message');
    const submitBtn = await page.$('.submit');
    const input = await page.$('.input');

    const number = '5165758161249290';

    await input.type(number);
    await submitBtn.click();

    await message.textContent === 'Верный номер карты';
    await page.waitForSelector('.valid');
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
