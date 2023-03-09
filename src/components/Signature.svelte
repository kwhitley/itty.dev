<script>
  import GitHub from './icons/GitHub.svelte'
  import Twitter from './icons/Twitter.svelte'
</script>

<!-- MARKUP -->
<section>
  <GitHub />
  <Twitter />

  <a href="http://twitter.com/kevinrwhitley" target="_blank" title="@kevinrwhitley on Twitter">
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="220" viewBox="0 0 260 220">
      <title>@kevinrwhitley on Twitter</title>
      <path fill="#55acee" d="M5 187c100 62 227-7 225-130 10-7 19-16 26-27-10 5-20 8-31 9 11.4-7 20-17 24-29-10 6-20 10-33 13-43-41.3-100 3-88 47-43-2-80-23-106-54C10 40 15 71 39 85 30 84 20 82 15 78c0 26 18 46 41 51-8 2-15 3-23 1 6 20 26 36 48 36-20 16-47 24-76 21z"/>
    </svg>
    kevinrwhitley
  </a>

  of

  <a href="http://twitter.com/ittyindustries" target="_blank" title="@ittyindustries on Twitter">
    <svg xmlns="http://www.w3.org/2000/svg" width="260" height="220" viewBox="0 0 260 220">
      <title>@ittyindustries on Twitter</title>
      <path fill="#55acee" d="M5 187c100 62 227-7 225-130 10-7 19-16 26-27-10 5-20 8-31 9 11.4-7 20-17 24-29-10 6-20 10-33 13-43-41.3-100 3-88 47-43-2-80-23-106-54C10 40 15 71 39 85 30 84 20 82 15 78c0 26 18 46 41 51-8 2-15 3-23 1 6 20 26 36 48 36-20 16-47 24-76 21z"/>
    </svg>
    ittyindustries
  </a>

  and

  <a href="http://retheme.org" target="_blank" title="Retheme.org - a window to a better internet">
    Retheme.org
  </a>
</section>

<!-- STYLES -->
<style lang="scss">
  section {
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    align-items: center;
    color: red;
  }

  a {
    // text-decoration: none;
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    align-items: center;
    padding: 0 0.35em;

    &:first-child {
      padding-left: 0;
    }

    // &:hover {
    //   text-decoration: underline;
    // }
  }

  svg {
    max-height: 1.2rem;
    max-width: 1rem;
    margin-right: 0.5em;
  }
</style>
