<script lang="ts">
  import { onMount } from "svelte";

  import { editorForm, getEditor } from "../../data";
  import { pageSetting } from "../../store/pageSetting";
  import { getFieldState } from "../../utils/form";

  import Form from "../Form/Form.svelte";
  import OptionsEditor from "../FormEditor/OptionsEditor.svelte";

  import Modal from "../Modal/Modal.svelte";
  import Table from "../Tables/Table.svelte";
  import FormFilter from "./FormFilter.svelte";
  import Layout from "./Layout.svelte";
  import { formEditor } from "./setting";
  import TableHeaderEditor from "./TableHeaderEditor.svelte";

  let mode: "render" | "edit" = "edit";
  let isPageSettingModalShow = false;
  let isFieldEditorShow = false;
  let editorType = null;

  // States
  let pageSettingState = {};
  let editorState = {};
  let options = [];
  let tableHeaders = [];
  let editingState: TEditorSetting = {};

  $: formFilterFields = $pageSetting.filter;
  $: isFilterEditting = false;

  onMount(() => {
    const key = "editing-page";
    let editingPage = localStorage.getItem(key);
    let strData = localStorage.getItem(editingPage);
    if (strData && strData !== "") {
      const _pageSettingState = JSON.parse(strData) as TPageSetting;
      pageSettingState = _pageSettingState;
      tableHeaders = _pageSettingState.headers;
      pageSetting.load(editingPage)
    } else {
      pageSettingState = getFieldState(formEditor);
    }
  });

  $: editorField = getEditor(editorType);

  function changeMode() {
    if (mode === "render") {
      mode = "edit";
    } else {
      mode = "render";
    }
  }

  const showModal = (which: "page" | "field") => {
    if (which === "page") {
      isPageSettingModalShow = true;
    } else if (which === "field") {
      isFieldEditorShow = true;
    }
  };

  function resetState() {
    // pageSettingState = getFieldState(formEditor);
    editorState = {};
    editorType = null;
    options = [];
    isFilterEditting = false;
  }

  const closeModal = (which: "page" | "field") => {
    if (which === "page") {
      isPageSettingModalShow = false;
    } else if (which === "field") {
      isFieldEditorShow = false;
    }
    resetState();
  };

  function filterAction(e) {
    // TODO: Open Filter Settings Modal
    console.log("filter action", e.detail);
    isFieldEditorShow = true;
    editingState = e.detail as TEditorSetting;
    editorType = e.detail.setting.kind;
    editorState = { ...e.detail.setting };
    isFilterEditting = true;
  }

  function changeFormEditor(which: "page" | "field", e) {
    const { name, value } = e.detail;

    if (which === "page") {
      pageSettingState[name] = value;
      pageSetting.change(pageSettingState as TPageSetting);
    } else if (which === "field") {
      if (name === "kind") {
        editorType = value;
      }
      editorState[name] = value;
    }
  }

  // Modal Save Button Handler
  function modalSave(which: "page" | "field") {
    if (which === "page") {
      pageSettingState["headers"] = tableHeaders;
      pageSetting.change(pageSettingState as TPageSetting);
      pageSetting.save();
    } else if (which === "field") {
      if (isFilterEditting) {
        //
        pageSetting.editFilterFields(
          editingState.groupid,
          editingState.id,
          editingState.setting
        );
        isFilterEditting = false;
      } else {
        pageSetting.addFields("filter", editorState);
        pageSetting.save();
      }
    }
    closeModal(which);
    // resetState();
  }

  //////// OptionsEditor Events ////////
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

  ////// TableHeaderEditor Events ///////
  function onAddHeader() {
    tableHeaders = [...tableHeaders, { label: "", type: "-" }];
  }
  function onHeaderChange(e) {
    const { index, name, value } = e.detail;
    const _tableHeaders = [...tableHeaders];
    _tableHeaders[index][name] = value;

    tableHeaders = _tableHeaders;
  }
  function onHeaderDel(e) {
    tableHeaders = tableHeaders.filter((opt, i) => i !== e.detail);
  }
</script>

<!-- Page Settings Modal-->
<Modal
  title="Page Settings"
  isShow={isPageSettingModalShow}
  on:close={() => closeModal("page")}
  on:save={() => modalSave("page")}
>
  <Form
    fields={formEditor}
    on:change={(e) => changeFormEditor("page", e)}
    state={pageSettingState}
  />
  <TableHeaderEditor
    headers={tableHeaders}
    on:add={onAddHeader}
    on:change={onHeaderChange}
    on:del={onHeaderDel}
  />
</Modal>

<!-- Modal Settings Modal -->
<Modal
  title="Filter Settings"
  isShow={isFieldEditorShow}
  on:close={() => closeModal("field")}
  on:save={() => modalSave("field")}
>
  <Form
    fields={editorForm}
    on:change={(e) => changeFormEditor("field", e)}
    state={editorState}
  />
  <div class="h-1" />
  {#if editorType}
    <Form
      fields={editorField}
      on:change={(e) => changeFormEditor("field", e)}
      state={editorState}
    />
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

<Layout>
  <div
    class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
  >
    <div class="flex-1 min-w-0">
      <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
        {$pageSetting.title}
      </h1>
    </div>
    <div class="mt-4 flex sm:mt-0 sm:ml-4">
      <button
        type="button"
        class="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
        >Form Editor</button
      >
      <button
        on:click={() => showModal("page")}
        type="button"
        class="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
        >Setting</button
      >
    </div>
  </div>
  <div class="px-4 mt-6 sm:px-6 lg:px-8 space-y-2">
    <div class="flex">
      <h2
        class="text-gray-500 text-sm font-medium uppercase tracking-wide mr-auto"
      >
        Filter Data
      </h2>
      <span on:click={changeMode} class="cursor-pointer text-indigo-600">
        {mode === "render" ? "Edit" : "Render"}
      </span>
    </div>
    <FormFilter
      fields={formFilterFields}
      {mode}
      on:action={filterAction}
      on:add={() => showModal("field")}
      on:change
      on:submit
    />
  </div>

  <Table />
</Layout>
