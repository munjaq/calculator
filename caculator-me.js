let currentValue = ""; // 지금 입력중인 숫자 하나
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
  if (shouldResetCurrent) {
    currentValue = "";
    currentValue = num;
    shouldResetCurrent = false;
  } else {
    currentValue += num;
  }
  console.log("prev:", previousValue, "current:", currentValue, "op:", operator);
}

function appendDecimal() {
  currentValue += ".";
}

function backspace() {
  currentValue = currentValue.slice(0, -1);
}

function clearAll() {
  currentValue = "";
  previousValue = null;
  operator = null;
  shouldResetCurrent = false;
}

function toggleSign() {
  const oppositeSignValue = currentValue * -1;
  currentValue = String(oppositeSignValue);
}

function percent(num) {
  currentValue = num / 100;
}

function setOperator(op) {
  operator = op; // 연산자 세팅
  previousValue = currentValue; // 이전 숫자 상태는 여기서
  shouldResetCurrent = true;
}

function operate(a, b, op) {
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
}

function calculate(a, b, op) {
  if (currentValue === "" || previousValue === null || operator === null) return;

  const na = Number(a);
  const nb = Number(b);

  currentValue = String(operate(na, nb, op));

  previousValue = null;
  operator = null;
  shouldResetCurrent = true;
}

function clearResultContainer() {
  resultContainer.textContent = "";
}

function makeButtons() {
  buttons.forEach((button) => {
    const buttonElement = document.createElement("button");

    buttonElement.textContent = button.text;

    switch (button.type) {
      case "number":
        buttonElement.addEventListener("click", () => {
          appendNumber(button.text);
          render();
        });
        break;
      case "operator":
        buttonElement.addEventListener("click", () => {
          if (previousValue && currentValue) {
            calculate(previousValue, currentValue, operator);
          }
          setOperator(button.text);
          render();
        });
        break;
      case "backspace":
        buttonElement.addEventListener("click", () => {
          backspace();
          render();
        });
        break;
      case "clear":
        buttonElement.addEventListener("click", () => {
          clearAll();
          clearResultContainer();
          render();
        });
        break;
      case "sign":
        buttonElement.addEventListener("click", () => {
          toggleSign();
          render();
        });
        break;
      case "decimal":
        buttonElement.addEventListener("click", () => {
          appendDecimal();
          render();
        });
        break;
      case "calculate":
        buttonElement.addEventListener("click", () => {
          calculate(previousValue, currentValue, operator);
          render();
        });
        break;
    }

    buttonContainer.append(buttonElement);
  });
}

function render() {
  // 각 버튼 누를 때마다 나오도록 하는 것
  resultContainer.textContent = currentValue;
}

function init() {
  makeButtons();
  render();
}

init();
