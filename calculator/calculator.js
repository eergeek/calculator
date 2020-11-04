let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.calc-screen');

document
    .querySelector('.calc-rows')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
        renderer();
    });

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch(value) {
        case 'C':
            buffer = '0';
            runningTotal = 0;  // I did mistakenly '0', super-bug!
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            doOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substr(0, buffer.length - 1);
            }
            break;
        default:
            handleMathValue(value);
            break;
    }
}

function handleMathValue(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        doOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

function doOperation(number) {
    switch (previousOperator) {
        case '+':
            runningTotal += number;
            break;
        case '-':
            runningTotal -= number;
            break;
        case '×':
            runningTotal *= number;
            break;
        case '÷':
            runningTotal /= number;
            break;
    }
}

function renderer() {
    screen.innerText = buffer;
}