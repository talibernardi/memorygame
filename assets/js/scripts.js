const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
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
    { name: 'Grape', class: 'grape' },
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
};

//init values and func calls
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

initializer();

