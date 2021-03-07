var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('search');
var mapContainerEl = document.getElementById('map-container');


// MapBox API fetch
function getMapTilewithEnglishLabels() {
	fetch("https://maptiles.p.rapidapi.com/en/map/v1/3/6/3.png", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "7c01279655mshcff925bf0df6403p19e7acjsn30d9329ba847",
			"x-rapidapi-host": "maptiles.p.rapidapi.com"
		}
	})
		.then(response => {
			if (response.ok) {
				console.log(response);
				console.log(response.url);
			}
		})
		.catch(err => {
			console.error(err);
		});
}
getMapTilewithEnglishLabels();

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