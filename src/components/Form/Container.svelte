<script lang="ts">
  import { onMount } from "svelte";
  import { editorPageSetting } from "../../store/editor";
  import { sectionsStore } from "../../store/sections";

  import FormTitle from "./FormTitle.svelte";
  import Section from "./Section.svelte";

  let state = {};

  onMount(() => {
    if (localStorage) {
      // const _sectionsString = localStorage.getItem("sections");
      // const _sections = JSON.parse(_sectionsString);
      // if (_sections) {
      //   sections = _sections;
      // }
      sectionsStore.getFromLocal();
    }
  });

  let sections = [];

  const changeHandler = (e) => {
    let { name, value } = e.detail;
    state = { ...state, [name]: value };
  };

  const onSubmit = () => {
    console.log(state);
  };

  const actionHandler = (e) => {
    switch (e.detail) {
      case "cancel":
        editorPageSetting.editing();
        break;
      case "submit":
        onSubmit();
        break;
      default:
        console.log(e.detail);
        break;
    }
  };
</script>

<div class="space-y-6">
  <FormTitle title="Design Form" on:action={actionHandler} />
  {#each $sectionsStore as section (section.title)}
    <Section {...section} on:change={changeHandler} />
  {/each}

  {#if $sectionsStore.length > 0}
  <div class="flex justify-end">
    <button
      type="button"
      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      type="button"
      on:click={onSubmit}
      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
    >
      Save
    </button>
  </div>
  {/if}
</div>
