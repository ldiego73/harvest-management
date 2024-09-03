<!-- src/lib/components/Header.svelte -->
<script>
    import { page } from "$app/stores";

    const navItems = [
        { href: "/commodities", label: "Commodities" },
        { href: "/harvests", label: "Harvests" },
        { href: "/growers", label: "Growers" },
        { href: "/clients", label: "Clients" },
    ];
</script>

<header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-blue-600">Onesta Platform</a>
        <nav>
            <ul class="flex space-x-4">
                {#each navItems as item}
                    <li>
                        <a
                            href={item.href}
                            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 {$page.url.pathname.startsWith(
                                item.href,
                            )
                                ? 'font-semibold text-blue-600'
                                : ''}"
                        >
                            {item.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
</header>
