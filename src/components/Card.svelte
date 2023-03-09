<script>
  export let active = false
  export let href
  export let minWidth

  $: style = minWidth ? `min-width: ${minWidth};` : undefined
</script>

<!-- MARKUP -->
<svelte:element
  this={href ? 'a' : 'div'}
  class="card"
  class:active
  {style}
  {href}
  >
  <slot />
</svelte:element>

<!-- STYLES -->
<style lang="scss">
  :root {
    --card-font-size: 0.85rem;
    --active-color: var(--card-active-color);
  }

  .card {
    border: var(--card-border-thickness) solid var(--foreground-25);
    border-radius: var(--border-radius);
    padding: var(--card-gutter) 0;
    font-size: var(--card-font-size);
    display: flex;
    flex-flow: column;
    position: relative;
  }

  :global(a.card) {
    cursor: pointer;
    color: var(--foreground-color);
    transition: all 0.05s ease;

    &:hover {
      text-decoration: none;
      outline: 3px solid var(--link-color);
      outline-offset: -2px;
      box-shadow: 0 0.2rem 0.5rem rgba(0,0,0,0.2);
    }
  }

  .active {
    outline: 3px solid var(--active-color);
    outline-offset: -2px;
  }

  :global(.card > *) {
    margin-left: var(--card-gutter);
    margin-right: var(--card-gutter);
  }

  :global(.card .fullwidth) {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
  }

  :global(.card .tiled * .fullwidth) {
    margin-left: calc(-1 * var(--card-gutter));
    margin-right: calc(-1 * var(--card-gutter));
  }

  :global(.card .tiled * .fullwidth.padded) {
    padding-left: var(--card-gutter);
    padding-right: var(--card-gutter);
  }

  :global(.card:has(.fullwidth:last-child)) {
    padding-bottom: 0;
  }

  :global(.card hr) {
    margin: 0.5em var(--card-gutter) 2em;
  }

  :global(.card hr.fullwidth) {
    margin-left: 0;
    margin-right: 0;
  }
</style>
