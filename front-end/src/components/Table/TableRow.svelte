<script lang="ts">
    import type { TableColumn, TableData } from "$lib/types";
    import Avatar from "./Avatar.svelte";
    import Badge from "./Badge.svelte";
    import { MoreVertical } from "lucide-svelte";

    export let row: TableData;
    export let columns: TableColumn[];
    export let size: "1024" | "1440";
</script>

<tr>
    {#each columns as column}
        <td
            class="px-6 py-4 whitespace-nowrap"
            class:hidden={size === "1024" && column.hideOn1024}
        >
            {#if column.key === "checkbox"}
                <input type="checkbox" class="h-4 w-4 text-blue-600 rounded" />
            {:else if column.key === "name"}
                <div class="flex items-center">
                    <Avatar name={row[column.key]} />
                    <span class="ml-2">{row[column.key]}</span>
                </div>
            {:else if column.key === "status"}
                <Badge text={row[column.key]} />
            {:else if column.key === "action"}
                <button class="text-gray-400 hover:text-gray-600">
                    <MoreVertical class="h-5 w-5" />
                </button>
            {:else}
                {row[column.key]}
            {/if}
        </td>
    {/each}
</tr>
