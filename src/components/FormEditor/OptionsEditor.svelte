<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import InputControl from "../Form/InputControl.svelte";

  export let options: TOption[] = [{label:"", value: ""}]

  const dispatch = createEventDispatcher();

  function onAdd() {
    dispatch('add')
  }

  function onOptionChange(i: number, e:any) {
    const {value, name} = e.target;
    dispatch('change', {index: i, name, value})
  }
</script>

<div class="mt-2">
  <span>Options</span>
  <div class="mt-1">
    {#if options}
      {#each options as option, i (`opt${i}`)}
        <div class="flex items-center justify-center">
          <div class="flex-1 grid grid-cols-6 gap-6 mr-auto">
            <InputControl kind="double">
              <input name="value" on:input="{(e) => onOptionChange(i,e)}" placeholder="Value" value="{option.value}" />
            </InputControl>
            <InputControl kind="double">
              <input name="label" on:input="{(e) => onOptionChange(i,e)}" placeholder="Label" value="{option.label}" />
            </InputControl>
          </div>
          <svg on:click="{() => dispatch('del', i)}" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      {/each}
    {/if}
  </div>
  <div
    on:click={onAdd}
    class="w-full bg-white py-1 mt-1 shadow-sm sm:text-sm border-2 border-green-600 cursor-pointer rounded-md text-center text-green-700"
  >
    + Add Options +
  </div>
</div>

<style lang="postcss">
  input {
    @apply my-1 py-1 px-2 block w-full shadow-sm text-sm border border-gray-300 rounded-md;
  }
  svg {
    @apply cursor-pointer;
  }
</style>