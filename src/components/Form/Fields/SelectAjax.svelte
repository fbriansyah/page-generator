<script lang="ts">
  import { onMount } from "svelte";
  import Select from "svelte-select";
  
  export let link = '';
  export let value = null;
  export let fn: (d:any) => any[] = (d) => [];

  let items = [];

  onMount(async () => {
    if(link !== '') {
      try {
        const resp = await fetch(link);
        if(resp.ok) {
          const data = await resp.json();
          items = fn(data)
        }
      } catch(e) {e => console.log(e)}
    }
  })
</script>

<Select {items} {value} on:select />