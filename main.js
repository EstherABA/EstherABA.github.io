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
buttonInput.addEventListener('click',(e)=>handlingTheEventAndSaveData(e));
// inputFromUser = document.getElementById('inputId').value
// console.log(inputFromUser);
// buttonInput.addEventListener('click',getFetch);

function handlingTheEventAndSaveData(e) {
     e.preventDefault();
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
    locationDiv.innerHTML = `<div class="info-box-content">${objectOfData.location.city},${objectOfData.location.country}</div>`

    const noPostalCode = "No P code";
    const thereIsPostalCode = objectOfData.location.postalCode;
    const locationDivPostal =  objectOfData.location.postalCode == "" ? noPostalCode : thereIsPostalCode;
    document.getElementById('postalCode').innerHTML = locationDivPostal
        
    const timezoneDiv = document.getElementById('timezoneId')
    timezoneDiv.innerHTML = objectOfData.location.timezone
    const ispDiv = document.getElementById('ispId')
    ispDiv.innerHTML = objectOfData.isp
}