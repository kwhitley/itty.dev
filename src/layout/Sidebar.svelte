<script>
  import { navlink } from 'svelte-navlink-action'
</script>

<!-- MARKUP -->
<div class="side-navigation">
  <ul>
    <li class="header">Section 1</li>
    <li><a use:navlink href="/">Home</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
  </ul>

  <ul>
    <li class="header">Section 2</li>
    <li><a use:navlink href="/">Home</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
    <li><a use:navlink href="/getting-started">Getting Started</a></li>
  </ul>
</div>

<!-- STYLES -->
<style lang="scss">
  .side-navigation {
    background-color: #eee;
    height: 100%;
    padding: 1.5rem;
    min-width: 12rem;

    ul {
      margin: 0 0 2rem 0;
    }

    li {
      list-style-type: none;
      margin-bottom: 0.1rem;
    }
  }

  .header {
    font-weight: 400;
    font-size: 1.2rem;
  }

  a {
    color: var(--foreground-75);
    font-weight: 400;
  }
</style>
