document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display");
  const buttons = document.querySelector(".buttons");
  let currentValue = "0";
  let operator = null;
  let previousValue = null;

  function updateDisplay() {
    if (currentValue.length > 10) {
      currentValue = currentValue.slice(0, 10);
    }
    display.textContent = currentValue;
  }

  function clear() {
    currentValue = "0";
    operator = null;
    previousValue = null;
    updateDisplay();
  }

  function handleNumber(number) {
    if (currentValue === "0") {
      currentValue = number;
    } else {
      currentValue += number;
    }
    updateDisplay();
  }

  function handleDecimal() {
    if (!currentValue.includes(".")) {
      currentValue += ".";
      updateDisplay();
    }
  }

  function handleOperator(op) {
    if (previousValue === null) {
      previousValue = Number.parseFloat(currentValue);
    } else if (operator) {
      const result = calculate(
        previousValue,
        Number.parseFloat(currentValue),
        operator
      );
      previousValue = result;
      currentValue = result.toString();
    }
    operator = op;
    currentValue = "0";
    updateDisplay();
  }

  function calculate(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  }

  function handleEquals() {
    if (operator && previousValue !== null) {
      currentValue = calculate(
        previousValue,
        Number.parseFloat(currentValue),
        operator
      ).toString();
      operator = null;
      previousValue = null;
      updateDisplay();
    }
  }

  function handleDelete() {
    if (currentValue.length > 1) {
      currentValue = currentValue.slice(0, -1);
    } else {
      currentValue = "0";
    }
    updateDisplay();
  }

  buttons.addEventListener("click", (event) => {
    const { target } = event;
    if (!target.matches("button")) return;

    if (target.classList.contains("operator")) {
      handleOperator(target.dataset.operator);
    } else if (target.classList.contains("number")) {
      handleNumber(target.dataset.number);
    } else if (target.classList.contains("decimal")) {
      handleDecimal();
    } else if (target.classList.contains("clear")) {
      clear();
    } else if (target.classList.contains("equals")) {
      handleEquals();
    } else if (target.classList.contains("delete")) {
      handleDelete();
    }
  });

  updateDisplay();
});
