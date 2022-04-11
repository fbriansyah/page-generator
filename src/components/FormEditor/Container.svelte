<script lang="ts">
  import { editorForm, getEditor } from "../../data";

  import Form from "../Form/Form.svelte";
  import Modal from "../Modal/Modal.svelte";
  import { getFieldState } from "../../utils/form";

  import FormTitle from "./FormTitle.svelte";
  import Section from "./Section.svelte";
  import { onMount } from "svelte";
  import { editorPageSetting } from "../../store/editor";
  import { sectionsStore } from "../../store/sections";
  import OptionsEditor from "./OptionsEditor.svelte";
  import { pageModeStore } from "../../store/pageMode";

  let state = {};
  let isModalShow = false;
  let editorType = null;
  let editorMode: "add" | "change" = "add";
  let options: TOption[] = [{ label: "", value: "" }];

  let editorSetting: TEditorSetting = {};

  $: editorField = getEditor(editorType);

  onMount(() => {
    state = getFieldState(editorForm);
    sectionsStore.getFromLocal();
  });

  const onSubmit = () => {
    if (editorMode === "add") {
      if (state["kind"] === "so2") {
        state["options"] = options;
      }
      sectionsStore.addFields(editorSetting["section-id"], state);
    }
    if (editorMode === "change") {
      sectionsStore.editFields(editorSetting, state);
      editorMode = "add";
    }
    state = {};
    options = [];

    isModalShow = false;
    editorType = null;
  };

  const actionHandler = (e) => {
    switch (e.detail) {
      case "cancel":
        editorPageSetting.rendering();
        break;
      case "submit":
        break;
      case "save":
        console.log("saved in localstorage");
        sectionsStore.saveToLocal();
        break;
      default:
        console.log(e.detail);
        break;
    }
  };

  const onSectionAction = (e) => {
    state = {};
    if (e.detail.action === "change") {
      isModalShow = true;
      editorMode = "change";

      editorSetting = { ...e.detail };
      editorType = e.detail.setting.kind;
      state = e.detail.setting;
      options = [...state["options"]];
    }
  };

  const onAddField = (e) => {
    editorSetting = { ...e.detail };
    isModalShow = true;
    editorMode = "add";
    state = {};
  };

  const changeHandler = (e) => {
    let { name, value } = e.detail;
    if (name === "kind") {
      editorType = value;
    }
    state = { ...state, [name]: value };
  };

  const onClose = () => {
    isModalShow = false;
    editorType = null;
    state = {};
  };

  const sectionActionHandler = (e) => {
    const action = e.detail;

    if (action.type === "delete") {
      editorPageSetting.showEditorTitle("delete", action["section-id"]);
    } else {
      editorPageSetting.showEditorTitle("edit", action["section-id"]);

      let _section = $sectionsStore[action["section-id"]];
      state = {
        "section-title": _section.title,
        "section-description": _section.description,
      };
    }
  };

  const onSectionTitleChange = (type: "save" | "close") => {
    if (type === "save") {
      if ($editorPageSetting.editorTitle.type === "delete") {
        sectionsStore.deleteSection($editorPageSetting.editorTitle.id);
      } else if ($editorPageSetting.editorTitle.type === "edit") {
        sectionsStore.updateSection($editorPageSetting.editorTitle.id, state);
      }
    } else if (type === "close") {
      state = {};
    }
    editorPageSetting.hideEditorTitle();
  };
  const onAddSection = () => sectionsStore.addSection();

  function onOptionEditorAdd() {
    if (!options) options = [];
    options = [...options, { label: "", value: "" }];
  }

  function onOptionEditorChange(e) {
    const { value, name, index } = e.detail;

    const newOpt = { ...options[index] };
    newOpt[name] = value;

    const newOptions = [...options];
    newOptions[index] = newOpt;

    options = newOptions;
  }

  function onOptionEditorDel(e) {
    options = options.filter((opt, i) => i !== e.detail);
  }
</script>

<Modal
  title="Section Setting"
  isShow={$editorPageSetting.editorTitle.type}
  on:save={() => onSectionTitleChange("save")}
  on:close={() => onSectionTitleChange("close")}
>
  {#if $editorPageSetting.editorTitle && $editorPageSetting.editorTitle.type === "edit"}
    <Form
      fields={getEditor("section-title")}
      on:change={changeHandler}
      {state}
    />
  {:else if $editorPageSetting.editorTitle && $editorPageSetting.editorTitle.type === "delete"}
    <p>Apa Section ini akan dihapus?</p>
  {/if}
</Modal>
<Modal
  title="Field Setting"
  isShow={isModalShow}
  on:save={onSubmit}
  on:close={onClose}
>
  <Form fields={editorForm} on:change={changeHandler} {state} />
  <div class="h-1" />
  {#if editorType}
    <Form fields={editorField} on:change={changeHandler} {state} />
    {#if editorType === "so2"}
      <OptionsEditor
        {options}
        on:del={onOptionEditorDel}
        on:add={onOptionEditorAdd}
        on:change={onOptionEditorChange}
      />
    {/if}
  {/if}
</Modal>
<div class="space-y-6">
  <FormTitle title="Design Form" on:action={actionHandler} />
  {#each $sectionsStore as section, i ("section-" + i)}
    <Section
      title={section.title}
      description={section.description}
      fields={section.fields}
      id={i}
      on:section-act={sectionActionHandler}
      on:action={onSectionAction}
      on:add={onAddField}
    />
  {/each}
  <div
    on:click={onAddSection}
    class="w-full bg-white py-2 shadow-sm sm:text-sm border-2 border-green-600 cursor-pointer rounded-md text-center text-green-700"
  >
    + Add Section +
  </div>

  <div class="flex justify-end">
    <button
      on:click={() => pageModeStore.page()}
      type="button"
      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Close
    </button>
    <button
      type="button"
      on:click={() => {}}
      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
    >
      Save
    </button>
  </div>
</div>
