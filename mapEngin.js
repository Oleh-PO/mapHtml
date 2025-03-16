document.addEventListener("DOMContentLoaded", function(event) { 
    document.querySelector(".toggle").addEventListener("click", function (event) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
    }
    document.querySelector(".screen").requestFullscreen();
    });
});