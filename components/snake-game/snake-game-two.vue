<script setup>
const gridRef = ref(null);
// An array of snake positions, starting head first
const snakePositions = ref([]);
const foodPosition = ref();
const startTimestamp = ref(); // The starting timestamp of the animation
const lastTimestamp = ref(); // The previous timestamp of the animation
const stepsTaken = ref(); // How many steps did the snake take
const score = ref(); // The score of the game

const inputs = ref([]); // A list of directions the snake still has to take in order

const startGame = ref();
const gameStarted = ref(false); // Is the game started?
const isLost = ref(false); // Is the game lost?

// configuration
const width = 30;
const height = 51;

const speed = 80; // The speed of the snake in milliseconds

const color = "rgba(67, 217, 173)";

onMounted(() => {
  for (let i = 0; i < width * height; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.innerHTML = `<div class="content"></div>`;
    gridRef.value.appendChild(tile);
  }

  const tiles = document.querySelectorAll(".grid .tile .content");

  // initialize layout
  //resetGame();

  function resetGame() {
    snakePositions.value = [1120, 1090, 1060, 1030];
    foodPosition.value = 222;

    // reset game progress
    startTimestamp.value = undefined;
    lastTimestamp.value = undefined;
    stepsTaken.value = -1;
    score.value = 0;

    // reset inputs
    inputs.value = [];

    // reset tiles
    for (const tile of tiles) {
      setTile(tile);
    }

    setTile(tiles.item(foodPosition.value), {
      "background-color": color,
      "border-radius": "50%",
    });

    // render snake
    // ignore the last part ( the snake just moved out from it)
    for (const i of snakePositions.value.slice(1)) {
      const snakePart = tiles.item(i);
      // snakepart.style.backgroundColor = line gradient from rgba(67,217,173,1) to rgba(67,217,173,0)
      snakePart.style.backgroundColor = color;

      // set up transition directions for head and tail

      if (i == snakePositions.value[snakePositions.value.length - 1])
        snakePart.style.left = 0;
      if (i == snakePositions.value[0]) snakePart.style.right = 0;
    }
  }

  window.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key))
      return;

    e.preventDefault();

    if (e.key == " ") {
      resetGame();
      startGame.value();
      return;
    }

    if (
      e.key == "ArrowLeft" &&
      inputs.value[inputs.value.length - 1] != "left" &&
      headDirection() != "right"
    ) {
      inputs.value.push("left");
      if (!gameStarted.value) startGame.value();
      return;
    }
    if (
      e.key == "ArrowUp" &&
      inputs.value[inputs.value.length - 1] != "up" &&
      headDirection() != "down"
    ) {
      inputs.value.push("up");
      if (!gameStarted.value) startGame.value();
      return;
    }
    if (
      e.key == "ArrowRight" &&
      inputs.value[inputs.value.length - 1] != "right" &&
      headDirection() != "left"
    ) {
      inputs.value.push("right");
      if (!gameStarted.value) startGame.value();
      return;
    }
    if (
      e.key == "ArrowDown" &&
      inputs.value[inputs.value.length - 1] != "down" &&
      headDirection() != "up"
    ) {
      inputs.value.push("down");
      if (!gameStarted.value) startGame.value();
      return;
    }
  });

  startGame.value = () => {
    resetGame();
    gameStarted.value = true;
    window.requestAnimationFrame(main);
  };

  function main(timestamp) {
    try {
      if (startTimestamp.value == undefined) startTimestamp.value = timestamp;
      const totalElapsedTime = timestamp - startTimestamp.value;
      const timeElapsedSinceLastCall = timestamp - lastTimestamp.value;
      const stepsShouldHaveTaken = Math.floor(totalElapsedTime / speed);
      const percentageOfStep = (totalElapsedTime % speed) / speed;

      if (stepsTaken.value != stepsShouldHaveTaken) {
        stepAndTransition(percentageOfStep);

        const headPosition =
          snakePositions.value[snakePositions.value.length - 1];
        if (headPosition == foodPosition.value) {
          score.value += 1;

          addNewFood();
        }
        stepsTaken.value += 1;
      } else {
        transition(percentageOfStep);
      }

      window.requestAnimationFrame(main);
    } catch (error) {
      console.log(error);
    }

    lastTimestamp.value = timestamp;
  }

  function stepAndTransition(percentageOfStep) {
    const newHeadPosition = getNextPosition();

    snakePositions.value.push(newHeadPosition);

    const previousTail = tiles.item(snakePositions.value[0]);
    setTile(previousTail);

    if (newHeadPosition != foodPosition.value) {
      snakePositions.value.shift();

      const tail = tiles.item(snakePositions.value[0]);
      const tailDi = tailDirection();

      const tailValue = `${100 - percentageOfStep * 100}%`;

      if (tailDi == "right")
        setTile(tail, {
          "background-color": color,
          left: 0,
          width: tailValue,
        });
      if (tailDi == "left")
        setTile(tail, {
          "background-color": color,
          right: 0,
          width: tailValue,
        });

      if (tailDi == "down")
        setTile(tail, {
          "background-color": color,
          top: 0,
          height: tailValue,
        });

      if (tailDi == "up")
        setTile(tail, {
          "background-color": color,
          bottom: 0,
          height: tailValue,
        });
    }

    const previousHead = tiles.item(
      snakePositions.value[snakePositions.value.length - 2]
    );
    setTile(previousHead, {
      "background-color": color,
    });

    const head = tiles.item(newHeadPosition);
    const headDi = headDirection();
    const headValue = `${percentageOfStep * 100}%`;

    if (headDi == "right")
      setTile(head, {
        // line gradient from 1
        "background-color": color,
        left: 0,
        width: headValue,
      });

    if (headDi == "left")
      setTile(head, {
        "background-color": color,
        right: 0,
        width: headValue,
      });

    if (headDi == "down")
      setTile(head, {
        "background-color": color,
        top: 0,
        height: headValue,
      });

    if (headDi == "up")
      setTile(head, {
        "background-color": color,
        bottom: 0,
        height: headValue,
      });
  }

  function transition(percentageOfStep) {
    const head = tiles.item(
      snakePositions.value[snakePositions.value.length - 1]
    );
    const headDi = headDirection();
    const headValue = `${percentageOfStep * 100}%`;

    if (headDi == "right" || headDi == "left") head.style.width = headValue;
    if (headDi == "up" || headDi == "down") head.style.height = headValue;

    const tail = tiles.item(snakePositions.value[0]);
    const tailDi = tailDirection();
    const tailValue = `${100 - percentageOfStep * 100}%`;

    if (tailDi == "right" || tailDi == "left") tail.style.width = tailValue;
    if (tailDi == "up" || tailDi == "down") tail.style.height = tailValue;
  }

  function getNextPosition() {
    const headPosition = snakePositions.value[snakePositions.value.length - 1];
    const snakeDirection = inputs.value.shift() || headDirection();

    switch (snakeDirection) {
      case "right": {
        const nextPosition = headPosition + 1;
        if (nextPosition % width == 0) isLost.value = true;
        if (snakePositions.value.slice(1).includes(nextPosition))
          isLost.value = true;
        return nextPosition;
      }
      case "left": {
        const nextPosition = headPosition - 1;
        if (nextPosition % width == width - 1 || nextPosition < 0)
          isLost.value = true;
        if (snakePositions.value.slice(1).includes(nextPosition));
        return nextPosition;
      }
      case "down": {
        const nextPosition = headPosition + width;
        if (nextPosition > width * height - 1) isLost.value = true;
        if (snakePositions.value.slice(1).includes(nextPosition));
        return nextPosition;
      }
      case "up": {
        const nextPosition = headPosition - width;
        if (nextPosition < 0) isLost.value = true;
        if (snakePositions.value.slice(1).includes(nextPosition));
        return nextPosition;
      }
    }
  }

  function headDirection() {
    const head = snakePositions.value[snakePositions.value.length - 1];
    const neck = snakePositions.value[snakePositions.value.length - 2];
    return getDirection(head, neck);
  }

  function tailDirection() {
    const tail = snakePositions.value[0];
    const neck = snakePositions.value[1];
    return getDirection(tail, neck);
  }

  function getDirection(first, second) {
    if (first - 1 == second) return "right";
    if (first + 1 == second) return "left";
    if (first - width == second) return "down";
    if (first + width == second) return "up";
    throw Error("The two tile are not connected");
  }

  function addNewFood() {
    let newPosition;

    do {
      newPosition = Math.floor(Math.random() * width * height);
    } while (snakePositions.value.includes(newPosition));

    setTile(tiles.item(newPosition), {
      "background-color": color,
      "border-radius": "50%",
    });

    foodPosition.value = newPosition;
  }

  function setTile(element, overrides = {}) {
    const defaults = {
      width: "100%",
      height: "100%",
      top: "auto",
      bottom: "auto",
      left: "auto",
      right: "auto",
      background: "transparent",
    };
    // set element style to defaults and overrides

    const cssProperties = { ...defaults, ...overrides };
    element.style.cssText = Object.entries(cssProperties)
      .map(([key, value]) => `${key}: ${value}`)
      .join(" ; ");
  }
});
</script>

