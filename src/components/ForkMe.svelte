<script>
  export let user = ''
  export let repo = ''
  export let sticky = false

  $: repolink = user ? `${user}/${repo}` : repo
</script>

<!-- MARKUP -->
<a
  class="fork"
  class:sticky
  href={`https://github.com/${repolink}`}
  >
  Fork me on GitHub
</a>

<!-- STYLES -->
<style lang="scss">
  .fork {
    --shift: 5.3em;
    z-index: 100;
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--foreground-color);
    color: var(--background-color);
    padding: 0.22rem 1.4rem;
    margin: 1px 0;
    font-size: 0.55rem;
    letter-spacing: 0.01em;
    transform-origin: 100% 100%;
    transform: rotate(45deg) translate(var(--shift), var(--shift));
    box-shadow: 0 0 1.3em rgba(0,0,0,0.3);

    &.sticky {
      position: fixed;
    }

    &:before, &:after {
      content: '';
      position: absolute;
      top: 1px;
      left: 0;
      right: 0;
      bottom: 0;
      border-top: 1px dotted var(--background-50);
    }

    &:after {
      top: auto;
      bottom: 1px;
    }

    &:hover {
      border-color: var(--accent-color);
      background-color: rgba(var(--accent-hue), 1);
      text-decoration: none;
    }
  }
</style>
