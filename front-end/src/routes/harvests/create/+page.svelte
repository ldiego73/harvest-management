<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Input from "../../../components/Forms/Input.svelte";
    import Select from "../../../components/Forms/Select.svelte";
    import Checkbox from "../../../components/Forms/Checkbox.svelte";
    import Button from "../../../components/Button.svelte";

    import type { SelectOption } from "$lib/types";

    import {
        createHarvest,
        getGrowers,
        getCommodities,
        getClients,
    } from "$lib/api";

    let growers: SelectOption[] = [];
    let farms: SelectOption[] = [];
    let clients: SelectOption[] = [];
    let commodities: SelectOption[] = [];
    let varieties: SelectOption[] = [];

    let selectedGrower = "";
    let selectedFarm = "";
    let selectedClient = "";
    let selectedCommodity = "";
    let selectedVariety = "";
    let quantity = "";
    let confirmCreation = false;

    let loading = true;
    let error = "";

    onMount(async () => {
        try {
            const [growersData, clientsData, commoditiesData] =
                await Promise.all([
                    getGrowers(),
                    getClients(),
                    getCommodities(),
                ]);

            growers = growersData.growers.map((g) => ({
                value: g.id,
                label: `${g.name} ${g.lastName}`,
                farms: g.farms.map((f) => ({
                    id: f.id,
                    name: f.name,
                })),
            }));
            clients = clientsData.clients.map((c) => ({
                value: c.id,
                label: `${c.name} ${c.lastName}`,
            }));
            commodities = commoditiesData.commodities.map((c) => ({
                value: c.id,
                label: c.name,
                varieties: c.varieties.map((v) => ({
                    id: v.id,
                    name: v.name,
                })),
            }));
        } catch (e: any) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    function handleGrowerChange(newValue: string) {
        selectedGrower = newValue;
        const grower = growers.find((g) => g.value === selectedGrower);
        farms = grower
            ? grower.farms.map((f: any) => ({ value: f.id, label: f.name }))
            : [];
        selectedFarm = "";
    }

    function handleCommodityChange(newValue: string) {
        selectedCommodity = newValue;
        const commodity = commodities.find(
            (c) => c.value === selectedCommodity,
        );
        varieties = commodity
            ? commodity.varieties.map((v: any) => ({
                  value: v.id,
                  label: v.name,
              }))
            : [];
        selectedVariety = "";
    }

    async function handleSubmit() {
        if (
            !selectedGrower ||
            !selectedFarm ||
            !selectedClient ||
            !selectedCommodity ||
            !selectedVariety ||
            !quantity ||
            !confirmCreation
        ) {
            error = "Please fill in all fields and confirm creation";
            return;
        }

        try {
            await createHarvest({
                growerId: selectedGrower,
                farmId: selectedFarm,
                clientId: selectedClient,
                commodityId: selectedCommodity,
                varietyId: selectedVariety,
                quantity: Number.parseInt(quantity, 10),
            });

            goto("/harvests");
        } catch (e: any) {
            error = e.message;
        }
    }
</script>

<svelte:head>
    <title>Create Harvest</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Create New Harvest</h1>

    {#if loading}
        <p>Loading form data...</p>
    {:else if error}
        <p class="text-red-500 mb-4">{error}</p>
    {:else}
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <Select
                options={growers}
                value={selectedGrower}
                onChange={handleGrowerChange}
                label="Grower"
                name="grower"
                placeholder="Select a grower"
            />

            <Select
                options={farms}
                value={selectedFarm}
                onChange={(newValue) => (selectedFarm = newValue)}
                label="Farm"
                name="farm"
                placeholder="Select a farm"
                disabled={!selectedGrower}
            />

            <Select
                options={clients}
                value={selectedClient}
                onChange={(newValue) => (selectedClient = newValue)}
                label="Client"
                name="client"
                placeholder="Select a client"
            />

            <Select
                options={commodities}
                value={selectedCommodity}
                onChange={handleCommodityChange}
                label="Commodity"
                name="commodity"
                placeholder="Select a commodity"
            />

            <Select
                options={varieties}
                value={selectedVariety}
                onChange={(newValue) => (selectedVariety = newValue)}
                label="Variety"
                name="variety"
                placeholder="Select a variety"
                disabled={!selectedCommodity}
            />

            <Input
                type="number"
                label="Quantity"
                name="quantity"
                bind:value={quantity}
                placeholder="Enter quantity"
            />

            <Checkbox
                label="I confirm that all information is correct"
                bind:checked={confirmCreation}
            />

            <Button type="submit" disabled={!confirmCreation}
                >Create Harvest</Button
            >
        </form>
    {/if}
</div>
