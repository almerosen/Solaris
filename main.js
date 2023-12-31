const baseURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";
const keyURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";


const planetHeaderDiv = document.querySelector(".planet-header");
const planetHeaderLatinDiv = document.querySelector(".planet-header__latin");
const description = document.querySelector(".description"); 
const circumference = document.querySelector(".omkrets-container");
const distanceFromSunDiv = document.querySelector(".km-from-sun");
const maxTempDiv = document.querySelector(".max-container");
const minTempDiv = document.querySelector(".min-container");
const moonDiv = document.querySelector(".moon-container");



/*****************************************************************/
/*****************  GET KEY AND PLANET FUNCTION: *****************/
/*****************************************************************/

async function getKeyAndPlanet(index) {
  try {
    const response = await fetch(keyURL, {
        method: 'POST',
    });
    if (!response.ok) {
      throw new Error (`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const apiKey = data.key;

    getplanet(index, apiKey)

  } catch(error) {
    console.error("Error fetching data:", error);
  } 
}


// Get planet function:
async function getplanet(index, apiKey) {
    
    try {
        const response = await fetch(`${baseURL}/bodies`, {
            method: 'GET',
            headers: {'x-zocom': apiKey}
        });

        if (!response.ok) {
          throw new Error (`Request fething data failed with status: ${response.status}`);
        }
    
        const data = await response.json();
        const planets = data.bodies;
        const planet = planets[index];
        
        planetDetails(planet);

    } catch(error) {
        console.error("Error fetching data:", error);
    }    
}

/*****************************************************************/
/******** Get planet details and reset and create elements: ******/
/*****************************************************************/

function planetDetails(planet) {
    planetHeaderDiv.innerHTML = "";
    planetHeaderLatinDiv.innerHTML = "";
    description.innerHTML = "";
    circumference.innerHTML = "";
    distanceFromSunDiv.innerHTML = "";
    maxTempDiv.innerHTML = "";
    minTempDiv.innerHTML = "";
    moonDiv.innerHTML = "";
    
    // Header planet:
    let planetHeader = document.createElement("h1");
    planetHeader.innerHTML = planet.name.toUpperCase();
    planetHeaderDiv.append(planetHeader);

    // Header latin:
    const planetHeaderLatin = document.createElement("h2");
    planetHeaderLatin.innerHTML = planet.latinName.toUpperCase();
    planetHeaderLatinDiv.append(planetHeaderLatin);

    // Description text:
    const descriptionTxt = document.createElement("p");
    descriptionTxt.innerHTML = planet.desc;
    description.append(descriptionTxt);

    // Circumference:
    const circumferenceHeader = document.createElement("h3");
    circumferenceHeader.innerHTML = "OMKRETS";
    circumference.append(circumferenceHeader);

    const circumferenceTxt = document.createElement("p");
    circumferenceTxt.classList.add("details__txt");
    // Circumference, space between every third number:
    let circumferenceArray = planet.circumference.toString().split(""); // Integers to string and split string into array of substrings
    // For loop backwards every third character in the array:
    for (i = circumferenceArray.length - 3; i > 0; i -= 3 ) {
      circumferenceArray.splice([i], 0, " "); // space at every third index position from the back
    }
    circumferenceTxt.innerHTML = `${circumferenceArray.join("")} km`;
    circumference.append(circumferenceTxt);


    // Distance from sun:
    const distanceFromSunHeader = document.createElement("h3");
    distanceFromSunHeader.innerHTML = "KM FRÅN SOLEN";
    distanceFromSunDiv.append(distanceFromSunHeader);

    const distanceFromSunTxt = document.createElement("p");
    distanceFromSunTxt.classList.add("details__txt")
    // Space between every third integer from the back:
    let distance = planet.distance;
    let distanceArray = distance.toString().split("");
    for (i = distanceArray.length - 3; i > 0; i -= 3) { // Start the loop three characters from the back and then insert space after every third character
      distanceArray.splice([i], 0, " ");
    }
    distanceFromSunTxt.innerHTML = `${distanceArray.join("")} km`;
    distanceFromSunDiv.append(distanceFromSunTxt);

    // Max temp:
    const maxTempHeader = document.createElement("h3");
    maxTempHeader.innerHTML = ("MAX TEMPERATUR");
    maxTempDiv.append(maxTempHeader);

    const maxTempTxt = document.createElement("p");
    maxTempTxt.classList.add("details__txt");

    // Temp number to array -> look for "-", if there is -> insert space after "-":
    let maxTemp = planet.temp.day;
    let maxTempArray = maxTemp.toString().split("");

    maxTempArray.forEach((character, currentindex) => {
        if (character === "-") {
        maxTempArray.splice([(currentindex + 1)], 0, " "); // Insert space at index position + 1
      } 
    })

    // If there are more integers than three, as for the sun, add space efter three from the back:
    if (maxTemp > 999 || maxTemp < -999) { // If temp in integer is bigger than 999 or below -999
      for (i = maxTempArray.length; i >= 0; i -= 3) {
          maxTempArray.splice([i], 0, " ");
        }
    }

    maxTempTxt.innerHTML = `${maxTempArray.join("")} C`;
    maxTempDiv.append(maxTempTxt);


    // Min temp:
    // with space between "-" and number:

    const minTempHeader = document.createElement("h3");
    minTempHeader.innerHTML = "MIN TEMPERATUR";
    minTempDiv.append(minTempHeader);

    const minTempTxt = document.createElement("p");
    minTempTxt.classList.add("details__txt");
    let minTemp = planet.temp.night;
    let minTempArray = minTemp.toString().split("");

    minTempArray.forEach((character, currentindex) => {
      if (character === "-") {
        minTempArray.splice((currentindex + 1), 0 , " "); // Insert space after "-" if there is one
      }
    }) 

    if (minTemp > 999 || minTemp < -999) { // If temp in integer is bigger than 999 or below -999
      for (i = minTempArray.length; i >= 0; i -= 3) {
          minTempArray.splice([i], 0, " ");
        }
    }

    minTempTxt.innerHTML = `${minTempArray.join("")} C`;
    minTempDiv.append(minTempTxt);


    // Moons:
    const moonArray = planet.moons;
    const moonHeader = document.createElement("h3");
    moonHeader.innerHTML = "MÅNAR";
    moonDiv.append(moonHeader);

    const moonTxt = document.createElement("p");
    moonTxt.classList.add("details__txt");
    moonTxt.innerHTML = moonArray.join(", ");
    moonDiv.append(moonTxt);
}

/*****************************************************************/
/************** EVENT LISTENERS ON PLANET CLICK: *****************/
/*****************************************************************/

const planetLinks = document.querySelectorAll(".planet"); // node list of all the planets to loop through with forEach:

planetLinks.forEach((planet, index) => {
  planet.addEventListener('click', () => {
    getKeyAndPlanet(index);
    openOverlay();
  })
})


/**********************************************************/
/******************* OVERLAY  FUNCTIONS *******************/
/**********************************************************/

function openOverlay() {
    document.getElementById("overlay-page").style.width = "100%"; // with transition and width 0% in css -> overlay "swipes" in from the side
    stars.innerHTML = ""; // reset stars when "opening" new planet
    stars6px(); // PLace stars randomly
    stars3px();
  }
  
  function closeOverlay() {
    document.getElementById("overlay-page").style.width = "0%";
  }

  const closeButton = document.querySelector(".closebutton");
  closeButton.addEventListener('click', () => {
    closeOverlay();
  })

  /*********************************************************/
  /******************* STARS BACKGROUND ********************/
  /*********************************************************/

  // Create stars and place them randomly in horizontal and vertical plane

  const stars = document.querySelector(".stars");

  function random(max) {
    return Math.floor(Math.random() * max); // Max pixel size horizontal or vertical (max of container: x: 1136.px and y: 760px)
  }
  function randomPosition(element, xMax, yMax) {
    element.style.position = "absolute";
    element.style.left = random(xMax) + "px"; // random horizontal, the div's width
    element.style.top = random(yMax) + "px"; // random vertical, the div's height
  }

  function stars6px() { // creates 27 stars of size 6px x 6px place them randomly
    for (i = 0; i < 27; i++) {
      const star6 = document.createElement("div");
      star6.style.width = "6px";
      star6.style.height = "6px";
      star6.style.borderRadius = "50%";
      star6.style.backgroundColor = "white";
      star6.style.opacity = "0.3";
      randomPosition(star6, 1134.6, 760);
      stars.append(star6);
    }
  }

  function stars3px() { // creates 22 stars of size 3px x 3px and place them randomly
    for (j = 0; j < 22; j++) {
      const star3 = document.createElement("div");
      star3.style.width = "3px";
      star3.style.height = "3px";
      star3.style.borderRadius = "50%";
      star3.style.backgroundColor = "rgba(255, 255, 255, 1)";
      star3.style.opacity = "0.3";
      randomPosition(star3, 1134.6, 760);
      stars.append(star3);
    }
  }
