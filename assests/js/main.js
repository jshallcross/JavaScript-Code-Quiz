//Declared Variables
var startBtnEl = document.getElementById('start-button');
var timerSpanEl = document.getElementById('timer-span');
var questionsDiv = document.getElementById('questions-div');
var wrapper = document.getElementById("wrapper");
var timerEl = document.getElementById("timer"); 
var ulCreate = document.createElement("ul");

var questionIndex = 0;
var timeLeft = 50;
var correctAnswers = 0;

//Starts timer and the quiz
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

//Function to show the user the questions
function showQuestions(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
   //loops through questions array
    for (var i = 0; i < questions.length; i++) {
        // question title element
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    //creates the possible answer elements
    userChoices.forEach(function (newItem) {
        debugger
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        //event listner checking for answer clicked on
        listItem.addEventListener("click", (checkAnswer));
    })
}
// function to verify answer clicked
function checkAnswer(event) {
    var answer = event.target;

    if (answer.matches("li")){
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
    }
    //Check for correct answer
    if (answer.textContent == questions[questionIndex].answer){
        //add to correct answer total
        correctAnswers ++;
        createDiv.textContent = "Correct! The answer is " + questions[questionIndex].answer;
    }
    else {
        //else grabs incorrect answers
        createDiv.textContent = "Incorrect! The answer was " + questions[questionIndex].answer;
        //deducts time for incorrect answer
        timeLeft = timeLeft -5;

    }
// changes index to get new question
questionIndex ++;

if (questionIndex >= questions.length){
    //Ends quiz if out of questions
    quizOver();
    //determaines number of correct answers
    if (correctAnswers === 1) {
        createDiv.textContent = "You got " + correctAnswers + " question right!";
        createDiv.style.padding = "20px";
    } else {
        createDiv.textContent = "You got " + correctAnswers + " questions right!";
        createDiv.style.padding = "20px";
    }  
}
else {
    showQuestions(questionIndex);
}
questionsDiv.appendChild(createDiv);
}

//End of quiz function
function quizOver(){
    //clears previous data
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    timerEl.innerHTML = "";
    //appends to new page
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Over";
    questionsDiv.appendChild(createH1);
    // takes time left and creates the score used for leaderboard
    if (timeLeft >= 0){
        var timeRemaining = timeLeft;
        var createPara = document.createElement("p");
        createPara.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createPara);
    }
    //Text reuesting user initials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials to be put on the leaderboard: ";

    questionsDiv.appendChild(createLabel);
    //Input element
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);
    //Submit button element
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);
    //Event listner for submit element
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        //checks for null user input
        if (initials === null) {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            //check for previous scores
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            //push new score into leaderboard
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // takes you to leaderboard
            window.location.replace("./scores.html");
        }
    });

}





















startBtnEl.addEventListener("click", countdown);
