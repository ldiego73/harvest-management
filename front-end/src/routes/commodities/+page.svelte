<script lang="ts">
    import { onMount } from "svelte";
    import Table from "../../components/Table/Table.svelte";
    import Button from "../../components/Button.svelte";
    import type { TableColumn, TableData } from "$lib/types";
    import { getCommodities } from "$lib/api";

    let commodities: TableData[] = [];
    let loading = true;
    let count: number = 0;
    let error: string | null = null;

    const columns: TableColumn[] = [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "varieties", label: "Varieties", sortable: false },
    ];

    onMount(async () => {
        try {
            const data = await getCommodities();
            commodities = data.commodities.map((c) => ({
                id: c.id,
                name: c.name,
                varieties: c.varieties.map((v) => v.name).join(", "),
            }));
            count = data.count;
        } catch (e: any) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    function handleCreate() {
        console.log("Create new commodity");
    }
</script>

<svelte:head>
    <title>Commodities - Onesta Platform</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Commodities</h1>
        <Button on:click={handleCreate} icon>
            <span slot="icon">+</span>
            Create Commodity
        </Button>
    </div>

    {#if loading}
        <p>Loading commodities...</p>
    {:else if error}
        <p class="text-red-500">Error: {error}</p>
    {:else}
        <Table {columns} data={commodities} />
        <div class="mt-4 text-right text-gray-600">
            Total: {count}
            {count === 1 ? "commodity" : "commodities"}
        </div>
    {/if}
</div>
