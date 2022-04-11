<script lang="ts">
  import SkeletonCell from "./SkeletonCell.svelte";

  export let headers: THeader[] = [];
</script>

<div class="hidden mt-8 sm:block">
  <div class="align-middle inline-block min-w-full border-b border-gray-200">
    <table class="min-w-full">
      <thead>
        <tr class="border-t border-gray-200">
          {#each headers as header, i ("cell-" + header.label + "-" + i)}
            <th class="{i === 0 ? "w-full": ""}">{header.label}</th>
          {/each}
          <!-- <th
            class="hidden md:table-cell"
            >Last updated</th
          > -->
          <th
            class="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-100">
        <tr class="">
          {#each headers as h,i ("cell-" + h.label + "-" + i)}
            <td class="cell {i === 0 ? "lg:pl-2": ""}">
              <SkeletonCell />
            </td>
          {/each}
          
          <td
            class="px-6 py-3 whitespace-nowrap space-x-2 text-center text-sm font-medium"
          >
            <a href="#efner" class="text-indigo-600 hover:text-indigo-900"
              >Edit</a
            >
            <a href="#efner" class="text-red-600 hover:text-red-900"
              >Delete</a
            >
          </td>
        </tr>

        <!-- More projects... -->
      </tbody>
    </table>
  </div>
</div>

<style lang="postcss">
  th {
    @apply px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs;
    @apply font-medium text-gray-500 uppercase tracking-wider;
    min-width: 6rem;
  }
  .cell {
    @apply px-6 py-3 whitespace-nowrap text-sm text-gray-500;
  }
</style>