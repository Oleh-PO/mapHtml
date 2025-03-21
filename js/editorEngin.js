document.addEventListener("DOMContentLoaded", function(event) {
	const location = document.getElementsByName('location');
	const maptype = document.getElementsByName('maptype')[0];
	const size = document.getElementsByName('size')[0];
	const zoom = document.getElementsByName('zoom')[0];
	const list = document.getElementsByName('list')[0];
	const x = document.getElementsByName('dot')[0];
	const y = document.getElementsByName('dot')[1];
	const nameM = document.getElementsByName('nameM')[0];
	const description = document.getElementsByName('description')[0];
	const photos = document.getElementsByName('photos')[0];
	const button = document.getElementById('send');
	const save = document.getElementById('save');
	const map = document.getElementById('map');
	const add = document.getElementById('add');
	const saveMarker = document.getElementById('saveMarker');
	const editorMenu = document.querySelector('.editorMenu');


	let mapJson;
	let counter = 0;

	const decoder = new TextDecoder();

	const markerUpd = function(){
		let moveMarker = document.getElementById(list.value);
		moveMarker.style.left = x.value + "%";
		moveMarker.style.top = y.value + "%";
		moveMarker.firstElementChild.innerText = nameM.value;
	};

	const startEdit = function() {
		for (var i = 0; i < json.length; i++) {
			list.innerHTML += "<option value="+i+">"+i+"</option>"
		};
	};

	const setIt = function() {
		nameM.value = json[list.value].name;
		description.value = json[list.value].context;
		x.value = json[list.value].x;
		y.value = json[list.value].y;
	};

	const jsonUpd = function() {
		mapJson = { //packing data from inputs to json
			center : {
				y: location[0].value,
				x: location[1].value,
			},
			maptype : maptype.value,
			size : size.value,
			zoom : zoom.value,
			src : "https://maps.googleapis.com/maps/api/staticmap?center=" + location[0].value + "%2C%20" + location[1].value + "&zoom=" + zoom.value + "&maptype=" + maptype.value + "&size="+ size.value + "x" + size.value + "&key=AIzaSyDQ8elUpO-aovO_H_weTqzr4IC-jLUL4UI"
		};
	};

	const saveJson = function() {
		if (photos.files.length === 0) {
			json[list.value] = 
			{
				name : nameM.value,
				x : x.value,
				y : y.value,
				context : description.value,
				imgs : json[list.value].imgs,
			};
		} else {
			let photosArrey = [];
			for (let i = 0; i < photos.files.length; i++) {
				photosArrey.push(photos.files[i].name);
			};
			json[list.value] = 
			{
				name : nameM.value,
				x : x.value,
				y : y.value,
				context : description.value,
				imgs : photosArrey,
			};
		};
	};

	saveMarker.addEventListener("click", function (event) {
		saveJson();
		markerUpd();
		fetch('/getMarker', { //sending it to server
			method: "POST",
			headers: {'Content-type': 'application/json; charset=UTF-8'},
			body: JSON.stringify(json),
		});
	});

	add.addEventListener("click", function (event) {
		list.innerHTML += "<option value="+json.length+">"+json.length+"</option>"
		list.value = json.length;
		let photosArrey = []; //convert photos names to arrey
		for (let i = 0; i < photos.files.length; i++) {
			photosArrey.push(photos.files[i].name);
		};
		json.push({ //creating new merker in json
			name : nameM.value,
			x : x.value,
			y : y.value,
			context : description.value,
			imgs : photosArrey,
		});
		clone = example.cloneNode(true); //clone from examle
    clone.style.left = x.value + "%";
    clone.style.top = y.value + "%";
    clone.firstElementChild.innerText = nameM.value;
    clone.style.display = "block";
    clone.id = list.value;
    screen.appendChild(clone);
	});

	list.addEventListener("change", function (event) { //updating menu
		setIt();
	});

	x.addEventListener("change", function (event) {markerUpd()});
	y.addEventListener("change", function (event) {markerUpd()});
	nameM.addEventListener("change", function (event) {markerUpd()});

	editorMenu.addEventListener("click", function (event) { //menu function
		if (event.target.localName === "button") {//testing for miss 
			let select = document.querySelectorAll(".configMap div")
			for (let i = 0; i < select.length; i++) {
				select[i].className = "none";
			};
			document.querySelector('.configMap [name=' + event.target.name + ']').className = "";
		};
	});

	button.addEventListener("click", function (event) {
		jsonUpd();//changing map img 
		map.src = mapJson.src;
	});

	save.addEventListener("click", function (event) {
		jsonUpd();
		fetch('/getMap', { //sending it to server
			method: "POST",
			headers: {'Content-type': 'application/json; charset=UTF-8'},
			body: JSON.stringify(mapJson),
		});
	});


	startEdit();
	setIt();
});