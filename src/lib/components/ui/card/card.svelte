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

<div
    class={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className,
    )}
    {...rest}
>
    {#if typeof children === "function"}{@render children()}{:else}{children}{/if}
</div>
