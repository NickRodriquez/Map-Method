var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('search');
var mapContainerEl = document.getElementById('map-container');

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

const options = ["restaurants", "gas", "parks", "movies", "groceries"];

for (var i = 0; i < options.length; i++) {
	var checked = JSON.parse(localStorage.getItem(options)); 

}



// var checked = JSON.parse(localStorage.getItem("restaurants"));
// if (checked == "true") {
//     document.getElementById("restaurants").checked = true;
// }
// function load(){    
//     var checked = JSON.parse(localStorage.getItem("restaurants"));
//     document.getElementById("restaurants").checked = checked;
// }

// function save(){
//     var checkbox = document.getElementById("restaurants");
//     localStorage.setItem('restaurants', checkbox.checked);
// }

// var checked = JSON.parse(localStorage.getItem('gas'));
// if (checked == "true") {
//     document.getElementById("gas").checked = true;
// }
// function load(){    
//     var checked = JSON.parse(localStorage.getItem('gas'));
//     document.getElementById("gas").checked = checked;
// }

// function save(){
//     var checkbox = document.getElementById('gas');
//     localStorage.setItem('gas', checkbox.checked);
// }

// var checked = JSON.parse(localStorage.getItem('parks'));
// if (checked == "true") {
//     document.getElementById("parks").checked = true;
// }
// function load(){    
//     var checked = JSON.parse(localStorage.getItem('parks'));
//     document.getElementById("parks").checked = checked;
// }

// function save(){
//     var checkbox = document.getElementById('parks');
//     localStorage.setItem('parks', checkbox.checked);
// }

// var checked = JSON.parse(localStorage.getItem('movies'));
// if (checked == "true") {
//     document.getElementById("movies").checked = true;
// }
// function load(){    
//     var checked = JSON.parse(localStorage.getItem('movies'));
//     document.getElementById("movies").checked = checked;
// }

// function save(){
//     var checkbox = document.getElementById('movies');
//     localStorage.setItem('movies', checkbox.checked);
// }

// var checked = JSON.parse(localStorage.getItem('groceries'));
// if (checked == "true") {
//     document.getElementById("groceries").checked = true;
// }
// function load(){    
//     var checked = JSON.parse(localStorage.getItem('groceries'));
//     document.getElementById("groceries").checked = checked;
// }

// function save(){
//     var checkbox = document.getElementById('groceries');
//     localStorage.setItem('groceries', checkbox.checked);
// }


searchFormEl.addEventListener('submit', formSubmitHandler);