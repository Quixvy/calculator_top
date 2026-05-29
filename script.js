const add = (num1,num2) => num1 + num2;
const subtract = (num1,num2) => num1 - num2;
const multiply = (num1,num2) => num1 * num2;
const divide = (num1,num2) => (num2 === 0)? "invalid": num1 / num2;

let firstNumber = '';
let operator = '';
let secondNumber = '';
let shouldResetScreen = false;


const operate = (operator,a,b) => {
    a = Number(a);
    b = Number(b);

    if (operator === "+") {
        return add(a,b);
    } else if (operator === "-") {
        return subtract(a,b);
    } else if (operator === "*") {
        return multiply(a,b);
    } else if (operator === "/") {
        return divide(a,b);
    } else return "invalid";
}

const display = document.querySelector(".resultContainer");

const numberButtons = document.querySelectorAll(".digits");

function updateDisplayValue(value) {
    display.textContent = value;
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (display.textContent === "0" || shouldResetScreen) {
            display.textContent = button.textContent;
            shouldResetScreen = false;
        } else {
            display.textContent += button.textContent;
        }
    })
})

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (operator && !shouldResetScreen) {
            secondNumber = display.textContent;
            const result = operate(operator,firstNumber,secondNumber);
            updateDisplayValue(result);
            firstNumber = result;
        } else {
            firstNumber = display.textContent;
        }

        operator = button.textContent;
        shouldResetScreen = true;
    })
})

document.querySelector(".equal").addEventListener("click", () => {
    if (!operator) return;

    secondNumber = display.textContent;

    const result = operate(operator,firstNumber,secondNumber);
    updateDisplayValue(result);

    firstNumber = result;
    operator = "";
    shouldResetScreen = true;
})

document.querySelector(".clear").addEventListener("click", () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    display.textContent = "0";
})