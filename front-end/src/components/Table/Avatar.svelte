<script lang="ts">
    export let name: string;

    function getInitials(name: string): string {
        return name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    }
</script>

<div
    class="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs"
>
    {getInitials(name)}
</div>
