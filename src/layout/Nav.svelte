<script>
  import { headerIsOpen } from '~/stores'
  import Brand from './Brand.svelte'
  import Menu from './Menu.svelte'
  import MenuIcon from './MenuIcon.svelte'

  export let sticky = false
  export let constrained = false
  export let version = false
  export let collapsible = false
  export let horizontal = false
</script>

<!-- MARKUP -->
<header class:sticky>
  <section class:constrained>
    <Brand showVersion={version} />

    <div class="menu" class:open={true}>
      {#if collapsible}
        <MenuIcon bind:open={$headerIsOpen} />
      {/if}

      <Menu horizontal={horizontal} open={$headerIsOpen || !collapsible}>
        <slot />
      </Menu>
    </div>
  </section>
</header>

<!-- STYLES -->
<style lang="scss">
  header {
    padding: 0.3em 1em 0.5em;
    background-color: var(--header-color);
    z-index: 1;
    display: flex;
    justify-content: center;
    backdrop-filter: blur(0.2em);
  }

  section {
    flex: 1;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    column-gap: 2em;

    &.constrained {
      max-width: var(--max-page-width);
    }
  }

  div.menu {
    flex: 1;
    padding: 0.8em 0;

    &.open {
      @media (max-width: 400px) {
        flex: 1 100%;
        padding-top: 0;
      }
    }
  }

  .menu:global(:not(:has(a))) {
    display: none;
  }

  .sticky {
    border-bottom: 1px solid var(--foreground-50);
    box-shadow: 0 0 1em rgba(0,0,0,0.2);
    top: 0;
    position: sticky;
  }
</style>
