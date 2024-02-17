import getLocation from getCurLongLat.js;

//inputName = "Yan Qing";
//inputFriendNumber = "+16476756827"; //must be a valid phone string
//inputLocation = "11 Wellesley St. West"; //must be a valid address string
//inputTime = "15:40:00"; //must be a valid time string
//geoapify_api_key = "776be82a39dd4a4da7874886c9abd830";

//let curLongitude = -79.5017;
//let curLatitude = 43.7739;

let timeoutID;


//sendFutureText(inputName, inputFriendNumber, inputLocation, inputTime);
//console.log("just sent the text.");


function getCurDateString (currentDate) {

    let curMonth = currentDate.getMonth();
    let curYear = currentDate.getFullYear();
    let curDate = currentDate.getDate();

    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];

    return months[curMonth] + ' ' + curDate.toString() + ', ' + curYear.toString();
}

function getNewDateObject (currentDate, inputTime) {
    let curDateString = getCurDateString(currentDate);
    return new Date(curDateString + ' ' + inputTime);
}

function sendFutureText(inputName, inputFriendNumber, inputLocation, inputTime) {
    const currentDate = new Date(Date.now());
    let futureDate = getNewDateObject(currentDate, inputTime);
    let millisecondTimer = futureDate.getTime() - currentDate.getTime();

    //TODO: delete these console logs
    //console.log("Millisecond Timer is: ", millisecondTimer);
    //console.log("Seconds to wait: ", millisecondTimer * 1000);

    timeoutID = setTimeout(textFriendNow, millisecondTimer, inputName, inputLocation, inputFriendNumber);

    console.log("Just setTimout.");

}

function cancelFutureText() {
    clearTimeout(timeoutID);
}

function convertStringToURLString(inputLocation) {
    let locationArray = inputLocation.split(' ');

    let i = 0;
    let URLString = "";
    while (i < locationArray.length) {
        if (i == 0) {
            URLString = URLString + locationArray[i];
        }
        else {
            URLString = URLString + "%" + locationArray[i];
        }
        i++;
    }
    return URLString;
}

//TODO: remove console log for long and lat in that one place, and implement curLong and curLat
function textFriendNow(inputName, inputLocation, inputFriendNumber) {
    let callAPIURL = "https://api.geoapify.com/v1/geocode/search?text=" + convertStringToURLString(inputLocation) + "&format=json&filter=place:512c13d96292d853c0596a04d149a5d34540f00101f90173f2040000000000c00208&apiKey=776be82a39dd4a4da7874886c9abd830"

    fetch(callAPIURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const jsonString = JSON.stringify(data);
            const jsonObject = JSON.parse(jsonString);
            const expLongitude = jsonObject.results[0].lon;
            const expLatitude = jsonObject.results[0].lat;

            const curLoc = getLocation;
            const curLatitude = curLoc[0];
            const curLongitude = curLoc[1];

            //TODO: delete these console logs
            //console.log("Expected Longitude: ", expLongitude);
            //console.log("Expected Latitude: ", expLatitude);

            //console.log("Current Longitude: ", curLongitude);
            //console.log("Current Latitude: ", curLatitude);

            if (onLocationSame(curLatitude, curLongitude, expLatitude, expLongitude)) {
                let smsText = inputName + " has arrived at " + inputLocation + "!";
                sendSMS(inputFriendNumber, smsText);

                //TODO: delete these console logs
                //console.log("Locations are the same. Just sent home-safe SMS text to: ", inputFriendNumber);
            }
            else{
                let smsText = inputName + " has not arrived at " + inputLocation + " yet.\n" +
                    "Expected time of arrival: " + inputTime +
                    "\nCheck up on them to see if they're alright!"
                sendSMS(inputFriendNumber, smsText);

                //TODO: delete these console logs
                //console.log("Locations are NOT the same. Just sent in-danger SMS text to: ", inputFriendNumber);
            }

        })
        .catch(error => {
            console.log("Problem with API call: using inputLocation to get expLong and expLat.");
            console.log('error', error)
        });
}

function sendSMS (friendNumber, sendText) {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic bGVleWFucWluZzIwMDRAaG90bWFpbC5jb206OEU4NkFCQkItRTczMy01NkQ3LTlEMjAtMTc3QTdCQUFBNTcw");

    const raw = JSON.stringify({
        "messages": [
            {
                "body": sendText,
                "to": friendNumber,
                "from": "+14375510773"
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://rest.clicksend.com/v3/sms/send", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    return ("success");
}



//BELOW ARE HELPER FUNCTIONS TO DETERMINE IF TWO LOCATIONS ARE THE SAME.
//
//
//

function onLocationSame(curLat, curLng, expLat, expLng) {

    // lat1 and lng1 are the values of a previously stored location
    return distance(curLat, curLng, expLat, expLng) < 0.1;
}

/** calculates the distance between two locations in MILES */
function distance(lat1, lng1, lat2, lng2) {
    const earthRadius = 3958.75; // in miles, change to 6371 for kilometer output

    const dLat = toRadians(lat2-lat1);
    const dLng = toRadians(lng2-lng1);

    const sindLat = Math.sin(dLat / 2);
    const sindLng = Math.sin(dLng / 2);

    const a = Math.pow(sindLat, 2) + Math.pow(sindLng, 2)
        * Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const dist = earthRadius * c;

    return dist; // output distance, in MILES
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
