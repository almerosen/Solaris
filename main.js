const baseURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";
const keyURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";

let apiKey = "";
let planet = "";


const planetHeaderDiv = document.querySelector(".planet-header");
const planetHeaderLatinDiv = document.querySelector(".planet-header__latin");
const description = document.querySelector(".description"); 

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

async function planetDetails() {
    planetHeaderDiv.innerHTML = "";
    planetHeaderLatinDiv.innerHTML = "";
    description.innerHTML = "";
    
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