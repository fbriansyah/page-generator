<script lang="ts">

  export let kind: TGroup | string = "single";
</script>

{#if kind === "double"}
  <div class="col-span-6 sm:col-span-3">
    <slot />
  </div>
{:else if kind === "triple"}
  <div class="col-span-6 sm:col-span-6 lg:col-span-2">
    <slot />
  </div>
{:else}
  <div class="col-span-6">
    <slot />
  </div>
{/if}
