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



// Get key function:
async function getKey() {
  try {
    const response = await fetch(`${keyURL}`, {
        method: 'POST',
    });

    if (!response.ok) {
      throw new Error (`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    apiKey = data.key;
    console.log(apiKey);

  } catch(error) {
    console.log("Error fetching data:", error);
  } 
}

getKey();

// Get planet function:
async function getplanet(id) {  
    try {
        const response = await fetch(`${baseURL}/bodies`, {
            method: 'GET',
            headers: {'x-zocom': `${apiKey}`}
        });
    
        const data = await response.json();
        console.log(data.bodies[id]);
        planet = data.bodies[id];
        console.log(planet.name);
        planetDetails(id)

    } catch(error) {
        console.log("Error fetching data:", error);
    }    
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

    
    const response = await fetch(`${baseURL}/bodies`, {
        method: 'GET',
        headers: {'x-zocom': `${apiKey}`}
    });

    let planetHeader = document.createElement("h1");
    planetHeader.innerHTML = planet.name.toUpperCase();
    planetHeaderDiv.append(planetHeader);

    const planetHeaderLatin = document.createElement("h2");
    planetHeaderLatin.innerHTML = planet.latinName.toUpperCase();
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

    // Loopar ut månarna ur en moon-array:
    const moonArray = planet.moons;
    console.log(moonArray);
    const moonHeader = document.createElement("h3");
    moonHeader.innerHTML = "MÅNAR";
    moonDiv.append(moonHeader);
    const moonTxt = document.createElement("p");
    for (i = 0; i < moonArray.length; i++) {
        moonTxt.innerHTML += `${moonArray[i]}, `;
    }
    moonDiv.append(moonTxt);
}

/*****************************************************************/



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

  const planet8 = document.querySelector(".planet8");
  planet8.addEventListener('click', () => {
    openOverlay();
    getplanet(7);
  })

  const planet9 = document.querySelector(".planet9");
  planet9.addEventListener('click', () => {
    openOverlay();
    getplanet(8);
  })



/*********************** Overlay **************************/

function openOverlay() {
    document.getElementById("overlay-page").style.width = "100%";
    stars.innerHTML = "";
    stars6px();
    stars3px();
  }
  
  function closeOverlay() {
    document.getElementById("overlay-page").style.width = "0%";
  }

  const closeButton = document.querySelector(".closebutton");
  closeButton.addEventListener('click', () => {
    closeOverlay();
  })


  /********************* STARS ************************/

  const stars = document.querySelector(".stars");

  function random(max) {
    return Math.floor(Math.random() * max);
  }
  function randomPosition(element, xMax, yMax) {
    element.style.left = random(xMax) + "px";
    element.style.top = random(yMax) + "px";
  }

  function stars6px() {
    for (i = 0; i < 15; i++) {
      const star6 = document.createElement("div");
      star6.style.width = "6px";
      star6.style.height = "6px";
      star6.style.borderRadius = "50%";
      star6.style.backgroundColor = "white";
      star6.style.opacity = "0.3";
      star6.style.position = "absolute";
      randomPosition(star6, 1134.6, 760);
      stars.append(star6);
    }
  }

  function stars3px() {
    for (j = 0; j < 22; j++) {
      const star3 = document.createElement("div");
      star3.style.width = "3px";
      star3.style.height = "3px";
      star3.style.borderRadius = "50%";
      star3.style.backgroundColor = "rgba(255, 255, 255, 1)";
      star3.style.opacity = "0.3";
      star3.style.position = "absolute";
      randomPosition(star3, 1134.6, 760);
      stars.append(star3);
    }
  }

  function stars58p() {

  }
