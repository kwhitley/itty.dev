<script>
  import { navlink } from 'svelte-navlink-action'
  import { page } from '$app/stores'
  import Brand from './Brand.svelte'
  import { slide } from 'svelte/transition'

  export let siteNavigation = {}
</script>

<!-- MARKUP -->

<a name="navigation">.</a>

<div class="side-navigation">
  {#each siteNavigation as branch}
    <ul class:expanded={$page.url.pathname.indexOf(branch.fullPath) === 0}>
      <li
        class="header"
        class:active={$page.url.pathname.indexOf(branch.fullPath) === 0}
      >
        <a href={branch.fullPath}>
          {branch.name}
        </a>

        {#if branch.description}
        <small class="description">{branch.description}</small>
        {/if}
      </li>

      {#if $page.url.pathname.indexOf(branch.fullPath) === 0}
        {#each branch.children as child}
          <li transition:slide class={child.children ? 'gap subheading' : ''}>
            <a href={`${child.fullPath}`} use:navlink>
              {child.name}
            </a>

            {#if child.children}
              <ul>
                {#each child.children as grandChild}
                  <li>
                    <a href={grandChild.fullPath} class:activeHash={($page.url.pathname + $page.url.hash).indexOf(grandChild.fullPath) === 0}>
                      {grandChild.name}
                    </a>
                  </li>
                {/each}
              </ul>
            {/if}
          </li>
        {/each}
      {/if}
    </ul>
  {/each}
</div>

<!-- STYLES -->
<style lang="scss">
  li {
    font-size: 0.95em;
  }

  .active, .activeHash {
    color: var(--accent-color) !important;
  }

  .expanded {
    background-color: var(--foreground-10);
  }

  .side-navigation {
    background-color: var(--foreground-5);
    letter-spacing: -0.01em;
    position: relative;
    border-right: 1px solid var(--foreground-75);
    padding-bottom: 3rem;
    min-height: 100%;
    overflow: hidden;

    ul {
      margin: 0 0 1rem 1rem;
    }

    > ul {
      margin: 0 0 2rem 0;
      margin: 0;
      padding: 1.2rem 2rem;
    }

    ul ul:last-child {
      margin-bottom: 0;
    }

    li {
      list-style-type: none;
      margin-bottom: 0;
    }
  }

  .header {
    font-weight: 400;
    font-size: 1.3rem;

    a {
      color: var(--foreground-color);
    }
  }
</style>
