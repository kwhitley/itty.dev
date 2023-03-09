<script>
  export let max = 5
  export let value = 3.3
  export let inline = false
</script>

<!-- MARKUP -->
<span
  class="rating text-gradient"
  class:inline
  style={`background-size: ${value/max*100}%;`}
  >
  {#each Array(max).fill('★') as item}
    {item}
  {/each}
</span>

<!-- STYLES -->
<style lang="scss">

  .rating {
    letter-spacing: var(--rating-gap);
    background-color: var(--foreground-25);
    background-image: linear-gradient(var(--rating-color), var(--rating-color));
    background-repeat: no-repeat;

    &:not(.inline) {
      display: block;
    }
  }
</style>
