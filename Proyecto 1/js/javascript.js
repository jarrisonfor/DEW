const checkCarRegistration = /^[0-9]{4}[ -]?[A-Z]{3}$/i;
const checkNumber = /^[0-9]{1,10}$/;
const checkTime = /^(?:(?:([01]?\d|2[0-3]):)([0-5]?\d):)([0-5]?\d)$/;
const checkTrafficLight = /^green|red|orange$/i;
const checkBoolean = /^yes|no$/i;
const checkText = /^[\d\w\s]{4,50}$/i;

function randomIntFromInterval(min, max) { // This function is for the generation of random Emojis
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// Collection and data assignment

let invalid = true;

// Get time from user prompt and and validate them
let time;
invalid = true;
while (invalid) {
    time = prompt(`What time will it be?`)
    invalid = !checkTime.test(time);
    if (invalid) {
        alert('Time format is incorrect')
    }
}

// Get the quantity of cars and their car registration plates from user prompt and and validate them
let carRegistrations = [];
let carQuantity = 0;
invalid = true;
while (invalid) {
    carQuantity = prompt(`How many cars will there be?`)
    invalid = !checkNumber.test(carQuantity);
    if (invalid) {
        alert('Please enter a correct number of cars')
    } else {
        let carRegistration;
        for (let i = 0; i < carQuantity; i++) {
            invalid = true;
            while (invalid) {
                carRegistration = prompt(`Tell me the car registration of the ${i + 1}º car`)
                invalid = !checkCarRegistration.test(carRegistration);
                if (invalid) {
                    alert('Incorrect car registration format')
                } else {
                    carRegistrations.push(carRegistration);
                }
            }
        }
    }
}

// Get the quantity of shops and their names, portal number, and the offer from from user prompt and validate them
let shops = [];
let shopQuantity = 0;
invalid = true
while (invalid) {
    shopQuantity = prompt(`How many shops will there be?`)
    invalid = !checkNumber.test(shopQuantity);
    if (invalid) {
        alert('Please enter a correct number of shops')
    } else {
        let shopName;
        let shopNumber;
        let shopOffer;
        for (let i = 0; i < shopQuantity; i++) {
            shops.push({})
            invalid = true
            while (invalid) {
                shopName = prompt(`Tell me the name of the ${i + 1}º shop`)
                invalid = !checkText.test(shopName);
                if (invalid) {
                    alert('The introduced name is invalid')
                } else {
                    shops[i]['shopName'] = shopName;
                }
            }
            invalid = true
            while (invalid) {
                shopNumber = prompt(`Tell me the portal number of the ${i + 1}º shop`)
                invalid = !checkNumber.test(shopNumber);
                if (invalid) {
                    alert('The introduced portal number is invalid')
                } else {
                    shops[i]['shopNumber'] = shopNumber;
                }
            }
            invalid = true
            while (invalid) {
                shopOffer = prompt(`Tell me the offer of the ${i + 1}º shop`)
                invalid = !checkText.test(shopOffer);
                if (invalid) {
                    alert('The offer introduced is invalid')
                } else {
                    shops[i]['shopOffer'] = shopOffer;
                }
            }
        }
    }
}


// Get the color of the traffic light from user prompt and validate them
let trafficLight;
invalid = true;
while (invalid) {
    trafficLight = prompt(`Tell me a color of the traffic light`)
    invalid = !checkTrafficLight.test(trafficLight);
    if (invalid) {
        alert('The color introduced is incorrect');
    }
}

// We assign the illuminated variables to the corresponding colors and walk
let green = trafficLight.toLowerCase() == 'green' ? 'illuminated' : ''
let orange = trafficLight.toLowerCase() == 'orange' ? 'illuminated' : ''
let red = trafficLight.toLowerCase() == 'red' ? 'illuminated' : ''
let dontWalk = orange != '' || green != '' ? 'illuminated' : ''
let walk = red != '' ? 'illuminated' : ''

// Depending on the screen, we want a type of style or another
let higher = shopQuantity > carQuantity ? shopQuantity : carQuantity;
let width = 850;
let widthType = 'px';
if (higher < 2) {
    width = 1;
    widthType = 'fr';
}

// HTML creation
let html = `
<div id="container" style="grid-template-columns: 100px repeat(${higher}, ${width}${widthType}) 100px;">
    <div>
        <div class="area"></div>
        <div class="sidewalk">
            <div id="watch">
                ${time}
            </div>
            <div class="pole"></div>
        </div>
        <div class="road">
            <div class="divisiona"></div>
            <div class="divisionb"></div>
        </div>
    </div>
`;

for (let i = 0; i < higher; i++) {
    html += `
        <div>
            <div class="area">`;
    if (shops[i]) {
        html += `
                <div class="shop">
                    <div class="name">${shops[i].shopName}</div>
                    <div class="number">${shops[i].shopNumber}</div>
                    <div class="door">
                        <div>
                            <div></div>
                        </div>
                    </div>
                    <div class="poster">
                        <div class="emoji">
                            &#${randomIntFromInterval(128512, 128580)}
                        </div>
                        <div class="offer">
                            ${shops[i].shopOffer}
                        </div>
                    </div>
                </div>
        `;
    }
    html += `
            </div>
            <div class="sidewalk"></div>
            <div class="road">
                <div class="divisiona"></div>
                <div class="divisionb"></div>
    `;
    if (carRegistrations[i]) {
        html += `
                <div class="car">
                    <img src="img/coche.png">
                    <div class="carRegistration">${carRegistrations[i]}</div>
                </div>
        `;
    }
    html += `
            </div>
        </div>
    `;
}

html += `
    <div>
        <div class="area"></div>
        <div class="sidewalk">
            <div id="trafficLight">
                <div class="light red ${red}"></div>
                <div class="light orange ${orange}"></div>
                <div class="light green ${green} "></div>
            </div>
            <div id="walk">
                <div class="${dontWalk}">Dont Walk</div>
                <div class="${walk}">Walk</div>
            </div>
            <div class="pole"></div>
        </div>
        <div class="road">
            <div class="divisiona"></div>
            <div class="divisionb"></div>
        </div>
    </div>
</div>
`;

document.write(html)