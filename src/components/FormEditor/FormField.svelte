<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getKindString } from "../../utils/form";

  export let kind: TFormKind | "add" | "col" = "ti";
  export let name = null;
  export let type = "text";
  export let label = null;
  export let placeholder = null;
  export let options = null;
  export let child = null;

  export let groupid: string = null;
  export let id = 0;

  const dispatch = createEventDispatcher();

  const onClick = (action) => {
    dispatch("action", {
      action,
      groupid,
      id,
      setting: { kind, name, type, label, placeholder, options, child },
    });
  };
</script>

{#if kind === "add"}
  <div
    on:click={() => onClick("add")}
    {type}
    {name}
    id={name}
    class="block w-full shadow-sm sm:text-sm border-green-600 cursor-pointer rounded-md text-center text-green-700"
  >
    + ADD +
  </div>
{:else if kind === "col"}
  <div
    on:click={() => onClick("change")}
    class="sm:text-sm bg-blue-500 hover:bg-blue-400 col"
  >
    Change
  </div>
{:else}
  <div
    on:click={() => onClick("change")}
    class="sm:text-sm bg-teal-500 hover:bg-teal-400 col"
  >
    {getKindString(kind)} | {label}
  </div>
{/if}

<style lang="postcss">
  .col {
    @apply h-6 w-full shadow-sm text-white cursor-pointer rounded-md inline-flex justify-center items-center;
  }
</style>
