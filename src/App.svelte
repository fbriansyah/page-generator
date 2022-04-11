<script lang="ts">
  import AdminPage from "./components/Page/AdminPage.svelte";
  import Page from "./components/Page/FormEditorPage.svelte";
  import { pageModeStore } from "./store/pageMode";

</script>
{#if $pageModeStore === "page"}
  <AdminPage />
{:else}
  <Page />
{/if}

<style global lang="postcss">
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */
  @tailwind utilities;
</style>
