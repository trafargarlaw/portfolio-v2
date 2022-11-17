<script setup>
import { onMounted, ref } from "vue";
import * as d3 from "d3";

const canvasRef = ref(null);

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.cellSize = 8;
    this.cols = this.width / this.cellSize;
    this.rows = this.height / this.cellSize;
    this.direction = "right";
    this.snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
    this.food = { x: 5, y: 5 };
    this.score = 0;
    this.gameOver = false;
    this.gamePaused = false;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawSnake();
    this.drawFood();
    this.drawScore();
  }

  drawSnake() {
    this.snake.forEach((cell) => {
      this.ctx.fillStyle = "rgba(67, 217, 173)";

      this.ctx.beginPath();
      this.ctx.arc(
        cell.x * this.cellSize + this.cellSize / 2,
        cell.y * this.cellSize + this.cellSize / 2,
        this.cellSize / 2,
        0,
        2 * Math.PI
      );
      this.ctx.fill();
    });
  }

  drawFood() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.food.x * this.cellSize + 4,
      this.food.y * this.cellSize + 4,
      4,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = "rgba(67, 217, 173, 1)";
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(
      this.food.x * this.cellSize + 4,
      this.food.y * this.cellSize + 4,
      7,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = "rgba(67, 217, 173, 0.2)";
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(
      this.food.x * this.cellSize + 4,
      this.food.y * this.cellSize + 4,
      10,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = "rgba(67, 217, 173, 0.1)";
    this.ctx.fill();
  }

  drawScore() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
  }

  move() {
    const head = this.snake[0];
    let newHead;
    switch (this.direction) {
      case "right":
        newHead = { x: head.x + 1, y: head.y };
        break;
      case "left":
        newHead = { x: head.x - 1, y: head.y };
        break;
      case "up":
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case "down":
        newHead = { x: head.x, y: head.y + 1 };
        break;
    }
    this.snake.unshift(newHead);
    if (this.eatFood()) {
      this.score++;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }

    if (this.checkGameOver()) {
      this.gameOver = true;
    }

    this.draw();

    if (!this.gameOver) {
      setTimeout(() => {
        this.move();
      }, 80);
    }

    if (this.gameOver) {
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("Game Over", 50, 200);
    }

    return this;
  }

  generateFood() {
    let food = {
      x: Math.floor(Math.random() * this.cols),
      y: Math.floor(Math.random() * this.rows),
    };
    if (this.snake.some((cell) => cell.x === food.x && cell.y === food.y)) {
      return this.generateFood();
    }
    return food;
  }

  eatFood() {
    const head = this.snake[0];
    return head.x === this.food.x && head.y === this.food.y;
  }

  checkGameOver() {
    const head = this.snake[0];
    if (
      head.x < 0 ||
      head.x >= this.cols ||
      head.y < 0 ||
      head.y >= this.rows
    ) {
      return true;
    }
    return this.snake.some((cell, index) => {
      return index > 0 && cell.x === head.x && cell.y === head.y;
    });
  }

  changeDirection(direction) {
    if (this.direction === "right" && direction === "left") {
      return;
    }
    if (this.direction === "left" && direction === "right") {
      return;
    }
    if (this.direction === "up" && direction === "down") {
      return;
    }
    if (this.direction === "down" && direction === "up") {
      return;
    }
    this.direction = direction;
  }

  start() {
    this.move();
    return this;
  }

  stop() {
    this.gameOver = true;
    return this;
  }

  pause() {
    this.gamePaused = true;
    return this;
  }

  restart() {
    this.gameOver = false;
    this.direction = "right";
    this.snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];
    this.food = { x: 5, y: 5 };
    this.score = 0;
    this.draw();
    this.start();
    return this;
  }

  onKeydown(event) {
    event.preventDefault();
    switch (event.key) {
      case "ArrowUp":
        this.changeDirection("up");
        break;
      case "ArrowDown":
        this.changeDirection("down");
        break;
      case "ArrowLeft":
        this.changeDirection("left");
        break;
      case "ArrowRight":
        this.changeDirection("right");
        break;
    }
  }

  bindEvents() {
    document.addEventListener("keydown", this.onKeydown.bind(this));
    return this;
  }

  unbindEvents() {
    document.removeEventListener("keydown", this.onKeydown.bind(this));
    return this;
  }

  init() {
    this.draw();
    this.bindEvents();
    return this;
  }

  destroy() {
    this.unbindEvents();
    return this;
  }
}

