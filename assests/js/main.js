
var startBtnEl = document.getElementById('start-button');
var timerSpanEl = document.getElementById('timer-span');


function countdown(event){
    var timeLeft = 50;
    event.preventDefault();

    var timeInterval = setInterval(function(){
        if (timeLeft > 1) {
            timerSpanEl.textContent = timeLeft;
            timeLeft --;
        } 
        else {
            timerSpanEl.textContent ="";
            clearInterval(timeInterval);
        }
    }, 1000);
}


















startBtnEl.addEventListener("click", countdown);