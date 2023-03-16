<script>
  import GitHub from '~/components/icons/GitHub.svelte'
  import { page } from '$app/stores'

  $: editPath = `https://github.com/kwhitley/itty.dev/blob/main/src/routes${$page.url.pathname}/+page.md`
</script>

<!-- MARKUP -->
<a class="edit" href={editPath} target="_blank">
  <i><GitHub /></i>
  edit this page
</a>

<!-- !STYLES -->
<style lang="scss">
  a {
    color: var(--accent-color);
    font-size: 0.9rem;
    display: block;
    float: right;
    position: fixed;
    right: -1px;
    top: -1px;
    background-color: var(--background-color);
    box-shadow: 0 0 0.5em rgba(0,0,0,0.2);
    border-bottom-left-radius: var(--border-radius);
    border: 1px solid var(--foreground-25);
    padding: 0.5rem 1.2rem 0.6rem;

    @media (max-width: 700px) {
      position: relative;
      border: none;
      box-shadow: none;
      font-size: 0.85rem;
    }
  }

  i {
    --icon-size: 1.2em;
    display: inline-block;
    vertical-align: baseline;
    height: var(--icon-size);
    width: var(--icon-size);
    position: relative;
    bottom: -3px;
    margin-right: 0.2rem;
  }
</style>
