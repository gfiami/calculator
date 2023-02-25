function operate(n1, n2, operator){
    
}
let number1;
let number2;

const numbers = document.querySelectorAll('.number')
numbers.forEach(number => {
    number.addEventListener('click', (e)=>{
        let digit = parseFloat(number.value)
        updateScreen(digit)
    })
});

const screen = document.querySelector('.calculatorScreen')

function updateScreen(digit){
    screen.innerText += digit
}

const maxLength = 13
let atualLength = 0;
function limitNumberLength(){

}