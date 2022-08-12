export default function chainSum(a) {
    var sum = +a;

    if (a === undefined) {
        return 0;
    }
    if (arguments.length > 1) {
        throw "У вызовов функции может быть только один аргумент!";
    }

    function add(b) {
        if (arguments.length > 1) {
            throw "У вызовов функции может быть только один аргумент!";
        }
        if (b === undefined) {
            return sum;
        }
        if (typeof a !== 'number' || typeof b !== 'number') {
            sum = NaN;
        }
        sum += +b;
        return add;
    }

    return add;
}