<script>
  import { VERSION } from '~/constants'
	import Skyline from '../components/icons/Skyline.svelte'

  export let showVersion = false
</script>

<!-- MARKUP -->
<div class="brand">
  <a href="/">
    <slot>
      itty<small>.dev</small>
    </slot>
  </a>

  {#if showVersion}
    <div class="version">
      v{VERSION}
    </div>
  {/if}
</div>

<!-- STYLES -->
<style lang="scss">
  .brand {
    align-self: center;
    padding: 0.15rem 0;
    position: relative;
    line-height: 0.5em;
    margin-top: 0.5em;
    white-space: nowrap;
  }

  .version {
    font-size: 0.75rem;
    opacity: 0.7;
    align-self: center;
    margin-top: var(--version-offset);
    margin-bottom: calc(-1 * var(--version-offset));
    display: inline-block;

    &:hover {
      opacity: 1;
    }
  }

  a {
    font-size: var(--brand-size);
    letter-spacing: -0.1em;
    transition: color 0.2s ease;
    display: inline-block;
    transform-origin: 0% 50%;
    color: var(--brand-color);

    &:hover {
      color: var(--accent-color);
    }
  }

  small {
    font-size: 0.7em;
    font-size: 1em;
    font-style: normal;
    letter-spacing: -0.05em;
    color: var(--foreground-color);
  }

  .logo {
    display: block;
    margin-bottom: -0.3em;
  }
</style>
