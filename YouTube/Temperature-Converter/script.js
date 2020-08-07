const celciusInput = document.querySelector("#celcius > input");
const fahrenheitInput = document.querySelector("#fahrenheit > input");
const kelvinInput = document.querySelector("#kelvin > input");

function roundOff (value) {
    return Math.round(value*100)/100;
}

celciusInput.addEventListener('input', function() {
    if (((celciusInput.value.substring(celciusInput.value.length - 2, celciusInput.value.length) == "°C") && (!isNaN(celciusInput.value.substring(0, celciusInput.value.length-2))) && celciusInput.value.trim() != "°C") || (!isNaN(celciusInput.value)) && celciusInput.value!="") {
        let celciusValue = parseFloat(celciusInput.value);
        let fahrenheitValue = roundOff((celciusValue * 1.8) + 32);
        let kelvinValue = roundOff(celciusValue + 273.15);

        //celciusInput.value += " °C"
        fahrenheitInput.value = fahrenheitValue + " °F";
        kelvinInput.value = kelvinValue + " K";
    } else {
        fahrenheitInput.value = "";
        kelvinInput.value = "";
    }
});

fahrenheitInput.addEventListener('input', function () {
    if (((fahrenheitInput.value.substring(fahrenheitInput.value.length - 2, fahrenheitInput.value.length) == "°F") && (!isNaN(fahrenheitInput.value.substring(0, fahrenheitInput.value.length - 2))) && fahrenheitInput.value.trim() != "°F") || (!isNaN(fahrenheitInput.value) && fahrenheitInput.value!="")) {
        let fahrenheitValue = parseFloat(fahrenheitInput.value);
        let celciusValue = roundOff((fahrenheitValue - 32) / 1.8);
        let kelvinValue = roundOff(((fahrenheitValue - 32) / 1.8) + 273.15);

        //fahrenheitInput.value += " °F";
        celciusInput.value = celciusValue + " °C";
        kelvinInput.value = kelvinValue + " K";
    } else {
        celciusInput.value = "";
        kelvinInput.value = "";
    }
});

kelvinInput.addEventListener('input', function () {
    if (((kelvinInput.value.substring(kelvinInput.value.length - 1, kelvinInput.value.length) == "K") && (!isNaN(kelvinInput.value.substring(0, kelvinInput.value.length - 1))) && kelvinInput.value.trim() != "K") || (!isNaN(kelvinInput.value) && kelvinInput.value!="")) {
        let kelvinValue = parseFloat(kelvinInput.value);
        let fahrenheitValue = roundOff(((kelvinValue - 273.15) * 1.8) + 32);
        let celciusValue = roundOff(kelvinValue - 273.15);

        //kelvinInput.value += " K";
        fahrenheitInput.value = fahrenheitValue + " °F";
        celciusInput.value = celciusValue + " °C";
    } else {
        fahrenheitInput.value = "";
        celciusInput.value = "";
    }
});