<script lang="ts">
    import { Checkbox as CheckboxPrimitive } from "bits-ui";
    import { cn } from "$lib/utils";
    import { Check } from "lucide-svelte";

    let {
        class: className,
        checked = $bindable(false),
        ...rest
    } = $props<{
        class?: string;
        checked?: boolean;
        [key: string]: any;
    }>();
</script>

<CheckboxPrimitive.Root
    bind:checked
    class={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
    )}
    {...rest}
>
    {#snippet child({ checked: isChecked })}
        {#if isChecked}
            <span class="flex items-center justify-center text-current">
                <Check class="h-4 w-4" />
            </span>
        {/if}
    {/snippet}
</CheckboxPrimitive.Root>
