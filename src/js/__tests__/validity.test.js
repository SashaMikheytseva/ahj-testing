import { validNum, cardType } from '../Validity';

test('validNum func, true', () => {
  const number = '5165758161249290';
  const result = validNum(number);
  expect(result).toBeTruthy();
});

test('validNum func, true', () => {
  const number = '371449635398431';
  const result = validNum(number);
  expect(result).toBeTruthy();
});

test('validNum func, false', () => {
  const number = '51657581612492';
  const result = validNum(number);
  expect(result).toBeFalsy();
});

test('validNum func, false', () => {
  const number = '4111111311111111';
  const result = validNum(number);
  expect(result).toBeFalsy();
});

describe('cardType func', () => {
  test.each([
    ['4539624705586591', 'visa'],
    ['5165758161249290', 'master'],
    ['3536530935939051', 'jcb'],
    ['5038849970201641', 'maestro'],
    ['6011701487404037', 'discover'],
    ['2202000000000000', 'mir'],
    ['378717023826756', 'Другая платежная система'],
  ])(('belonging to a payment system'), (number, expected) => {
    const result = cardType(number);
    expect(result).toBe(expected);
  });
});
