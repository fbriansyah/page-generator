<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let isShow = false;
  export let title = "Modal Title";

  const dispatch = createEventDispatcher();
</script>

{#if isShow}
  <div
    transition:fade={{ duration: 200 }}
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        on:click={() => dispatch("close")}
        aria-hidden="true"
      />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
      >
        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            on:click={() => dispatch("close")}
            class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">Close</span>
            <!-- Heroicon name: outline/x -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              {title}
            </h3>
            <div class="mt-2">
              <slot />
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            on:click={() => dispatch("save")}
            class="btn border-transparent bg-green-600 btn--text text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
          <button
            type="button"
            on:click={() => dispatch("close")}
            class="mt-3 btn border-gray-300 bg-white btn--text text-gray-700 hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  .btn {
    @apply w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2;
  }
  .btn--text {
    @apply text-base font-medium;
  }
</style>