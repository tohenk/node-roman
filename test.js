const r = require('./index');

for (let i = 0; i <= 9; i++) {
    console.log('Digit in roman: %d => %s', i, r.digitInRoman(i, 'IVX'));
}

const num = 3999;
console.log('Number to roman: %d => %s', num, r.toRoman(num));

const str1 = 'abcIX';
console.log('Is roman: %s => %s', str1, r.isRoman(str1));

const str2 = 'CDXLIX';
console.log('Is roman: %s => %s', str2, r.isRoman(str2));

const str3 = 'MMMCMXCIX';
console.log('To integer: %s => %s', str3, r.toInteger(str3));
