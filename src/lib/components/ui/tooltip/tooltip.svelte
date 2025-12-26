<script lang="ts">
    import { Tooltip as TooltipPrimitive } from "bits-ui";
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        content?: string;
        children?: Snippet;
        side?: "top" | "right" | "bottom" | "left";
        sideOffset?: number;
        delayDuration?: number;
        [key: string]: any;
    };

    let {
        class: className,
        content,
        children,
        side = "top",
        sideOffset = 4,
        delayDuration = 200,
        ...rest
    }: Props = $props();
</script>

<TooltipPrimitive.Provider {delayDuration}>
    <TooltipPrimitive.Root {...rest}>
        <TooltipPrimitive.Trigger>
            {#if children}
                {@render children()}
            {/if}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                {side}
                {sideOffset}
                class={cn(
                    "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    className,
                )}
            >
                {content}
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
</TooltipPrimitive.Provider>
