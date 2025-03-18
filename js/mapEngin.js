document.addEventListener("DOMContentLoaded", function(event) { 
  const exampl = document.getElementById('exampl');
  const screen = document.getElementById('holder');
  const name = document.getElementById('name');
  const context = document.getElementById('context');
  const imgs = document.querySelector('.imgs');


  let markerDrop = function() { //create markers over map
    let clone;
    for (let i = json.length - 1; i >= 0; i--) {
      clone = exampl.cloneNode(true); //clone from examle
      clone.style = "left:"+ json[i].x + "%; top:"+ json[i].y + "%";
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
  markerDrop();
  screen.addEventListener("click", function (event) { //show info from selected marker
    name.innerText = json[event.target.offsetParent.id].name;
    context.innerText = json[event.target.offsetParent.id].context;
    imgs.innerHTML = "";
    for (let i = 0; i < json[event.target.offsetParent.id].imgs.length; i++) {
      imgs.innerHTML += "<div><img src=content/" + json[event.target.offsetParent.id].imgs[i] + "></div>";
    };
  });
});