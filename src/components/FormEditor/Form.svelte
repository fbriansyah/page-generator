<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import FormField from "./FormField.svelte";
  import InputControl from "./InputControl.svelte";

  export let fields = [];
  // export let state = {}

  const dispatch = createEventDispatcher();

  const onAdd = () => {
    dispatch("add");
  };
</script>

<div class="my-2 md:mt-0 md:col-span-2">
  <form on:submit>
    <div class="grid grid-cols-6 gap-4">
      {#each fields as field, j}
        {#if field.kind === "gp"}
          <div
            class="col-span-6 border-2 border-teal-500 bg-white rounded-md p-2"
          >
            <div class="flex flex-row mb-1">
              <span class="inline-block mr-auto">Group [{field.id}]</span>
              <div class="flex flex-row">
                <div class="group-btn mr-1  bg-indigo-600 hover:bg-indigo-700">
                  Edit
                </div>
                <div class="group-btn bg-red-600 hover:bg-red-700">Delete</div>
              </div>
            </div>
            <div class="grid grid-cols-6 gap-6">
              {#each field.child as child, i}
                <InputControl kind={field.type}>
                  <FormField {...child} id={i} groupid={field.id} on:action />
                </InputControl>
              {/each}
            </div>
          </div>
        {:else}
        <div
            class="col-span-6 border-2 border-teal-500 bg-white rounded-md p-2"
          >
            <div class="flex flex-row mb-1">
              <span class="inline-block mr-auto">Field [{field.kind}]</span>
              <div class="flex flex-row">
                <div class="group-btn bg-red-600 hover:bg-red-700">Delete</div>
              </div>
            </div>
            <InputControl kind="single">
              <FormField {...field} id={j} on:action />
            </InputControl>
          </div>
          
        {/if}
      {/each}
      <InputControl kind="single">
        <div
          on:click={() => onAdd()}
          class="mt-1 block w-full shadow-sm sm:text-sm border-2 py-1 border-green-600 cursor-pointer rounded-md text-center text-green-700"
        >
          + ADD +
        </div>
      </InputControl>
    </div>
  </form>
</div>

<style lang="postcss">
  .group-btn {
    @apply cursor-pointer inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white;
  }
</style>
