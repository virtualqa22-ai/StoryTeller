<script lang="ts">
    import { Select as SelectPrimitive } from "bits-ui";
    import { cn } from "$lib/utils";
    import { ChevronDown, Check } from "lucide-svelte";
    import type { Snippet } from "svelte";

    type Option = {
        value: string;
        label: string;
        disabled?: boolean;
    };

    type Props = {
        class?: string;
        placeholder?: string;
        options?: Option[];
        value?: string;
        disabled?: boolean;
        children?: Snippet;
        [key: string]: any;
    };

    let {
        class: className,
        placeholder = "Select an option...",
        options = [],
        value = $bindable(""),
        disabled = false,
        children,
        ...rest
    }: Props = $props();

    let selected = $derived(options.find((o) => o.value === value));
</script>

<SelectPrimitive.Root type="single" bind:value {disabled} items={options} {...rest}>
    <SelectPrimitive.Trigger
        class={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
        )}
    >
        <span class={cn(!selected && "text-muted-foreground")}>
            {selected?.label ?? placeholder}
        </span>
        <ChevronDown class="h-4 w-4 opacity-50" />
    </SelectPrimitive.Trigger>

    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            class="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
            sideOffset={4}
        >
            <SelectPrimitive.Viewport class="p-1">
                {#if children}
                    {@render children()}
                {:else}
                    {#each options as option (option.value)}
                        <SelectPrimitive.Item
                            value={option.value}
                            label={option.label}
                            disabled={option.disabled}
                            class={cn(
                                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
                            )}
                        >
                            {#snippet child({ selected: isSelected })}
                                <span
                                    class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
                                >
                                    {#if isSelected}
                                        <Check class="h-4 w-4" />
                                    {/if}
                                </span>
                                {option.label}
                            {/snippet}
                        </SelectPrimitive.Item>
                    {/each}
                {/if}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
</SelectPrimitive.Root>
