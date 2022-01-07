
// Use focus() method for the "Name" field 
document.getElementById('name').focus();

// #other-job-role is hidden when the form first loads 
const otherOption = document.getElementById('other-job-role');
otherOption.style.display='none';

// display #other-job-role "text field" when "other" option is selected
// * The 'change' event occurs when the element has completed changing
document.getElementById('title').addEventListener('click', (e)=>{
    if(e.target.value === 'other'){
        otherOption.style.display = 'block';
    } else {
        otherOption.style.display = 'none';
    }
});

// "Color" drop down menu are not available for each t-shirt when the form first loads
const colors = document.getElementById('color');
// console.log(colors.value);  returns 'Select a design theme above'

colors.disabled = true;

// display the color options associated with the design, for example if user selects 'Theme-JS Puns', 
// make the colors of (JS puns shirt only) is available to choose, etc
document.getElementById('design').addEventListener('click', (e) =>{
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

const activities = document.getElementsByClassName('activities');
const paymentMethod = document.getElementsByClassName('payment-method-box');
let totalCost = 0; 

// activities.addEventListener('change', (e){
//     let cost = e.target.getA


// });
