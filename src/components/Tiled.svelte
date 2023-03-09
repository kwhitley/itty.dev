<script>
  export let split = false
  export let vertical = false
  export let gap

  $: style = gap ? `--gap: ${gap}` : undefined
</script>

<!-- MARKUP -->
<section class="tiled" class:vertical class:split {style}>
  <slot />
</section>

<!-- STYLES -->
<style lang="scss">
  :root {
    --gap: var(--tile-gap);
  }

  .tiled {
    display: flex;
    flex-flow: row wrap;
    gap: var(--gap);

    &.split {
      height: 100%;
      justify-content: space-between;
    }

    &.vertical {
      flex-flow: column;
    }
  }

  :global(.tiled:not(.centered) > *) {
    flex: 1;
  }
</style>
