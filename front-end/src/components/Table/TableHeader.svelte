<script lang="ts">
    import type { TableColumn } from "$lib/types";
    import { ChevronDown } from "lucide-svelte";

    export let columns: TableColumn[];
    export let size: "1024" | "1440";
</script>

<thead class="bg-gray-50">
    <tr>
        {#each columns as column}
            <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                class:hidden={size === "1024" && column.hideOn1024}
            >
                <div class="flex items-center">
                    {column.label}
                    {#if column.sortable}
                        <ChevronDown class="ml-1 h-4 w-4" />
                    {/if}
                </div>
            </th>
        {/each}
    </tr>
</thead>