class Food {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  draw(ctx) {
    // draw 3 circles first 8 x 8 rgba(67, 217, 173, 1) second 14 x 14 rgba(67, 217, 173, 0.2) thrid 20 x 20 rgba(67, 217, 173, 0.1)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 7, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(67, 217, 173, 0.2)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(67, 217, 173, 0.1)";
    ctx.fill();
  }

  isEaten() {
    return this.x + this.r < 0 || this.y + this.r < 0;
  }
}

class Snake {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = `rgba(67, 217, 173, 1)`;
    this.dx = 0;
    this.dy = 0;
    this.tail = [];
    this.tailLength = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    for (let i = 0; i < this.tail.length; i++) {
      ctx.beginPath();
      if (this.tail[i]) {
        ctx.arc(this.tail[i].x, this.tail[i].y, this.r, 0, Math.PI * 2, false);
      }
      ctx.fillStyle = `rgba(67, 217, 173, ${i / (this.tailLength * 3)})`;
      ctx.fill();
    }
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.tailLength - 1] = { x: this.x, y: this.y };

    this.x += this.dx;
    this.y += this.dy;
  }

  eat(food) {
    const distance = Math.sqrt(
      Math.pow(this.x - food.x, 2) + Math.pow(this.y - food.y, 2)
    );

    if (distance < this.r + food.r) {
      this.tailLength += 8;
      return true;
    }
    return false;
  }

  isDead() {
    // check if snake has eaten itself
    for (let i = 0; i < this.tail.length; i++) {
      const distance = Math.sqrt(
        Math.pow(this.x - this.tail[i].x, 2) +
          Math.pow(this.y - this.tail[i].y, 2)
      );

      if (distance < this.r) {
        return true;
      }
    }

    return false;
  }

  checkWallCollision(canvas) {
    // check if snake has hit the wall and make it reappear on the other side with an offset of 4px
    if (this.x + this.r > canvas.width) {
      this.x = 4;
    } else if (this.x - this.r < 0) {
      this.x = canvas.width - 4;
    } else if (this.y + this.r > canvas.height) {
      this.y = 4;
    } else if (this.y - this.r < 0) {
      this.y = canvas.height - 4;
    }
  }

  isOutOfBounds(width, height) {
    return (
      this.x + this.r > width ||
      this.x - this.r < 0 ||
      this.y + this.r > height ||
      this.y - this.r < 0
    );
  }

  changeDirection(direction) {
    // prevent snake from going backwards
    switch (direction) {
      case "ArrowUp":
        if (this.dy !== 1) {
          this.dx = 0;
          this.dy = -1;
        }
        break;
      case "ArrowDown":
        if (this.dy !== -1) {
          this.dx = 0;
          this.dy = 1;
        }
        break;
      case "ArrowLeft":
        if (this.dx !== 1) {
          this.dx = -1;
          this.dy = 0;
        }
        break;
      case "ArrowRight":
        if (this.dx !== -1) {
          this.dx = 1;
          this.dy = 0;
        }
        break;
    }
  }

  reset() {
    this.x = 200;
    this.y = 200;
    this.dx = 0;
    this.dy = 0;
    this.tail = [];
    this.tailLength = 0;
  }

  getScore() {
    return this.tailLength;
  }
}

onMounted(() => {
  const canvas = canvasRef.value;
  // set height and width and background color to #011627
  canvas.width = 240;
  canvas.height = 408;
  canvas.style.backgroundColor = "#011627";

  const game = new Game(canvas);
  game.init();
  game.start();
});
</script>

<template>
  <canvas
    class="absolute left-[31px] top-[36px] rounded-lg"
    ref="canvasRef"
  ></canvas>
</template>
