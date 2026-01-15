let currentValue = ""; // 지금 입력중인 숫자 하나
let previousValue = null; // 문자열, 이전에 확정된 숫자 하나
let operator = null; // 문자열, 값에 붙이지 않음
let lastOperand = null; // 마지막 계산에 쓰인 숫자
let phase = "entering"; // entering, opPending, result

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
  if (phase === "opPending" || phase === "result") {
    currentValue = num;
    phase = "entering";
    return;
  } else {
    currentValue += num;
  }
  console.log("prev:", previousValue, "current:", currentValue, "op:", operator);
}

function appendDecimal() {
  if (currentValue.includes(".")) return;
  if (currentValue === "") {
    currentValue += "0.";
    return;
  }
  currentValue += ".";
}

function backspace() {
  currentValue = currentValue.slice(0, -1);
}

function clearAll() {
  currentValue = "";
  previousValue = null;
  operator = null;
  lastOperand = null;
  phase = "entering"; // 초기 상태
}

function toggleSign() {
  const n = Number(currentValue);

  const oppositeSignValue = n * -1;
  currentValue = String(oppositeSignValue);
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
  if (previousValue === null || operator === null) return;

  const a = Number(previousValue);
  const b = phase === "entering" ? Number(currentValue) : Number(lastOperand ?? previousValue); // B 없으면 반복

  const result = operate(a, b, operator);

  currentValue = String(result);
  previousValue = currentValue; // 결과를 A로 유지
  lastOperand = String(b); // 반복용 B 유지
  phase = "result"; // 결과 표시 상태
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
          if (currentValue === "") return;

          // opPending: B가 없으니 lastOperand(없으면 A)로 반복 계산
          if (phase === "opPending" && previousValue !== null && operator !== null) {
            const a = Number(previousValue);
            const b = Number(lastOperand ?? previousValue);
            const result = operate(a, b, operator);

            currentValue = String(result);
            previousValue = currentValue;
            lastOperand = String(b);
            operator = button.text;
            phase = "opPending";
            render();
            return;
          }

          // entering 상태에서 A op B가 완성된 경우: 누적 계산
          if (previousValue != null && operator !== null && phase === "entering") {
            const a = Number(previousValue);
            const b = Number(currentValue);
            const result = operate(a, b, operator);

            currentValue = String(result);
            previousValue = currentValue;
            lastOperand = String(b);
            operator = button.text;
            phase = "opPending";
            render();
            return;
          }

          //첫 연산자 세팅
          previousValue = currentValue;
          operator = button.text;
          lastOperand = null;
          phase = "opPending";
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
