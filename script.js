"use strict";

const countriesContainer = document.querySelector(".countries");
const btnCountry = document.querySelector(".btn-country")

const renderCountry = (data, className = "") => {
  const language = Object.values(data.languages);
  const currency = Object.values(data.currencies);
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name"> ${data.name.common}</h3>
    <h4 class="country__region">${data.region} </h4>
    <p class="country__row"><span>👫</span>${(
      data.population /
      10 ** 6
    ).toFixed(2)} million(s)</p>
    <p class="country__row"><span>🗣️</span>${language}</p>
    <p class="country__row"><span>💰</span>${currency[0].name}</p>
    </div>
    </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getJSON = (
  url,
  errHint = "un problème a été détecté entre le clavier et la chaise"
) => {
  return fetch(url).then((res) => {
    console.log(res);
    if (!res.ok) {
      throw new Error(`${errHint} (${res.status})`);
    }
    return res.json();
  });
};

const getCountryData = (country) => {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "merde")
    .then((data) => {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders;
      //   const neighbour = "Stormwind";
      if (!neighbour) throw new Error("nonayboar");
      console.log(neighbour);

      return getJSON(
        `https://restcountries.com/v3.1/alpha?codes=${neighbour}`,
        "merde"
      );
    })
    .then((data) => {
      data.forEach((element) => {
        renderCountry(element, "neighbour");
      });
      // renderCountry(data[0], "neighbour");
    });
};

getCountryData("france");
