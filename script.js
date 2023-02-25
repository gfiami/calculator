const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')
const screen = document.querySelector('.calculatorScreen')
const upperScreen = document.querySelector('.lastScreen')
const clear = document.querySelector('.clear')
const backspace = document.querySelector('.backspace')
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
    if(operatorSign == undefined){
        upperNumber = currentNumber
        upperScreen.innerText = `${upperNumber} ${this.value}`
        screen.innerText = ''
        operatorSign = this.value
    } else{
        upperScreen.innerText = operate(currentNumber, upperNumber, operatorSign) + this.value
        screen.innerText = ''
        operatorSign = this.value
        
    }
    
}
equal.addEventListener('click', showResult)
function showResult(){
    if(operatorSign != undefined && upperNumber != undefined && currentNumber != undefined){
        upperScreen.innerText = operate(currentNumber, upperNumber, operatorSign)
        screen.innerText = ''
        operatorSign = undefined
        currentNumber = upperNumber

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
        return result;
}

//resets calculator
clear.addEventListener('click', ()=>{
    upperNumber = undefined
    currentNumber = undefined
    operatorSign = undefined
    screen.innerText = ''
    upperScreen.innerText = ''
})

//deletes last digit
backspace.addEventListener('click',()=>{
     let numbersTotext = currentNumber.toString()
     index = numbersTotext.length-1
     let newNumbers = numbersTotext.slice(0,index)
     currentNumber = parseFloat(newNumbers)
     screen.innerText = currentNumber
    
})