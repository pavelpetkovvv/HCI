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
/*var text = {
    "response_code":0,
    "results":[
       {
          "category":"Origin",
          "type":"multiple",
          "difficulty":"easy",
          "question":"От къде произлиза торта Павлова?",
          "correct_answer":"Нова Зеландия",
          "incorrect_answers":[
             "Русия",
             "България",
             "Гърция"
          ]
       },
       {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза пастата?"
        "correct_answer":"Китай",
        "incorrect_answers":[
           "Италия",
           "Испания",
           "Франция"
        ]
     },
     {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза руската салата?",
        "correct_answer":"Франция",
        "incorrect_answers":[
           "Русия",
           "България",
           "Германия"
        ]
     }
	 
	 ]
 }
*/
	var text = {
    "response_code":0,
    "results":[
       {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза Кимчи?",
		"hint":"hintche",
        "correct_answer":"Корея",
        "incorrect_answers":[
           "Китай",
           "Холандия",
           "Италия"
        ]
     },
       {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза руло Стефани?",
		"hint":"hintche",
        "correct_answer":"Рим",
        "incorrect_answers":[
           "Унгария",
           "Холандия",
           "България"
        ]
     },
     {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлизат Мъфините?",
		"hint":"hintche",
        "correct_answer":"Англия",
        "incorrect_answers":[
           "Америка",
           "Франция",
           "Италия"
        ]
     },
	 {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза Френска селска торта?",
		"hint":"hintche",
        "correct_answer":"Полша",
        "incorrect_answers":[
           "Русия",
           "Франция",
           "Италия"
        ]
     },
	 {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза Френска селска торта?",
		"hint":"hintche",
        "correct_answer":"Полша",
        "incorrect_answers":[
           "Русия",
           "Франция",
           "Италия"
        ]
     },
	 {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза Френска селска торта?",
		"hint":"hintche",
        "correct_answer":"Полша",
        "incorrect_answers":[
           "Русия",
           "Франция",
           "Италия"
        ]
     },
	 {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза сос Болонезе?",
		"hint":"hintche",
        "correct_answer":"Италия",
        "incorrect_answers":[
           "Франция",
           "Англия",
           "Унгария"
        ]
     },
	 {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза сос Болонезе?",
		"hint":"hintche",
        "correct_answer":"Италия",
        "incorrect_answers":[
           "Франция",
           "Англия",
           "Унгария"
        ]
     },
	 {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза сос Болонезе?",
		"hint":"hintche",
        "correct_answer":"Италия",
        "incorrect_answers":[
           "Франция",
           "Англия",
           "Унгария"
        ]
     },
	 {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза салата Цезар?",
		"hint":"hintche",
        "correct_answer":"Мексико",
        "incorrect_answers":[
           "Италия",
           "Франция",
           "Древен Рим"
        ]
     },
	 {
          "category":"Origin",
          "type":"multiple",
          "difficulty":"easy",
          "question":"От къде произлиза торта Павлова?",
          "correct_answer":"Нова Зеландия",
          "incorrect_answers":[
             "Русия",
             "България",
             "Гърция"
          ]
       },
     {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза руската салата?",
        "correct_answer":"Франция",
        "incorrect_answers":[
           "Русия",
           "България",
           "Германия"
        ]
     },
	 {
        "category":"Origin",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От къде произлиза пастата?",
        "correct_answer":"Китай",
        "incorrect_answers":[
           "Италия",
           "Испания",
           "Франция"
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
const MAX_QUESTIONS = 10; //enter the number of questions you want to be loaded

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
