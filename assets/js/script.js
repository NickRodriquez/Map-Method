var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('search');
var mapContainerEl = document.getElementById('map-container');
var slideContainer = document.getElementById('myRange');


var slideContainer = function(){
    var slider = $('.battery-slider'),
    range = $('.slider-range'),
    value = $('.slider-value');
    miles = $('.miles');

    slider.each(function(){
      value.each(function(){
          var value = $(this).prev().attr('value');
          $(this).html(value);
      });
      range.on('input', function(){
        if ( this.value == 100 ) {
            $(miles).append( "<p>Pass</p>" );
        }
        else {
            $(miles).append( "<p>Fail</p>" );
        }

        $(this).next(value).html(this.value);
      });
    });
};

slideContainer(appendChild.myRange);

var map, infoWindow;

function initMap () {
	let options = {
		center: {lat: 43.654, lng: -79.383 },
		zoom: 8
	};
 a0b80e51008eecf79f4676ba3be7ea5539d0d1e3

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

searchFormEl.addEventListener('submit', formSubmitHandler);