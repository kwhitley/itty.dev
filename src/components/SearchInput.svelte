<script>
  import { createEventDispatcher } from 'svelte'
  export let value
  export let label
  export let placeholder = 'search'
  export let clearOnSubmit = false

  const dispatch = createEventDispatcher()

  const submitHandler = e => {
    e.preventDefault()
    dispatch('submit', value)

    if (clearOnSubmit) {
      value = ''
    }
  }
</script>

<!-- MARKUP -->
<form on:submit={submitHandler}>
  <input
    type="text"
    class="search"
    placeholder={placeholder}
    bind:value
    />

    <button type="submit">Go</button>
</form>

<!-- STYLES -->
<style lang="scss">
  :root {
    --search-button-inset: 0.5rem;
    --search-button-padding: 0.9em;
  }

  form {
    margin-bottom: 1em;
    position: relative;

    input {
      font-size: 1.6rem;
      padding: 0.4em 0.6em;
      font-weight: 100;
    }

    button {
      position: absolute;
      right: var(--search-button-inset);
      top: var(--search-button-inset);
      bottom: var(--search-button-inset);
      width: auto;
      padding: 0 var(--search-button-padding);
      border-radius: calc(0.5 * var(--border-radius));
    }
  }
</style>
