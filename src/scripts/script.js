const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('.time'),
        score: document.querySelector('.score'),
    },
    values: {
        timeId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime:60,
    },
    actions:{
        countDownTimerID: setInterval(countDown, 1000),
    }
}

let audio = new Audio('./src/audios/hit.m4a');

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        alert(`Game Over! O seu resultado foi: ${state.values.result}`);
    }
}
function playSound(){  
    audio.volume= 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare;
}

function moveEnemy() {
    state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListnerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("click", (event) => {
            if (square === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function init() {
    // alert('a')
    moveEnemy();
    addListnerHitBox();
}

init();