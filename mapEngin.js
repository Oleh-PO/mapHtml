document.addEventListener("DOMContentLoaded", function(event) { 
    var exampl = document.getElementById('exampl');
    var screen = document.getElementById('holder');
    var test = 1;


    var markerDrop = function() {
        for (var i = json.length - 1; i >= 0; i--) {
            var clone = exampl.cloneNode(true);
            clone.style = "left:"+ json[i].x + "%; top:"+ json[i].y + "%";
            clone.id = i;
            screen.appendChild(clone);
        }
    }
    document.querySelector(".toggle").addEventListener("click", function (event) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            return;
        }
        document.querySelector(".main").requestFullscreen();
    });
    // document.querySelector(".screen").addEventListener("click", function (event) {
        markerDrop();
    // });
    document.getElementById("holder").addEventListener("click", function (event) {
        console.log(event.target.offsetParent.id);
    });
});