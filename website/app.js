/* Global Variables */
const apiKey = '7a14b09aa968ae104f81d74fc891eb77&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

// create a new date instance dynamically with js
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)
        .then(function (data) {
            postData('/add', { temperature: data.main.temp, date: newDate, userResponse: feelings });
        })
        .then(updateUI);
}

const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(`${baseURL}?zip=${zip}&appid=${key}`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees';
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.userResponse;
    } catch (error) {
        console.log("error", error);
    }
};
