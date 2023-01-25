// handling dropdowns
const trigonometryCellButton = document.getElementById('trigonometry-cell-button');
trigonometryCellButton.onclick = ()=>{
    if(document.getElementById("trigonometry-cell-content").style.display==="block"){
        document.getElementById("trigonometry-cell-content").style.display="none";
    }else{
        document.getElementById("trigonometry-cell-content").style.display="block";
    }
}

const functionCellButton = document.getElementById('function-cell-button');
functionCellButton.onclick = ()=>{
    if(document.getElementById("function-cell-content").style.display==="block"){
        document.getElementById("function-cell-content").style.display="none";
    }else{
        document.getElementById("function-cell-content").style.display="block";
    }
}

const powerCellButton = document.getElementById('power-cell-button');
powerCellButton.onclick = ()=>{
    if(document.getElementById("power-cell-content").style.display==="block"){
        document.getElementById("power-cell-content").style.display="none";
    }else{
        document.getElementById("power-cell-content").style.display="block";
    }
}

const equationText = document.getElementById("equation");
const outputText = document.getElementById("output");

class Calculator{
    constructor(){
        this.equation = '';
        this.output = '';
    }
    appendNumber(number){
        console.log(this.equation);
        this.equation += number;
        equationText.innerText = this.equation;
    }
    compute(){
        let computation = eval(this.equation);
        outputText.innerText = computation;
    }
    signToggle(){
        let equationNumber = parseFloat(this.equation);
        if(equationNumber>0){
            this.equation = Math.abs(equationNumber)*-1;
        }else{
            this.equation = Math.abs(equationNumber);
        }
        equationText.innerText = this.equation;
    }
    clear(){
        this.equation = '';
        this.output = '';
        equationText.innerText = '';
        outputText.innerText = '';
    }
    backspace(){
        this.equation = this.equation.toString().slice(0,-1);
        equationText.textContent = this.equation;
    }
}

const calculator = new Calculator();
const numberButtons = document.querySelectorAll("[data-number]");
numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.getAttribute('data-number'));
    });
});

const equalButton = document.getElementById('equal-btn');
equalButton.onclick = ()=>{
    calculator.compute();
}

const allClearButton = document.getElementById('all-clear-btn');
allClearButton.onclick = ()=>{
    calculator.clear();
}

const backspaceButton = document.getElementById('backspace-btn');
backspaceButton.onclick = ()=>{
    calculator.backspace();
}

const signToggleButton = document.getElementById('sign-toggle-btn');
signToggleButton.onclick = ()=>{
    calculator.signToggle();
}