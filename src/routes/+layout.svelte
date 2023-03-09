<script>
  import { navlink } from 'svelte-navlink-action'
  import Footer from '~/layout/Footer.svelte'
  import Nav from '~/layout/Nav.svelte'
  import Page from '~/layout/Page.svelte'
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
  <link rel="preconnect" href="https://api.itty.cards" crossorigin>
  <title>itty.industries</title>
  <meta name="description" content="Official site of itty.industries, home of itty open-source projects on NPM." />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <html lang="en" />
</svelte:head>


<main>
  <ForkMe user="kwhitley" repo="itty.industries" />

  <Nav version horizontal constrained>
    <!-- <a href="/" use:navlink={{ exact: true }}>Home</a>
    <a href="/about" use:navlink={{ exact: true }}>About</a> -->
  </Nav>

  <section class:constrained>
    <Page>
      <slot />
    </Page>
  </section>

  <Footer constrained={constrained}>
    <div class="split">
      &copy; {year} Kevin R. Whitley. All rights reserved.

      <div class="social">
        <a href="https://twitter.com/kevinrwhitley">
          <Twitter />
        </a>

        <a href="https://github.com/kwhitley">
          <GitHub />
        </a>
      </div>
    </div>



  </Footer>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-flow: column;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    position: relative;

    section {
      flex: 1;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
    }
  }

  .split {
    justify-content: space-between;
    align-items: center;
  }

  .social {
    flex: 0 5em;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 1em;

    > * {
      color: var(--foreground-50);
      display: block;
      height: 2em;
      width: 2em;
      transition: all 0.2s ease;

      &:hover {
        color: var(--foreground-color);
      }
    }
  }
</style>
