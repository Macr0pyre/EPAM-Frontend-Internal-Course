export default function calculate(str) {
    var result = 0;
    var operators = ["-", "+", "*", "/"];
    var matches = str.match(/([0-9]*\.?[0-9]+)|[-+*/=]/g);

    if (!matches) {
        return "Введите выражение";
    }
    if (matches.indexOf("=") == -1) {
        return "Выражение должно оканчиваться знаком =";
    }
    if (matches[0] === "+" || matches[0] === "-") {
        matches[1] = matches[0] + matches[1];
        matches.shift();
    }

    if (matches[0] == "=") {
        return 0;
    } else if (!isNaN(matches[0])) {
        result = +matches[0];
    } else {
        return "Некорректный ввод выражения";
    }

    for (var i = 0; i < matches.length - 2; i++) {
        var isOperatorFound = operators.indexOf(matches[i]) != -1;
        var isSignFound = matches[i + 1] === "+" || matches[i + 1] === "-";

        if (isOperatorFound && isSignFound) {
            matches[i + 2] = matches[i + 1] + matches[i + 2];
            matches.splice(i + 1, 1);
            i--;
        }
    }

    for (var i = 1; i < matches.length; i += 2) {
        if (matches[i] == "=") {
            return result.toFixed(2);
        }
        if (operators.indexOf(matches[i]) != -1 && !isNaN(matches[i + 1])) {
            switch (matches[i]) {
                case "-":
                    result -= +matches[i + 1];
                    break;
                case "+":
                    result += +matches[i + 1];
                    break;
                case "*":
                    result *= +matches[i + 1];
                    break;
                case "/":
                    result /= +matches[i + 1];
                    break;
            }
        } else {
            return "Некорректный ввод выражения";
        }
    }
}