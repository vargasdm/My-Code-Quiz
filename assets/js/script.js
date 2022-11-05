var startBtn = document.querySelector("#startBtn");
var timeEl = document.querySelector("#timer");
var gameOverScreen = document.querySelector("#gameOver")
var questionScreen = document.querySelector("#askQuestion")
var initials = document.querySelector("#initials");
var saveBtn = document.querySelector("#saveBtn");
var score = document.querySelector("#score");
var highscores = document.querySelector("#oldScores")
var instructions = document.querySelector("#instructions")
var finalScore = document.querySelector("#finalScore")
var playAgainBtn = document.querySelector("#playAgaintBtn");
var secondsLeft = 50;
var i = 0;
var scoreNum = 0;


// question array that will be moved through ass you answer them
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
    }
]



//  need to hide game over screeen until end of game
gameOverScreen.setAttribute("style", "display: none");
questionScreen.setAttribute("style", "display: none");
instructions.textContent = "instructions: Click Sart Game button to begin. For every question you get correct, you get 10 points. For every wrong answer, 5 seconds are deducted from the timer."
 
function startGame() {
    // need to start timer when start game function is started
    setTime();
    instructions.setAttribute("style", "display: none");
    // set score = 0
    score.textContent = "Score: " + 0;

    // need start button to disapper when startGame function starts
    startBtn.setAttribute("style", "display: none");

    // need to display questions when start game function is started
    // questionDisplay();
    questionScreen.setAttribute("style", "display: block");

    // need a function that renders a question and answers
    // answers need to be list items that are presented as buttons
    // want to create each question as an object variable
    // want all of the answers to be properties that have the value of either true or false           
    // should put every question variable into an array

    // needs to render "correct" or "incorrect" you after you click an answer
    // the sstring will be rendered at the bottom or under element that holds the answeers 
    // create a function for this ??
  

    askQuestion()
    function askQuestion() {
        var nextQuestion = document.querySelector("#questionSlide");
        var options = document.querySelector("#options");

        nextQuestion.textContent = questions[i].title
        options.children[0].textContent = questions[i].options[0];
        options.children[1].textContent = questions[i].options[1];
        options.children[2].textContent = questions[i].options[2];
        options.children[3].textContent = questions[i].options[3];

        options.children[0].addEventListener('click', optionClicked);
        options.children[1].addEventListener('click', optionClicked);
        options.children[2].addEventListener('click', optionClicked);
        options.children[3].addEventListener('click', optionClicked);


    }

    function optionClicked(event) {
        console.log(event.target.textContent)
        if (event.target.textContent === questions[i].answer) {
            scoreNum = scoreNum + 10;
            score.textContent = "Score: " + scoreNum;
            i++;

        } else {
            i++
            secondsLeft = secondsLeft - 5;
            secondsLeft.textContent = "Time left: " + secondsLeft;
        }

        if (i < 5) {
            askQuestion();
        } else {
            quizEnd()
            
        }
    }



    // need a function for a timer
    // need timer to subract time when incorrect answer is chosen           

    function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function () {
            secondsLeft--;
            timeEl.textContent = "Time left: " + secondsLeft;


            //  when timer hits 0, it shows the game over screen
            if (secondsLeft === 0 || questions === questions[questions.length - 1]) {
                // Stops execution of action at set interval
                clearInterval(timerInterval);
                // Calls function to show game over screen 
                quizEnd()
                
            }

        }, 1000);
    }

    function quizEnd() {
        gameOverScreen.setAttribute("style", "display: block");
        finalScore.textContent = "Final Score: " + scoreNum;
        // hides timer1
        timeEl.setAttribute("style", "display: none");  
        // hides question screen
        questionScreen.setAttribute("style", "display: none");

        
    }

    // need an event listener for game over screeen that when you submit your info
    // needs to store name data and score in local memory
    
    function saveLastScore() {
        // Save related form data as an object
        var newScore = { initial: initials.value, score: scoreNum }
        // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
        localStorage.setItem("newScore", JSON.stringify(newScore));
    }

    function highScoresDisplay() {
        var highscores = JSON.parse(localStorage.getItem("playerId"));
        highscores.textContent = playerId;
    }

    saveBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveLastScore();
        highScoresDisplay();

    });

}



// want an event listener that starts the game function when the button is clicked
startBtn.addEventListener("click", startGame);

playAgainBtn.addEventListener("click", startGame);









    // after a question is answered correctly the score needs to increase
    // timer to deduct time when incorrect answer is chosen
        // write a function for this ??????

    // when all questions are answered, i want to be brought to the game over screen



// need a function for when the highscore button is clicked
    // it will need to grab the previous highscores and naems from the local storage and present them on the page
    // need to hide other windows and just display past highscores


// optionsEl.onclick = questionClick

// function questionClick(event){
//     var btnEl = event.target
//     console.log(btnEl)
//   }

// var optionsEl = document.querySelector("#btnEl");