export function validNum(value) {
  const arr = value.split('');
  let sum = 0;

  if (arr.length % 2 === 0) {
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (i % 2 !== 0) {
        sum += +arr[i];
      } else {
        let x = +arr[i] * 2;
        if (x > 9) x -= 9;
        sum += x;
      }
    }
  } else {
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (i % 2 === 0) {
        sum += +arr[i];
      } else {
        let x = +arr[i] * 2;
        if (x > 9) x -= 9;
        sum += x;
      }
    }
  }

  if (sum % 10 === 0) return true;

  return false;
}

export function cardType(number) {
  const num = String(number);
  const firstTwo = num.slice(0, 2);
  const firstThree = num.slice(0, 3);
  const firstFour = num.slice(0, 4);
  const firstSix = num.slice(0, 6);

  if (num.length === 16 || num.length === 19) {
    if (num.startsWith('5018') || num.startsWith('5020') || num.startsWith('5038') || num.startsWith('5893') || num.startsWith('6304') || num.startsWith('6759') || num.startsWith('6761') || num.startsWith('6762') || num.startsWith('6763')) {
      return 'maestro';
    }

    if (Number(firstSix) >= 622126 && Number(firstSix) <= 622925 || Number(firstThree) >= 644 && Number(firstThree) <= 649 || num.startsWith('65') || num.startsWith('6011')) {
      return 'discover';
    }

    if (Number(firstFour) >= 3528 && Number(firstFour) <= 3589) {
      return 'jcb';
    }
  }

  if (num.length === 16) {
    if (Number(firstTwo) >= 51 && Number(firstTwo) <= 55 || Number(firstSix) >= 222100 && Number(firstSix) <= 272099) {
      return 'master';
    }

    if (Number(firstFour) >= 2200 && Number(firstFour) <= 2204) {
      return 'mir';
    }
  }

  if (num.length === 13 || num.length === 16 || num.length === 19) {
    if (num.startsWith('4')) {
      return 'visa';
    }
  }
  return 'Другая платежная система';
}
