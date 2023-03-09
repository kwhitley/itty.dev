<script>
  import { onMount } from 'svelte'
  export let open = false

  const toggle = () => open = !open
  let loaded = false

  onMount(() => {
    setTimeout(() => {
      loaded = true
    }, 0)
  })
</script>

<!-- MARKUP -->
<section class:open class:loaded on:click={toggle}>
  <div class="top"></div>
  <div class="middle"></div>
  <div class="bottom"></div>
</section>

<!-- STYLES -->
<style lang="scss">
  section {
    --transform-time: 0;
    --bar-thickness: 3px;
    --bar-gap: 5px;
    flex: 1;
    --icon-color: var(--foreground-color);
    cursor: pointer;
    transition: all var(--transform-time) ease;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    position: relative;
    padding: 1rem 0;

    &.loaded {
      --transform-time: 0.2s;
    }

    &.open {
      .top, .middle {
        width: 80%;
      }

      .top {
        transform: rotate(45deg);
      }

      .middle {
        transform: rotate(-45deg) translate(20%, calc(-250% + var(--bar-thickness) * 0.5));
      }

      .bottom {
        max-width: 100%;
        background-color: var(--foreground-25);
        margin-top: 0.5em;
      }
    }

    &:hover {
      --icon-color: var(--accent-color);
    }
  }

  div {
    height: var(--bar-thickness);
    background-color: var(--icon-color);
    margin-bottom: var(--bar-gap);
    border-radius: 1em;
    width: 100%;
    max-width: 2em;
    transition: all var(--transform-time) ease;
  }

  .bottom {
    margin-bottom: 0;
  }
</style>
