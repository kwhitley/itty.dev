<script>
  export let constrained = false
  export let sticky = false
  export let centered = false
</script>

<!-- MARKUP -->
<footer class:sticky>
  <section class:constrained class:centered>
    <slot>
      Footer content goes here.
    </slot>
  </section>
</footer>

<!-- STYLES -->
<style lang="scss">
  footer {
    padding: 2.5rem var(--page-gutter) 2.5rem;
    display: flex;
    justify-content: center;
    font-size: 0.85em;
    color: var(--foreground-75);
    background: var(--footer-color);
    border-top: 1px solid var(--foreground-10);

    &.sticky {
      position: fixed;
      bottom: 0;
      width: 100%;
      border-top: 1px solid var(--foreground-25);
    }
  }

  section {
    flex: 1;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    column-gap: 2em;

    &.constrained {
      max-width: var(--max-page-width);
    }

    &.centered {
      text-align: center;
      display: block;
    }
  }
</style>
