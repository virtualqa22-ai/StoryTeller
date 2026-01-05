<script lang="ts">
	import { onMount } from 'svelte';
	import { toastStore, type Toast as ToastType } from './store';
	import Toast from './toast.svelte';

	let toasts = $state<ToastType[]>([]);

	onMount(() => {
		return toastStore.subscribe((store) => {
			toasts = store.toasts;
		});
	});
</script>

{#each toasts as toast (toast.id)}
	<div>
		<Toast
			{...toast}
			open={true}
			onOpenChange={(open: boolean) => !open && toastStore.dismiss(toast.id)}
		/>
	</div>
{/each}