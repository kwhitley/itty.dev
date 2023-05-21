<script>
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/stores'

  $: hash = String($page.url)?.split('#')?.[1]

  afterNavigate(() => {
    document.getElementById('layout').scrollTop = 0
    document.getElementById('content').scrollTop = 0

    if (hash) {
      document.getElementsByName(hash)[0]?.scrollIntoView()
    }
  })
</script>

<main class="page">
  <slot />
</main>


<style lang="scss">
  main {
    width: 100%;
    flex: 1 100%;
    padding: calc(var(--page-gutter) * 1) var(--page-gutter) 2rem;
    display: flex;
    flex-flow: column;
    min-height: 100%;
    max-width: 1000px;

    div {
      width: 100%;
    }
  }

  :global(.page p) {
    margin-right: 0.5rem;
  }

  :global(.constrained .page > div) {
    max-width: var(--max-page-width);
    width: 100%;
  }

  :global(.page > h1:first-child) {
    border-bottom: 2px dotted var(--foreground-25);
    padding-bottom: 0.3rem;
  }
</style>
