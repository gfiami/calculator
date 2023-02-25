const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')
const screen = document.querySelector('.calculatorScreen')
const upperScreen = document.querySelector('.lastScreen')


numbers.forEach((element)=>{
    element.addEventListener('click', showDigitOnScreen)
})

function showDigitOnScreen(){
    screen.innerText += this.value
    updateNumber()
}
let currentNumber;
function updateNumber(){
    currentNumber = parseFloat(screen.innerText);

}

let operatorSign;
operators.forEach((element)=>{
    element.addEventListener('click', showOperator)
})

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


function teste(){
    console.log('oi')
}
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
    
