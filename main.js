const baseURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";
const keys = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";

async function getKey() {
    const response = await fetch(`${keys}`, {
        method: 'POST',
        headers: {'x-zocom': `${keys}`}
    });

    const data = await response.json();
    console.log(data);
    const key = data.key;
    console.log(key);

    //getplanet(key);
}



async function getplanet(apikey) {
    console.log(key);
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/", {
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