<template>
  <div class="container absolute left-[31px] top-[36px] rounded-lg">
    <div
      class="grid bg-primary-maastricht-blue rounded-md grid-cols-[repeat(30,auto)] w-[240px] h-[408px] grid-rows-[repeat(51,auto)]"
      ref="gridRef"
    >
      <div
        v-if="!gameStarted"
        class="absolute justify-self-center self-center flex flex-col items-center z-50"
      >
        <svg
          width="67"
          height="197"
          viewBox="0 0 67 197"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8271 39.3883V114.388H62.8271V193"
            stroke="url(#paint0_linear_0_1)"
            stroke-width="8"
            stroke-linecap="round"
          />
          <circle
            opacity="0.1"
            cx="10.827"
            cy="11.2725"
            r="10.3456"
            fill="#43D9AD"
          />
          <circle
            opacity="0.2"
            cx="10.827"
            cy="11.2725"
            r="7.34558"
            fill="#43D9AD"
          />
          <circle cx="10.8271" cy="11.2725" r="4" fill="#43D9AD" />
          <defs>
            <linearGradient
              id="paint0_linear_0_1"
              x1="10.8271"
              y1="48.3883"
              x2="73.9999"
              y2="167"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#43D9AD" />
              <stop offset="1" stop-color="#43D9AD" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <v-button @click="startGame" class="mt-16" type="primary"
          >start-game</v-button
        >
      </div>
    </div>
  </div>
</template>
