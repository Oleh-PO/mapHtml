document.addEventListener("DOMContentLoaded", function(event) {
	const location = document.getElementsByName('location');
	const maptype = document.getElementsByName('maptype');
	const size = document.getElementsByName('size');
	const zoom = document.getElementsByName('zoom');
	const button = document.getElementById('send');
	let mapJson;
	let mapLink;

	send.addEventListener("click", function (event) {
		mapJson = {
			center : {
				x: location[0].value,
				Y: location[1].value,
			},
			maptype : maptype[0].value,
			size : size[0].value,
			zoom : zoom[0].value,
		};
		fetch('/getMap', {
			method: "POST",
			headers: {'Content-type': 'application/json; charset=UTF-8'},
			body: JSON.stringify(mapJson),
		});
		// fetch("https://maps.googleapis.com/maps/api/staticmap?center=" + location[0].value + "%2C%20" + location[1].value + "&zoom=" + size[0].value + "&maptype=" + maptype[0].value + "&size=400x400&key=AIzaSyDQ8elUpO-aovO_H_weTqzr4IC-jLUL4UI");
		// map.innerHTML.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + location[0].value + "%2C%20" + location[1].value + "&zoom=" + size[0].value + "&maptype=" + maptype[0].value + "&size=400x400&key=AIzaSyDQ8elUpO-aovO_H_weTqzr4IC-jLUL4UI";		
		mapLink = "https://maps.googleapis.com/maps/api/staticmap?center=" + location[0].value + "%2C%20" + location[1].value + "&zoom=" + size[0].value + "&maptype=" + maptype[0].value + "&size=400x400&key=AIzaSyDQ8elUpO-aovO_H_weTqzr4IC-jLUL4UI";
		console.log("https://maps.googleapis.com/maps/api/staticmap?center=" + location[0].value + "%2C%20" + location[1].value + "&zoom=" + size[0].value + "&maptype=" + maptype[0].value + "&size=400x400&key=AIzaSyDQ8elUpO-aovO_H_weTqzr4IC-jLUL4UI")
	});
});