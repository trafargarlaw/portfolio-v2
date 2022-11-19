<script setup>
import { onMounted, ref } from "vue";
import * as d3 from "d3";

const canvasRef = ref(null);
// snake game using d3
// snake's width is 8 and color is linear gradiant between rgba(67, 217, 173, 1) and rgba(67, 217, 173, 0.1)
// food's width is 8 and color rgba(67, 217, 173, 1)
// score's color is rgba(67, 217, 173, 1)
// background color is rgba(1, 22, 39, 1)

class Game {}

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
