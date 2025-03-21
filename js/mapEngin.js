let screen;
document.addEventListener("DOMContentLoaded", function(event) { 
  const example = document.getElementById('example');
  screen = document.getElementById('holder');
  const name = document.getElementById('name');
  const context = document.getElementById('context');
  const imgs = document.querySelector('.imgs');
  const lor = document.querySelector('.lor');
  const editor = document.querySelector('.editor');
  const preload = document.getElementById('preload');


  const editMod = function() { //detecting is we on a server, if true opens edito menu
    if (location.protocol === "file:") {
      return;
    };
    editor.style.display = "block"; //paste this sn console if you want to enter edit mode
  };

  const preloader = function() { //preload function to prevent stuttering
    for (let i = 0; i < json.length; i++) {
      for (let y = 0; y < json[i].imgs.length; y++) {
        preload.innerHTML += "<div><img src=content/" + json[i].imgs[y] + "></div>";
      };
    };
  };

  const markerDrop = function() { //create markers over map
    document.title = json[0].name;
    let clone;
    for (let i = 0; i < json.length; i++) {
      clone = example.cloneNode(true); //clone from examle
      clone.style.left = json[i].x + "%";
      clone.style.top = json[i].y + "%";
      clone.firstElementChild.innerText = json[i].name;
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
    name.innerText = json[event.target.offsetParent.id].name;
    context.innerText = json[event.target.offsetParent.id].context;
    imgs.innerHTML = "";
    for (let i = 0; i < json[event.target.offsetParent.id].imgs.length; i++) { //adding all imgs from json file
      imgs.innerHTML += "<div><img src=content/" + json[event.target.offsetParent.id].imgs[i] + "></div>";
    };
    lor.style.display = "inline-block";
  });



  //run all functions

  editMod();
  preloader();
  markerDrop();
});