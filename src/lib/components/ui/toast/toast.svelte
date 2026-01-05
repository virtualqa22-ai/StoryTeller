<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		open: boolean;
		message: string;
		variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
		duration?: number;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		open = false,
		message = '',
		variant = 'default',
		duration = 5000,
		onOpenChange
	}: Props = $props();

	let timeoutId: number | null = null;

	// Handle changes to the open state
	$effect(() => {
		if (open && duration > 0) {
			if (timeoutId) {
				window.clearTimeout(timeoutId);
			}
			timeoutId = window.setTimeout(() => {
				closeToast();
			}, duration);
		}
	});

	function closeToast() {
		if (onOpenChange) {
			onOpenChange(false);
		}
	}

	function handleAction() {
		closeToast();
	}

	onDestroy(() => {
		if (timeoutId) {
			window.clearTimeout(timeoutId);
		}
	});

	// Determine CSS classes based on variant
	let variantClasses = $derived(() => {
		switch (variant) {
			case 'success':
				return 'bg-green-500 text-white';
			case 'error':
				return 'bg-red-500 text-white';
			case 'warning':
				return 'bg-yellow-500 text-black';
			case 'info':
				return 'bg-blue-500 text-white';
			default:
				return 'bg-gray-800 text-white';
		}
	});
</script>

{#if open}
	<div
		class="fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300 transform ease-in-out max-w-xs {variantClasses}"
		role="alert"
		aria-live="polite"
	>
		<div class="flex items-start">
			<p class="text-sm flex-grow">{message}</p>
			<button
				onclick={closeToast}
				class="ml-4 text-current hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded-full p-1"
				aria-label="Close"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	</div>
{/if}