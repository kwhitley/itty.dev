<script>
  import { navlink } from 'svelte-navlink-action'
  import Footer from '~/layout/Footer.svelte'
  import Nav from '~/layout/Nav.svelte'
  import Page from '~/layout/Page.svelte'
  import Sidebar from '~/layout/Sidebar.svelte'
  import ForkMe from '~/components/ForkMe.svelte'
  import '~/styles/app.scss'

  import GitHub from '~/components/icons/GitHub.svelte'
  import Twitter from '~/components/icons/Twitter.svelte'

  // DEFINES IF THE PAGE IS WIDTH-CONSTRAINED
  let constrained = true
  let year = new Date().getFullYear()
</script>

<svelte:head>
  <link rel="icon" type="image/svg" href="/favicon.png">
  <title>itty.dev</title>
  <meta name="description" content="Official documentation site for the itty ecosystem." />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
</svelte:head>


<main>
  <div class="nav">
    <Nav version horizontal sticky />
  </div>

  <div class="sidebar">
    <Sidebar />
  </div>

  <div id="content">
    <Page>
      <slot />
    </Page>
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-flow: row wrap;
    overflow: hidden;
    outline: 5px solid red;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .nav {
    flex: 1 100%;
    position: sticky;
    top: 0;
    overflow: auto;
  }

  .sidebar {
    height: 100%;
    overflow-y: scroll;
  }

  #content {
    flex: 1;
    overflow: auto;
    height: 100%;
    padding-bottom: 5rem;
  }

  @media (max-width: 600px) {
    main {
      flex-flow: column;
      // display: grid;
      overflow: visible;
      position: relative;

      > * {
        flex: 0;
      }

      .nav {
        flex: 0 5rem;
      }

      .sidebar {
        height: auto;
        order: 2;
      }

      #content {
        height: auto;
        flex: 0;
        overflow: visible;
      }
    }
  }
</style>
