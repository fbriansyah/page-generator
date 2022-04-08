<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let title = "Page Title";
  const dispatch = createEventDispatcher();

  const onClick = (action) => {
    dispatch("action", action);
  };
</script>

<div class="md:flex md:items-center md:justify-between">
  <div class="flex-1 min-w-0">
    <h2
      class="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl sm:truncate"
    >
      {title}
    </h2>
  </div>
  <div class="mt-4 flex md:mt-0 md:ml-4">
    <button
      type="button"
      on:click={() => onClick("cancel")}
      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Render
    </button>
    <button
      type="button"
      on:click={() => onClick("save")}
      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
    >
      Save
    </button>
  </div>
</div>
