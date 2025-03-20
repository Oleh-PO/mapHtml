document.addEventListener("DOMContentLoaded", function(event) {
	const location = document.getElementsByName('location');
	const maptype = document.getElementsByName('maptype');
	const size = document.getElementsByName('size');
	const zoom = document.getElementsByName('zoom');
	const button = document.getElementById('send');
	const save = document.getElementById('save');
	const map = document.getElementById('map');
	let mapJson;

	const decoder = new TextDecoder();

	const jsonUpd = function() {
		mapJson = { //packing data from inputs to json
			center : {
				y: location[0].value,
				x: location[1].value,
			},
			maptype : maptype[0].value,
			size : size[0].value,
			zoom : zoom[0].value,
			src : "https://maps.googleapis.com/maps/api/staticmap?center=" + location[0].value + "%2C%20" + location[1].value + "&zoom=" + zoom[0].value + "&maptype=" + maptype[0].value + "&size="+ size[0].value + "x" + size[0].value + "&key=AIzaSyDQ8elUpO-aovO_H_weTqzr4IC-jLUL4UI"
		};
	}

	button.addEventListener("click", function (event) {
		jsonUpd();
		//changing map img 
		map.src = mapJson.src;
		fetch(mapJson.src).then((response) => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    .then((stream) => new Response(stream))
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => decoder.decode(arrayBuffer))
    // .then((decode) => console.log(decode))
    // .then((decode) => fs.writeFileSync("img.png", decode))
	});
	save.addEventListener("click", function (event) {
		jsonUpd();
		fetch('/getMap', { //sending it to server
			method: "POST",
			headers: {'Content-type': 'application/json; charset=UTF-8'},
			body: JSON.stringify(mapJson),
		});
	});
});