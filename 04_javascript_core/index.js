import calculate from "./functions/calculator.js";
import removeChars from "./functions/chars_remover.js";
import formatDate from "./functions/date_formatter.js";
import chainSum from "./functions/chain_sum.js";
import customMap from "./functions/custom_map.js";

document.querySelector(".calculator-button").onclick = function() {
    document.querySelector(".calculator-result").textContent = calculate(document.getElementById("calculator-input").value);
}

document.querySelector(".remover-button").onclick = function() {
    document.querySelector(".remover-result").textContent = "Результат: " + removeChars(document.getElementById("remover-input").value);
}

document.querySelector(".formatter-button").onclick = function() {
    document.querySelector(".formatter-result").textContent = "Результат: " + formatDate(document.getElementById("formatter-input-date").value, document.getElementById("formatter-input").value, document.getElementById("formatter-select").value);
}

console.log("Задание 4");
console.log("chainSum(1)(2)(3)(4)()");
console.log(chainSum(1)(2)(3)(4)());
console.log("chainSum(1)(2)(“a”)(4)()");
console.log(chainSum(1)(2)("a")(4)());
console.log("chainSum(1)(2)(“3”)(4)()");
console.log(chainSum(1)(2)("3")(4)());
console.log("chainSum()");
console.log(chainSum());

console.log("Задание 5");
console.log("[1,2,3,4,5].customMap(function(x){return ++x;})");
console.log([1,2,3,4,5].customMap(function(x){return ++x;}));
console.log("[2, 4, 49].customMap(Math.sqrt)");
console.log([2, 4, 49].customMap(Math.sqrt));
console.log("[3, 4, 1].customMap((i) => i * i * i)");
console.log([3, 4, 1].customMap((i) => i * i * i));

console.log("Задание 3 из примечания:")
console.log("(new Date(2015, 2, 4)).format(\"yyyy_MM_dd HH_mm_ss\")");
console.log((new Date(2015, 2, 4)).format("yyyy_MM_dd HH_mm_ss"));