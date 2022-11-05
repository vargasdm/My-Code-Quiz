var startBtn = document.querySelector("#startBtn");
var timeEl = document.querySelector("#timer");
var gameOverScreen = document.querySelector("#gameOver")
var questionScreen = document.querySelector("#askQuestion")
var initials = document.querySelector("#initials");
var saveBtn = document.querySelector("#saveBtn");
var secondsLeft = 2;

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

function startGame() {
// need to start timer when start game function is started
setTime();

// need start button to disapper when startGame function starts
startBtn.setAttribute("style", "display: none");

// need to display questions when start game function is started
// questionDisplay();
questionScreen.setAttribute("style", "display: block");

// need a function for a timer
    // need timer to subract time when incorrect answer is chosen           
    
    function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function() {
          secondsLeft--;
          timeEl.textContent = "Time left: " + secondsLeft;
      
        // if ()   

          //  when timer hits 0, it shows the game over screen
        if(secondsLeft === 0 || questions === questions[questions.length-1]) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to show game over screen 
            gameOverScreen.setAttribute("style", "display: block");
            // hides timer
            timeEl.setAttribute("style", "display: none");
            // hides question screen
            questionScreen.setAttribute("style", "display: none");
          }
      
        }, 1000);
      }


      // need an event listener for game over screeen that when you submit your info
    // needs to store name data and score in local memory
// saveBtn.addEventListener("click", function(event) {
//     event.preventDefault();
//     saveLastGrade();
//     renderLastGrade();
//     });

//     function saveLastGrade() {
//         // Save related form data as an object
//         var playerId = initials.value;
        
//         // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
//         localStorage.setItem("playerId", JSON.stringify(playerId));

//         console.log(playerId);
//     }
// }





// want an event listener that starts the game function when the button is clicked
startBtn.addEventListener("click", startGame);






// need a function that renders a question and answers
    // answers need to be list items that are presented as buttons
        // want to create each question as an object variable
            // want all of the answers to be properties that have the value of either true or false             (should boolean be held in data attribute or s it fine to set the property as the answer)
                // should put every question variable into an array

    // needs to render "correct" or "incorrect" you after you click an answer
    // the sstring will be rendered at the bottom or under element that holds the answeers 
        // create a function for this ??


    // after a question is answered correctly the score needs to increase
    // timer to deduct time when incorrect answer is chosen
        // write a function for this ??????

    // when all questions are answered, i want to be brought to the game over screen



// need a function for when the highscore button is clicked
    // it will need to grab the previous highscores and naems from the local storage and present them on the page

