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

<p class={cn("text-sm font-medium text-destructive", className)} {...rest}>
    {#if typeof children === "function"}{@render children()}{:else}{children}{/if}
</p>
