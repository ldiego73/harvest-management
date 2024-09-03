<script lang="ts">
    import { onMount } from "svelte";
    import Table from "../../components/Table/Table.svelte";
    import Button from "../../components/Button.svelte";
    import type { TableColumn, TableData } from "$lib/types";
    import { getGrowers } from "$lib/api";

    let growers: TableData[] = [];
    let loading = true;
    let count: number = 0;
    let error: string | null = null;

    const columns: TableColumn[] = [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "lastName", label: "Last Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "farms", label: "Farms", sortable: false },
    ];

    onMount(async () => {
        try {
            const data = await getGrowers();
            growers = data.growers.map((g) => ({
                id: g.id,
                name: g.name,
                lastName: g.lastName,
                email: g.email,
                farms: g.farms.map((f) => f.name).join(", "),
            }));
            count = data.count;
        } catch (e: any) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    function handleCreate() {
        // Implementar la lógica para crear un nuevo grower
        console.log("Create new grower");
    }
</script>

<svelte:head>
    <title>Growers - Onesta Platform</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Growers</h1>
        <Button on:click={handleCreate} icon>
            <span slot="icon">+</span>
            Create Grower
        </Button>
    </div>

    {#if loading}
        <p>Loading growers...</p>
    {:else if error}
        <p class="text-red-500">Error: {error}</p>
    {:else}
        <Table {columns} data={growers} />
        <div class="mt-4 text-right text-gray-600">
            Total: {count}
            {count === 1 ? "grower" : "growers"}
        </div>
    {/if}
</div>
