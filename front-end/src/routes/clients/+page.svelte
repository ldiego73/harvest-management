<!-- src/routes/clients/+page.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import Table from "../../components/Table/Table.svelte";
    import Button from "../../components/Button.svelte";
    import type { TableColumn, TableData } from "$lib/types";
    import { getClients } from "$lib/api";

    let clients: TableData[] = [];
    let loading = true;
    let count: number = 0;
    let error: string | null = null;

    const columns: TableColumn[] = [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "lastName", label: "Last Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
    ];

    onMount(async () => {
        try {
            const data = await getClients();
            clients = data.clients.map((c) => ({
                id: c.id,
                name: c.name,
                lastName: c.lastName,
                email: c.email,
            }));
            count = data.count;
        } catch (e: any) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    function handleCreate() {
        // Implementar la lógica para crear un nuevo cliente
        console.log("Create new client");
    }
</script>

<svelte:head>
    <title>Clients - Onesta Platform</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Clients</h1>
        <Button on:click={handleCreate} icon>
            <span slot="icon">+</span>
            Create Client
        </Button>
    </div>

    {#if loading}
        <p>Loading clients...</p>
    {:else if error}
        <p class="text-red-500">Error: {error}</p>
    {:else}
        <Table {columns} data={clients} />
        <div class="mt-4 text-right text-gray-600">
            Total: {count}
            {count === 1 ? "client" : "clients"}
        </div>
    {/if}
</div>
