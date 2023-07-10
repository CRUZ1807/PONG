let ctx, p1_y, p2_y, p1_points, p2_points;
let ball_y_orientation, ball_x_orientation, ball_x, ball_y;
let p1_key, p2_key;
const h = 500, w = 800, p_w = 60, p_h = 150, p1_x = 10, p2_x = w - p_w - 10;
let p1_paddleImage, p2_paddleImage;

function loadImages() {
  p1_paddleImage = new Image();
  p1_paddleImage.src = 'Raquete1.png';

  p2_paddleImage = new Image();
  p2_paddleImage.src = 'Raquete2.png';

  background_image = new Image();
  background_image.src = 'background.png';

  ball_image = new Image();
  ball_image.src = 'Ball.png';
}

function setup() {
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // inicializa as posições y do p1 e do p2 para metade da tela
  p1_y = p2_y = (h / 2) - (p_h / 2);

  // inicializa os pontos dos jogadores como 0
  p1_points = 0;
  p2_points = 0;

  // Carrega as imagens antes de iniciar o jogo
  loadImages();

  //define um intervalo de 60 fps para o loop
  setInterval(loop, 800 / 60);

  initBall();
}

function loop() {
  // Verifica se a bola está colidindo com a barra do player 1
  if (ball_x >= p1_x && ball_x <= p1_x + 10 && ball_y >= p1_y && ball_y <= p1_y + p_h) {
    ball_x_orientation = 1;
  }
  // Verifica se a bola está colidindo com a barra do player 2
  else if (ball_x >= p2_x && ball_x <= p2_x + 10 && ball_y >= p2_y && ball_y <= p2_y + p_h) {
    ball_x_orientation = -1;
  }

  // verifica se a bola passou bateu no chão ou no teto
  if (ball_y + 10 >= h || ball_y <= 0) ball_y_orientation *= -1;

  // move a bola no eixo X e Y
  ball_x += 5 * ball_x_orientation;
  ball_y += 5 * ball_y_orientation;

  if (ball_x + 10 > w) {
    p1_points++;
    initBall();
  } else if (ball_x < 0) {
    p2_points++;
    initBall();
  }

  if (p1_key == 87 && p1_y > 0) {
    p1_y -= 10;
  } else if (p1_key == 83 && p1_y + p_h < h) {
    p1_y += 10;
  }

  if (p2_key == 38 && p2_y > 0) {
    p2_y -= 10;
  } else if (p2_key == 40 && p2_y + p_h < h) {
    p2_y += 10;
  }
  draw();
}

function initBall() {
  console.log(`${p1_points} VS ${p2_points}`);
  ball_y_orientation = Math.pow(2, Math.floor(Math.random() * 2) + 1) - 3;
  ball_x_orientation = Math.pow(2, Math.floor(Math.random() * 2) + 1) - 3;
  ball_x = w / 2 - 10;
  ball_y = h / 2 - 10;
}

function draw() {
  // fundo
  drawRect(0, 0, w, h, "#73B4C9");
  // player 1
  ctx.drawImage(p1_paddleImage, p1_x, p1_y, p_w, p_h);
  // player 2
  ctx.drawImage(p2_paddleImage, p2_x, p2_y, p_w, p_h);
  // barra lateral
  drawRect(w / 2 - 5, 0, 5, h);
  // bola
  ctx.drawImage(ball_image, ball_x, ball_y, 30, 30);
  writePoints();
}

function drawRect(x, y, w, h, color = "#fff") {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#000";
}

function writePoints() {
  ctx.font = "50px monospace";
  ctx.fillStyle = "#fff";
  // w/4 = 1/4 da tela = metade da tela do player 1
  ctx.fillText(p1_points, w / 4, 50);
  // 3*(w/4) = 3/4 da tela = metade da tela do player 2
  ctx.fillText(p2_points, 3 * (w / 4), 50);
}

document.addEventListener("keydown", function (ev) {
  // keyCode 87 = w, keycode 83 = s
  if (ev.keyCode == 87 || ev.keyCode == 83) {
    p1_key = ev.keyCode;
  }
  // keycode 38 = arrowUp, keycode 40 = arrowDown
  else if (ev.keyCode == 38 || ev.keyCode == 40) {
    p2_key = ev.keyCode;
  }
});

setup();
