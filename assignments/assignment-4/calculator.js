class Calculator {
    constructor() {
        this.display = document.querySelector('.display');
        this.buttons = document.querySelectorAll('button');
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        
        this.initialize();
    }

    initialize() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.textContent));
        });

        // Add keyboard support
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            if (key >= '0' && key <= '9' || key === '.' || 
                key === '+' || key === '-' || key === '*' || key === '/' ||
                key === 'Enter' || key === 'Escape' || key === '%') {
                event.preventDefault();
                this.handleButtonClick(key);
            }
        });
    }

    handleButtonClick(value) {
        if (value >= '0' && value <= '9' || value === '.') {
            this.handleNumber(value);
        } else if (value === 'AC') {
            this.clear();
        } else if (value === '+/-') {
            this.toggleSign();
        } else if (value === '%') {
            this.percentage();
        } else if (value === '=' || value === 'Enter') {
            this.calculate();
        } else {
            this.handleOperation(value);
        }
    }

    handleNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentValue = '0';
            this.shouldResetDisplay = false;
        }

        if (number === '.' && this.currentValue.includes('.')) {
            return;
        }

        if (this.currentValue === '0' && number !== '.') {
            this.currentValue = number;
        } else {
            this.currentValue += number;
        }

        this.updateDisplay();
    }

    handleOperation(operator) {
        if (this.operation && !this.shouldResetDisplay) {
            this.calculate();
        }

        this.previousValue = this.currentValue;
        this.operation = operator;
        this.shouldResetDisplay = true;
    }

    calculate() {
        if (!this.operation || this.shouldResetDisplay) return;

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
            case '*':
                result = prev * current;
                break;
            case '÷':
            case '/':
                if (current === 0) {
                    this.currentValue = 'Error';
                    this.updateDisplay();
                    return;
                }
                result = prev / current;
                break;
        }

        this.currentValue = result.toString();
        this.operation = null;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    toggleSign() {
        this.currentValue = (parseFloat(this.currentValue) * -1).toString();
        this.updateDisplay();
    }

    percentage() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        this.updateDisplay();
    }

    updateDisplay() {
        // Format the number to handle large numbers and decimals
        let displayValue = this.currentValue;
        if (displayValue !== 'Error') {
            const num = parseFloat(displayValue);
            if (!isNaN(num)) {
                // Handle large numbers
                if (Math.abs(num) > 999999999) {
                    displayValue = num.toExponential(6);
                } else {
                    // Format to remove unnecessary decimal places
                    displayValue = num.toString();
                    if (displayValue.includes('.')) {
                        displayValue = displayValue.replace(/\.?0+$/, '');
                    }
                }
            }
        }

        // Limit display length
        if (displayValue.length > 12) {
            displayValue = displayValue.substring(0, 12);
        }

        this.display.textContent = displayValue;
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
}); 