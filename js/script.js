
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

// const activities = document.getElementById('activities');
// // console.log(activities);
// const paymentMethod = document.getElementById('payment');
// let totalCost = 0; 
// const checkboxes = document.querySelectorAll('input[type=checkbox]');
// const finalCostDisplay = document.getElementById('activities-cost')

// code testing area -----------------------------------

// checkboxes[1].disabled = true;
// checkboxes[1].parentNode.classList.add('disabled');
// const cost = checkboxes[0].getAttribute('data-cost');
// console.log(dateTime);
// --------------------------------------------------------------------

//Register for Activities Section

// activities.addEventListener('change', (e) =>{
// // let selectedActivity = e.target;
// let selectedActivityCost = parseInt(e.target.getAttribute('data-cost'));

// if(e.target.checked == true){
//     totalCost += selectedActivityCost;
//     // console.log(totalCost);
//     for(let i = 0; i < checkboxes.length ; i++){
//         // disabled overlapping activities
//         if(e.target.getAttribute('data-day-and-time') == checkboxes[i].getAttribute('data-day-ant-time')){
//             // checkboxes[i].parentElement.classList.add('disabled');
//             checkboxes[i].disabled = true;
//             e.target.parentElement.classList.remove('disabled');
//             e.target.disabled = false;
//         }
//     }
// } else if (e.target.checked == false){
//     totalCost -= selectedActivityCost;
//     for(let i = 0 ; i < checkboxes.length ; i++){
//         if(e.target.getAttribute('data-day-and-time') == checkboxes[i].getAttribute('data-day-ant-time')){
//             checkboxes[i].parentElement.classList.remove('disabled');
//             checkboxes[i].disabled = false; 
//         }
//     }

// }

//    // formatCost();
//    finalCostDisplay.innerHTML = `Total: $${totalCost}`;
      
// //    activitiesValidate(e); 

// });


const allActivities = document.getElementById('activities');
// console.log(allActivities);
const finalCostDisplay = document.querySelector('#activities-cost');
const checkboxes = document.querySelectorAll('input[type=checkbox]');
let totalCost = 0;

allActivities.addEventListener('change', (e) => {
    let selectedActivity = e.target;
    const activityCost = parseInt(selectedActivity.getAttribute('data-cost'));

    if (selectedActivity.checked == true) {
        totalCost += activityCost;
        for (let i = 0; i < checkboxes.length; i++) {
            // Hide overlapping activities
            if (selectedActivity.getAttribute('data-day-and-time') == checkboxes[i].getAttribute('data-day-and-time') ) {
                selectedActivity.disabled = false;
                selectedActivity.parentNode.classList.remove('disabled');
                checkboxes[i].disabled = true;
                checkboxes[i].parentNode.classList.add('disabled');                              
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
    // Display total cost 
    finalCostDisplay.innerHTML = `Total: $${totalCost}`;
      
    // activitiesValidate(e);

});