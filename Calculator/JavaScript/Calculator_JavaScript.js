//create an object to keep track of values
const Calculator={
    //this displays 0 on the screen
    Display_Value: '0',
    //this will hold the first operand for any expressions, we set it to null for now
    First_Operand: null,
    //this checks whether or not the second operand has been input
    Wait_Second_Operand: false,
    //this will hold the operator, we set it to null for now
    operator: null,
};

//this modifies values each time a button is clicked
function Input_Digit(digit) {
//    console.log("Input_Digit(digit): " + digit);
    const { Display_Value, Wait_Second_Operand } = Calculator;
    //we are checking to see if Wait_Second_Operand is true and set
    //Display_Value to the key that was clicked.
    if(Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    }
    else {
        //this overwrites Display_Value if the current value is 0
        //otherwise it adds onto it
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit; //Concatenate string
    }
    //console.log("End of Input_Digit.  Calculator:");
    //console.log(Calculator);
}

//this section handles decimal points
function Input_Decimal(dot) {
//    console.log("Input_Decimal(dot): " + dot);
    //this ensures that accidental clicking of the decimal point
    //doesn't cause bugs in your operation
    if (Calculator.Wait_Second_Operand === true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        //we are saying that if the Display_Value does not contain a decimal point
        //we want to add a decimal point
        Calculator.Display_Value += dot;
    }

}

//this section handles operators
function Handle_Operator(Next_Operator){
    const { First_Operand, Display_Value, operator } = Calculator;
    //console.log("Begin Handle_Operator");
    //console.log(Calculator,{Display_Value, First_Operand,Next_Operator, operator});
    
    //when an operator key is pressed, we convert the current number
    //displayed on the screen to a number and then store the result in 
    //Calculator.First_Operand if it doesn't already exist
    const Value_of_Input = parseFloat(Display_Value);
    //console.log("Value_of_Input: " + Value_of_Input);
    //checks if an operator already exists and if Wait_Second_Operand is true,
    //then updates the operator and exits from the function
    if(operator && Calculator.Wait_Second_Operand) {
        //console.log("operator exists and Wait_Second_Operand is true");
        Calculator.operator = Next_Operator;
        //console.log(Calculator,{Display_Value, First_Operand,Next_Operator, operator});
        return;
    }
    if(First_Operand == null) {
        //console.log("First_Operand is null");
        Calculator.First_Operand = Value_of_Input;
        //console.log(Calculator,{Display_Value, First_Operand,Next_Operator, operator});
    }
    else if (operator) {  //checks if an operator already exists
        //console.log("Operator already exists");
        const Value_Now = First_Operand || 0;
        //if operator already exists, property lookup is performed for the operator
        //in the Perform_Calcuation object and the function that matches the
        //operator is executed
        //console.log("About to Perform_Calculation on operator: " + operator);
        //console.log(Calculator,{Display_Value, First_Operand,Next_Operator, operator});
        const result = Perform_Calculation[operator](Value_Now, Value_of_Input);
        //console.log("Completed Perform_Calculation");
        //console.log(String(Value_Now) + " " + String(operator) + " = " + String(result));
        Calculator.Display_Value = String(result);
        Calculator.First_Operand = result;
        //console.log(Calculator,{Display_Value, First_Operand,Next_Operator, operator});
    }
    //console.log("End of Handle_Operator");
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
    //console.log(Calculator,{Display_Value, First_Operand,Next_Operator, operator});

}


const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
};


function Calculator_Reset() {
//    console.log("Calculator_Reset()");
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

//this function updates the screen with the contents of Display_Value
function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;

}

Update_Display();

//this section monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    //the target variable is an object that represents the elemetn
    //that was clicked
    const {target} = event;
    //if the element that was clicked on is not a button, exit the function
    if(!target.matches('button')) {
        //console.log("Unrecognize button click");
        return;
    }

    if(target.classList.contains('operator')) {
        //console.log("Clicked on operator: " + target.value);
        Handle_Operator(target.value);
        Update_Display();
        return;
    }

    if(target.classList.contains('decimal')) {
        //console.log("Clicked on decimal");
        Input_Decimal(target.value);
        Update_Display();
        return;
    }

    //ensures that AC clears the numbers from the Calculator
    if (target.classList.contains('all-clear')) {
//        console.log("Clicked on AC");
        Calculator_Reset();
        Update_Display();
        return;
    }
//    console.log("Clicked on number: " + target.value);
    Input_Digit(target.value);
    Update_Display();
    
})


