<!-- src/routes/harvests/+page.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Table from "../../components/Table/Table.svelte";
    import Button from "../../components/Button.svelte";
    import type { TableColumn, TableData } from "$lib/types";
    import { getHarvests } from "$lib/api";

    let harvests: TableData[] = [];
    let loading = true;
    let count: number = 0;
    let error: string | null = null;

    const columns: TableColumn[] = [
        { key: "id", label: "ID", sortable: true },
        { key: "grower", label: "Grower", sortable: true },
        { key: "farm", label: "Farm", sortable: true },
        { key: "client", label: "Client", sortable: true },
        { key: "commodity", label: "Commodity", sortable: true },
        { key: "variety", label: "Variety", sortable: true },
        { key: "createdAt", label: "Created At", sortable: true },
    ];

    onMount(async () => {
        try {
            const data = await getHarvests();
            harvests = data.harvests.map((h) => ({
                id: h.id,
                grower: `${h.grower.name} ${h.grower.lastName}`,
                farm: h.farm.name,
                client: `${h.client.name} ${h.client.lastName}`,
                commodity: h.commodity.name,
                variety: h.variety.name,
                createdAt: h.createdAt,
            }));
            count = data.count;
        } catch (e: any) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    function handleCreate() {
        goto("/harvests/create");
    }
</script>

<svelte:head>
    <title>Harvests - Onesta Platform</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Harvests</h1>
        <Button on:click={handleCreate} icon>
            <span slot="icon">+</span>
            Create Harvest
        </Button>
    </div>

    {#if loading}
        <p>Loading harvests...</p>
    {:else if error}
        <p class="text-red-500">Error: {error}</p>
    {:else}
        <Table {columns} data={harvests} />
        <div class="mt-4 text-right text-gray-600">
            Total: {count}
            {count === 1 ? "harvest" : "harvests"}
        </div>
    {/if}
</div>
