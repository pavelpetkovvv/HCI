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
          "category":"Spice",
          "type":"multiple",
          "difficulty":"easy",
          "question":"Коя подправка НЕ е подходяща за пица?",
          "correct_answer":"Червен пипер",
          "incorrect_answers":[
             "Босилек",
             "Майорана",
             "Риган"
          ]
       },
       {
        "category":"Spice",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Джодженът е най-подходящ за...",
        "correct_answer":"Боб",
        "incorrect_answers":[
           "Мъфини",
           "Ориз по китайски",
           "Шопска салата"
        ]
     },
     {
        "category":"Spice",
        "type":"multiple",
        "difficulty":"easy",
        "question":"В коя храна е най-подходящо да добавим ванилия?",
        "correct_answer":"Кекс",
        "incorrect_answers":[
           "Супа топчета",
           "Салата Цезар",
           "Туршия"
        ]
     },
	 {
        "category":"Spice",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Защо трябва да добавяме подправки (посочете НЕПРАВИЛНИЯ отговор)?",
		"hint":"hintche",
        "correct_answer":"Подправките са необходими, за да се изпече по-бързо ястието.",
        "incorrect_answers":[
           "Подправките са необходими за добавяне на аромат.",
           "Подправките се използват за засилване на вкуса.",
           "Подправките са необходими за да готвим ястия, характерни за конкретни географски райони"
        ]
     },
	 {
        "category":"Spice",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Срокът на годност на смлените подправки е?",
		"hint":"hintche",
        "correct_answer":"2 години",
        "incorrect_answers":[
           "2 месеца",
           "10 години",
           "2 седмици"
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
const MAX_QUESTIONS = 5; //enter the number of questions you want to be loaded

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
    progressText.innerText = `Въпрос ${questionCounter}/${MAX_QUESTIONS}`;
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
