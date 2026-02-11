
let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

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

const updateFlag = (element) => {
  let code = element.value;
  let countryCode = countryList[code];
  let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newLink;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }

  let from =fromCurr.value.toLowerCase();
  let to  = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}${from}.min.json` ;

  let response = await fetch(URL);
  let data = await response.json();
  console.log(response);
  let rate = data[from][to];
  let cnvt = rate *amtVal;
  msg.innerText = ` ${amtVal} ${fromCurr.value} = ${cnvt} ${toCurr.value}`;
  msg.style.color = "#90EE90";
  
});
