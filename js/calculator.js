//https://devmentor.pl/b/4-filary-programowania-obiektowego#powt%C3%B3rka-z-programowania-obiektowego


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
        return Number.parseFloat(this.screen.textContent);
    }
}

class Memory {

    #memory;
    #size;

    constructor(size) {
        this.#memory = [];
        this.#size = size;
    }

    saveInMemory(number){
        this.#memory.push(number);
    }

    clearMemory(){
        this.#memory.length = 0;
    }

    doCalc(mathOperation){
        return this.#memory.reduce(mathOperation);
    }

    isFull(){
        return this.#memory.length === this.#size;
    }

    print(){
        console.log(this.#memory.toString());
        console.log(this.#memory.length === this.#size);
    }

}


let wasSaved = false;

function Keypad(numsQuerySelector,clearBtnQuerySelector){
    this.numberButtons = document.querySelectorAll(".num_value");
    this.operandButtons = document.querySelectorAll(".operand_button");
    this.clearButton = document.querySelector(".clr_button");
    this.equationButton = document.querySelector(".equation_button");  
    this.initializeButtonsEvents = function(){
        this.clearButton.addEventListener("click",event =>{
            calcScreen.clearScreen();
            memory.clearMemory();
        });
        this.numberButtons.forEach((button) => 
            button.addEventListener("click",(e) => {
            if(wasSaved){
                calcScreen.clearScreen();
                wasSaved = false;
            }
            calcScreen.appendCharacter(e.target.textContent);
        }));

        this.operandButtons.forEach((button) => 
            button.addEventListener("click",event =>{                     
            memory.saveInMemory(calcScreen.getNumberFromScreen());            
            memory.print();
            console.log(button.textContent);
            if(memory.isFull){
                let calc = calculate(button.textContent,memory);                
                calcScreen.clearScreen();                
                calcScreen.appendCharacter(calc);
                memory.clearMemory();
                memory.saveInMemory(calcScreen.getNumberFromScreen());                
            }
            wasSaved = true;
            }));

        this.equationButton.addEventListener("click",event =>{
            
        });
    };


}



function calculate(operator,memory){

    switch(operator) {

        case "+": return memory.doCalc((a,b) => a+b,0);
        case "-": return memory.doCalc((a,b) => a - b,0);
        case "*": return memory.doCalc((a,b) => a * b,1);
        case "/": return memory.doCalc((a,b) => a / b,1);
        //case "%": return firstOperand + secondOperand;
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











