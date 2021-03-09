var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('search');
var mapContainerEl = document.getElementById('map-container');

var map, infoWindow;

function initMap () {
	let options = {
		center: {lat: 43.654, lng: -79.383 },
		zoom: 8
	};
	

	map = new google.maps.Map(document.getElementById("map"), options);

	infoWindow = new google.maps.InfoWindow;

	// set up for user location and if users geolocation is turned off or not able. 
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(p) {
			var position = {
				lat: p.coords.latitude,
				lng: p.coords.longitude
			};
			infoWindow.setPosition(position);
			infoWindow.setContent("Your Location!");
			infoWindow.open(map);
		}, function() {
			handleLocationError("Geolocation service faild", map.center());
		})
	} else {
		handleLocationError("No geolocation available",map.center());
	}
}

function handleLocationError (content, position) {
	infoWindow.setPosition(position);
	infoWindow.setContent(content);
	infoWindow.open(map);
}


// get search term from formSubmitHandler and return results
function getSearch() {

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


var restEl = document.getElementById("restaurants");
var gasEl = document.getElementById("gas");
var parksEl = document.getElementById("parks");
var moviesEl = document.getElementById("movies");
var grocEl = document.getElementById("groceries");

var options = [];


searchFormEl.addEventListener('submit', formSubmitHandler);