<script lang="ts">
  import FlaskIcon from "../svgs/Lab.svelte";
  export let labs: any[];
  export let certificate: {
    name: string;
    description: string;
    summary: {
      description: string;
      list: string[];
      footer: string;
    };
  };
</script>

<div class="wrapper">
  <header>
    <img src="/imgs/skf-certificate.jpg" alt="" />
    <div class="info">
      <h3>{certificate.name}</h3>
      <p>
        {certificate.description}
      </p>
    </div>
  </header>

  <main>
    <div class="content">
      <h4>Summary</h4>
      <div class="summary">
        <p>{certificate.summary.description}</p>
        <ul>
          {#each certificate.summary.list as item}
            <li>{item}</li>
          {/each}
        </ul>
        <p>{certificate.summary.footer}</p>
      </div>
    </div>
    <div class="sidebar">
      <div class="labs">
        <h4>Modules</h4>
        {#each labs as lab}
          <div class="lab">
            <FlaskIcon />
            <a href={`/labs/${lab.id}`}>{lab.name}</a>
          </div>
        {/each}
      </div>
    </div>
  </main>
</div>

<style>
  .wrapper {
    margin-bottom: 5rem;
  }

  header {
    display: flex;
    gap: 2rem;
    background-color: var(--primary-700);
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 4rem;
  }

  header img {
    width: 400px;
    object-position: center left;
  }

  header .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
  }

  .info h3 {
    text-align: left;
    margin-bottom: 2rem;
  }

  main {
    display: flex;
    justify-content: space-between;
    gap: 4rem;
  }

  main .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  main h4 {
    font-size: 1.5rem;
    text-align-last: left;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .summary ul {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .summary li {
    list-style: none;
  }

  .labs h4 {
    margin-bottom: 2rem;
  }

  .labs .lab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
</style>
