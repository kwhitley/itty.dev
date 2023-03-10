<script>
  import { navlink } from 'svelte-navlink-action'
</script>

<!-- MARKUP -->
<div class="side-navigation">
  <ul>
    <li class="header"><a use:navlink={{ exact: true }} href="/itty-router">itty-router</a></li>
    <li><a use:navlink href="/itty-router/getting-started">getting started</a></li>
    <li><a use:navlink href="/itty-router/responses">Responses</a></li>
    <li><a use:navlink href="/itty-router/middleware">middleware</a></li>
    <li><a use:navlink href="/itty-router/getting-started">nesting</a></li>
    <li><a use:navlink href="/itty-router/getting-started">types</a></li>
    <li><a use:navlink href="/itty-router/errors">error handling</a></li>
    <li><a use:navlink href="/itty-router/getting-started">custom regex</a></li>
    <li><a use:navlink href="/itty-router/cors">CORS</a></li>

    <li class="gap subheading"><a use:navlink={{ exact: true }} href="/itty-router/api">API</a>
      <ul>
        <li><a use:navlink href="/itty-router/api#createCors">createCors</a></li>
        <li><a use:navlink href="/itty-router/api#createResponse">createResponse</a></li>
        <li><a use:navlink href="/itty-router/api#error">error</a></li>
        <li><a use:navlink href="/itty-router/api#html">html</a></li>
        <li><a use:navlink href="/itty-router/api#jpeg">jpeg</a></li>
        <li><a use:navlink href="/itty-router/api#json">json</a></li>
        <li><a use:navlink href="/itty-router/api#png">png</a></li>
        <li><a use:navlink href="/itty-router/api#Router">Router</a></li>
        <li><a use:navlink href="/itty-router/api#StatusError">StatusError</a></li>
        <li><a use:navlink href="/itty-router/api#text">text</a></li>
        <li><a use:navlink href="/itty-router/api#webp">webp</a></li>
        <li><a use:navlink href="/itty-router/api#withContent">withContent</a></li>
        <li><a use:navlink href="/itty-router/api#withCookies">withCookies</a></li>
        <li><a use:navlink href="/itty-router/api#withParams">withParams</a></li>
      </ul>

    </li>
  </ul>

  <ul>
    <li class="header"><a use:navlink={{ exact: true }} href="/itty-fetcher">itty-fetcher</a></li>
  </ul>

  <ul>
    <li class="header"><a use:navlink={{ exact: true }} href="/itty-time">itty-time</a></li>
  </ul>

  <ul>
    <li class="header"><a use:navlink={{ exact: true }} href="/itty-durable">itty-durable</a></li>
  </ul>
</div>

<!-- STYLES -->
<style lang="scss">
  .side-navigation {
    background-color: var(--foreground-5);
    // height: 100%;
    // padding: 1.5rem;
    min-width: 12rem;
    letter-spacing: -0.01em;
    position: relative;
    // overflow: hidden;
    border-right: 1px solid var(--foreground-75);
    padding-bottom: 3rem;
    min-height: 100%;

    ul {
      margin: 0 0 1rem 1rem;
    }

    > ul {
      margin: 0 0 2rem 0;
      padding: 2rem;
    }

    li {
      list-style-type: none;
      margin-bottom: 0;
    }
  }

  ul:has(a.active) {
    background-color: var(--foreground-10);
  }

  .header {
    font-weight: 400;
    font-size: 1.3rem;

    a {
      color: var(--foreground-color);
    }
  }

  a {
    color: var(--foreground-75);
    font-weight: 400;
  }

  :global(.side-navigation a.active) {
    color: var(--accent-color);
  }

  :global(.side-navigation a.active:after) {
    content: '';
    display: block;
    background-color: var(--accent-color);
    height: 1rem;
    width: 1rem;
    transform: rotate(45deg);
    position: absolute;
    right: -0.8rem;
    margin-top: -1.5em;
    border: 1px solid var(--foreground-color);
    z-index: 1;
  }

  .gap {
    margin-top: 1rem;
  }

  .subheading > a {
    color: var(--foreground-color);
  }
</style>
