const baseURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";
const keyURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";

let apiKey = "";
let planet = "";


const planetHeaderDiv = document.querySelector(".planet-header");
const planetHeaderLatinDiv = document.querySelector(".planet-header__latin");
const description = document.querySelector(".description"); 
const circumference = document.querySelector(".omkrets-container");
const distanceFromSunDiv = document.querySelector(".km-from-sun");
const maxTempDiv = document.querySelector(".max-container");
const minTempDiv = document.querySelector(".min-container");
const moonDiv = document.querySelector(".moon-container");

/*
async function key() {
    const response = await fetch(keyURL);
    const data = await response.json();
    console.log(data);
    
}*/


// Get key function
async function getKey() {
    const response = await fetch(`${keyURL}`, {
        method: 'POST',
    });

    const data = await response.json();
    console.log(data);
    apiKey = data.key;
    console.log(apiKey);

    //getplanet(apiKey, 1);
}

getKey();

// Get planet function
async function getplanet(id) {
    //getKey();
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
        method: 'GET',
        headers: {'x-zocom': `${apiKey}`}
    });
    const data = await response.json();
    console.log(data.bodies[id]);
    planet = data.bodies[id];
    console.log(planet.name);
    planetDetails(id)
}

// Get planet details and reset and create elements:
async function planetDetails() {
    planetHeaderDiv.innerHTML = "";
    planetHeaderLatinDiv.innerHTML = "";
    description.innerHTML = "";
    circumference.innerHTML = "";
    distanceFromSunDiv.innerHTML = "";
    maxTempDiv.innerHTML = "";
    minTempDiv.innerHTML = "";
    moonDiv.innerHTML = "";

    
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
        method: 'GET',
        headers: {'x-zocom': `${apiKey}`}
    });

    const planetHeader = document.createElement("h1");
    planetHeader.innerHTML = planet.name;
    planetHeaderDiv.append(planetHeader);

    const planetHeaderLatin = document.createElement("h2");
    planetHeaderLatin.innerHTML = planet.latinName;
    planetHeaderLatinDiv.append(planetHeaderLatin);

    const descriptionTxt = document.createElement("p");
    descriptionTxt.innerHTML = planet.desc;
    description.append(descriptionTxt);

    const circumferenceHeader = document.createElement("h3");
    circumferenceHeader.innerHTML = "OMKRETS";
    circumference.append(circumferenceHeader);
    const circumferenceTxt = document.createElement("p");
    circumferenceTxt.innerHTML = `${planet.circumference} km`;
    circumference.append(circumferenceTxt);


    const distanceFromSunHeader = document.createElement("h3");
    distanceFromSunHeader.innerHTML = "KM FRÅN SOLEN";
    distanceFromSunDiv.append(distanceFromSunHeader);
    const distanceFromSunTxt = document.createElement("p");
    distanceFromSunTxt.innerHTML = `${planet.distance} km`;
    distanceFromSunDiv.append(distanceFromSunTxt);

    const maxTempHeader = document.createElement("h3");
    maxTempHeader.innerHTML = ("MAX TEMPERATUR");
    maxTempDiv.append(maxTempHeader);
    const maxTempTxt = document.createElement("p");
    maxTempTxt.innerHTML = `${planet.temp.day} C`;
    maxTempDiv.append(maxTempTxt);

    const minTempHeader = document.createElement("h3");
    minTempHeader.innerHTML = "MIN TEMPERATUR";
    minTempDiv.append(minTempHeader);
    const minTempTxt = document.createElement("p");
    minTempTxt.innerHTML = `${planet.temp.night} C`;
    minTempDiv.append(minTempTxt);

    const moonHeader = document.createElement("h3");
    moonHeader.innerHTML = "MÅNAR";
    moonDiv.append(moonHeader);
    const moonTxt = document.createElement("p");
    moonTxt.innerHTML = planet.moons;
    moonDiv.append(moonTxt);
}





/************** Event listeners on planet click: *****************/
 const planet2 = document.querySelector(".planet2");
  planet2.addEventListener('click', () => {
    openOverlay();
    getplanet(1);
  })

  const planet3 = document.querySelector(".planet3");
  planet3.addEventListener('click', () => {
    openOverlay();
    getplanet(2);
  })

  const planet4 = document.querySelector(".planet4");
  planet4.addEventListener('click', () => {
    openOverlay();
    getplanet(3);
  })

  const planet5 = document.querySelector(".planet5");
  planet5.addEventListener('click', () => {
    openOverlay();
    getplanet(4);
  })

  const planet6 = document.querySelector(".planet6");
  planet6.addEventListener('click', () => {
    openOverlay();
    getplanet(5);
  })

  const planet7 = document.querySelector(".planet7");
  planet7.addEventListener('click', () => {
    openOverlay();
    getplanet(6);
  })



/*********************** Overlay **************************/

function openOverlay() {
    document.getElementById("overlay-page").style.width = "100%";
  }
  
  function closeOverlay() {
    document.getElementById("overlay-page").style.width = "0%";
  }

  const closeButton = document.querySelector(".closebutton");
  closeButton.addEventListener('click', () => {
    closeOverlay();
  })