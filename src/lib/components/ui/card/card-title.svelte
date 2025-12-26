<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";
    let {
        class: className,
        children,
        ...rest
    } = $props<{
        class?: string;
        children?: Snippet | string;
        [key: string]: any;
    }>();
</script>

<h3
    class={cn("font-semibold leading-none tracking-tight", className)}
    {...rest}
>
    {#if typeof children === "function"}{@render children()}{:else}{children}{/if}
</h3>
