const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

//write questions here following the format
var text = {
    "response_code":0,
    "results":[
       {
          "category":"General Knowledge",
          "type":"multiple",
          "difficulty":"easy",
          "question":"В кои супи се слага фиде?",
          "correct_answer":"Бистри супи",
          "incorrect_answers":[
             "Крем супа",
             "Гаспачо",
             "Шкембе чорба"
          ]
       },
       {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Какво не се слага в питка?",
        "correct_answer":"Домати",
        "incorrect_answers":[
           "Захар",
           "Прясно мляко",
           "Сол"
        ]
     },
     {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"С какво можем да заместим яйцата в рецептите?",
        "correct_answer":"Ленено семе",
        "incorrect_answers":[
           "Вода",
           "Кисело мляко",
           "Сода"
        ]
     }
    ]
 }


let questions = [];

fetch(
    'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
    .then((res) => {
        return text;
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3; //enter the number of questions you want to be loaded

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        
        //28.03.2021 - Pavel Petkov
        //made it to return index.html
        return window.location.assign('./allgames.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
