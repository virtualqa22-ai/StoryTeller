<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children?: Snippet;
        size?: "sm" | "md" | "lg" | "xl" | "full";
        padding?: boolean;
        center?: boolean;
        [key: string]: any;
    };

    let {
        class: className,
        children,
        size = "lg",
        padding = true,
        center = true,
        ...rest
    }: Props = $props();

    const sizes = {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        full: "max-w-full",
    };
</script>

<div
    class={cn(
        "w-full",
        sizes[size],
        padding && "px-4 py-6 sm:px-6 lg:px-8",
        center && "mx-auto",
        className,
    )}
    {...rest}
>
    {#if children}
        {@render children()}
    {/if}
</div>
