<script lang="ts">
  import { labStore } from "./labStore";

  type Quiz = {
    title: string;
    description: string;
    answer?: string;
  };

  export let quizzes: Quiz[] = [];

  let flag = "";
  let message = "";

  quizzes = quizzes.map((quiz) => {
    return {
      ...quiz,
      answer: "",
    };
  });

  function submitHandler() {
    if (quizzes.some((quiz) => quiz.answer === "") || flag === "") {
      message = "Please answer all the questions";
      return;
    }

    if (
      quizzes.every((quiz) => quiz.answer === "1") &&
      flag === "SKF{1nput_1s_4w3s0m3}"
    ) {
      message = "Congratulations! You have completed the lab";
      $labStore = { ...$labStore, quizz: true };
    } else {
      message = "Incorrect answers";
    }
  }
</script>

<div id="quizzes">
  <ul>
    {#each quizzes as quiz}
      <li>
        <h4>{quiz.title}</h4>
        <p>{quiz.description}</p>
        <input type="text" bind:value={quiz.answer} />
      </li>
    {/each}
  </ul>
  <p>Lab Flag</p>
  <input class="input-lab-flag" type="text" bind:value={flag} />
  <button on:click={submitHandler}>Submit</button>
  {#if message}
    <p class="message">{message}</p>
  {/if}
</div>

<style>
  #quizzes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 2rem;
    position: relative;
  }

  .input-lab-flag {
    margin-bottom: 2rem;
  }

  li {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    align-items: flex-start;
    gap: 0.5rem;
  }

  button {
    margin-bottom: 2rem;
  }

  .message {
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>
