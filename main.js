let inputFromUser = ""
getFetch("")

let map;
function initMap(lat,lng) {
    const mapId = document.getElementById("map");
    map = new google.maps.Map(mapId, {
        center: { lat: lat, lng: lng },
        zoom: 11,
    });

    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        icon: ("./assets/icon-location.svg"),
    });
}

const buttonInput = document.getElementById('buttonId');
// inputFromUser = document.getElementById('inputId').value
// console.log(inputFromUser);
// buttonInput.addEventListener('click',getFetch(inputFromUser));
buttonInput.addEventListener('click',(e)=>initialize_Information_Card(e));

function initialize_Information_Card(e) {
     e.preventDefault();
     console.log("hi");
     inputFromUser = document.getElementById('inputId').value

    getFetch(inputFromUser)
}


async function getFetch(inputFromUser){
    const withoutInput = `https://geo.ipify.org/api/v2/country,city?apiKey=at_vmDVjOoZ2dyM9uXij3pSABYBeirCh&ipAddress=`
    const withInput = `https://geo.ipify.org/api/v2/country,city?apiKey=at_vmDVjOoZ2dyM9uXij3pSABYBeirCh&ipAddress=${inputFromUser}`
    const whichInput = inputFromUser == "" ? withoutInput : withInput
   
    await fetch(whichInput)
    .then((response)=> {
        if(response.ok){
            return response.json()
        }
        else{
            throw new Error (response.statusText)
    }})
    .then((data)=>{
        createInformationBox(data);
        initMap(data.location.lat,data.location.lng);

    })
}


function createInformationBox(objectOfData) {
    
    const ipAddressDiv = document.getElementById('ipAddressId')
    ipAddressDiv.innerHTML = objectOfData.ip
    const locationDiv = document.getElementById('locationId')
    locationDiv.innerHTML = `<span class="info-box-content">${objectOfData.location.city},</span><span class="info-box-content">${objectOfData.location.country}</span>`

    const noPostalCode = "No P code";
    const thereIsPostalCode = objectOfData.location.postalCode;
    const locationDivPostal =  objectOfData.location.postalCode == "" ? noPostalCode : thereIsPostalCode;
    document.getElementById('postalCode').innerHTML = locationDivPostal
        
    const timezoneDiv = document.getElementById('timezoneId')
    timezoneDiv.innerHTML = objectOfData.location.timezone
    const ispDiv = document.getElementById('ispId')
    ispDiv.innerHTML = objectOfData.isp
}



















//A - user open the site
// in the beginning input from use empty
// form initialize the data we will use the get fetch fun with empty string 
// in the function it will take an api without ip address, what make the api get the user computer ip.
// when we get the data we will call createInformationBox function and display the data.

//B - user insert an ip
//when user write an input and click on button the event created
//the event call 
