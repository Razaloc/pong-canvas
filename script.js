const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Elementos del juego
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

function draw() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar los paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

    // Dibujar la pelota
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisiones con el borde superior e inferior
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisión con los paddles
    if (
        (ballX <= paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) ||
        (ballX >= canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Resetear la pelota si se sale
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Control del jugador 1
document.addEventListener('mousemove', (event) => {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (mouseY > 0 && mouseY < canvas.height - paddleHeight) {
        player1Y = mouseY;
    }
});

// Control del jugador 2 (puedes modificar esto para otro método de control)
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && player2Y > 0) {
        player2Y -= 10;
    }
    if (event.key === 'ArrowDown' && player2Y < canvas.height - paddleHeight) {
        player2Y += 10;
    }
});

// Iniciar el juego
gameLoop();
