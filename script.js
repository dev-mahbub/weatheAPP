// Initializing all elements constants
const temparatureFied = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Adding event listen to the form 
form.addEventListener("submit", search);

// Default Location
let target = "Mymensingh";

// Function to Fetch Data from weather API
const fatchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=0eec20f6072a47a08cb130837221309&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();

        // Destructuring
        const {
            current: { temp_c, condition: { icon, text } },
            location: { name, localtime }
        } = data;

        // Calling Update DOM Function
        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Locaiton not Found");
    }

};

// Function to Update DOM
function updateDom(temperature, city, time, emoji, weather) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exectDay = getDayFullName(new Date(exactDate).getDay());

    temparatureFied.innerText = temperature;
    cityField.innerText = city;

    dateField.innerText = `${exactTime} - ${exectDay} - ${exactDate}`
    emojiField.src = emoji;
    weatherField.innerText = weather;
}

// Function to Search the Location
function search(e) {
    e.preventDefault();
    target = searchField.value;

    fatchData(target)
}


fatchData(target);

// Function to get the name of day
function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thrusday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saterday";
            break;


        default:
            return "Don't Know";
            break;
    }
}