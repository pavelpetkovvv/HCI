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
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Кой е най-добрият начин за съхранение на подправки и чай?",
		"hint":"hintche",
        "correct_answer":"херметически затворени контейнери, на по-тъмни и хладни места",
        "incorrect_answers":[
           "в хладилника",
           "в найлонови торбички на тъмно място",
           "в хартиени торбички, на влажно място"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От коя страна се слага алуминиевото фолио при печене?",
		"hint":"hintche",
        "correct_answer":"Няма значение при печене под 500 градуса",
        "incorrect_answers":[
           "От лъскавата",
           "От матовата",
           "Зависи от производителя на фолиото"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От коя страна се слага алуминиевото фолио при печене?",
		"hint":"hintche",
        "correct_answer":"Няма значение при печене под 500 градуса",
        "incorrect_answers":[
           "От лъскавата",
           "От матовата",
           "Зависи от производителя на фолиото"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Защо плодовете и зеленчуците се съсипват по-бързо?",
		"hint":"hintche",
        "correct_answer":"измити са",
        "incorrect_answers":[
           "съхраняват се в хладилник",
           "съхраняват се на място, лишено от слъчнчева светлина",
           "не са прибрани в хартиени торби"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Защо белтъците не стават на сняг? (посочете НЕПРАВИЛНИЯ отговор)",
		"hint":"hintche",
        "correct_answer":"яйцата са пресни",
        "incorrect_answers":[
           "използван е пластмасов съд, в който да се разбиват",
           "има попаднала вода в съда",
           "попаднал е жълтък"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Защо кексът спада? (посочете НЕПРАВИЛНИЯ отговор)",
		"hint":"hintche",
        "correct_answer":"кексът е изваден директно от топла фурна",
        "incorrect_answers":[
           "яйцата, които са използвани са пресни",
           "съдът, в който е разбит кекса е пластмасов",
           "захарта е била мокра"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Как се съхраняват правилно гъбите?",
		"hint":"hintche",
        "correct_answer":"в хартиена торбичка",
        "incorrect_answers":[
           "в найлонова торбичка",
           "на тъмно място",
           "на влажно място"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"От какво се прави оризовото олио?",
		"hint":"hintche",
        "correct_answer":"от оризово зърно /оризови трици/",
        "incorrect_answers":[
           "от ферментирал ориз",
           "от сварен ориз",
           "от оризови зърна, заляти с вода и престояли над 20 дни"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Кое е другото наименование на пречистеното масло?",
		"hint":"hintche",
        "correct_answer":"ГХИ",
        "incorrect_answers":[
           "свинска мас",
           "рафинирана мас",
           "нерафинирана мас"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Кое е другото наименование на пречистеното масло?",
		"hint":"hintche",
        "correct_answer":"ГХИ",
        "incorrect_answers":[
           "свинска мас",
           "рафинирана мас",
           "нерафинирана мас"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Кокосовото масло НЕ може да се използва за?",
		"hint":"hintche",
        "correct_answer":"салати",
        "incorrect_answers":[
           "печене",
           "сотиране",
           "пържене"
        ]
     },
	 {
        "category":"General Knowledge",
        "type":"multiple",
        "difficulty":"easy",
        "question":"Сусамовото олио е известно в?",
		"hint":"hintche",
        "correct_answer":"азиатската кухня",
        "incorrect_answers":[
           "балканската кухня",
           "италианската кухня",
           "норвежката кухня"
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
const MAX_QUESTIONS = 15; //enter the number of questions you want to be loaded

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
