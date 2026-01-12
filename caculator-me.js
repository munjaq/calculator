let currentValue = "0"; // 지금 입력중인 숫자 하나
let previousValue = null; // 문자열, 이전에 확정된 숫자 하나
let operator = null; // 문자열, 값에 붙이지 않음
let shouldResetCurrent = false;

const buttons = [
  { text: "⌫", type: "backspace" },
  { text: "AC", type: "clear" },
  { text: "%", type: "operator" },
  { text: "÷", type: "operator" },
  { text: "7", type: "number" },
  { text: "8", type: "number" },
  { text: "9", type: "number" },
  { text: "x", type: "operator" },
  { text: "4", type: "number" },
  { text: "5", type: "number" },
  { text: "6", type: "number" },
  { text: "-", type: "operator" },
  { text: "1", type: "number" },
  { text: "2", type: "number" },
  { text: "3", type: "number" },
  { text: "+", type: "operator" },
  { text: "±", type: "sign" },
  { text: "0", type: "number" },
  { text: ".", type: "decimal" },
  { text: "=", type: "calculate" },
];

const buttonContainer = document.getElementById("button-container");
const resultContainer = document.getElementById("result-container");

function appendNumber(num) {
  currentValue += num;
  console.log(currentValue);
}

function appendDecimal() {
  currentValue += ".";
  console.log(currentValue);
}

function setOperator(op) {
  operator = op; // 연산자 세팅
  shouldResetCurrent = true;
  console.log(operator);
}

function backspace() {
  currentValue = currentValue.slice(0, -1);
  console.log(currentValue);
}

function clearAll() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  shouldResetCurrent = false;
  console.log(currentValue, previousValue, operator, shouldResetCurrent);
}

function toggleSign() {
  const oppositeSignValue = Math.sign(currentValue);
  currentValue = String(oppositeSignValue);
  console.log(currentValue);
}

function percent(num) {
  currentValue = num / 100;
  console.log(currentValue);
} //숫자+%: "현재값을 100으로 나눔" 규칙 (%단항 연산일 경우를 따로 분리)

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "÷":
      return a / b;
    case "x":
      return a * b;
    case "%":
      return a % b; // 연산만 담당 %:숫자&숫자:나머지
  }
  console.log(currentValue);
}

function makeButtons() {
  buttons.forEach((button) => {
    const buttonElement = document.createElement("button");

    buttonElement.textContent = button.text;

    switch (button.type) {
      case "number":
        buttonElement.addEventListener("click", () => appendNumber(button.text));
        break;
      case "operator":
        buttonElement.addEventListener("click", () => setOperator(button.text));
        break;
      case "backspace":
        buttonElement.addEventListener("click", () => backspace());
        break;
      case "clear":
        buttonElement.addEventListener("click", () => clearAll());
        break;
      case "sign":
        buttonElement.addEventListener("click", () => toggleSign());
      case "decimal":
        buttonElement.addEventListener("click", () => appendDecimal());
        break;
      case "equal":
        buttonElement.addEventListener("click", () => calculate(previousValue, currentValue, operator));
    }

    buttonContainer.append(buttonElement);
  });
}

function render() {
  makeButtons();
}

render();
