// Individual Tip Calculator
function individualTotal(bill, tip, split) {
    let individualTotal = bill * (1 + (tip / 100)) / split;
    // Rounds to 2 decimal points
    individualTotal = Math.round(individualTotal * 100) / 100;
    
    return individualTotal;
}

// Formats a number (number) into a decimal format with specified number of zeros (k).
function fillWithZeros(number, k) {
    let strNumber = number.toString(); // stringified number
    let hasDecimalPoint = /\./.test(strNumber); // checks if string has decimal point

    // (1) If number is an integer:
    if (!hasDecimalPoint) {
        // Attach decimal point
        strNumber += '.';

        // Concatenate '0' k times.
        let i = 0;
        while (i < k) {
            strNumber += '0';
            i++
        }
        return strNumber;
    }

    // (2) If the number isn't an integer:
    let decimalNumber = strNumber.match(/(?<=\.)\d+$/)[0]; // String right to decimal point.
    let length = decimalNumber.length; // Length of the string right to decimal point.
    // Fill empty slots with zeros to k decimal places.
    while (length < k ) {
        strNumber = strNumber + '0';
        length++;
    }

    return strNumber;
}

// Variables (with default values)
let splitBy = 1; // one person
let totalBill = 0; // $100.00
let tip = 0; // 10%
let totalPerPerson = 0;

const setIndividualTotal = () => {
    elementIndividualTotal.textContent = fillWithZeros(individualTotal(totalBill, tip, splitBy), 2);
    return fillWithZeros(individualTotal(totalBill, tip, splitBy), 2);
};


// HTML Elements
const elementTotalBill = document.querySelector('#bill-total');
const elementTipPercentage = document.querySelector('#tip-percentage');
const elementAddPerson = document.querySelector('#addPerson');
const elementSubtractPerson = document.querySelector('#subtractPerson');
const elementSplitBy = document.querySelector('#split-by');
const elementIndividualTotal = document.querySelector('#individual-total');

// Event Listeners
// 1. Total Bill
// Updates 'totalBill' variable, then displays the total per person whenever user input is generated.
elementTotalBill.addEventListener('input', function(e){
    // update totalBill
    totalBill = e.target.value;
    setIndividualTotal();
})

// 2. Tip Percentage
// Updates 'tip' variable, then displays the total per person whenever user input is generated.
elementTipPercentage.addEventListener('input', function(e) {
    tip = e.target.value;
    setIndividualTotal();
})

// 3. (+, -) Buttons
// Updates 'splitBy' variable, then displays the total per person whenver button is clicked.
elementAddPerson.addEventListener('click', function(e){
    splitBy++;
    elementSplitBy.textContent = splitBy;
    setIndividualTotal();

})
elementSubtractPerson.addEventListener('click', function(e) {
    if (splitBy > 1) {
        splitBy--;
        elementSplitBy.textContent = splitBy;
        setIndividualTotal();
    }
})