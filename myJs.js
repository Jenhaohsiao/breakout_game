var container = document.querySelector('.container');
var ball = document.querySelector('#ball');
var paddle = document.querySelector('.paddle');
var btn_start = document.querySelector('.startBtn');

var gameOver = false;
var gameInPlay = false;
var score = 0;
var lives = 5;
var animationRepeat;
var ballDir = [5, 5, 5];
var containerDim = container.getBoundingClientRect();


btn_start.addEventListener('click', startGame);

document.addEventListener('keydown', function(e) {

    var key = e.keyCode;
    e.preventDefault();
    if (key === 37) {
        paddle.left = true;
    } else if (key === 39) {
        paddle.right = true;
    }

});

document.addEventListener('keyup', function(e) {

    var key = e.keyCode;
    e.preventDefault();
    if (key === 37) {
        paddle.left = false;
    } else if (key === 39) {
        paddle.right = false;
    }

});


function startGame() {
    document.querySelector('.gameover').style.display = 'none';
    ball.style.display = 'block';
    animationRepeat = requestAnimationFrame(update);
    gameOver = false;
    gameInPlay = true;

    console.dir(paddle)

}

function update() {

    if (gameOver === false) {
        var pCurrent = paddle.offsetLeft;

        if (paddle.left && pCurrent > 0) {
            pCurrent -= 5;
        } else if (paddle.right && pCurrent < (containerDim.width - paddle.offsetWidth)) {
            pCurrent += 5;
        }

        paddle.style.left = pCurrent + 'px';

        if (!gameInPlay) {
            waitingOnPaddle();
        } else {
            ballMove();
        }
        animationRepeat = requestAnimationFrame(update);

    }
}

function waitingOnPaddle() {
    ball.style.top = (paddle.offsetTop - 22) + 'px';
    ball.style.left = (paddle.offsetLeft + 70) + 'px';

}

function ballMove() {

    var x = ball.offsetLeft;
    var y = ball.offsetTop;

    if (x > containerDim.width - 20 || x < 0) {
        ballDir[0] *= -1;
    }

    if (y > containerDim.height || y < 0) {
        ballDir[1] *= -1;
    }

    if (isCollide(ball, paddle)) {
        // collision
        console.log('HIT')
    }

    x += ballDir[0];
    y += ballDir[1];


    ball.style.top = y + 'px';
    ball.style.left = x + 'px';

}

function isCollide(a, b) {

    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();
    // console.log("a:", aRect);
    // console.log("b:", bRect);
    return (!(aRect.bottom < bRect.top || aRect.top > bRect.bottom || aRect.right < bRect.left || aRect.left > bRect.right));

}