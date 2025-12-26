<script lang="ts">
    import { Loader2 } from "lucide-svelte";
    import { cn } from "$lib/utils";

    let { class: className, ...rest } = $props<{
        class?: string;
        [key: string]: any;
    }>();
</script>

<Loader2 class={cn("animate-spin", className)} {...rest} />
