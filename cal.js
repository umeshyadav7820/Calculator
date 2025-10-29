let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click',(e)=>{
        if(e.target.innerHTML == '='){
            calculateResult();
        }
        else if(e.target.innerHTML=='C'){
            string = "";
            input.value = string;
        }
        else if(e.target.innerHTML == '←'){
            string = string.substring(0,string.length-1);
            input.value = string;
        }
        else if(e.target.innerHTML == '%'){
            handlePercentage();
        }
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
    })
});

// ✅ Press Enter to calculate (with + - * / %)
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        calculateResult();
    }
});

// Function to calculate result
function calculateResult() {
    try {
        string = input.value;  // always take input from box

        // ✅ Allow only safe characters
        if (!/^[0-9+\-*/().% ]+$/.test(string)) {
            input.value = "Error";
            string = "";
            return;
        }

        // ✅ Handle percentage expressions
        if (string.includes('%')) {
            string = evaluatePercentage(string);
        }

        string = eval(string).toString();
        input.value = string;
    } catch {
        input.value = "Error";
        string = "";
    }
}


// Function to handle % when button is clicked
function handlePercentage() {
    string = input.value;

    if (string.includes('%')) {
        string = evaluatePercentage(string);
        input.value = string;
    }
}

// Evaluate percentage expressions like real calculator
function evaluatePercentage(expr) {
    let match = expr.match(/(.+)([\+\-\*\/])(\d+)%$/);

    if (match) {
        let base = eval(match[1]);         // left side before operator
        let operator = match[2];
        let number = parseFloat(match[3]);

        let result;
        if (operator === '+' || operator === '-') {
            result = eval(base + operator + (base * number / 100));
        } else if (operator === '*') {
            result = base * (number / 100);
        } else if (operator === '/') {
            result = base / (number / 100);
        }
        return result.toString();
    } else {
        // case like 50% only
        let num = parseFloat(expr.replace('%',''));
        return (num/100).toString();
    }
}
