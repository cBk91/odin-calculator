//https://devmentor.pl/b/4-filary-programowania-obiektowego#powt%C3%B3rka-z-programowania-obiektowego

const DISPLAY_LENGTH = 12;

function Display(querySelector){

    this.screen = document.querySelector(querySelector);
    this.appendCharacter = function(char){
        if(this.screen.textContent[0] === "0" && char != "."
            && this.screen.textContent.length === 1)
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
        return this.screen.textContent.length < DISPLAY_LENGTH
    }

    this.isContainDot = function() {
        return this.screen.textContent.includes(".");
    }    

    this.isNumber = function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      }

    this.getNumberFromScreen = function()  {
        return Number.isInteger(this.screen.textContent)
        ? this.screen.textContent
        : Number.parseFloat(this.screen.textContent);
    }

    this.getDisplayLength = function() {
        return DISPLAY_LENGTH - 2;
    }

    
}

class Memory {

    #memory;
    #operator;
    #size;
    #isSaved;
    

    constructor(size) {
        this.#memory = [];
        this.#size = size;
        this.#isSaved = false;
    }

    saveInMemory(number){
        this.#memory.push(number);
        this.#isSaved = true;
    }

    clearMemory(){
        this.#memory.length = 0;
        this.#operator = null;
        this.#isSaved = false;
    }

    doCalc(mathOperation){
        return this.#memory.reduce(mathOperation);
    }

    isFull(){
        return this.#memory.length === this.#size;
    }

    isSaved(){
        return this.#isSaved;
    }

    saveOperator(operator){
        this.#operator = operator;
    }

    getOperator(){
        return this.#operator;
    }
    
    isOperatorSaved(){
        return this.#operator != null;
    }

    setIsSaved(boolean){
        this.#isSaved = boolean;
    }
}



function Keypad(numsQuerySelector,clearBtnQuerySelector){
    this.numberButtons = document.querySelectorAll(".num_value");
    this.operatorButtons = document.querySelectorAll(".operator_button");
    this.clearButton = document.querySelector(".clr_button");
    this.equationButton = document.querySelector(".equation_button");  
    this.negateNumberButton = document.querySelector("#negate_button");
    this.percentButton = document.querySelector(".percent_button");

    this.initializeButtonsEvents = function(){

        this.percentButton.addEventListener("click",event =>{
            let num = calcScreen.getNumberFromScreen() / 100;
            calcScreen.clearScreen();
            calcScreen.appendCharacter(num);
        });

        this.negateNumberButton.addEventListener("click",event =>{
            let num = calcScreen.getNumberFromScreen() * -1;
            calcScreen.clearScreen();
            calcScreen.appendCharacter(num);                            
                            
        });

        this.clearButton.addEventListener("click",event =>{
            calcScreen.clearScreen();
            memory.clearMemory();
        });
        this.numberButtons.forEach((button) => 
            button.addEventListener("click",(e) => {
            if(memory.isSaved()){
                calcScreen.clearScreen();
                memory.setIsSaved(false);
            }
            calcScreen.appendCharacter(e.target.textContent);
        }));

        this.operatorButtons.forEach((button) => 
            button.addEventListener("click",event =>{                                 
            memory.saveInMemory(calcScreen.getNumberFromScreen());             
            if(memory.isFull()){
                calculate(memory.getOperator(),memory);
                memory.saveInMemory(calcScreen.getNumberFromScreen());
            }          
            memory.saveOperator(button.textContent);
            }));

        this.equationButton.addEventListener("click",event =>{   
                    if(memory.isOperatorSaved){
                        memory.saveInMemory(calcScreen.getNumberFromScreen());
                        calculate(memory.getOperator(),memory);
                    }
        });
    };


}

function calculate(operator,memory){
                
                let calc = getMathOperation(operator,memory);  
                if(calc.toString().length > calcScreen.getDisplayLength()){
                    if(!Number.isInteger)
                        calc = Number.parseFloat(calc).toFixed(calcScreen.getDisplayLength());
                    else
                        calc = calc.toString().slice(0,12);
                }
                calcScreen.clearScreen();                
                calcScreen.appendCharacter(calc);
                memory.clearMemory();
}

function getMathOperation(operator,memory){

    switch(operator) {

        case "+": return memory.doCalc((a,b) => a + b,0);
        case "-": return memory.doCalc((a,b) => a - b,0);
        case "*": return memory.doCalc((a,b) => a * b,1);
        case "/": return memory.doCalc((a,b) => a / b,1);
    }

    
}

let calcScreen = new Display("#display");
let keypad = new Keypad(".num_value",".clr_button");
let memory = new Memory(2);
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











