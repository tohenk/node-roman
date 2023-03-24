# Roman Number Parser

Usage:

```javascript
const roman = require('@ntlab/roman');

// check if a string is a roman number
const str = 'CDXLIX';
if (roman.isRoman(str)) {
    console.log(`String ${str} is a roman number`);
    console.log(`Value of ${str} is %d`, roman.toInteger(str));
}

// convert number to roman
const num = 2914;
console.log(`Roman number for ${num} is %s`, roman.toRoman(num));
```
