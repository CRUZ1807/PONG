// Crie um elemento <canvas> no seu HTML com o id "pong-canvas"

// Variáveis globais
var canvas = document.getElementById("pong-canvas");
var context = canvas.getContext("2d");

// Ajuste o tamanho do canvas
canvas.width = 900; // Largura desejada
canvas.height = 850; // Altura desejada

// Carregar as imagens
var paddle1Image = new Image();
paddle1Image.src = "imgs/Predionovo.png";

var paddle2Image = new Image();
paddle2Image.src = "imgs/prediovelho.png";

var ballImage = new Image();
ballImage.src = "imgs/bolinhawifi.png";

// Objetos do jogo
var paddle1 = {
  image: paddle1Image,
  width: 20,
  height: 100,
  x: 20,
  y: (canvas.height - 100) / 2,
  dy: 0
};

var paddle2 = {
  image: paddle2Image,
  width: 20,
  height: 100,
  x: canvas.width - 40,
  y: (canvas.height - 100) / 2,
  dy: 0
};

var ball = {
  image: ballImage,
  width: 20,
  height: 20,
  x: (canvas.width - 20) / 2,
  y: (canvas.height - 20) / 2,
  dx: 4,
  dy: 4
};

// Função de desenho
function draw() {
  // Limpar o canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar a paleta 1
  context.drawImage(paddle1.image, paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  // Desenhar a paleta 2
  context.drawImage(paddle2.image, paddle2.x, paddle2.y, paddle2.width, paddle2.height);

  // Desenhar a bola
  context.drawImage(ball.image, ball.x, ball.y, ball.width, ball.height);
}

// Função de atualização
function update() {
  // Atualizar a posição da paleta 1
  paddle1.y += paddle1.dy;

  // Verificar limites da paleta 1
  if (paddle1.y < 0) {
    paddle1.y = 0;
  } else if (paddle1.y + paddle1.height > canvas.height) {
    paddle1.y = canvas.height - paddle1.height;
  }

  // Atualizar a posição da paleta 2
  paddle2.y += paddle2.dy;

  // Verificar limites da paleta 2
  if (paddle2.y < 0) {
    paddle2.y = 0;
  } else if (paddle2.y + paddle2.height > canvas.height) {
    paddle2.y = canvas.height - paddle2.height;
  }

  // Atualizar a posição da bola
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Verificar colisão com as bordas
  if (ball.y + ball.height > canvas.height || ball.y < 0) {
    ball.dy *= -1;
  }

  // Verificar colisão com a paleta 1
  if (
    ball.x < paddle1.x + paddle1.width &&
    ball.x + ball.width > paddle1.x &&
    ball.y < paddle1.y + paddle1.height &&
    ball.y + ball.height > paddle1.y
  ) {
    ball.dx *= -1;
  }

  // Verificar colisão com a paleta 2
  if (
    ball.x < paddle2.x + paddle2.width &&
    ball.x + ball.width > paddle2.x &&
    ball.y < paddle2.y + paddle2.height &&
    ball.y + ball.height > paddle2.y
  ) {
    ball.dx *= -1;
  }

  // Desenhar o jogo
  draw();

  // Repetir a atualização do jogo
  requestAnimationFrame(update);
}

// Função para controlar as paletas
function controlPaddle(event) {
  // Controles da paleta 1 (teclas W e S)
  if (event.key === "w") {
    paddle1.dy = -8;
  } else if (event.key === "s") {
    paddle1.dy = 8;
  }

  // Controles da paleta 2 (setas para cima e para baixo)
  if (event.key === "ArrowUp") {
    paddle2.dy = -8;
  } else if (event.key === "ArrowDown") {
    paddle2.dy = 8;
  }
}

// Função para parar o movimento das paletas
function stopPaddle(event) {
  // Parar a paleta 1
  if (event.key === "w" || event.key === "s") {
    paddle1.dy = 0;
  }

  // Parar a paleta 2
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    paddle2.dy = 0;
  }
}

// Adicionar event listeners para controlar as paletas
document.addEventListener("keydown", controlPaddle);
document.addEventListener("keyup", stopPaddle);

// Função para iniciar o jogo
function startGame(event) {
  if (event.key === " ") {
    // Remover o event listener para iniciar o jogo apenas uma vez
    document.removeEventListener("keydown", startGame);
    // Iniciar o jogo
    update();
  }
}

// Adicionar event listener para iniciar o jogo quando a tecla de espaço for pressionada
document.addEventListener("keydown", startGame);
