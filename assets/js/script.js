var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('search');
var mapContainerEl = document.getElementById('map-container');
var slideContainer = document.getElementById('myRange');
var apiKey = "AIzaSyDEgZkkL71g2hYpAzc-sKf6Ivyt17LFFYY"

const options = ["restaurants", "gas", "parks", "movies", "groceries"];

for (var i = 0; i < options.length; i++) {
	var input = document.getElementsByTagName("checkbox" + options[i]);
	if (input.checked === true);
	var checked = JSON.parse(localStorage.getItem(options)); 

}


var slider = document.getElementById("myRange");
var output = document.getElementById("miles");
output.innerHTML = slider.value; 
slider.oninput = function() {
  output.innerHTML = this.value;
}

var map, infoWindow;

function initMap() {
	let options = {
		center: { lat: 43.654, lng: -79.383 },
		zoom: 8
	};

	map = new google.maps.Map(document.getElementById("map"), options);

	var input = document.getElementById("search");
	var searchBox = new google.maps.places.SearchBox(input);

	map.addListener("bounds_changed", function() {
		searchBox.setBounds(map.getBounds());
	});

	var markers = [];

	searchBox.addListener("places_changed", function() {
		var places = searchBox.getPlaces();

		if (places.length === 0)
		return;

		markers.forEach(function(m) {m.setMap(null); });
		markers = [];

		var bounds = new google.maps.LatLngBounds();

		places.forEach(function(p) {
			if (!p.geometry)
			return;

			markers.push(new google.maps.Marker({
				map: map,
				title: p.name,
				position:p.geometry.location
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
function getSearch() {
	apiUrl = ""
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
	console.log(event);
};


searchFormEl.addEventListener('submit', formSubmitHandler);