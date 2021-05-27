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
          "category":"Brave",
          "type":"multiple",
          "difficulty":"easy",
          "question":"Каква е разликата между агар и желатин?",
          "correct_answer":"Желатинът е с животински, а агарът – с растителен произход. ",
          "incorrect_answers":[
             "Желатинът се ползва във вегански рецепти.",
             "Агарът се добива от кости, а желатинът от водорасли.",
             "Няма разлика, и двете са един и същ продукт."
          ]
       },
       {
        "category":"Brave",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Какво е КУЛИ?",
        "correct_answer":"КУЛИ е вид десерт, който представлява пюре от сирене и плодове.",
        "incorrect_answers":[
           "КУЛИ е плод, който се добива в Южна Африка.",
           "КУЛИ представлява подправка, която се използва за риба.",
           "КУЛИ е традиционно ястие на индийските племена."
        ]
     },
     {
        "category":"Brave",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Кои са петте основни соса на класическата френска кухня?",
        "correct_answer":"Велоте, Бешамел, Томат, Еспаньол и Холандез.",
        "incorrect_answers":[
           "Бешамел, Доматен сос, Чеснов сос, Холандез, Червен сос",
           "Цезар, Гуакамоле, Бешамел, Сос от сирена и сметана, Еспаньол",
           "Тартар, Mедено-горчичен сос, Томат, Бешамел, Гъбен сос"
        ]
     },
	 {
        "category":"Brave",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Кои бульони се използват за направата на сос Велоте?",
		"hint":"hintche",
        "correct_answer":"пилешки, рибен и телешки",
        "incorrect_answers":[
           "зеленчуков и костен",
           "рибен и свински",
           "пилешки свински и говежди"
        ]
     },
	 {
        "category":"Brave",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Кой елемент от съвременното суши в миналото се е използвал само за подготовката на ястието и след това се е изхвърлял преди сервирането?",
		"hint":"hintche",
        "correct_answer":"ориз",
        "incorrect_answers":[
           "сьомга",
           "водорасли",
           "хайвер"
        ]
     },
	 {
        "category":"Brave",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Кой е рожденият град на тортата ГАРАШ?",
		"hint":"hintche",
        "correct_answer":"Русе",
        "incorrect_answers":[
           "Милано",
           "Париж",
           "Букурещ"
        ]
     },
	 {
        "category":"Brave",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Популярният Бьоф Строганов най-често се сервира с гарнитура от ориз или паста. Каква обаче е традиционната гарнитура за него, с която се сервира по етикет?",
		"hint":"hintche",
        "correct_answer":"пържени картофи",
        "incorrect_answers":[
           "сотирани картофи",
           "домати",
           "морковено пюре"
        ]
     },
	 {
        "category":"Brave",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Кое е морското животно – днес деликатес с висока стойност, а в близкото минало се е считало за храна на социално слабите и е служело за меню в затворите и на домашните любимци?",
		"hint":"hintche",
        "correct_answer":"омар",
        "incorrect_answers":[
           "октопод",
           "скариди",
           "раци"
        ]
     },
	 {
        "category":"Brave",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Какъв продукт, обявен за мощен афродизиак, се е включвал във всекидневното меню на великия любовник Джакомо Казанова?",
		"hint":"hintche",
        "correct_answer":"стриди",
        "incorrect_answers":[
           "джоджен",
           "тиквени семена",
           "аспержи"
        ]
     },
	 {
        "category":"Brave",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Коя е основната съставка на гръцката супа Магерица, с която по традиция се слага край на Великденския пост?",
		"hint":"hintche",
        "correct_answer":"агнешка карантия",
        "incorrect_answers":[
           "джадзики",
           "зехтин",
           "лаврак"
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
