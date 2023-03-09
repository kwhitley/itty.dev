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

  <div class="content">
    <Page>
      <slot />
    </Page>
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-flow: row wrap;
    height: 100vh;
    overflow: hidden;
    outline: 5px solid red;
  }

  .nav {
    flex: 1 100%;
    position: sticky;
    top: 0;
    overflow: auto;
  }

  .content {
    flex: 1;
    overflow: auto;
    height: 100%;
    padding-bottom: 5rem;
  }
</style>
