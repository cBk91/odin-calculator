
function Display(querySelector){

    this.screen = document.querySelector(querySelector);
    this.appendCharacter = function(char){
        if(this.screen.textContent[0] === "0")
            this.screen.textContent = "";
        if(this.isEmptySpace() && this.isNumber(char))
            this.screen.textContent += char;        
        else if(char === "." && !this.isContainDot())
                this.screen.textContent += char;       
    };

    this.clearScreen = function(){
        this.screen.textContent = "0";
    }  

    this.isEmptySpace = function() {  
        return this.screen.textContent.length < 13
    }

    this.isContainDot = function() {
        return this.screen.textContent.includes(".");
    }

    this.isNumber = function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      }

    this.getNumberFromScreen = function()  {
        return this.screen.textContent;
    }
}

function Keypad(numsQuerySelector,clearBtnQuerySelector){
    this.numberButtons = document.querySelectorAll(".num_value");
    this.operandButtons = document.querySelectorAll(".operand_button");
    this.clearButton = document.querySelector(".clr_button");
    this.equationButton = document.querySelector(".equation_button");  
    this.initializeButtonsEvents = function(){
        this.clearButton.addEventListener("click",event =>{
            calcScreen.clearScreen();
        });
        this.numberButtons.forEach((button) => 
            button.addEventListener("click",(e) => {
            calcScreen.appendCharacter(e.target.textContent);
        }));

        this.operandButtons.forEach((button) => 
            button.addEventListener("click",event =>{          

                if(operator === null){
                    operator = event.target.textContent;
                    firstOperand = calcScreen.getNumberFromScreen();
                }
                else if(operator != null){
                    if(operator === event.target.textContent){
                        console.log(calculate(operator,firstOperand,firstOperand));
                    }else{
                        secondOperand = calcScreen.getNumberFromScreen();
                        console.log(calculate(operator,firstOperand,secondOperand));
                    }
                    operator = event.target.textContent;
                }
                console.log(firstOperand);
                console.log(operator);
                console.log(secondOperand);
            }));

        this.equationButton.addEventListener("click",event =>{
        });
    };

    this.isOperandButtonPressed
}

let firstOperand = null;
let secondOperand = null;
let operator = null;

function calculate(operator,firstOperand,secondOperand){

    switch(operator) {

        case "+": return +firstOperand + +secondOperand;
        case "-": return +firstOperand - +secondOperand;
        case "*": return +firstOperand * +secondOperand;
        case "/": return +firstOperand / +secondOperand;
        //case "%": return firstOperand + secondOperand;
    }

    
}

let calcScreen = new Display("#display");
let keypad = new Keypad(".num_value",".clr_button");
keypad.initializeButtonsEvents();

let body = document.querySelector("body");
body.addEventListener("keydown",event =>{     
    let key = event.code.toString();   
    if(key.includes("Digit") || key.includes("Numpad")){
        key = key.replace("Digit","").replace("Numpad","");
        if(!isNaN(parseFloat(key)) && isFinite(key) || 
        (key = key ==="Decimal"?".":key))        
            calcScreen.appendCharacter(key);
    }       
});











