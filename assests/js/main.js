
var startBtnEl = document.getElementById('start-button');
var timerSpanEl = document.getElementById('timer-span');
var questionsDiv = document.getElementById('questions-div');
var wrapper = document.getElementById("wrapper");
var timerEl = document.getElementById("timer"); 
var questionIndex = 0;

var ulCreate = document.createElement("ul");
var timeLeft = 50;
var correctAnswers = 0;


function countdown(event){
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
        createDiv.setAttribute("id", "createDiv");
    }
    if (answer.textContent == questions[questionIndex].answer){
        correctAnswers ++;
        createDiv.textContent = "Correct! The answer is " + questions[questionIndex].answer;
    }
    else {
        createDiv.textContent = "Incorrect! The answer was " + questions[questionIndex].answer;
        timeLeft = timeLeft -5;

    }

questionIndex ++;
if (questionIndex >= questions.length){
    alert("Test");
    quizOver();
    if (correctAnswers === 1) {
        createDiv.textContent = "You got " + correctAnswers + " question right!";
    } else {
        createDiv.textContent = "You got " + correctAnswers + " questions right!";
    }
    
    
}
else {
    showQuestions(questionIndex);
}
questionsDiv.appendChild(createDiv);
}

function quizOver(){
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    timerEl.innerHTML = "";
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Over";
    questionsDiv.appendChild(createH1);
    if (timeLeft >= 0){
        var timeRemaining = timeLeft;
        var createPara = document.createElement("p");
        createPara.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createPara);
    }
     

 
}





















startBtnEl.addEventListener("click", countdown);
