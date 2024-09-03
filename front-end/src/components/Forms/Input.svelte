<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { EyeIcon, EyeOffIcon } from "lucide-svelte";

    export let type: "text" | "password" | "email" | "number" = "text";
    export let placeholder = "";
    export let value = "";
    export let label = "";
    export let name = "";
    export let required = false;
    export let disabled = false;
    export let readonly = false;
    export let error = "";
    export let success = "";
    export let icon: typeof EyeIcon | null = null;

    let inputElement: HTMLInputElement;
    let showPassword = false;

    const dispatch = createEventDispatcher();

    function handleInput(event: Event) {
        value = (event.target as HTMLInputElement).value;
        dispatch("input", value);
    }

    function togglePasswordVisibility() {
        showPassword = !showPassword;
        if (inputElement) {
            inputElement.type = showPassword ? "text" : "password";
        }
    }

    $: inputClass = `w-full px-3 py-2 border rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error
            ? "border-red-500 focus:border-red-500"
            : success
              ? "border-green-500 focus:border-green-500"
              : "border-gray-300 focus:border-blue-500"
    } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`;
</script>

<div class="mb-4">
    {#if label}
        <label for={name} class="block mb-2 text-sm font-medium text-gray-700"
            >{label}</label
        >
    {/if}
    <div class="relative">
        <input
            bind:this={inputElement}
            {name}
            {type}
            {placeholder}
            {value}
            {required}
            {disabled}
            {readonly}
            on:input={handleInput}
            class={inputClass}
        />
        {#if icon}
            <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
                <svelte:component this={icon} class="h-5 w-5 text-gray-400" />
            </div>
        {/if}
        {#if type === "password"}
            <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                on:click={togglePasswordVisibility}
            >
                {#if showPassword}
                    <EyeOffIcon class="h-5 w-5 text-gray-400" />
                {:else}
                    <EyeIcon class="h-5 w-5 text-gray-400" />
                {/if}
            </button>
        {/if}
    </div>
    {#if error}
        <p class="mt-1 text-xs text-red-500">{error}</p>
    {/if}
    {#if success}
        <p class="mt-1 text-xs text-green-500">{success}</p>
    {/if}
</div>
