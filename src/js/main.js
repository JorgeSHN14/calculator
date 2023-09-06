const display = document.getElementById("display");
const h1Element = display.querySelector("h1");
const operation = Array.from(document.getElementsByClassName("symbol"));
let isOperationOn = false;
let equalClick = false;

let first;
let second;
let auxNum;
let lastOperation;

const operationOn = function( op ) {
    op.classList.add("on");
    isOperationOn = true;
    lastOperation = op.innerText;
};

const operationOff = function() {
    operation.forEach( element => {
        element.classList.remove( "on" );
    });
    isOperationOn = false;
};

const setAndSaveSecond = function(result) {
    auxNum = second;
    second = undefined;
};

const doOperation = function( op, firstNum, secondNum ) {
    let result;
    switch (op) {
        case "÷":
            result = firstNum / secondNum;
            break;
        case "×":
            result = firstNum * secondNum;
            break;
        case "-":
            result = firstNum - secondNum;
            break;
        case "+":
            result = firstNum + secondNum;
            break;
        default:
            result = secondNum;
    }
    return parseFloat(result);
};

const doOperationAndPrint = function() {
    let result = doOperation( lastOperation, first, second );
    first = result;
    h1Element.textContent = result;
};

(function() {
    let entryText = Array.from(document.getElementsByClassName("number"));
    entryText.forEach(element => {
        element.addEventListener("click", event => {
            let buttonText = event.target.innerText;
            let displayText = h1Element.textContent;
            if (isOperationOn) {
                operationOff();
                h1Element.textContent = buttonText;
            }else if (displayText != "0"){
                h1Element.textContent += buttonText;
            }else {
                h1Element.textContent = buttonText;
            };
            second = parseFloat(h1Element.textContent);
        });
    });
})();

(function() {
    let dot = document.getElementById("dot");
    dot.addEventListener("click", event=> {
        let buttonText = event.target.innerText;
        if (!h1Element.textContent.includes(".")) {
            h1Element.textContent += buttonText;
        };
    });
})();

(function() {
    operation.forEach( element => {
        element.addEventListener( "click", () => {
            operationOff();
            let firstUnd = first == undefined;
            let secondUnd = second == undefined;
            if ( !firstUnd && !secondUnd) {
                doOperationAndPrint();
                setAndSaveSecond();
            }else if (firstUnd && !secondUnd){
                first = second;
                setAndSaveSecond();
            }else if (firstUnd && secondUnd){
                first = 0;
            }
            operationOn(element);
        });
    });
})();

(function() {
    let equal = document.getElementById( "equal" );
    equal.addEventListener( "click", () => {
        let firstUnd = first == undefined;
        let secondUnd = second == undefined;
        
        if ( !firstUnd && !secondUnd) {
            console.log(first,second,"Este")
            doOperationAndPrint();
            setAndSaveSecond();
        }else if (firstUnd && !secondUnd) {
            setAndSaveSecond();
            auxNum = undefined;
        }else if (!firstUnd && secondUnd && auxNum != undefined) {
            second = auxNum;
            doOperationAndPrint();
            setAndSaveSecond();
        }
    });
})();

(function() {
    let reset = document.getElementById("reset");
    reset.addEventListener("click", ()=> {
        first = undefined;
        auxNum = undefined;
        second = undefined;
        h1Element.textContent = 0;
        lastOperation = undefined;
        equalClick = false;
        operationOff();
    });
})();

(function() {
    let negative = document.getElementById("negative");
    negative.addEventListener("click", ()=> {
        first = parseFloat(h1Element.textContent)*-1;
        h1Element.textContent = first;
        setAndSaveSecond();
    });
})();

(function() {
    let percentage = document.getElementById("percentage");
    percentage.addEventListener("click", ()=> {
        first = parseFloat(h1Element.textContent)/100;
        h1Element.textContent = first;
        setAndSaveSecond();
    });
})();