<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Form from "./Form.svelte";

  export let title = "Section Title";
  export let description = "Section Description";
  export let id = 0;

  export let fields: TGeneralField[] | any[] = [];

  const dispatch = createEventDispatcher();

  const onAction = (type, e) => {
    dispatch(type, { ...e.detail, "section-id": id });
  };
  const onSectionAction = (type) => {
    dispatch("section-act", { type, "section-id": id });
  };
  const onEdit = () => onSectionAction("edit");
  const onDelete = () => onSectionAction("delete");
</script>

<div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1 flex space-x-1">
      <div>
        <div class="btn hover:text-blue-600" on:click={onEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div class="btn hover:text-red-600" on:click={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
      <div class="">
        <h3 class="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <p class="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
    <Form
      {fields}
      on:add={(e) => onAction("add", e)}
      on:submit
      on:action={(e) => onAction("action", e)}
    />
  </div>
</div>

<style lang="postcss">
  .btn {
    @apply cursor-pointer;
  }
</style>
