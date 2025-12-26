<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children?: Snippet;
        header?: Snippet;
        sidebar?: Snippet;
        footer?: Snippet;
        sidebarPosition?: "left" | "right";
        [key: string]: any;
    };

    let {
        class: className,
        children,
        header,
        sidebar,
        footer,
        sidebarPosition = "left",
        ...rest
    }: Props = $props();
</script>

<div class={cn("flex min-h-screen flex-col", className)} {...rest}>
    {#if header}
        {@render header()}
    {/if}

    <div class="flex flex-1">
        {#if sidebar && sidebarPosition === "left"}
            {@render sidebar()}
        {/if}

        <main class="flex-1 overflow-auto">
            {#if children}
                {@render children()}
            {/if}
        </main>

        {#if sidebar && sidebarPosition === "right"}
            {@render sidebar()}
        {/if}
    </div>

    {#if footer}
        {@render footer()}
    {/if}
</div>
