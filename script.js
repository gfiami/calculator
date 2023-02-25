function operate(n1, n2, operator){
    
}
let number1;
let number2;

const numbers = document.querySelectorAll('.number')
numbers.forEach(number => {
    number.addEventListener('click', (e)=>{
        let digit = number.value
        limitNumberLength(digit)
    })
});

const lastScreen = document.querySelector('.lastScreen')
function transferToLastScreen(opperator){
    lastScreen.innerText = screen.innerText
    screen.innerText = '';
    resetLength()
}
const opperators = document.querySelectorAll('.opperator')
opperators.forEach(opperator => {
    opperator.addEventListener('click', (e)=>{
        //if user clicks opperator before a number
        if(screen.innerText == '' && lastScreen.innerText == ''){
            window.alert('Malformed expression')
            return false
        }
        //when opperator is clicked, set numbers to what is in screen
        if(number1 == undefined){
            number1 = parseFloat(screen.innerText)
            transferToLastScreen(opperator.value)
        }else{
            number2 = parseFloat(screen.innerText)
        }
        
    })
})

const screen = document.querySelector('.calculatorScreen')

function updateScreen(digit){
    screen.innerText += digit
}

const maxLength = 13
let currentLength = 0;
function limitNumberLength(digit){
    if(currentLength < 13){
        updateScreen(digit)
        currentLength++
        return true
    }
    return false;
}
function resetLength(){
    currentLength = 0;
}