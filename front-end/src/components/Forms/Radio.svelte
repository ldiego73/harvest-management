<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let value = "";
    export let group = "";
    export let disabled = false;
    export let label = "";
    export let name = "";
    export let error = "";
    export let success = "";

    const dispatch = createEventDispatcher();

    function handleChange() {
        if (!disabled) {
            group = value;
            dispatch("change", group);
        }
    }

    $: radioClass = `h-5 w-5 rounded-full border-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        group === value
            ? disabled
                ? "bg-blue-300 border-blue-300"
                : "bg-blue-600 border-blue-600"
            : "bg-white"
    } ${
        error
            ? "border-red-500"
            : success
              ? "border-green-500"
              : "border-gray-300"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`;
</script>

<label class="flex items-center">
    <div class="relative">
        <input
            type="radio"
            {name}
            {value}
            bind:group
            {disabled}
            class="sr-only"
            on:change={handleChange}
        />
        <div class={radioClass} on:click={handleChange}>
            {#if group === value}
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                </div>
            {/if}
        </div>
    </div>
    {#if label}
        <span class="ml-2 text-sm font-medium text-gray-900">{label}</span>
    {/if}
</label>
{#if error}
    <p class="mt-1 text-xs text-red-500">{error}</p>
{/if}
{#if success}
    <p class="mt-1 text-xs text-green-500">{success}</p>
{/if}
