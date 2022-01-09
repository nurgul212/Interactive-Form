// Badic info section ----------------------------------------------------------------------
// Use focus() method for the "Name" field 
document.getElementById('name').focus();

// #other-job-role is hidden when the form first loads 
const otherOption = document.getElementById('other-job-role');
otherOption.style.display='none';

// display #other-job-role "text field" when "other" option is selected
// * The 'change' event occurs when the element has completed changing
document.getElementById('title').addEventListener('change', (e)=>{
    if(e.target.value === 'other'){
        otherOption.style.display = 'block';
    } else {
        otherOption.style.display = 'none';
    }
});

// T-Short info section -------------------------------------------------------------------------
// "Color" drop down menu are not available for each t-shirt when the form first loads
const colors = document.getElementById('color');
// console.log(colors.value);  returns 'Select a design theme above'

colors.disabled = true;

// display the color options associated with the design, for example if user selects 'Theme-JS Puns', 
// make the colors of (JS puns shirt only) is available to choose, etc
document.getElementById('design').addEventListener('change', (e) =>{
    colors.disabled = false;
    for(let i = 0 ; i < colors.length; i++){
        // conditional (Ternary Operator)
        colors.value = colors[i].value ? 'Select a design theme above': colors[i].value;
        // design option[value] == color option[data-theme]
        if(e.target.value === colors[i].getAttribute('data-theme')){             
            colors[i].hidden = false;           
        } else {
            colors[i].hidden = true;
        }
    }
    
});

// Register for activities section --------------------------------------------------------------------
const allActivities = document.getElementById('activities');
// console.log(allActivities);
const finalCostDisplay = document.querySelector('#activities-cost');
const checkboxes = allActivities.querySelectorAll('input[type=checkbox]');
let totalCost = 0;

// When a workshop is selected, the cost will be added to the total cost,  other workshops with the same date and time are not allowed to select, 
// and the checkbox will be disabled. 

allActivities.addEventListener('change', (e) => {
    let selectedActivity = e.target;
    const activityCost = parseInt(selectedActivity.getAttribute('data-cost'));

    if (selectedActivity.checked == true) {
        totalCost += activityCost;
        for (let i = 0; i < checkboxes.length; i++) {
            // Hide overlapping activities
            if (selectedActivity.getAttribute('data-day-and-time') == checkboxes[i].getAttribute('data-day-and-time') ) {
                checkboxes[i].disabled = true;
                checkboxes[i].parentNode.classList.add('disabled');      
                selectedActivity.disabled = false;
                selectedActivity.parentNode.classList.remove('disabled');
                                       
            }
        }
    } else if (selectedActivity.checked == false) {
        totalCost -= activityCost;
        // Unhide overlpapping activities
        for (let i = 0; i < checkboxes.length; i++) {
            if (selectedActivity.getAttribute('data-day-and-time') == checkboxes[i].getAttribute('data-day-and-time') ) {
                checkboxes[i].disabled = false;
                checkboxes[i].parentNode.classList.remove('disabled');               
            }
        }
    }
    // Display the innerHTML of the "Total:" <p> element with the new total cost. 
    finalCostDisplay.innerHTML = `Total: $${totalCost}`;     

});

// Payment Info Section --------------------------------------------------------------------
const paymentOptions = document.getElementById('payment');
const creditcard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');


//The credit card payment option is selected for the user by default. 
// paypal and bitcoin sections are hidden when the form first loads
paymentOptions.children[1].setAttribute('selected','');
// console.log(paypal.getAttribute('id'));
paypal.style.display= "none";
bitcoin.style.display= "none";


// I put creditcard, paypal and bitcoin in an array called payArray. 
// I will use payArray in the for loop in addEventListener section. :)
const payArray = [creditcard, paypal, bitcoin];
// console.log(payArray[0].getAttribute('id'));

// Display the payment method based on the selected payment option.
paymentOptions.addEventListener('change', (e)=>{
    const selectedPayment = e.target;

    for(let i = 0; i < payArray.length; i++){
        if(selectedPayment.value == payArray[i].getAttribute('id')){
            payArray[i].style.display = 'block';

        } else {
            payArray[i].style.display = 'none';
        }       
    }

});