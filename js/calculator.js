function Display(querySelector){

    this.screen = document.querySelector(querySelector);
    this.appendCharacter = function(char){
        if(this.screen.textContent[0] === "0")
            this.screen.textContent = "";
        if(this.isEmptySpace() && this.isNumber(char))
            this.screen.textContent += char;
        else{
            if(!this.isContainDot())
                this.screen.textContent += char;
        }
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
}

function Keypad(numsQuerySelector,clearBtnQuerySelector){
    this.numberButtons = document.querySelectorAll(".num_value");
    this.clearButton = document.querySelector(".clr_button");
    this.equationButton = document.querySelector(".equation_button");    
    this.initializeButtonsEvents = function(){
        this.clearButton.addEventListener("click",event =>{
            calcScreen.clearScreen();
        });
        this.numberButtons.forEach((button) => button.addEventListener("click",(e) => {
            calcScreen.appendCharacter(e.target.textContent);
        }));
        this.equationButton.addEventListener("click",event =>{

        });
    };
}

let calc = document.querySelector("body");
calc.addEventListener("keydown",event =>{    
    let key = event.code.toString();   
    console.log(key);
    

});
let calcScreen = new Display("#display");
let keypad = new Keypad(".num_value",".clr_button");
keypad.initializeButtonsEvents();









