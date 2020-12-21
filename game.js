let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")

const ballRadius = 12
const paddleHeight = 16
const paddleWidth = 95
let paddleX = (canvas.width - paddleWidth) / 2

const brickRowCount = 3;
const brickColumnCount = 6;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 60;

let x = canvas.width / 2
let dx = 2

let y = canvas.height - 50
let dy = -2

let rightPressed = false
let leftPressed = false

let score = 0
let lives = 3

let bricks = []
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, isHit : false }
  }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)
document.addEventListener("mousemove", mouseMoveHandler, false)

// these have to use function notation in order to define functions after the eventListener
function keyDownHandler(e) {
  if (e.key == 'd') {
    rightPressed = true
  } else if (e.key == 'a') {
    leftPressed = true
  }
}

function keyUpHandler(e) {
  if (e.key == 'd') {
    rightPressed = false
  } else if (e.key == 'a') {
    leftPressed = false
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft
  if (relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
    paddleX = relativeX - paddleWidth / 2
  }
}

function collisionDetection() {
  for(let c=0; c<brickColumnCount; c++) {
    for(let r=0; r<brickRowCount; r++) {
        let b = bricks[c][r];
        if (!b.isHit) {
          if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy
            b.isHit = true
            score++
            if (score == brickRowCount * brickColumnCount) {
              alert("You win!")
              document.location.reload()
            }
          }
        } 
    }
  }
}

const drawScore = () => {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095dd"
  ctx.fillText("Score: " + score, 8, 20)
}

const drawLives = () => {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095dd"
  ctx.fillText("Lives: " + lives, canvas.width - 60, 20)
}

const drawBall = () => {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fillStyle = "pink"
  ctx.fill()
}

const drawPaddle = () => {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  }

const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for(let r=0; r<brickRowCount; r++) {
      if (!bricks[c][r].isHit) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
      }
      
    }
  }
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawBall()
  drawPaddle()
  drawScore()
  drawLives()
  collisionDetection()

  if ( x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx
  }
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      if (y = y - paddleHeight) {
        dy = -dy
      }
    } else {
      lives--
      paddleX = (canvas.width - paddleWidth) / 2
      x = canvas.width / 2
      dx = 2
      y = canvas.height - 50
      dy = -2
      if (lives < 1) {
        alert("You lose! 😵")
        document.location.reload()
      }
    }
  } 

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 6
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 6
  }

  x += dx
  y += dy

  requestAnimationFrame(draw)
}

//start main game loop
draw()