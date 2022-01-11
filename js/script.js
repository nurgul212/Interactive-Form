//****************************************** Basic Info Section **********************************************************//
//************************************************************************************************************************//

//==== Name* field=============================================================

// Use focus() method for the "Name" field 
document.getElementById('name').focus();

// Validate input name
let inputName = document.getElementById('name');
let nameRegex =  /^[a-zA-Z]+\s?[a-zA-Z]+$/;    //accept first name or full name

//  Use addEventListener() method to attach a "keyup" event to an input element.
inputName.addEventListener("keyup", () =>{
    validateName();
})

function validateName(){  
    // if exist and the nameRegex is valid
    if(inputName.value && nameRegex.test(inputName.value)){
       inputName.parentNode.className='valid';
    //name hint message is the last child of nameRequired.parentNode.
    //Learn more from: https://www.w3schools.com/jsref/prop_element_lastelementchild.asp 
    inputName.parentNode.lastElementChild.style.display = 'none';
       return true; 
    } else {
        if(inputName.value){
            inputName.parentNode.lastElementChild.textContent = 'Name should not contain numbers or punctuation';
        }
        inputName.parentNode.className='not-valid';
        inputName.parentNode.lastElementChild.style.display = 'block';
        return false; 
    }
};


//==== Email Address* field===============================================================

// Validate email address
let inputEmail = document.getElementById('email');
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

inputEmail.addEventListener("keyup", () => {
    validateEmail();
});

function validateEmail(){
     if(inputEmail.value && emailRegex.test(inputEmail.value)){
        inputEmail.parentNode.className='valid';
        inputEmail.parentNode.lastElementChild.style.display = 'none';
        return true;

    } else {
        if(inputEmail.value){
            inputEmail.parentNode.lastElementChild.textContent = 'Email address must be formatted correctly';
           
        } else{
            inputEmail.parentNode.lastElementChild.textContent = 'Email address field cannot be blank';   
        }
      inputEmail.parentNode.className='not-valid';
      inputEmail.parentNode.lastElementChild.style.display = 'block';
      return false;
    }
};


//==== Job Role field=========================================================================
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



//****************************************** T-Shirt Info Section **********************************************************//
//*************************************************************************************************************************//

//==== Design and Color========================================================================= 

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



//****************************************** Register for Activities Section **********************************************************//
//************************************************************************************************************************************//

const allActivities = document.getElementById('activities');
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
                selectedActivity.parentNode.classList.add('focus'); 

            }
        }
    } else if (selectedActivity.checked == false) {
        totalCost -= activityCost;
        // Unhide overlpapping activities
        for (let i = 0; i < checkboxes.length; i++) {
            if (selectedActivity.getAttribute('data-day-and-time') == checkboxes[i].getAttribute('data-day-and-time') ) {
                checkboxes[i].disabled = false;
                checkboxes[i].parentNode.classList.remove('disabled'); 
                selectedActivity.parentNode.classList.remove('focus');          
            }
        }
    }
    // Display the innerHTML of the "Total:" <p> element with the new total cost. 
    finalCostDisplay.innerHTML = `Total: $${totalCost}`;   
    validateActivity();  

});

// validate activity section. at least one activity should be selected. 
const activityList = document.querySelectorAll('#activities input');
// console.log(activityList.length);
function validateActivity(){
    let count = 0;   //count the number of selected activities
    for(let i = 0; i < activityList.length; i++){
        if(activityList[i].checked == true){
            count += 1;
        }       
    }
    if(count !== 0){
       allActivities.firstElementChild.className='valid';
       allActivities.lastElementChild.style.display='none';
       return true; 
    } else{
        allActivities.firstElementChild.className='not-valid';
        allActivities.lastElementChild.style.display='block';
        return false;
    }

};


//****************************************** Payment Info Section *******************************************************************//
//************************************************************************************************************************************//

const paymentOptions = document.getElementById('payment');
const creditcard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');


//The credit card payment option is selected for the user by default. 
// paypal and bitcoin sections are hidden when the form first loads
paymentOptions.children[1].setAttribute('selected','');
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


// Validate Credit card number, zip code and CVV ======================================= 

// credit card number should have between 13-16 digits 
let  creditNumRegex =/^[0-9]{13,16}$/;
const inputCreditNum = document.getElementById('cc-num');

inputCreditNum.addEventListener("keyup", () => {
    validateCreditNum();
});
function validateCreditNum(){
    if(inputCreditNum.value && creditNumRegex.test(inputCreditNum.value)){
        inputCreditNum.parentNode.className='valid';
        inputCreditNum.parentNode.lastElementChild.style.display = 'none';
        return true; 
     } else {
         if(inputCreditNum.value){
             inputCreditNum.parentNode.lastElementChild.textContent = 'Credit card number must be between 13 - 16 digits';
            } else {
                inputCreditNum.parentNode.lastElementChild.textContent = 'Credit card number is required';
            }
         inputCreditNum.parentNode.className='not-valid';
         inputCreditNum.parentNode.lastElementChild.style.display = 'block';
         return false; 
     }
} 


// validate zip code
let  zipRegex =/^[0-9]{5}$/;
const inputZip = document.getElementById('zip');

inputZip.addEventListener("keyup", () => {
    validateZip();
});
function validateZip(){
    if(inputZip.value && zipRegex.test(inputZip.value)){
        inputZip.parentNode.className='valid';
        inputZip.parentNode.lastElementChild.style.display = 'none';
        return true; 
     } else {
         if(inputZip.value){
             inputZip.parentNode.lastElementChild.textContent = 'Zip Code must be 5 digits';
            } else {
                inputZip.parentNode.lastElementChild.textContent = 'Zip code is required';
            }
         inputZip.parentNode.className='not-valid';
         inputZip.parentNode.lastElementChild.style.display = 'block';
         return false; 
     }
} 


// validate CVV code
let  cvvRegex =/^[0-9]{3}$/;
const inputcvv = document.getElementById('cvv');

inputcvv.addEventListener("keyup", () => {
    validatecvv();
});
function validatecvv(){
    if(inputcvv.value && cvvRegex.test(inputcvv.value)){
        inputcvv.parentNode.className='valid';
        inputcvv.parentNode.lastElementChild.style.display = 'none';
        return true; 
     } else {
         if(inputcvv.value){
             inputcvv.parentNode.lastElementChild.textContent = 'cvv must be 3 digits';
            } else {
                inputcvv.parentNode.lastElementChild.textContent = 'cvv code is required';
            }
         inputcvv.parentNode.className='not-valid';
         inputcvv.parentNode.lastElementChild.style.display = 'block';
         return false; 
     }
} 


//****************************************** Form Register *******************************************************************//
//************************************************************************************************************************************//

//Submit form --- when "Register" button is clicked, display error messages (hint messages) if the required field is empty or invalid.
let registerForm = document.querySelector('.container');

registerForm.addEventListener('submit', (e) => {

    //  input name
    if (!validateName()) {
        // if the event does not get explicitly handled, prevent from taking the default action 
        e.preventDefault();
    }  
    //  input email
    if (!validateEmail()) {
        e.preventDefault();
    } 
     //  Activity list
     if (!validateActivity()) {
        e.preventDefault();
    }  
    // Credit card number
    if (!validateCreditNum()) {
        e.preventDefault();
    }   
    // zip code
    if (!validateZip()) {
        e.preventDefault();
    }   
     // cvv code
     if (!validatecvv()) {
        e.preventDefault();
    } 
});
