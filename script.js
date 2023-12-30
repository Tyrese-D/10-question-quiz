const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');



const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    },
    {
        question: "Q. Variables declared with the let keyword have what type of scope?",
        choices: ["Function scope.", "Block Scope", "Inline scope", " Global scope."],
        answer: "Block Scope"
    },
    {
        question: "Q. When might an empty alt attribute be the correct value?",
        choices: ["When you cannot think of useful alt text", "When the image is purely decorative", "   When you don't think it would be interesting to someone who cannot see it", "  When the image has come from a CMS"],
        answer: "When the image is purely decorative "
    },
    {
        question: "Q.What is the element used for?",
        choices: ["To identify the difference parts of a figure", "As a heading for tables", "    To explain what needs to be entered into a form field", "   As a caption for images"],
        answer: "To explain what needs to be entered into a form field"
    },
    {
        question: "Q.Which choice is not of invoking strict mode in JavaScript?",
        choices: ["It forces the writing of valid HTML and CS", "   It fixes mistakes that make it difficult for JavaScript engines to perform optimizations.", " It prohibits some syntax likely to be defined in future versions of ECMAScript.", "   It eliminates some JavaScript silent errors by changing them to throw errors."],
        answer: "It forces the writing of valid HTML and CSS."
    },
    {
        question: "Q.What is the JavaScript syntax extension that is commonly used to create React element?",
        choices: ["HTML", "JavaScriptX", " JSX", " React JavaS"],
        answer: "JSX"
    },
    {
        question: "Q.Which choice is not of invoking strict mode in JavaScript?",
        choices: ["react-gen-app", " react-start", " react-gen", " create-react-app"],
        answer: "create-react-app"
    },
];



let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;


const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            } else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    const selectedText = selectedChoice.textContent.trim(); // Trim to remove extra spaces
    const correctAnswer = quiz[currentQuestionIndex].answer.trim(); // Trim to remove extra spaces

    if (selectedText === correctAnswer) {
        displayAlert("Correct Answer!");
        score++;
    } else {
        displayAlert(`Wrong Answer! ${correctAnswer} is the Correct Answer`);
    }

    timeLeft = 15;
    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
}

const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});