<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Input from "../../../components/Forms/Input.svelte";
    import Select from "../../../components/Forms/Select.svelte";
    import Checkbox from "../../../components/Forms/Checkbox.svelte";
    import Button from "../../../components/Button.svelte";

    import type { SelectOption } from "$lib/types";
    import { harvestSchema, type HarvestFormData } from "$lib/schemas";

    import {
        createHarvest,
        getGrowers,
        getCommodities,
        getClients,
    } from "$lib/api";

    import { z } from "zod";

    let growers: SelectOption[] = [];
    let farms: SelectOption[] = [];
    let clients: SelectOption[] = [];
    let commodities: SelectOption[] = [];
    let varieties: SelectOption[] = [];

    let formData: HarvestFormData = {
        growerId: "",
        farmId: "",
        clientId: "",
        commodityId: "",
        varietyId: "",
        quantity: 0,
        confirmCreation: false,
    };

    let loading = true;
    let errors: { [key: string]: string } = {};

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
            errors.fetch = e.message;
        } finally {
            loading = false;
        }
    });

    function handleGrowerChange(newValue: string) {
        formData.growerId = newValue;
        const grower = growers.find((g) => g.value === formData.growerId);
        farms = grower
            ? grower.farms.map((f: any) => ({ value: f.id, label: f.name }))
            : [];
        formData.farmId = "";
        console.log(farms);
    }

    function handleCommodityChange(newValue: string) {
        formData.commodityId = newValue;
        const commodity = commodities.find(
            (c) => c.value === formData.commodityId,
        );
        varieties = commodity
            ? commodity.varieties.map((v: any) => ({
                  value: v.id,
                  label: v.name,
              }))
            : [];
        formData.varietyId = "";
    }

    async function handleSubmit() {
        errors = {};

        try {
            if (typeof formData.quantity === "string") {
                formData.quantity = Number.parseInt(formData.quantity, 10);
            }

            const validatedData = harvestSchema.parse(formData);
            await createHarvest(validatedData);

            goto("/harvests");
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                error.errors.forEach((err) => {
                    errors[err.path[0]] = err.message;
                });
            } else {
                errors.submit = "An unexpected error occurred";
            }
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
    {:else if errors.fetch}
        <p class="text-red-500 mb-4">{errors.fetch}</p>
    {:else}
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <Select
                options={growers}
                value={formData.growerId}
                onChange={handleGrowerChange}
                label="Grower"
                name="grower"
                placeholder="Select a grower"
                error={errors.growerId}
            />

            <Select
                options={farms}
                value={formData.farmId}
                onChange={(newValue) => (formData.farmId = newValue)}
                label="Farm"
                name="farm"
                placeholder="Select a farm"
                disabled={!formData.growerId}
                error={errors.farmId}
            />

            <Select
                options={clients}
                value={formData.clientId}
                onChange={(newValue) => (formData.clientId = newValue)}
                label="Client"
                name="client"
                placeholder="Select a client"
                error={errors.clientId}
            />

            <Select
                options={commodities}
                value={formData.commodityId}
                onChange={handleCommodityChange}
                label="Commodity"
                name="commodity"
                placeholder="Select a commodity"
                error={errors.commodityId}
            />

            <Select
                options={varieties}
                value={formData.varietyId}
                onChange={(newValue) => (formData.varietyId = newValue)}
                label="Variety"
                name="variety"
                placeholder="Select a variety"
                disabled={!formData.commodityId}
                error={errors.varietyId}
            />

            <Input
                type="number"
                label="Quantity"
                name="quantity"
                bind:value={formData.quantity}
                placeholder="Enter quantity"
                error={errors.quantity}
            />

            <Checkbox
                label="I confirm that all information is correct"
                bind:checked={formData.confirmCreation}
                error={errors.confirmCreation}
            />

            <Button type="submit" disabled={!formData.confirmCreation}
                >Create Harvest</Button
            >

            {#if errors.submit}
                <p class="text-red-500 mt-4">{errors.submit}</p>
            {/if}
        </form>
    {/if}
</div>
