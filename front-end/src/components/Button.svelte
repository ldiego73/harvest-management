<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let variant: "solid" | "outline" | "ghost" = "solid";
    export let color: "primary" | "danger" = "primary";
    export let size: "sm" | "md" = "md";
    export let icon: boolean = false;
    export let disabled: boolean = false;
    export let fullWidth: boolean = false;
    export let type: "button" | "submit" | "reset" = "button";

    const dispatch = createEventDispatcher();

    const baseStyles =
        "font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

    const variantStyles = {
        solid: {
            primary:
                "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300",
            danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300",
        },
        outline: {
            primary:
                "border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-blue-300 disabled:text-blue-300",
            danger: "border border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100 disabled:border-red-300 disabled:text-red-300",
        },
        ghost: {
            primary:
                "text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-blue-300",
            danger: "text-red-600 hover:bg-red-50 active:bg-red-100 disabled:text-red-300",
        },
    };

    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2",
    };

    $: buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant][color]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${icon ? "flex items-center justify-center" : ""}
  `;

    function handleClick(event: MouseEvent) {
        dispatch("click", event);
    }
</script>

<button {type} class={buttonStyles} on:click={handleClick} {disabled}>
    {#if icon}
        <span class="mr-2">
            <slot name="icon"></slot>
        </span>
    {/if}
    <slot></slot>
</button>
