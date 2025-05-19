document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    // Handle number buttons
    document.querySelectorAll('.dark-gray').forEach(button => {
        if (button.textContent !== '.' && button.textContent !== '0') {
            button.addEventListener('click', () => {
                if (waitingForSecondOperand) {
                    display.textContent = button.textContent;
                    waitingForSecondOperand = false;
                } else {
                    display.textContent = display.textContent === '0' ? button.textContent : display.textContent + button.textContent;
                }
            });
        }
    });

    // Handle zero button
    document.querySelector('.zero').addEventListener('click', () => {
        if (display.textContent !== '0') {
            display.textContent += '0';
        }
    });

    // Handle decimal point
    document.querySelector('button:contains(".")').addEventListener('click', () => {
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
    });

    // Handle operators
    document.querySelectorAll('.orange').forEach(button => {
        button.addEventListener('click', () => {
            const currentValue = parseFloat(display.textContent);

            if (operator && !waitingForSecondOperand) {
                const result = calculate(firstOperand, currentValue, operator);
                display.textContent = result;
                firstOperand = result;
            } else {
                firstOperand = currentValue;
            }

            waitingForSecondOperand = true;
            operator = button.textContent;
        });
    });

    // Handle clear button
    document.querySelector('button:contains("AC")').addEventListener('click', () => {
        display.textContent = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    });

    // Handle +/- button
    document.querySelector('button:contains("+/-")').addEventListener('click', () => {
        display.textContent = (-parseFloat(display.textContent)).toString();
    });

    // Handle % button
    document.querySelector('button:contains("%")').addEventListener('click', () => {
        display.textContent = (parseFloat(display.textContent) / 100).toString();
    });

    // Calculate function
    function calculate(first, second, op) {
        switch (op) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '×':
                return first * second;
            case '÷':
                return first / second;
            case '=':
                return second;
            default:
                return second;
        }
    }
}); 