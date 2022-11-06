var startBtn = document.querySelector("#startBtn");
var timeEl = document.querySelector("#timer");
var gameOverScreen = document.querySelector("#gameOver")
var questionScreen = document.querySelector("#askQuestion")
var initials = document.querySelector("#initials");
var saveBtn = document.querySelector("#saveBtn");
var score = document.querySelector("#score");
var instructions = document.querySelector("#instructions")
var finalScore = document.querySelector("#finalScore")
var playAgainBtn = document.querySelector("#playAgainBtn");
var scoreList = document.querySelector("#scoreList");
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var secondsLeft = 30;
var i = 0;
var scoreNum = 0;

// object array that holds quiz questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        options: [
            "strings",
            "booleans",
            "prompts",
            "numbers"
        ],
        answer: "prompts"
    },
    {
        title: "The condition in an if / else statement is enclosed within _____:",
        options: [
            "parentheses",
            "curly brackets",
            "colons",
            "periods"
        ],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store _____:",
        options: [
            "strings",
            "booleans",
            "numbers",
            "all of the above"
        ],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed with _____ when being assigned to a variable:",
        options: [
            "commas",
            "quotations",
            "parentheses",
            "curly brackets"
        ],
        answer: "quotations"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "for loops",
            "if statments",
            "Terminal / Bash",
            "console.log"
        ],
        answer: "console.log"
    },
    {
        title: "Which of the following keywords is used to define a variable in Javascript?",
        options: [
            "var",
            "let",
            "function",
            "console.log"
        ],
        answer: "var"
    },
    {
        title: "Which of the following methods is used to access HTML elements using Javascript?",
        options: [
            "getElementById()",
            "getElementByClassName()",
            "all of the above",
            "none of the above"
        ],
        answer: "all of the above"
    },
    {
        title: "Which function is used to serialize an object into a JSON string in Javascript?",
        options: [
            "stringify()",
            "parse()",
            "convert()",
            "none of the above"
        ],
        answer: "stringify()"
    }
]


// initially hides game over screen and question screen
gameOverScreen.setAttribute("style", "display: none");
questionScreen.setAttribute("style", "display: none");

function startGame() {
    // starts timer and shows first question when start game function is called
    setTime();
    askQuestion()

    // hides instructions when the startGame function is executed
    instructions.setAttribute("style", "display: none");

    // set score = 0
    score.textContent = "Score: " + 0;

    // start button disappers when startGame function is executed
    startBtn.setAttribute("style", "display: none");

    // displays questions when startGame function is executed
    questionScreen.setAttribute("style", "display: block");

    // Timer function
    function setTime() {
        var timerInterval = setInterval(function () {
            // secondsLeft variable will decrease by 1 every second
            secondsLeft--;
            // changes textContent of timer to update with the secondsLeft variable
            timeEl.textContent = "Time left: " + secondsLeft;

            //  when timer hits 0 or user has moved through all questions in questions array, then quizEnd function is ran
            if (secondsLeft === 0 || questions === questions[questions.length - 1]) {
                // stops execution of action at set interval
                clearInterval(timerInterval);
                // calls function to show game over screen 
                quizEnd()
            }

        }, 1000);
    }

    // function that renders a question and answers (options)
    function askQuestion() {
        var nextQuestion = document.querySelector("#questionSlide");
        var options = document.querySelector("#options");

        // changes the textContent of the header tag to the corresponding title value in the quiestions object array
        nextQuestion.textContent = questions[i].title

        // changes the textContent of the appropriate button element in html to the corresponding options value in the questions object array
        options.children[0].textContent = questions[i].options[0];
        options.children[1].textContent = questions[i].options[1];
        options.children[2].textContent = questions[i].options[2];
        options.children[3].textContent = questions[i].options[3];

        // creates a click eventListenter for every options choice where when clicked the optionClicked function will execute
        options.children[0].addEventListener('click', optionClicked);
        options.children[1].addEventListener('click', optionClicked);
        options.children[2].addEventListener('click', optionClicked);
        options.children[3].addEventListener('click', optionClicked);
    }

    function optionClicked(event) {
        // if statement that determines whether or not the textContent of the option clicked is the same as teh answer property in th corresponding answer value in the questions object array
        // if equal, then 10 points is added to score and index is incrimented
        if (event.target.textContent === questions[i].answer) {
            scoreNum = scoreNum + 10;
            score.textContent = "Score: " + scoreNum;
            i++;
            // if not equal, 5 seconds is subracted from the secondsLeft variable
        } else {
            i++
            secondsLeft = secondsLeft - 5;
            secondsLeft.textContent = "Time left: " + secondsLeft;
        }

        // if statement that determines whether of not there are any onjects left in teh questions array
        // if there are questions left in the array, then the askQuestion function is executed again
        if (i < questions.length) {
            askQuestion();
            // if there aren't any questions left in the array, then run endQuiz function and show game over screen
        } else {
            quizEnd()
        }
    }

    // Function that shows game over screen
    function quizEnd() {
        // makes elements associated with the game over screen visible
        gameOverScreen.setAttribute("style", "display: block");

        // shows final score
        finalScore.textContent = "Final Score: " + scoreNum;

        // hides timer
        timeEl.setAttribute("style", "display: none");

        // hides question screen
        questionScreen.setAttribute("style", "display: none");
    }

    // function that stores player IDs and scores to the local storage and renders all past scores
    function saveLastScore() {
        // variable used to store the player ID and their score
        var newScore = { initial: initials.value, score: scoreNum }

        // stringifies newScore entry and stores the entries in the newScore key in the local storage
        localStorage.setItem("newScore", JSON.stringify(newScore));

        //  if statement that determines in any info is entered into the form
        if (initials !== "") {

            // creates variable that will either grab the values in the highscores key in the local storage or if there isn't anyt values in that key, it will creat an empty array
            var highscoresArr = JSON.parse(localStorage.getItem("highscores")) || [];

            // adds newScore values into the empty array  or highscores array
            highscoresArr.push(newScore);
        }

        // sets the values in the highscore key in local storage to the values in the highscoreArray
        localStorage.setItem("highscores", JSON.stringify(highscoresArr));
    }

    function renderPastScores() {
        // loops through the values in highscores array in the highscore key in the local storage if there is one and renders them in an newly created <li> in <ul> of HTML
        for (var i = 0; i < highscores.length; i++) {
            var liEl = document.createElement('li');
            liEl.innerText = highscores[i].initial + "  " + highscores[i].score
            scoreList.appendChild(liEl);
        }
    }

    // click eventListener for a form element that when save button is clicked, saveLastScore function is executed
    saveBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveLastScore();
        renderPastScores();
    });
}

// click eventListener that executes startGame function when clicked
startBtn.addEventListener("click", startGame);

// click eventListener that reloads page when clicked
playAgainBtn.addEventListener("click", function () {
    window.location.reload()
});
