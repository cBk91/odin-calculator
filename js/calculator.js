function Display(querySelector){

    this.screen = document.querySelector(querySelector);
    this.appendCharacter = function(char){
        this.screen.textContent += char;
    };

    this.clearScreen = function(){
        this.screen.textContent = "";
    }

    
}

let calcScreen = new Display("#display");
