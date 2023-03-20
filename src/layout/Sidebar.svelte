<script>
  import { navlink } from 'svelte-navlink-action'
  import Brand from './Brand.svelte'

  export let siteNavigation = {}

  const slugify = (name) => name.toLowerCase().replace(/\s+/g, '-')
</script>

<!-- MARKUP -->
<div class="side-navigation">
  {#each siteNavigation as branch}
    {@const basePath = '/' + (branch.path || slugify(branch.name))}
    <ul>
      <li class="header">
        <a use:navlink={{ exact: true }} href={basePath}>
          {branch.name}
        </a>

        {#if branch.description}
        <small class="description">{branch.description}</small>
        {/if}
      </li>

      {#each branch.children as child}
        {@const childPath = (child.path || slugify(child.name))}
        <li class={child.children ? 'gap subheading' : ''}>
          <a use:navlink href={`${basePath}/${childPath}`}>
            {child.name}
          </a>

          {#if child.children}
            <ul>
              {#each child.children as grandChild}
                <li>
                  <a use:navlink href={`${basePath}/${childPath}#${grandChild.path || grandChild.name}`}>
                    {grandChild.name}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  {/each}
</div>

<!-- STYLES -->
<style lang="scss">
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

  ul:has(a.active) {
    background-color: var(--foreground-10);
  }

  .header {
    font-weight: 400;
    font-size: 1.3rem;

    a:not(.active) {
      color: var(--foreground-color);
    }
  }

  :global(.header a.active) {
    color: var(--accent-color);
  }

  a {
    color: var(--foreground-75);
    font-weight: 400;
  }

  :global(ul:has(a.active) .description) {
    margin-bottom: 1rem;
  }

  li.header ~ li {
    transition: all 0.4s ease;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
  }

  li.header ~ li ul {
    transition: all 0.4s ease;
    max-height: 0;
    overflow: hidden;
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

  :global(.side-navigation a.active) {
    color: var(--accent-color);
  }

  :global(.side-navigation > ul:has(a.active) li.header ~ li) {
    max-height: 2em;
    opacity: 1;
  }

  :global(.side-navigation > ul:has(a.active) > li.header ~ li:has(ul)) {
    max-height: 30em;
  }

  :global(.side-navigation > ul:has(a.active) > li.header ~ li ul) {
    max-height: 30em;
  }


  ul:has(.active) .gap {
    margin-top: 1rem;
  }

  .subheading > a {
    font-size: 1.2rem;
  }

  .description {
    line-height: 1.2;
    display: block;
    font-size: 0.6em;
    font-weight: 300;
    color: var(--foreground-75);
    white-space: pre-wrap;
  }
</style>
