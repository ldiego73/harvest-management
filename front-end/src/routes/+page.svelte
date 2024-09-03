<script lang="ts">
    import { goto } from "$app/navigation";

    const sections = [
        {
            title: "Commodities",
            description: "View all fruits and their varieties",
            href: "/commodities",
        },
        {
            title: "Harvests",
            description: "Manage and view all harvests",
            href: "/harvests",
        },
        {
            title: "Growers",
            description: "View all growers and their farms",
            href: "/growers",
        },
        {
            title: "Clients",
            description: "Manage and view all clients",
            href: "/clients",
        },
    ];

    function navigateTo(href: string) {
        goto(href);
    }
</script>

<svelte:head>
    <title>Home - Onesta Platform</title>
</svelte:head>

<h1 class="text-4xl font-bold mb-8 text-center">Welcome</h1>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each sections as section}
        <div
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            on:click={() => navigateTo(section.href)}
        >
            <h2 class="text-2xl font-semibold mb-2 text-blue-600">
                {section.title}
            </h2>
            <p class="text-gray-600">{section.description}</p>
        </div>
    {/each}
</div>
