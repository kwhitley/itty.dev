<script>
  import { page } from '$app/stores'
</script>

<main>
  <h1>
    <strong>{$page.status}</strong>
    <span>{$page.error.message}</span>
  </h1>
</main>

<style lang="scss">
  main {
    max-width: 800px;
  }

  h1 {
    padding: 2rem;
    font-size: 6rem;
    font-size: clamp(3rem, 9vmin, 6rem);
    font-weight: lighter;
    display: flex;
    flex-flow: column;
    line-height: 0.9em;
    letter-spacing: -0.05em;

    strong {
      font-size: 2.5em;
      line-height: 0.9em;
      opacity: 0.4;
      letter-spacing: -0.12em;
      font-weight: normal;
    }

    span {
      text-transform: lowercase;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 80vw;
      padding-bottom: 0.1em;
    }
  }
</style>
