var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('search');
var mapContainerEl = document.getElementById('map-container');
var slideContainer = document.getElementById('myRange');
var apiKey = "AIzaSyDEgZkkL71g2hYpAzc-sKf6Ivyt17LFFYY"

var slider = document.getElementById("myRange");
var output = document.getElementById("miles");
output.innerHTML = slider.value; 
slider.oninput = function() {
  output.innerHTML = this.value;
  circle.setRadius(this.value * 1609.34);
}

var map, infoWindow, circle;

function setCircle(center){
	
	 circle = new google.maps.Circle({
		center: center,
		map: map,
		radius: 10000,          // IN METERS.
		fillColor: '#FF6600',
		fillOpacity: 0.3,
		strokeColor: "#FFF",
		strokeWeight: 0         // DON'T SHOW CIRCLE BORDER.
	});
	circle.setMap(map);
}

function initMap() {
	let options = {
		center: { lat: 43.654, lng: -79.383 },
		zoom: 8
	};

	map = new google.maps.Map(document.getElementById("map"), options);

	setCircle({ lat: 43.654, lng: -79.383 });


	var input = document.getElementById("search");
	var searchBox = new google.maps.places.SearchBox(input);

	map.addListener("bounds_changed", function () {
		searchBox.setBounds(map.getBounds());
	});

	var markers = [];

	searchBox.addListener("places_changed", function () {
		var places = searchBox.getPlaces();

		if (places.length === 0)
			return;

		markers.forEach(function (m) { m.setMap(null); });
		markers = [];

		var bounds = new google.maps.LatLngBounds();

		places.forEach(function (p) {
			if (!p.geometry)
				return;

			markers.push(new google.maps.Marker({
				map: map,
				title: p.name,
				position: p.geometry.location
			}));

			if (p.geometry.viewport)
				bounds.union(p.geometry.viewport);
			else
				bounds.extend(p.geometry.location);
		});
		map.fitBounds(bounds);
	});

	infoWindow = new google.maps.InfoWindow;

	// set up for user location and if users geolocation is turned off or not able. 
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (p) {
			var position = {
				lat: p.coords.latitude,
				lng: p.coords.longitude
			};
			infoWindow.setPosition(position);
			infoWindow.setContent("Your Location!");
			infoWindow.open(map);
			circle.setCenter(position)
		}, function () {
			handleLocationError("Geolocation service faild", map.center());
		})
	} else {
		handleLocationError("No geolocation available", map.center());
	}
}

function handleLocationError(content, position) {
	infoWindow.setPosition(position);
	infoWindow.setContent(content);
	infoWindow.open(map);
}


// get search term from formSubmitHandler and return results
function getSearch(search) {
	console.log(search)

    // format API urls
	var apiUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + search + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + apiKey;
	console.log("apiURL", apiUrl)

	// fetch API search data
    fetch("no-cors", apiUrl)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        displayDisplaySearch(data)
                    })
            } else {
                console.log("error1: " + response.statusText)
            }
        })
        .catch(err => {
            console.log("error2: " + err.statusText)
        })
}

function displayDisplaySearch(data) {
	console.log(data)
}

// handles the search form submission
function formSubmitHandler(event) {
	event.preventDefault();
	// get value from input element
	var search = searchInputEl.value.trim();
	if (search) {
		// send search to getSearch for API processing
		getSearch(search);
		searchInputEl.value = "";
	} else {
		console.log("Please enter a search");
	}
};


searchFormEl.addEventListener('submit', formSubmitHandler);