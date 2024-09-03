<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { ChevronDownIcon } from "lucide-svelte";

    export let options: { value: string; label: string }[] = [];
    export let value = "";
    export let placeholder = "Select an option";
    export let label = "";
    export let name = "";
    export let disabled = false;
    export let error = "";
    export let success = "";
    export let onChange: (newValue: string) => void;

    let isOpen = false;
    let selectedLabel = "";
    let selectElement: HTMLDivElement;

    const dispatch = createEventDispatcher();

    function handleSelect(option: { value: string; label: string }) {
        if (!disabled) {
            value = option.value;
            selectedLabel = option.label;
            isOpen = false;
            onChange(value);
            dispatch("change", value);
        }
    }

    function toggleDropdown() {
        if (!disabled) {
            isOpen = !isOpen;
        }
    }

    function handleClickOutside(event: MouseEvent) {
        if (
            selectElement &&
            !selectElement.contains(event.target as Node) &&
            isOpen
        ) {
            isOpen = false;
        }
    }

    onMount(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    $: {
        const selected = options.find((option) => option.value === value);
        selectedLabel = selected ? selected.label : "";
    }

    $: selectClass = `relative w-full px-3 py-2 text-left bg-white border rounded-md cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
        error
            ? "border-red-500"
            : success
              ? "border-green-500"
              : "border-gray-300"
    } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`;
</script>

<div class="mb-4" bind:this={selectElement}>
    {#if label}
        <label for={name} class="block mb-2 text-sm font-medium text-gray-700"
            >{label}</label
        >
    {/if}
    <div class={selectClass}>
        <button
            type="button"
            id={name}
            on:click={toggleDropdown}
            class="w-full flex items-center justify-between"
            {disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
        >
            <span class="block truncate">
                {selectedLabel || placeholder}
            </span>
            <ChevronDownIcon class="w-5 h-5 text-gray-400" />
        </button>
        {#if isOpen}
            <ul
                class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby={name}
            >
                {#each options as option (option.value)}
                    <li
                        class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                        role="option"
                        aria-selected={value === option.value}
                        on:click={() => handleSelect(option)}
                    >
                        <span
                            class={`block truncate ${value === option.value ? "font-semibold" : "font-normal"}`}
                        >
                            {option.label}
                        </span>
                        {#if value === option.value}
                            <span
                                class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
                            >
                                <svg
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>
                        {/if}
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
    {#if error}
        <p class="mt-1 text-xs text-red-500">{error}</p>
    {/if}
    {#if success}
        <p class="mt-1 text-xs text-green-500">{success}</p>
    {/if}
</div>
