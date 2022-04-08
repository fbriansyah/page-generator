<script lang="ts">
  import FormEditor from "../FormEditor/Form.svelte";
  import Form from "../Form/Form.svelte";

  export let fields = [];
  export let mode: "render" | "edit" = "render";
</script>

{#if mode === 'render'}
  <div>
    <Form {fields} on:change on:submit />
    <div class="mt-6 flex">
      <button
        type="button"
        class="order-1 ml-3 bt border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
        >Reset</button
      >
      <button
        type="button"
        class="order-0 bt border-transparent text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
        >Filter</button
      >
    </div>
  </div>
{:else}
  <FormEditor {fields} on:action on:add on:submit />
{/if}

<style lang="postcss">
  .bt {
    @apply inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md;
  }
</style>
