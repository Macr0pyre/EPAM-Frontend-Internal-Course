export default function removeChars(str) {
    var words = str.toLowerCase().split(/[.?,;:!\s]/).filter(e => e),
        chars = [];

    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words[i].length; j++) {
            var isCharInEveryWord = words.every(function(elem) { return elem.indexOf(words[i][j]) != -1 });
            if (isCharInEveryWord) {
                chars.push(words[i][j]);
            }
        }
    }

    chars = chars.filter(function(item, pos) {
        return chars.indexOf(item) == pos;
    })

    return removeCharsFromString(chars, str);
}

function removeCharsFromString(chars, string) {
    var specialSymbols = ["+", "*", "[", "\\", "(", ")"]

    for (let i = 0; i < chars.length; i++) {
        var isSpecialSymbol = specialSymbols.some(function(elem) { return chars[i] === elem });
        if (isSpecialSymbol) {
            var re = new RegExp("\\" + chars[i], 'gi');
        } else {
            var re = new RegExp(chars[i], 'gi');
        }
        string = string.replace(re, '');
    }

    return string;
}