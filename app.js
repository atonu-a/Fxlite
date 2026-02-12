
let BASE_URL = "https://open.er-api.com/v6/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#msg");

for (let select of dropdowns) {
  for (code in countryList) {
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

const conversion = async () => {
    try{
        let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }

  let from = fromCurr.value;
  let to = toCurr.value;

  let URL = `${BASE_URL}${from}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[to];
  let cnvt = rate * amtVal;

  msg.innerText = `${amtVal} ${from} = ${cnvt} ${to}`;
    }

    catch(err){
        msg.innerText = "Something went wrong!";
        console.error(err);
    }
};

window.addEventListener("load", conversion);

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    conversion();
} );
