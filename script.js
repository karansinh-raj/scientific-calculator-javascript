// handling dropdowns
// trigonometry dropdown
const trigonometryCellButton = document.getElementById('trigonometry-cell-button');
trigonometryCellButton.onclick = ()=>{
    if(document.getElementById("trigonometry-cell-content").style.display==="block"){
        document.getElementById("trigonometry-cell-content").style.display="none";
    }else{
        document.getElementById("trigonometry-cell-content").style.display="block";
    }
}

// function dropdown
const functionCellButton = document.getElementById('function-cell-button');
functionCellButton.onclick = ()=>{
    if(document.getElementById("function-cell-content").style.display==="block"){
        document.getElementById("function-cell-content").style.display="none";
    }else{
        document.getElementById("function-cell-content").style.display="block";
    }
}

// binding HTML buttons with JS vars
const equationText = document.getElementById("equation");
const outputText = document.getElementById("output");

const numberButtons = document.querySelectorAll("[data-number]");
const equalButton = document.getElementById('equal-btn');
const allClearButton = document.getElementById('all-clear-btn');
const backspaceButton = document.getElementById('backspace-btn');
const signToggleButton = document.getElementById('sign-toggle-btn');
const unaryOperationButtons = document.querySelectorAll("[data-unary-operation]");
const directValueButtons = document.querySelectorAll("[data-direct-value]");

const feButton = document.getElementById('fe-btn');
const memoryStoreButton = document.getElementById('ms-btn');
const memoryReadButton = document.getElementById('mr-btn');
const memoryPlusButton = document.getElementById('mPlus-btn');
const memoryMinusButton = document.getElementById('mMinus-btn');
const memoryClearButton = document.getElementById('mc-btn');

const powerCellButton = document.getElementById('power-cell');

// creating Calculator class
class Calculator{

    // to init
    constructor(){

        // state to store all equations/ numbers
        this.equation = 0;

        // to handle decimals in equation
        this.isDecimalLegal = true;

        this.feMode = false;
        
        this.powerMode = false;

        this.isOperatorLegal = true;

        // result text init
        equationText.innerText = '';
        outputText.innerText = this.equation;

        // to check memory state and toggle MC, MR button state
        toggleClearAndReadButtons();
    }

    // returns current equation
    getEquation(){
        return this.equation;
    }

    // returns current equation
    equationToExponential(){
        if(this.feMode){
            this.equation = Number(this.equation).toFixed();
            this.feMode = false;
        }else{
            this.equation = Number(this.equation).toExponential();
            this.feMode = true;
        }
        outputText.innerText = this.equation;
    }

    // append newly added number to equation
    appendNumber(number){

        // to prevent multiple zeroes
        if(this.equation === 0 && number === '0') return;

        if((number === '+' || number === '-' || number === '*' || number === '/' || number === '%') && this.isOperatorLegal === false){
            return;
        }

        // to allow decimal digits after operator
        if((number === '+' || number === '-' || number === '*' || number === '/' || number === '%') && this.isOperatorLegal){
            this.isOperatorLegal = false;
            this.isDecimalLegal = true;
        }else{
            this.isOperatorLegal = true;
        }

        // checking if decimal dot is allowed or not and, set to false to prevent multiple decimal dots
        if(number === '.'){
            if(this.isDecimalLegal === false){
                return;
            }else{
                this.isDecimalLegal = false;
            }
        }

        // append number to equation
        if(this.equation === 0){
            this.equation = number;
        }else{
            this.equation += number;
        }

        // displaying equation to output (result section)
        equationText.innerText = '';
        outputText.innerText = this.equation;
    }

    // to compute binary operations
    compute(){
        try{
            let computation = eval(this.equation);
            equationText.innerText = `${this.equation} =`;
            outputText.innerText = computation;

            if(computation === Infinity){
                this.equation = 0;
            }else{
                this.equation = computation;
            }
        }catch(err){
            equationText.innerText = `${this.equation} =`;
            outputText.innerText = `Invalid expression`;
            this.equation = 0;
        }
    }

    // to toggle the sign of number
    signToggle(){
        let equationNumber = parseFloat(this.equation);
        if(equationNumber>0){
            this.equation = Math.abs(equationNumber)*-1;
        }else{
            this.equation = Math.abs(equationNumber);
        }
        outputText.innerText = this.equation;
    }

