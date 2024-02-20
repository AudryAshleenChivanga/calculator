document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelector('.calculator-keys');
    const display = document.querySelector('.calculator-screen');

    keys.addEventListener('click', e => {
        if (!e.target.matches('button')) return;

        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.value;
        const previousKeyType = keys.dataset.previousKeyType;

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.value = keyContent;
            } else {
                display.value = displayedNum + keyContent;
            }
            keys.dataset.previousKeyType = 'number';
        }

        if (key.classList.contains('operator')) {
            keys.dataset.previousKeyType = 'operator';
            keys.dataset.firstValue = displayedNum;
            keys.dataset.operator = key.value;
        }

        if (key.classList.contains('decimal')) {
            if (!displayedNum.includes('.')) {
                display.value = displayedNum + '.';
            }
            keys.dataset.previousKeyType = 'decimal';
        }

        if (key.classList.contains('all-clear')) {
            display.value = '0';
            delete keys.dataset.previousKeyType;
            delete keys.dataset.firstValue;
            delete keys.dataset.modValue;
            delete keys.dataset.operator;
        }

        if (key.classList.contains('equal-sign')) {
            const firstValue = keys.dataset.firstValue;
            const operator = keys.dataset.operator;
            const secondValue = displayedNum;

            display.value = calculate(firstValue, operator, secondValue);
            keys.dataset.previousKeyType = 'calculate';
        }

        function calculate(n1, operator, n2) {
            let result = '';

            if (operator === '+') {
                result = parseFloat(n1) + parseFloat(n2);
            } else if (operator === '-') {
                result = parseFloat(n1) - parseFloat(n2);
            } else if (operator === '*') {
                result = parseFloat(n1) * parseFloat(n2);
            } else if (operator === '/') {
                result = parseFloat(n1) / parseFloat(n2);
            }

            return result;
        }
    });
});
