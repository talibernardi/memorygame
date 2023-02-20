anime.timeline({loop: true})
  .add({
    targets: '.ml8 .circle-white',
    scale: [0, 3],
    opacity: [1, 0],
    easing: "easeInOutExpo",
    rotateZ: 360,
    duration: 1100
  }).add({
    targets: '.ml8 .circle-container',
    scale: [0, 1],
    duration: 1100,
    easing: "easeInOutExpo",
    offset: '-=1000'
  }).add({
    targets: '.ml8 .circle-dark',
    scale: [0, 1],
    duration: 1100,
    easing: "easeOutExpo",
    offset: '-=600'
  }).add({
    targets: '.ml8 .letters-left',
    scale: [0, 1],
    duration: 1200,
    offset: '-=550'
  }).add({
    targets: '.ml8 .bang',
    scale: [0, 1],
    rotateZ: [45, 15],
    duration: 1200,
    offset: '-=1000'
  }).add({
    targets: '.ml8',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1400
  });

anime({
  targets: '.ml8 .circle-dark-dashed',
  rotateZ: 360,
  duration: 8000,
  easing: "linear",
  loop: true
});

const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const restartButton = document.getElementById("restart");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container")
let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
    { name: 'Orange', class: 'orange' },
    { name: 'Avocado', class: 'avocado' },
    { name: 'Kiwi', class: 'kiwi' },
    { name: 'Watermelon', class: 'watermelon' },
    { name: 'Pumpkin', class: 'pumpkin' },
    { name: 'Pear', class: 'pear' },
    { name: 'Lemon', class: 'lemon' },
    { name: 'Grape', class: 'grape' }
];

//initial time
let seconds = 0,
    minutes = 0;
//initial moves and win count
let movesCount = 0;
    winCount = 0;

//Timer
const timerGenerator = () => {
    seconds += 1;
    if (seconds >= 60){
        minutes += 1;
        seconds = 0;
    }
//format time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes; 
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//calculate moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

function calcPercent() {
    return parseInt(8/movesCount*100)
};

//randomize cards
const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //init cardValues array
    let cardValues = [];
    size = (size * size) / 2;

    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random () * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
            <div class="card ${cardValues[i].class}"></div>
        </div>`;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                }
                else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
    
                        firstCard = false;
                        winCount += 1;

                        if (winCount == 8) {
                            result.innerHTML = `<h2>Parabéns, você ganhou!</h2>
                            <h4>Quantidade de Jogadas: ${movesCount}</h4>
                            <h4>sua pontuação é: ${calcPercent()}</h4>`;
                            controls.classList.remove("hide");
                            pauseButton.classList.add("hide");
                            startButton.classList.remove("hide");
                        }
                } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                }
            }
        });
    });
};

startButton.addEventListener("click", () => {
    movesCount = 0;
    time = 0;
    controls.classList.add("hide");
    pauseButton.classList.remove("hide");
    startButton.classList.add("hide");
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();

    seconds = 0;
    interval = clearInterval(interval);
    interval = setInterval(timerGenerator, 1000);
});

pauseButton.addEventListener(
    "click", 
    (stopGame = () => {
        interval = clearInterval(interval);
    })
);

restartButton.addEventListener(
    "click", 
    (() => {
        controls.classList.remove("hide");
        pauseButton.classList.add("hide");
        startButton.classList.remove("hide");
        seconds = 0;
        interval = clearInterval(interval);
        interval = setInterval(timerGenerator, 1000);
    })
);

//init values and func calls
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

initializer();

