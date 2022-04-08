<script lang="ts">
  import { formFields } from "../../data";
  // import type { TGeneralField } from "../../interfaces";

  import FormField from "./Fields/FormField.svelte";
  import InputControl from "./InputControl.svelte";

  export let fields: any[] | TGeneralField[] = [...formFields];
  export let state = {}

</script>

<div class="mt-5 md:mt-0 md:col-span-2">
  <form on:submit>
    <div class="grid grid-cols-6 gap-4">
      {#each fields as field}
        {#if field.kind === "gp"}
          {#each field.child as child}
            <InputControl kind={field.type}>
              <FormField {...child} on:change value={state[child.name]} />
            </InputControl>
          {/each}
        {:else}
          <InputControl kind="single">
            <FormField {...field} on:change value={state[field.name]} />
          </InputControl>
        {/if}
      {/each}
    </div>
  </form>
</div>
