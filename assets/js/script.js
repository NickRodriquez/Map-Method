
var slider = document.getElementById("myRange")
var output = document.getElementById("demo")
output.innerHTML = slider.nodeValue;

slider.oninput = function() {
	output.innerHTML = this.value
}

function search() {
	// Get the users input from the page
	var searchQuery = document.getElementById('searchbox').value;
	// Get the item for Local Storage
	var localStorageItem = localStorage.getItem(searchQuery);
}

function getMapTilewithEnglishLabels() {
    fetch("https://maptiles.p.rapidapi.com/en/map/v1/3/6/3.png", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "7c01279655mshcff925bf0df6403p19e7acjsn30d9329ba847",
		"x-rapidapi-host": "maptiles.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
}
getMapTilewithEnglishLabels();