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

<div class={cn("flex items-center p-6 pt-0", className)} {...rest}>
    {#if typeof children === "function"}{@render children()}{:else}{children}{/if}
</div>
