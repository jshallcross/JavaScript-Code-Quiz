




  var startBtnEl = document.getElementById('start-button');
  var timerSpanEl = document.getElementById('timer-span');
  var questionsDiv = document.getElementById('questions-div');
  var wrapper = document.getElementById("wrapper");
  
var questionIndex = 0;

var ulCreate = document.createElement("ul");



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
    showQuestions(questionIndex);
}


function showQuestions(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
   
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    
    userChoices.forEach(function (newItem) {
        debugger
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (checkAnswer));
    })
}

function checkAnswer(event) {
    var answer = event.target;

    if (answer.matches("li")){
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDive");
    }
    if (answer.textContent == questions[questionIndex].answer){
        createDiv.textContent = "Correct! The answer is " + questions[questionIndex].answer;
    }
    else {
        createDiv.textContent = "Incorrect! The answer was " + questions[questionIndex].answer;
    }

questionIndex ++;
if (questionIndex >= questions.length){
    createDiv.textContent = "Quiz Over!";
}
else {
    showQuestions(questionIndex);
}
questionsDiv.appendChild(createDiv);
}





















startBtnEl.addEventListener("click", countdown);
