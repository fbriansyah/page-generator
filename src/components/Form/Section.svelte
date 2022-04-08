<script lang="ts">

  import Form from "./Form.svelte";

  export let title = "Section Title";
  export let description = "Section Description";

  export let fields: TGeneralField[] = [];
</script>

<div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <h3 class="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      <p class="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </div>
    <Form {fields} on:change on:submit />
  </div>
</div>
