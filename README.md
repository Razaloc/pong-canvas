# Pong

Pong con HTML y Canvas

## Resumen

Este código implementa un juego básico de Pong donde dos jugadores pueden controlar sus paddles para evitar que la pelota salga de la pantalla. Puedes expandir este código añadiendo características como puntuaciones, sonidos o niveles de dificultad. ¡Es un gran punto de partida!

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <script type="module" src="script.js"></script>
    <title>Pong</title>
  </head>
  <body>
    <h1>Pong</h1>
    <canvas id="pong" width="800" height="400"></canvas>
    <script src="pong.js"></script>
  </body>
</html>
```

1. **Estructura Básica**: Se define la estructura HTML con el lenguaje establecido como español.
2. **Canvas**: Se crea un elemento `<canvas>` con un ancho de 800 píxeles y un alto de 400 píxeles, donde se dibujará el juego.
3. **Estilos**: El canvas tiene un fondo negro y está centrado en la página.
4. **Script**: Se incluye el archivo JavaScript `pong.js` que contiene la lógica del juego.

### JavaScript

```javascript
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
```

- Se obtiene el elemento canvas y su contexto 2D, que permite dibujar en él.

#### Variables de Juego

```javascript
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;
```

- Se definen las dimensiones del paddle y de la pelota.
- Se inicializan las posiciones de los paddles y de la pelota, así como la velocidad de la pelota en ambas direcciones.

#### Función de Dibujo

```javascript
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
}
```
- **Limpieza**: Se borra el canvas en cada cuadro.
- **Dibujo de Paddles**: Se dibujan los paddles de ambos jugadores en blanco.
- **Dibujo de la Pelota**: Se dibuja la pelota como un círculo en la posición actual.

#### Función de Actualización

```javascript
function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (
        (ballX <= paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) ||
        (ballX >= canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}
```
- **Movimiento de la Pelota**: Se actualiza la posición de la pelota según su velocidad.
- **Colisiones**: Se detectan colisiones con los bordes superior e inferior y se invierte la dirección si hay una colisión.
- **Colisión con Paddles**: Se verifica si la pelota toca uno de los paddles y, de ser así, se invierte su dirección.
- **Reinicio de la Pelota**: Si la pelota sale del canvas, se reinicia en el centro.

#### Bucle del Juego

```javascript
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}
```
- Esta función llama a `draw` y `update` en un bucle continuo utilizando `requestAnimationFrame`, lo que permite que el juego se ejecute de forma suave y eficiente.

#### Controles

```javascript
document.addEventListener('mousemove', (event) => {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (mouseY > 0 && mouseY < canvas.height - paddleHeight) {
        player1Y = mouseY;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && player2Y > 0) {
        player2Y -= 10;
    }
    if (event.key === 'ArrowDown' && player2Y < canvas.height - paddleHeight) {
        player2Y += 10;
    }
});
```
- **Control del Jugador 1**: Se utiliza el movimiento del mouse para mover el paddle del jugador 1.
- **Control del Jugador 2**: Se utilizan las teclas de flecha arriba y abajo para mover el paddle del jugador 2.

#### Inicialización

```javascript
gameLoop();
```
- Se inicia el bucle del juego llamando a `gameLoop()`.

### CSS Estético

Puedes reemplazar la sección `<style>` en tu archivo HTML con el siguiente código CSS:

```css
body {
    background-color: #1e1e1e; /* Fondo oscuro */
    color: white; /* Color de texto blanco */
    font-family: 'Arial', sans-serif; /* Fuente */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

canvas {
    border: 2px solid #ffffff; /* Borde blanco alrededor del canvas */
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); /* Sombra suave */
    transition: transform 0.2s; /* Transición suave al hover */
}

canvas:hover {
    transform: scale(1.05); /* Efecto de zoom al pasar el mouse */
}

h1 {
    position: absolute;
    top: 20px;
    font-size: 2em;
    text-align: center;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8); /* Sombra del texto */
}
```

### Explicación de Estilos

1. **Fondo y Texto**: Se establece un fondo oscuro y el texto en blanco para un contraste agradable.
2. **Fuente**: Se utiliza una fuente sans-serif para un aspecto limpio.
3. **Centrado**: Se centra el canvas tanto vertical como horizontalmente en la pantalla.
4. **Canvas**:
   - Se añade un borde blanco alrededor del canvas.
   - Se aplica una sombra suave para darle un efecto de profundidad.
   - Se añade un efecto de zoom al pasar el mouse, lo que hace que el juego se vea más interactivo.
5. **Título**: Si decides añadir un título al juego (puedes agregar `<h1>Pong</h1>` en el HTML), tendrá un estilo centrado y una sombra que mejora su visibilidad.






