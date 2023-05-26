<script lang="ts">
  import { page } from '$app/stores'
  import SvelteSEO from 'svelte-seo'
  export let site = 'Itty'
  export let title
  export let subtitle
  export let description
  export let delimiter = ' : '

  $: breadcrumbs = [subtitle, title, site].filter(v => v).join(delimiter)
</script>

<!-- MARKUP -->
<SvelteSEO
  title={breadcrumbs}
  {description}
  canonical={$page.url}
  openGraph={{
    url: $page.url,
    title: breadcrumbs,
    description,
    // images: [
    //   {
    //     url: 'https://www.example.ie/og-image-01.jpg',
    //     width: 800,
    //     height: 600,
    //     alt: 'Og Image Alt'
    //   },
    //   {
    //     url: 'https://www.example.ie/og-image-02.jpg',
    //     width: 900,
    //     height: 800,
    //     alt: 'Og Image Alt Second'
    //   },
    //   { url: 'https://www.example.ie/og-image-03.jpg' },
    //   { url: 'https://www.example.ie/og-image-04.jpg' }
    // ],
    site_name: site
  }}
/>