    // to compute the unary operations
    unaryOperation(operation){
        if (this.equation === '') return;
        let computation;

        const current = parseFloat(this.equation);
        if(isNaN(current)) return;

        switch(operation){
            // trigonometry
            case 'sin':
                computation = Math.sin(current);
                break;
            case 'cos':
                computation = Math.cos(current);
                break;
            case 'tan':
                computation = Math.tan(current);
                break;
            case 'hyp':
                computation = Math.hypot(current);
                break;
            case 'sec':
                computation = 1 / Math.cos(current);
                break;
            case 'csc':
                computation = 1 / Math.sin(current);
                break;
            case 'cot':
                computation = 1 / Math.tan(current);
                break;
            
            // function
            case 'ceil':
                computation = Math.ceil(current);
                break;
            case 'floor':
                computation = Math.floor(current);
                break;
            case 'abs':
                computation = Math.abs(current);
                break;

            // others
            case 'ln':
                if(current!==0){
                    computation = Math.log(current);
                }else{
                    computation = 'invalid input';
                }
                break;
            case 'log':
                if(current!==0){
                    computation = Math.log10(current);
                }else{
                    computation = 'invalid input';
                }
                break;
            case '10^':
                computation = Math.pow(10,current);
                break;
            case 'sqrt':
                computation = Math.sqrt(current);
                break;
            case 'cuberoot':
                computation = Math.cbrt(current);
                break;
            case 'sqr':
                computation = Math.pow(current,2);
                break;
            case '1/':
                computation = 1 / current;
                break;
            case 'exp':
                computation = current.toExponential();
                break;
            
            // 2nd function
            case 'cube':
                computation = Math.pow(current,3);
                break;
            case '2^':
                computation = Math.pow(2,current);
                break;
            case 'e^':
                computation = Math.pow(Math.E,current);
                break;

            // factorial
            case '!':
                let factorial = (number)=>{
                    let temp=1;
                    for(let i=2; i<=number; i++){
                        temp = temp*i;
                    }
                    return temp;
                }
                computation = factorial(current);
                break;
            default:
                return;
        }
        equationText.innerText = `${operation}(${this.equation}) =`;
        outputText.innerText = computation;

        if(isNaN(computation) || computation === Infinity){
            this.equation = 0;
        }else{
            this.equation = computation;
        }
    }

    // to print direct values of const like PI
    printDirectValue(value){
        let computation;
        switch(value){
            case 'pi':
                computation = Math.PI;
                break;
            case 'e':
                computation = Math.E;
                break;
            case 'rand':
                computation = Math.random();
                break;
        }
        this.equation = computation;
        outputText.innerText = this.equation;
    }

    // to clear all equation, output text
    clear(){
        this.equation = 0;
        this.isDecimalLegal = true;
        this.isOperatorLegal = true;

        equationText.innerText = '';
        outputText.innerText = this.equation;
    }

    // to backspace one char from equation
    backspace(){
        this.equation = this.equation.toString().slice(0,-1);
        if(this.equation===''){
            this.equation=0
        }
        this.isDecimalLegal = true;
        this.isOperatorLegal = true;
        outputText.textContent = this.equation;
    }
}

// creating object of class Calculator
const calculator = new Calculator();

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.getAttribute('data-number'));
    });
});

equalButton.onclick = ()=>{
    calculator.compute();
}

allClearButton.onclick = ()=>{
    calculator.clear();
}

backspaceButton.onclick = ()=>{
    calculator.backspace();
}

signToggleButton.onclick = ()=>{
    calculator.signToggle();
}

unaryOperationButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.unaryOperation(button.getAttribute('data-unary-operation'));
    });
});

directValueButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.printDirectValue(button.getAttribute('data-direct-value'));
    });
});

feButton.onclick = ()=>{
    calculator.equationToExponential();
    if(calculator.feMode){
        feButton.style.borderBottom = "2px solid var(--primaryColor)";
    }else{
        feButton.style.borderBottom = "none";
    }
}

powerCellButton.onclick = ()=>{
    turnOnPowerMode();
    if(calculator.powerMode){
        powerCellButton.style.backgroundColor = "var(--primaryColor)";
        powerCellButton.style.color = "var(--cardBackgroundColor)";
    }else{
        powerCellButton.style.backgroundColor = "var(--cardSecondaryBackgroundColor)";
        powerCellButton.style.color = "var(--textColor)";
    }
}

