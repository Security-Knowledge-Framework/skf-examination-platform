<script lang="ts">
  import { onMount } from "svelte";

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { labStore } from "./labStore";

  const duration = 1000;

  const progress = tweened(0, {
    duration,
    easing: cubicOut,
  });

  let finishedLab = false;

  labStore.subscribe((lab) => {
    if (finishedLab) return;
    if (lab["write-up"] || lab.quizz) $progress = 50;

    if (lab["write-up"] && lab.quizz) {
      $progress = 100;
      finishedLab = true;
    }
  });

  onMount(() => {
    const quizzesEl = document.querySelector("#quizzes")!;
    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Element is in view");
            $labStore = { ...$labStore, "write-up": true };
          } else {
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    observer.observe(quizzesEl);
  });
</script>

<div class="progress">
  <label for="lab-progress">Lab progress: {$progress.toFixed()}/100</label>
  <progress id="lab-progress" value={$progress} max="100"
    >{$progress}/100</progress
  >
</div>

<style>
  label {
    display: inline-block;
    width: 180px;
  }
</style>
