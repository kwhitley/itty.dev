<script>
  export let constrained = false
  export let sticky = false
  export let centered = false
</script>

<!-- MARKUP -->
<footer class:sticky>
  <section class:constrained class:centered>
    <slot>
      © 2023 Itty Industries, Inc.
    </slot>
  </section>
</footer>

<!-- STYLES -->
<style lang="scss">
  footer {
    padding: 2.5rem 0 0.5rem;
    display: flex;
    justify-content: center;
    font-size: 0.85em;
    color: var(--foreground-75);
    border-top: 1px solid var(--foreground-10);
    letter-spacing: -0.03em;
    margin-top: auto;

    &.sticky {
      position: fixed;
      bottom: 0;
      width: 100%;
      border-top: 1px solid var(--foreground-25);
    }

    @media (max-width: 700px) {
      padding-bottom: 2.5rem;
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
