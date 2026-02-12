const BASE_URL = "https://open.er-api.com/v6/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector("#msg"); 


for (let select of dropdowns) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        
        
        if (select.name === "From" && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "To" && code === "BDT") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}


const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newLink;
};


const conversion = async () => {
    try {
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        
        if (amtVal === "" || amtVal < 1) {
            amtVal = 1;
            amount.value = 1;
        }

        const from = fromCurr.value;
        const to = toCurr.value;

        
        const URL = `${BASE_URL}${from}`;
        
        let response = await fetch(URL);
        if (!response.ok) throw new Error("Network response was not ok");
        
        let data = await response.json();
        let rate = data.rates[to];
        let cnvt = (rate * amtVal).toFixed(2); 

        msg.innerText = `${amtVal} ${from} = ${cnvt} ${to}`;
        msg.style.color = "#90EE90"; 
    } catch (err) {
        msg.innerText = "Something went wrong! Please try again.";
        msg.style.color = "red";
        console.error(err);
    }
};


window.addEventListener("load", conversion);


btn.addEventListener("click", (e) => {
    e.preventDefault();
    conversion();
});
