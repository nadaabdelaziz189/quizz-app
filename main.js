//select elements
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .span");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-button");
let bulletsElement = document.querySelector(".bullets");
let resultContainer = document.querySelector(".result");

//set options 
let currentIndex = 0;
let rightAnswers = 0;
let countDownInterval;

function getQuestions() {
    let myRequest = new XMLHttpRequest();


    myRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let questionObject = JSON.parse(this.responseText);
            let questionCount = questionObject.length;

            createBullets(questionCount);
            // click on submit 
            submitButton.onclick = () => {
                // get right answer 
                let rightAnswers = questionObject[currentIndex].right_answer;
                // increase index 
                currentIndex++;
                //check the answer 
                checkAnswer(rightAnswers, questionCount);
                // remove previous question 
                quizArea.innerHTML = "";
                answerArea.innerHTML = "";

                //add question data
                addQuestionData(questionObject[currentIndex], questionCount);

                // handle bullets class
                handleBullets();
            };

        }

    };
    myRequest.open("GET", "quiz.json", true);
    myRequest.send();

}
getQuestions();

function createBullets(num) {
    countSpan.innerHTML = num;

    for (let i = 0; i < num; i++) {
        //create bullet
        let theBullet = document.createElement("span");
        if (i === 0) {
            theBullet.className = "on";
        }
        //append bullets to main bullet bullet container
        bulletsSpanContainer.appendChild(theBullet);
    }
}


function addQuestionData(obj, count) {
    if (currentIndex < count) {
        //create h2 question title 
        let questionTitle = document.createElement("h2");
        // create question text
        let questionText = document.createTextNode(obj["title"]);
        //append text to h2 
        questionTitle.appendChild(questionText);
        //append the h2 to the quiz area
        quizArea.appendChild(questionTitle);
        //create the answer 
        for (let i = 0; i <= 3; i++) {
            // creat main answer div
            let mainDiv = document.createElement("div");
            //add class to main div 
            mainDiv.className = 'answer';
            //create radio input 
            let radioInput = document.createElement("input");
            //add type +name + id + data-attribute
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];
        }
        if (i === 1) {
            radioInput.checked = true;
        }
        //create the label 
        let theLabel = document.createElement("label");
        //add for attribute
        theLabel.htmlFor = `answer_${i}`;
        //create the label text 
        theLabelText = document.createTextNode(obj[`answer_${i}`]);
        //add the text to label 
        theLabel.appendChild(theLabelText);
        //add input +label to main div 
        mainDiv.appendChild(radioInput);

    }
}

function checkAnswer(right_answer, count) {
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;


    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            theChoosenAnswer = answer[i].dataset.answer;
        }
    }
    console.log(`right answer is : ${right_answer}`);
    if (right_answer === theChoosenAnswer) {
        rightAnswers++;
    }
}

function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .span span");
    let arrayOfSpan = array.from(bulletsSpans);
    arrayOfSpan.forEach(span, index => {
        if (currentIndex === index) {
            span.className = "on";
        }
    });
}

function showResults(count) {
    let theResult;
    if (currentIndex === count) {
        quizArea.remove();
        answer.remove();
        submitButton.remove();
        bulletsElement.remove();



        if (rightAnswers > count / 2 && rightAnswers < count) {
            theResult = `<span calss="good">good</span>,${right_answer}from ${count} is good`;
        } else if (right_answer === count) {
            theResult = `<span calss="perfect">perfect</span>,${right_answer}from ${count} is perfect`;

        } else {
            theResult = `<span calss="bad">bad</span>,${right_answer}from ${count} is bad`;


        }
        resultContainer.innerHTML = theResult;


    }
}

function countDown(duration, count) {
    if (currentIndex < count) {
        let minutes, secounds;
        countDownInterval = setInterval(function() {
            minutes = parseInt(duration / 60);
            secounds = parseInt(duration % 60);
            countDownElement.innerHTML = `${minutes}:${secounds}`;


            if (--duration < 0) {
                clearInterval(countDownInterval);
                console.log("finished")
            }

        }, 1000);
    }
}