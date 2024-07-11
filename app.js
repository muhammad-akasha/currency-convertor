let currency = document.getElementById("currency");
let exchange = document.getElementById("exchange");
let form = document.getElementById("form");
let exchangeRate = document.getElementById("result");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

async function addingCurrencies() {
  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await res.json();
    console.log(data);
    let allRate = data.rates;
    currency.innerHTML = `<option> Select Currency </option>`;
    for (let rate in allRate) {
      let optionForCurr = document.createElement("option");
      let optionForExchange = document.createElement("option");
      optionForCurr.value = rate;
      optionForCurr.text = rate;
      optionForExchange.value = rate;
      optionForExchange.text = rate;
      currency.appendChild(optionForCurr);
      exchange.appendChild(optionForExchange);
    }
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("load", addingCurrencies());

let selectedCurr;
let selectedExch;
let currText;
let exchText;
currency.addEventListener("change", (e) => {
  selectedCurr = e.target.value;
  currText = e.innerText;
  //   console.log(selectedCurr);
});

exchange.addEventListener("change", (e) => {
  selectedExch = e.target.value;
  exchText = e.innerText;
  //   console.log(selectedExch);
});

async function currencyConverter() {
  let amount = document.getElementById("amount").value;
  if (amount === "") {
    return alert("Enter Amount First");
  } else if (selectedCurr === undefined || selectedExch === undefined) {
    return alert("Please Select Currencies");
  } else {
    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${selectedCurr}`
      );
      const data = await res.json();
      let rate = data.rates;
      let result = amount * rate[selectedExch];
      exchangeRate.innerHTML = `${amount} ${selectedCurr} = ${Math.floor(
        result
      )} ${selectedExch}`;
    } catch (err) {
      console.log(err);
    }
  }
}
