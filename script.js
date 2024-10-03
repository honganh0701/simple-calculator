const inputScreen = document.querySelector('.screen .input');

const buttons = document.querySelectorAll('.buttons button');

const outputScreen = document.querySelector('.output');

let currentInput = '';
let previousInput = '';
let operator  = '';
let displayScreen = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.value) {
            case 'all-clear':
                allClearHandle();
                break;
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
                numberInputHandle(button.value);
                break;
            case '+': case '-': case '*' :case '/': case '%':
                opearatorHandle(button.value);
                break;
            case '.':
                decimalPointHandle();
                break;
            case 'sqrt':
                squareRootHandle();
                break;
            case 'one-clear':
                oneClearHandle();
                break;
            case '=':
                calculate();
                break;

        }
        inputScreen.value = displayScreen;
    });
});

function allClearHandle() {
    currentInput = '';
    previousInput ='';
    operator = '';
    displayScreen = '';
    outputScreen.textContent = '';
}

function oneClearHandle(){
    if(displayScreen.length > 0) {
        currentInput = currentInput.slice(0, -1);
        displayScreen = displayScreen.slice(0, -1);
    }
}

function numberInputHandle(numberInput) {
    currentInput += numberInput;
    displayScreen += numberInput;
    console.log(currentInput);
}

function opearatorHandle(operatorInput) {
    previousInput = currentInput;
    currentInput = '';
    operator = operatorInput;

    if (operator === '*') {
        displayScreen +=' \u00D7 ';
    }else if (operator === '/'){
        displayScreen +=' \u00F7 ';
    }else {
        displayScreen += ` ${operator} ` ;
    }
   
}

function decimalPointHandle() {
    // Nếu currentInput rỗng, thêm '0.' thay vì '.'
    if (currentInput === '') {
        currentInput = '0.';
        displayScreen += '0.';
    } 
    // Kiểm tra nếu currentInput đã có dấu chấm, không thêm nữa
    else if (!currentInput.includes('.')) {
        currentInput += '.';  // Thêm dấu '.'
        displayScreen += '.';  // Hiển thị dấu '.' lên màn hình
    }
    console.log(currentInput);
    
}

function squareRootHandle() {
    currentInput += '√';
    displayScreen += '√';

}

function calculate(){
    let result;
    let prev = previousInput;
    let current = currentInput;

    // Xử lý biểu thức với căn bậc hai
    if (prev.includes('√')) {
        prev = Math.sqrt(parseFloat(prev.replace('√', '')));
    }
    if (current.includes('√')) {
        current = Math.sqrt(parseFloat(current.replace('√', '')));
    }

    prev = parseFloat(prev);
    current = parseFloat(current);


    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    outputScreen.textContent = result.toString();
    previousInput = '';
    currentInput = '';
    operator = '';
    
}


