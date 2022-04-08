<script lang="ts">
  import RenderContainer from "../../components/Form/Container.svelte";
  import EditingContainer from "../../components/FormEditor/Container.svelte";
  import { editorPageSetting } from "../../store/editor";
</script>

<div class="h-screen flex overflow-hidden bg-gray-100">
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <main class="flex-1 relative overflow-y-auto focus:outline-none">
      <div class="py-6 px-6">
        {#if $editorPageSetting.pageMode === "rendering"}
          <RenderContainer />
        {:else}
          <EditingContainer />
        {/if}
      </div>
    </main>
  </div>
</div>