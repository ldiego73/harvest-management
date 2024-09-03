<script lang="ts">
    import TableHeader from "./TableHeader.svelte";
    import TableRow from "./TableRow.svelte";
    import type { TableColumn, TableData } from "$lib/types";

    export let columns: TableColumn[];
    export let data: TableData[];
    export let size: "1024" | "1440" = "1024";
</script>

<div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
        <TableHeader {columns} {size} />
        <tbody class="bg-white divide-y divide-gray-200">
            {#each data as row (row.id)}
                <TableRow {row} {columns} {size} />
            {/each}
        </tbody>
    </table>
</div>
