document.addEventListener("DOMContentLoaded", function(event) { 
    document.querySelector(".toggle").addEventListener("click", function (event) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            return;
        }
        document.querySelector(".main").requestFullscreen();
    });
    fetch('mTEST.json', {mode: 'no-cors'})
        .then((response) => response.json())
        .then((json) => console.log(json));
});