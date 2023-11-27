const baseURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";
const keys = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";

let apiKey = "";

async function getKey() {
    const response = await fetch(`${keys}`, {
        method: 'POST',
        headers: {'x-zocom': `${keys}`}
    });

    const data = await response.json();
    console.log(data);
    apiKey = data.key;
    console.log(apiKey);

    getplanet(apiKey);
}



async function getplanet(apikey) {
    console.log(apiKey);
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
        method: 'GET',
        headers: {'x-zocom': `${apikey}`}
    });
    const data = await response.json();
    console.log(data);
    
}


/*
const getplanet2 = {
    method: 'GET',
    headers: {'x-zocom': `${apikey}`}

};
*/