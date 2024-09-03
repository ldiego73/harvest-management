<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { CheckIcon } from "lucide-svelte";

    export let checked = false;
    export let disabled = false;
    export let label = "";
    export let name = "";
    export let error = "";
    export let success = "";

    const dispatch = createEventDispatcher();

    function handleChange() {
        if (!disabled) {
            checked = !checked;
            dispatch("change", checked);
        }
    }

    $: checkboxClass = `h-5 w-5 rounded border-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        checked
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
            type="checkbox"
            {name}
            bind:checked
            {disabled}
            class="sr-only"
            on:change={handleChange}
        />
        <div class={checkboxClass} on:click={handleChange}>
            {#if checked}
                <CheckIcon class="h-4 w-4 text-white" />
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
