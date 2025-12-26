<script lang="ts">
    import { Dialog as DialogPrimitive } from "bits-ui";
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children?: Snippet;
        [key: string]: any;
    };

    let { class: className, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Trigger class={cn(className)} {...rest}>
    {#if children}
        {@render children()}
    {/if}
</DialogPrimitive.Trigger>
