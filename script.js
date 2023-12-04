let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false;

const display = document.querySelector("#display");
const numButtons = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".op");
const equalsButton = document.querySelector("#equals");
const allClearButton = document.querySelector("#all-clear");
const plusMinusButton = document.querySelector("#plus-minus");
const percentageButton = document.querySelector("#percentage");

numButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.value));
});

opButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.value));
});

equalsButton.addEventListener("click", evaluate);
allClearButton.addEventListener("click", allClear);
plusMinusButton.addEventListener("click", plusMinus);
percentageButton.addEventListener("click", percentage);

function appendNumber(number) {
  if (display.value === "0" || shouldResetScreen) resetScreen();
  display.value += number;
}

function setOperation(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = display.value;
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  secondOperand = display.value;
  display.value = roundResult(
    operate(currentOperator, firstOperand, secondOperand)
  );
  currentOperator = null;
}

function allClear() {
  display.value = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
}

function plusMinus() {
  display.value = display.value * -1;
}

function percentage() {
  display.value = display.value / 100;
}

function resetScreen() {
  display.value = "";
  shouldResetScreen = false;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) return null;
      else return a / b;
    default:
      return null;
  }
}
