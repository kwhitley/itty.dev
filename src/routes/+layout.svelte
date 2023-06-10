<script>
  import { page } from '$app/stores'
  import EditLink from '~/components/EditLink.svelte'
  import Brand from '~/layout/Brand.svelte'
  import Footer from '~/layout/Footer.svelte'
  import Page from '~/layout/Page.svelte'
  import Sidebar from '~/layout/Sidebar.svelte'
  import MenuLink from '~/layout/MenuLink.svelte'
  import { navigation } from '~/navigation'
  import '~/styles/app.scss'
	import NPM from '../components/icons/NPM.svelte'
	import GitHub from '../components/icons/GitHub.svelte'

  $: base = $page.url.pathname.split('/')[1]
  $: onBranch = navigation.find(b => b.name === base)

  // DEFINES IF THE PAGE IS WIDTH-CONSTRAINED
  let constrained = true
  let year = new Date().getFullYear()
</script>

<svelte:head>
  <link rel="icon" type="image/svg" href="/favicon.png">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
</svelte:head>

<main id="layout">
  <div class="header">
    <div class="split">
      <section>
        <Brand showVersion />
        <h3>Official documentation of the itty ecosystem.</h3>
      </section>
      <section class="right menu-link">
        <MenuLink />
      </section>
    </div>

  </div>

  <div class="navigation">
    <Sidebar siteNavigation={navigation} />
  </div>

  <div id="content">
    <EditLink />
    <Page>
      {#if onBranch}
        <h1>
          <span>{@html onBranch.name.replace('itty', '<span class="accent">itty</span>')}</span>

          <section>
            <a
              class="npm"
              rel="noreferrer"
              target="_blank"
              href={`https://www.npmjs.com/package/${onBranch.name}`}>
              <NPM />
            </a>
            <a
              class="github"
              rel="noreferrer"
              target="_blank"
              href={`https://github.com/kwhitley/${onBranch.name}`}>
              <GitHub />
            </a>
          </section>
        </h1>
      {/if}

      <slot />

      <Footer />
    </Page>
  </div>
</main>

<style lang="scss">
  main {
    display: grid;
    flex-flow: row wrap;
    overflow: hidden;
    grid-template-areas:
      "header content"
      "navigation content";
    grid-template-rows: 1fr 10fr;
    grid-template-columns: 1fr 5fr;
    height: 100%;
  }

  .menu-link {
    display: none;
  }

  .navigation {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    grid-area: navigation;
    min-width: 14rem;
  }

  #content {
    flex: 1;
    overflow: auto;
    height: 100%;
    grid-area: content;
    background-color: var(--background-color);
    position: relative;
  }

  .header {
    padding: 1.5rem 2rem;
    background-color: var(--foreground-5);
    box-shadow: 0 0 1em rgba(0,0,0,0.2);
    border-bottom: 1px solid var(--foreground-75);
    border-right: 1px solid var(--foreground-75);
    min-width: 13rem;
    z-index: 1;
    display: flex;

    h3 {
      margin: 0;
      font-size: 0.9em;
      line-height: 1.2;
    }
  }

  @media (max-width: 700px) {
    main {
      grid-template-areas:
        "header"
        "content"
        "navigation";
      grid-template-rows: 1fr auto 1fr;
      grid-template-columns: 1fr;
      overflow-y: scroll;
    }

    #content {
      overflow: visible;
      max-width: 100vw;
      scroll-margin-top: var(--sticky-top);
    }

    .header {
      border-right: none;
      position: sticky;
      top: 0;
      background-color: var(--background-color);
      z-index: 10;
      box-shadow: 0 0 1.5em rgba(0,0,0,0.5);
    }

    .menu-link {
      display: block;
    }

    .navigation {
      overflow: visible;
    }

    :global(a[name]) {
      scroll-margin-top: 7.4rem;
    }
  }

  h1 {
    white-space: nowrap;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    column-gap: 0.5em;

    section {
      a {
        display: inline-block;
        height: 0.4em;
      }

      .github {
        position: relative;
      }

      .npm {
        height: 0.33em;
      }
    }
  }

  .github {
    color: var(--foreground-90);
  }
</style>
