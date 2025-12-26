<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children?: Snippet;
        left?: Snippet;
        right?: Snippet;
        sticky?: boolean;
        [key: string]: any;
    };

    let {
        class: className,
        children,
        left,
        right,
        sticky = false,
        ...rest
    }: Props = $props();
</script>

<header
    class={cn(
        "flex h-14 items-center justify-between border-b bg-background px-4",
        sticky && "sticky top-0 z-40",
        className,
    )}
    {...rest}
>
    {#if left}
        <div class="flex items-center gap-2">
            {@render left()}
        </div>
    {/if}

    {#if children}
        <div class="flex flex-1 items-center justify-center">
            {@render children()}
        </div>
    {/if}

    {#if right}
        <div class="flex items-center gap-2">
            {@render right()}
        </div>
    {/if}
</header>
