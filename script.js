const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')
const screen = document.querySelector('.calculatorScreen')
const upperScreen = document.querySelector('.lastScreen')
const clear = document.querySelector('.clear')
const backspace = document.querySelector('.backspace')
const dot = document.querySelector('.dot')
const plusminus = document.querySelector('.plusminus')
const buttons = document.querySelectorAll('button')
//float numbers with '.'
dot.addEventListener('click', ()=>{
    let charDot = '.'
    if (screen.innerText.includes(charDot)){
        return;
    }
    if (screen.innerText == ''){
        screen.innerText = '0.'
        updateNumber()
        return;
    }
        screen.innerText += charDot
    });

//shows on the calculator screen the number that the user is inputing
numbers.forEach((element)=>{
    element.addEventListener('click', showDigitOnScreen)
})
function showDigitOnScreen(){
    screen.innerText += this.value
    updateNumber()
}

//stores in a variable the number from the screen
let currentNumber;
function updateNumber(){
    currentNumber = parseFloat(screen.innerText);
}

//shows the sign of the operator used
let operatorSign;
operators.forEach((element)=>{
    element.addEventListener('click', showOperator)
})

//saves the second number in another variable and updates the other variable
let upperNumber;
function showOperator(){
    if(upperScreen.innerText != '' && screen.innerText == ''){
        upperScreen.innerText = upperNumber + this.value
        operatorSign = this.value 
        return;
    }
    if (!checkToCancelOperation()){
        return false
    }
    if (operatorSign == undefined){
        upperNumber = currentNumber
        upperScreen.innerText = `${upperNumber} ${this.value}`
        screen.innerText = ''
        updateNumber()
        operatorSign = this.value
        return;
    }
    upperScreen.innerText = operate(currentNumber, upperNumber, operatorSign) + this.value
    screen.innerText = ''
    updateNumber()
    operatorSign = this.value 
}
equal.addEventListener('click', showResult)
function showResult(){
    if(operatorSign != undefined && upperNumber != undefined && currentNumber != undefined){
        if(Number.isNaN(currentNumber)){
            return;
        }
        upperScreen.innerText = operate(currentNumber, upperNumber, operatorSign)
        if (upperScreen.innerText == "Can't divide by 0 - Reseting..."){
            blockAndReset();
        }
        screen.innerText = ''
        updateNumber()
        operatorSign = undefined
    }
}

//define the math operator with the sign string
function operate(n1, n2, op){
    let result;
    switch(op){
        case('x'):
                result = n2*n1
            break
        case('÷'):
                result = n2/n1
            break
        case('+'):
                result = n2+n1
            break
        case('-'):
                result = n2-n1
            break
    }
    upperNumber = result;
    if(Number.isNaN(upperNumber) || upperNumber == Infinity){
        upperNumber = undefined
        return "Can't divide by 0 - Reseting...";
    }
    if (result % 1 == 0){
        return result
    }
    return result.toFixed(7);
}

//resets calculator
clear.addEventListener('click', resetCalculator)
function resetCalculator(){
    buttons.forEach(element => {
        element.disabled = false;
    });    
    upperNumber = undefined
    currentNumber = undefined
    operatorSign = undefined
    screen.innerText = ''
    upperScreen.innerText = ''

}

//deletes last digit
backspace.addEventListener('click',()=>{
    if(!checkToCancelOperation()){
        return false
    }
    let numbersTotext = currentNumber.toString()
    index = numbersTotext.length-1
    let newNumbers;
    if (index == 0 || (index == 1 &&numbersTotext[0] == '-')){
        newNumbers = undefined
        currentNumber = undefined
        screen.innerText = ''
        return;
    }
    newNumbers = numbersTotext.slice(0,index)
    currentNumber = parseFloat(newNumbers)
    screen.innerText = currentNumber

})

//transform current number to - or +
plusminus.addEventListener('click', () =>{
    if(!checkToCancelOperation()){
        return false
    }
    screen.innerText = parseFloat(screen.innerText) * (-1)
    updateNumber()
})

//checks if the button should not work
function checkToCancelOperation(){
    if (screen.innerText == ''){
        return false
    }
    return true
}

function blockAndReset(){
    buttons.forEach(element => {
        element.disabled = true;
    });
    setTimeout(resetCalculator, 3000)
}

