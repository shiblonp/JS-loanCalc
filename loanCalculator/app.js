
//will change the second parameter to function to delay running my calculateResults function
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results, even though by default they are initially hidden- want to hide them on each submit click
    document.getElementById('results').style.display='none';
    //to show the loader gif
    document.getElementById('loading').style.display='block';
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});
function calculateResults(){
    //need all variables that are part of the DOM
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    //convert to a float for decimal value
    const principal = parseFloat(amount.value);
    //will convert input into decimal form per month
    const calculatedInterest = parseFloat(interest.value)/100/12
    const calculatedPayments = parseFloat(years.value) *12;

    //for monthly payment
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value=monthly.toFixed(2);
        totalPayment.value=monthly*calculatedPayments.toFixed(2);
        totalInterest.value=((monthly*calculatedPayments)-principal).toFixed(2);
        //now show the results
        document.getElementById('results').style.display='block';
        //and hide the gif
        document.getElementById('loading').style.display='none';
    }else{
        console.log('does this reach');
        showError('Please check number input');
    }
   
}
//function for showing the error in case the user input is not a finite value
function showError(error){
    //hide the results
    document.getElementById('results').style.display='none';
    //and hide the gif
    document.getElementById('loading').style.display='none';
    console.log('does this rung')
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className='alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);
    setTimeout(clearError, 3000);
}
function clearError(){
    document.querySelector('.alert').remove();
}