function turnOnPowerMode(){
    if(calculator.powerMode){
        document.getElementById('sqrOrCube').setAttribute('data-unary-operation',"sqr");
        document.getElementById('sqrOrCube').innerHTML = "x<sup>2</sup>";

        document.getElementById('sqrtOrCuberoot').setAttribute('data-unary-operation',"sqrt");
        document.getElementById('sqrtOrCuberoot').innerHTML = "&#8730;";

        document.getElementById('10RaiseXOr2RaiseX').setAttribute('data-unary-operation',"10^");
        document.getElementById('10RaiseXOr2RaiseX').innerHTML = "10<sup>x</sup>";

        document.getElementById('logOrERaiseX').setAttribute('data-unary-operation',"log");
        document.getElementById('logOrERaiseX').innerHTML = "log";

        calculator.powerMode = false;
    }else{
        document.getElementById('sqrOrCube').setAttribute('data-unary-operation',"cube");
        document.getElementById('sqrOrCube').innerHTML = "x<sup>3</sup>";

        document.getElementById('sqrtOrCuberoot').setAttribute('data-unary-operation',"cuberoot");
        document.getElementById('sqrtOrCuberoot').innerHTML = "&#8731;";

        document.getElementById('10RaiseXOr2RaiseX').setAttribute('data-unary-operation',"2^");
        document.getElementById('10RaiseXOr2RaiseX').innerHTML = "2<sup>x</sup>";

        document.getElementById('logOrERaiseX').setAttribute('data-unary-operation',"e^");
        document.getElementById('logOrERaiseX').innerHTML = "e<sup>x</sup>";

        calculator.powerMode = true;
    }
}

memoryStoreButton.onclick = ()=>{
    if(calculator.getEquation() !== ''){
        localStorage.setItem('calculator-item',calculator.getEquation());
        toggleClearAndReadButtons();
    }
}

memoryReadButton.onclick = ()=>{
    if(localStorage.getItem('calculator-item') !== null){
        calculator.clear();
        calculator.appendNumber(localStorage.getItem('calculator-item'));
    }
}

memoryPlusButton.onclick = ()=>{

    const current = parseFloat(calculator.getEquation());
    if(localStorage.getItem('calculator-item') !== null){
        let memoryValue = Number(localStorage.getItem('calculator-item'));
        localStorage.setItem('calculator-item', memoryValue + current);
    }
}

memoryMinusButton.onclick = ()=>{

    const current = parseFloat(calculator.getEquation());
    if(localStorage.getItem('calculator-item') !== null){
        let memoryValue = Number(localStorage.getItem('calculator-item'));
        localStorage.setItem('calculator-item', memoryValue - current);
    }
}

memoryClearButton.onclick = ()=>{
    if(localStorage.getItem('calculator-item')){
        localStorage.removeItem('calculator-item');
        toggleClearAndReadButtons();
    }
}

// to toggle state of MC and MR button based on memory value
function toggleClearAndReadButtons(){
    if(localStorage.getItem('calculator-item') === null){
        memoryClearButton.style.opacity = '0.1';
        memoryReadButton.style.opacity = '0.1';

        memoryClearButton.style.pointerEvents = "none";
        memoryReadButton.style.pointerEvents = "none";

    }else{
        memoryClearButton.style.opacity = '1';
        memoryReadButton.style.opacity = '1';

        memoryClearButton.style.pointerEvents = "auto";
        memoryReadButton.style.pointerEvents = "auto";
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.function-cell-button')) {
      let dropdowns = document.getElementsByClassName("function-cell-content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.style.display==="block") {
            openDropdown.style.display="none";
        }
      }
    }
    if (!event.target.matches('.trigonometry-cell-button')) {
        let dropdowns = document.getElementsByClassName("trigonometry-cell-content");
        for (let i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.style.display==="block") {
              openDropdown.style.display="none";
          }
        }
    }
    if (!event.target.matches('.power-cell-button')) {
        let dropdowns = document.getElementsByClassName("power-cell-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.style.display==="block") {
                openDropdown.style.display="none";
            }
        }
    }
}

// keyboard events
window.addEventListener('keydown', (e)=>{
    if ((e.key >= 0 && e.key <= 9) || (e.key === "+" || e.key === "-" || e.key === "*" ||e.key === "/" || e.key === "%" || e.key === "." || e.key === "(" || e.key === ")")) { 
        calculator.appendNumber(e.key);
    }
    if(e.key === "Enter"){
        calculator.compute();
    }
    if(e.key === "Backspace"){
        calculator.backspace();
    }
    if(e.key === "Escape"){
        calculator.clear();
    }
});