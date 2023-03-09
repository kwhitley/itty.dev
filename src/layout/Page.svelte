<script>
  import { fade, fly } from 'svelte/transition'
</script>

<main class="page">
  <div in:fly={{ x: 100, duration: 200, delay: 110 }} out:fly={{ x: -100, duration: 100 }}>
    <slot />
  </div>
</main>


<style lang="scss">
  main {
    width: 100%;
    flex: 1 100%;
    padding:  calc(var(--page-gutter) * 1.5) var(--page-gutter) 2rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-bottom: 2rem;
    min-height: 100%;
  }

  :global(.constrained .page > div) {
    max-width: var(--max-page-width);
    width: 100%;
  }
</style>
