<script lang="ts">
    import { type ComponentType } from "svelte";
    import { type Icon as LucideIcon } from "lucide-svelte";
    import { cn } from "$lib/utils";

    let {
        name,
        class: className,
        ...rest
    } = $props<{
        name: ComponentType; // LucideIcon might be a specific type, ComponentType is generic enough
        class?: string;
        [key: string]: any;
    }>();

    let IconComponent = $derived(name);
</script>

<IconComponent class={cn("h-4 w-4", className)} {...rest} />
