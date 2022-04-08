<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Select from "svelte-select";

  export let kind: TFormKind = "ti";
  export let name = "";
  export let placeholder = "";
  export let label = "";
  export let type = "text";
  export let options = [];
  export let value = "";
  export let child;

  $: _value = value ? value : "";

  const dispatch = createEventDispatcher();

  const onChange = (n, e) => {
    if (kind === "so2") {
      // console.log({ name: n, value: e.value })
      dispatch("change", { name: n, value: e.value });
    } else {
      dispatch("change", { name: n, value: e.target.value });
    }
  };

  const select2Handler = (n, e) => {
    onChange(n, e.detail);
    doNothing(child)
  };

  const doNothing = (c) => {
    if(c) console.log(c);
  }
</script>

{#if kind === "ti"}
  <label for={name} class="block text-sm font-medium text-gray-700"
    >{label}</label
  >
  <input
    on:input={(e) => onChange(name, e)}
    {type}
    {name}
    value={_value}
    id={name}
    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  />
  <p class="mt-2 text-sm text-gray-500">{placeholder ? placeholder : ""}</p>
{:else if kind === "ta"}
  <label
    for={name}
    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
  >
    {label}
  </label>
  <textarea
    on:input={(e) => onChange(name, e)}
    id={name}
    value={_value}
    {name}
    rows="3"
    class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
  />
  <p class="mt-2 text-sm text-gray-500">{placeholder ? placeholder : ""}</p>
{:else if kind === "so"}
  <label for={name} class="block text-sm font-medium text-gray-700"
    >{label}</label
  >
  <select
    on:change={(e) => onChange(name, e)}
    id={name}
    value={_value}
    {name}
    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">-Pilih Salah Satu-</option>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
{:else if kind === "so2"}
  <label for={name} class="block text-sm font-medium text-gray-700"
    >{label}</label
  >
  <Select
    inputStyles="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    items={options}
    {value}
    on:select={(e) => select2Handler(name, e)}
  />
{/if}
