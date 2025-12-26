<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";
    import { ChevronLeft, ChevronRight } from "lucide-svelte";

    type Props = {
        class?: string;
        children?: Snippet;
        collapsed?: boolean;
        collapsible?: boolean;
        side?: "left" | "right";
        width?: string;
        collapsedWidth?: string;
        onCollapsedChange?: (collapsed: boolean) => void;
        [key: string]: any;
    };

    let {
        class: className,
        children,
        collapsed = $bindable(false),
        collapsible = true,
        side = "left",
        width = "w-64",
        collapsedWidth = "w-16",
        onCollapsedChange,
        ...rest
    }: Props = $props();

    function toggle() {
        collapsed = !collapsed;
        onCollapsedChange?.(collapsed);
    }

    let ChevronIcon = $derived(
        side === "left"
            ? collapsed
                ? ChevronRight
                : ChevronLeft
            : collapsed
              ? ChevronLeft
              : ChevronRight,
    );
</script>

<aside
    class={cn(
        "relative flex h-full flex-col border-r bg-background transition-all duration-300",
        collapsed ? collapsedWidth : width,
        side === "right" && "border-l border-r-0",
        className,
    )}
    {...rest}
>
    {#if collapsible}
        <button
            type="button"
            onclick={toggle}
            class={cn(
                "absolute top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-accent",
                side === "left" ? "-right-3" : "-left-3",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
            <ChevronIcon class="h-4 w-4" />
        </button>
    {/if}

    <div class="flex-1 overflow-y-auto p-4">
        {#if children}
            {@render children()}
        {/if}
    </div>
</aside>
