<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import InputControl from "../Form/InputControl.svelte";

  export let headers = [{ label: "", type: "" }];
  const options = [
    { label: "Normal", value: "-" },
    { label: "Bold", value: "b" },
    { label: "Number", value: "n" },
  ];

  const dispatch = createEventDispatcher();

  function onAdd() {
    dispatch("add");
  }

  function onOptionChange(i: number, e: any) {
    const { value, name } = e.target;
    dispatch("change", { index: i, name, value });
  }

</script>

<div class="mt-2">
  <span>Headers</span>
  <div class="mt-1">
    {#if headers}
      {#each headers as head, i (`opt${i}`)}
        <div class="flex items-center justify-center">
          <div class="flex-1 grid grid-cols-6 gap-6 mr-auto">
            <InputControl kind="double">
              <div class="py-1 flex items-center justify-center h-full">
                <input
                  class="input"
                  name="label"
                  on:input={(e) => onOptionChange(i, e)}
                  placeholder="Label"
                  value={head.label}
                />
              </div>
            </InputControl>
            <InputControl kind="double">
              <!-- <div class="themed">
                <Select
                  items={options}
                  on:select={(e) => select2Handler(i, e)}
                />
              </div> -->
              <select
                on:change={(e) => onOptionChange(i, e)}
                id="type"
                name="type"
                value={head.type}
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">-Pilih Salah Satu-</option>
                {#each options as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </InputControl>
          </div>
          <svg
            on:click={() => dispatch("del", i)}
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-400 hover:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      {/each}
    {/if}
  </div>
  <div
    on:click={onAdd}
    class="w-full bg-white py-1 mt-1 shadow-sm sm:text-sm border-2 border-green-600 cursor-pointer rounded-md text-center text-green-700"
  >
    + Add Header +
  </div>
</div>

<style lang="postcss">
  .input {
    @apply py-1 px-2 block h-full w-full shadow-sm text-sm border border-gray-300 rounded-md;
  }
  svg {
    @apply cursor-pointer;
  }
</style>
