const buttons = [
  { text: "⌫", value: "delete", type: "operator" },
  { text: "AC", value: "all-clear", type: "operator" },
  { text: "%", value: "divide-rest", type: "operator" },
  { text: "÷", value: "divide", type: "operator" },
  { text: "7", value: 7, type: "num" },
  { text: "8", value: 8, type: "num" },
  { text: "9", value: 9, type: "num" },
  { text: "x", value: "multiple", type: "operator" },
  { text: "4", value: 4, type: "num" },
  { text: "5", value: 5, type: "num" },
  { text: "6", value: 6, type: "num" },
  { text: "-", value: "minus", type: "operator" },
  { text: "1", value: 1, type: "num" },
  { text: "2", value: 2, type: "num" },
  { text: "3", value: 3, type: "num" },
  { text: "+", value: "plus", type: "operator" },
  { text: "±", value: "switch-sign", type: "operator" },
  { text: "0", value: 0, type: "num" },
  { text: ".", value: "decimal-point", type: "operator" },
  { text: "=", value: "equal", type: "operator" },
];

const buttonContainer = document.getElementById("button-container");
const resultContainer = document.getElementById("result-container");

function buttonClickEvent(button) {
  //   resultContainer.value += button.text;
  switch (button.value) {
    case "delete":
      resultContainer.textContent = resultContainer.textContent.slice(0, -1);
      break;
  }
}

buttons.forEach((button) => {
  const buttonElement = document.createElement("button"); //element라는 지칭이 맞나? node는 왜 아닌가?
  buttonElement.textContent = button.text;
  buttonElement.addEventListener("click", () => buttonClickEvent(button));
  buttonContainer.append(buttonElement);
});
