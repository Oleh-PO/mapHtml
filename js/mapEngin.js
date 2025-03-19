document.addEventListener("DOMContentLoaded", function(event) { 
  const exampl = document.getElementById('example');
  const screen = document.getElementById('holder');
  const name = document.getElementById('name');
  const context = document.getElementById('context');
  const imgs = document.querySelector('.imgs');
  const lor = document.querySelector('.lor');
  const preload = document.getElementById('preload');
  const map = document.getElementById('map');

  const preloader = function() { //preload function to prevent stuttering
    for (let i = 0; i < json.length; i++) {
      for (let y = 0; y < json[i].imgs.length; y++) {
        preload.innerHTML += "<div><img src=content/" + json[i].imgs[y] + "></div>";
      };
    };
  };
  const markerDrop = function() { //create markers over map
    let clone;
    for (let i = json.length - 1; i >= 0; i--) {
      clone = exampl.cloneNode(true); //clone from examle
      clone.style.left = json[i].x + "%";
      clone.style.top = json[i].y + "%";
      clone.style.display = "block";
      clone.id = i;
      screen.appendChild(clone);
    };
  };
  document.querySelector(".toggle").addEventListener("click", function (event) { //fullscreen toggle 
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    };
    document.querySelector(".main").requestFullscreen();
  });
  screen.addEventListener("click", function (event) { //show info from selected marker
    console.log(mapLink);
    name.innerText = json[event.target.offsetParent.id].name;
    context.innerText = json[event.target.offsetParent.id].context;
    imgs.innerHTML = "";
    for (let i = 0; i < json[event.target.offsetParent.id].imgs.length; i++) { //adding all imgs from json file
      imgs.innerHTML += "<div><img src=content/" + json[event.target.offsetParent.id].imgs[i] + "></div>";
    };
    lor.style.display = "inline-block";
  });
  //run all functions
  preloader();
  markerDrop();
});