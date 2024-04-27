// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
// Base URL for fetching currency data
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll('.select-container select');
  const fromCurr = document.querySelector('#from');
  const toCurr = document.querySelector('#to');
  const msg = document.querySelector('.msg');

  
  for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
  
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }


  const updateFlag = (selectElement) => {
    let currCode = selectElement.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = (selectElement.name === 'from') ? document.getElementById('imgFrom') : document.getElementById('imgTo');
    img.src = newSrc;
};




  const btn = document.querySelector('button');
  btn.addEventListener('click',async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector('#amount');
    let amtVal = amount.value;
    if(amtVal == '' || amtVal <1)
    {
      amtVal = 1;
      amount.value = '1';
    }

    let fromCurrValue = fromCurr.value.toLowerCase(); 
    let toCurrValue = toCurr.value.toLowerCase();     

    
    const URL = `${BASE_URL}/${fromCurrValue}.json`;
    let response = await fetch(URL);
   let data = await response.json();
   let rates = data[fromCurrValue]; 
   let rate = rates[toCurrValue];  
  //  console.log(`Exchange Rate: 1 ${fromCurrValue.toUpperCase()} = ${rate} ${toCurrValue.toUpperCase()}`);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurrValue.toUpperCase()}`; 
  });

});




