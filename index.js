const fromSymbol = document.getElementById("from");
const toSymbol = document.getElementById("to");

const convertButton = document.querySelector("button");
const invertButton = document.querySelector(".invert-button");

const API_KEY = "RnhI84gkKyeI9CL34qL4UUJzbHcziIIi";

const URL = "https://api.apilayer.com/fixer/";

const headers = new Headers();
headers.append("apikey", API_KEY);
headers.append("Origin", "http://localhost");

const requestOptions = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    redirect: 'follow'
};


fetch(URL + "symbols", requestOptions)
    .then(response => {
        if(!response.ok) {
            throw new Error(`Błąd HTTP! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // displayDiv.innerText = data["result"].toFixed(2);
        for(const symbol in data['symbols']) {
            const option = document.createElement("option");
            const option2 = document.createElement("option");
            option.value = symbol;
            option2.value = symbol;
            option.innerText = symbol;
            option2.innerText = symbol;
            fromSymbol.appendChild(option);
            toSymbol.appendChild(option2);

        }
        const urlParams = new URLSearchParams(window.location.search);

        const fromValue = urlParams.get('from');
        if(fromValue !== null) {
            const fromOption = document.querySelector(`#from option[value="${fromValue}"]`);
            fromOption.selected = true;
        } else {
            const fromOption = document.querySelector(`#from option[value="PLN"]`);
            fromOption.selected = true;
        }

        const toValue = urlParams.get('to');
        if(toValue !== null) {
            const toOption = document.querySelector(`#to option[value="${toValue}"]`);
            toOption.selected = true;
        } else {
            const toOption = document.querySelector(`#to option[value="EUR"]`);
            toOption.selected = true;
        }

        const amountValue = urlParams.get('amount');
        if(amountValue !== null) {
            const amountInput = document.querySelector(`.from-amount`);
            amountInput.value = amountValue;
        }

    })
    .catch(error => {
        console.error(`Błąd przy pobieraniu danych:`,error);
    })


function convertCurrency() {
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let amount = document.querySelector(".from-amount").value;
    let converted = document.querySelector(".to-amount");

    fetch(URL + `convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then(response => {
        if(!response.ok) {
            throw new Error(`Błąd HTTP! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        converted.value = parseFloat(data["result"]).toFixed(2);
    })
    .catch(error => {
        console.error(`Błąd przy pobieraniu danych:`,error);
    })
}

function invertCurrencies() {
    let fromValue = fromSymbol.value;
    let toValue = toSymbol.value;
    toSymbol.value = fromValue;
    fromSymbol.value = toValue;
    if(document.querySelector(".to-amount").value !== '') {
        let fromAmount = document.querySelector(".from-amount").value;
        let toAmount = document.querySelector(".to-amount").value;
        document.querySelector(".from-amount").value = toAmount;
        document.querySelector(".to-amount").value = fromAmount;
    }
}

convertButton.addEventListener('click', convertCurrency);
invertButton.addEventListener('click', invertCurrencies);