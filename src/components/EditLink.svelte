<script>
  const getPath = () => 'https://github.com/kwhitley/itty.dev/blob/main/src/routes/itty-router/responses/+page.md'
</script>

<!-- MARKUP -->
<a href={getPath()}>edit page on GitHub</a>

<!-- !STYLES -->
<style lang="scss">
  a {
    color: var(--accent-color);
    font-size: 0.9rem;
    display: block;
    float: right;
    position: absolute;
    right: -1px;
    top: -1px;
    background-color: var(--background-color);
    box-shadow: 0 0 0.5em rgba(0,0,0,0.2);
    border-bottom-left-radius: var(--border-radius);
    border: 1px solid var(--foreground-25);
    padding: 0.6rem 1.2rem;

    @media (max-width: 500px) {
      position: relative;
      border: none;
      box-shadow: none;
      font-size: 0.85rem;
    }
  }
</style>
