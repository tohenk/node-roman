/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2023 Toha <tohenk@yahoo.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


/**
 * Roman numbers.
 */
class Roman {

    ruleValue(index) {
        return Roman.rules[index].value;
    }

    ruleCount(index) {
        return Roman.rules[index].count;
    }

    charIndex(ch) {
        return Roman.chars.indexOf(ch);
    }

    charValue(ch) {
        const i = this.charIndex(ch);
        if (i >= 0) {
            const base = this.ruleValue(i % 2);
            const digit = parseInt(i / 2);
            return base * 10 ** digit;
        }
    }

    digitInRoman(digit, chars) {
        let s = '';
        let rep = digit % 5;
        let p = Math.floor(digit / 5);
        let nidx;
        let cnt = this.ruleCount(0);
        if (p > 0 && rep <= cnt && chars.length > 1) {
            s += chars.substr(p, 1);
        }
        if (rep > cnt) {
            rep = this.ruleCount(1);
            nidx = p + 1;
        }
        if (rep > 0 && (!nidx || (nidx && chars.length > 1))) {
            s += chars.substr(0, 1).repeat(rep);
        }
        if (nidx && chars.length > 1) {
            s += chars.substr(nidx, 1);
        }
        return s;
    }

    toRoman(value) {
        let s = '';
        if (typeof value !== 'undefined') {
            const digits = value.toString();
            for (let i = 0; i < digits.length; i++) {
                let digit = parseInt(digits.substr(i, 1));
                let chars = Roman.chars.substr((digits.length - 1 - i) * 2, 3);
                if (chars.length) {
                    s += this.digitInRoman(digit, chars);
                }
            }
        }
        return s;
    }

    isRoman(str) {
        let valid = false;
        let lastIndex, lastMatch, lastChar;
        let char, index, digit, saveIndex, matchCount;
        let checkOrder = false;
        const c0 = this.ruleCount(0);
        const c1 = this.ruleCount(1);
        str = str.toUpperCase();
        for (let i = 0; i < str.length; i++) {
            char = str.substr(i, 1);
            saveIndex = true;
            if (char !== lastChar) {
                matchCount = 1;
                lastChar = char;
            } else {
                matchCount++;
            }
            index = this.charIndex(char);
            // char not valid
            if (index < 0) {
                break;
            }
            // check first character repeat
            if (index % 2 === 0 && matchCount > c0) {
                break;
            }
            // check second character repeat
            if (index % 2 === 1 && matchCount > c1) {
                break;
            }
            // check order
            if (!isNaN(lastIndex)) {
                if (index > lastIndex) {
                    if (lastMatch > 1) {
                        break;
                    }
                    if (checkOrder) {
                        break;
                    }
                    // check allowed combination
                    if (lastIndex % 2 === 1) {
                        break;
                    }
                    if (index > lastIndex + 2) {
                        break;
                    }
                    // Check wheter more char allowed
                    digit = Math.floor(lastIndex / 2);
                    if (digit === 0 && i < str.length - 1) {
                        break;
                    }
                    // If more char, then check the next order, must be lower
                    if (matchCount > 1) {
                        break;
                    }
                    saveIndex = true;
                    checkOrder = true;
                } else if (lastIndex === index) {
                    if (checkOrder) {
                        break;
                    }
                } else {
                    checkOrder = false;
                }
            }
            if (saveIndex) {
                lastIndex = index;
                lastMatch = matchCount;
            }
            // we pass all check
            if (i === str.length - 1) {
                valid = true;
            }
        }
        return valid;
    }

    toInteger(value) {
        let res;
        const s = value.toString().toUpperCase().trim();
        if (this.isRoman(s)) {
            let i = 0;
            let n = s.length;
            let v;
            res = 0;
            while (true) {
                v = this.charValue(s.substr(i, 1));
                if (i + 1 < n && this.charIndex(s.substr(i, 1)) < this.charIndex(s.substr(i + 1, 1))) {
                    v = this.charValue(s.substr(++i, 1)) - v;
                }
                res += v;
                if (++i === n) {
                    break;
                }
            }
        }
        return res;
    }

    static get chars() {
        return 'IVXLCDM';
    }

    static get rules() {
        return [
            {value: 1, count: 3},
            {value: 5, count: 1}
        ];
    }
}

module.exports = new Roman();