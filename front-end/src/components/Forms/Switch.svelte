<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let checked = false;
    export let disabled = false;
    export let label = "";
    export let name = "";

    const dispatch = createEventDispatcher();

    function handleChange() {
        if (!disabled) {
            checked = !checked;
            dispatch("change", checked);
        }
    }

    $: switchClass = `relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        checked ? (disabled ? "bg-blue-300" : "bg-blue-600") : "bg-gray-200"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`;

    $: toggleClass = `inline-block w-4 h-4 transform transition-transform ${
        checked ? "translate-x-6" : "translate-x-1"
    } rounded-full bg-white shadow-lg`;
</script>

<label class="flex items-center cursor-pointer">
    <div class={switchClass} on:click={handleChange}>
        <span class={toggleClass}></span>
    </div>
    {#if label}
        <span class="ml-3 text-sm font-medium text-gray-900">{label}</span>
    {/if}
    <input
        type="checkbox"
        {name}
        bind:checked
        {disabled}
        class="sr-only"
        on:change={() => dispatch("change", checked)}
    />
</label>
