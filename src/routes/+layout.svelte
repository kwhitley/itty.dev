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

  $: base = $page.url.pathname.split('/')[1]
  $: onBranch = navigation.find(b => b.name === base)

  // DEFINES IF THE PAGE IS WIDTH-CONSTRAINED
  let constrained = true
  let year = new Date().getFullYear()
</script>

<svelte:head>
  <link rel="icon" type="image/svg" href="/favicon.png">
  <title>itty.dev - Official itty documentation.</title>
  <meta name="description" content="Official documentation site for the itty ecosystem." />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
</svelte:head>

<main id="layout">
  <div class="header">
    <Brand showVersion />
    <h3>Official documentation of the itty ecosystem.</h3>

    <MenuLink />
  </div>

  <div class="navigation">
    <Sidebar siteNavigation={navigation} />
  </div>

  <div id="content">


    <EditLink />
    <Page>
      {#if onBranch}
        <h1>
          {@html onBranch.name.replace('itty', '<span class="accent">itty</span>')}
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

    h3 {
      margin: 0;
      font-size: 0.9em;
      line-height: 1.2;
    }

    @media (max-width: 700px) {
      position: sticky;
      top: 0;
      background-color: var(--background-color);
      z-index: 10;
      box-shadow: 0 0 1.5em rgba(0,0,0,0.5);
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
    }

    .header {
      border-right: none;
    }

    .navigation {
      overflow: visible;
    }
  }
</style>
