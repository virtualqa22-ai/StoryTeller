<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import FormItem from '$lib/components/ui/form/form-item.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Check, X, Loader2 } from 'lucide-svelte';
	import { invoke } from '@tauri-apps/api/core';
	import type { WizardStep5Data } from './types';

	interface Props {
		onNext: (data: WizardStep5Data) => void;
		onBack: () => void;
		onCancel: () => void;
	}

	let { onNext, onBack, onCancel }: Props = $props();

	// AI Provider options (5 providers, no Custom Provider per story spec)
	const AI_PROVIDERS = ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Deepseek', 'Yandex'] as const;
	type AIProvider = typeof AI_PROVIDERS[number];

	// Component state
	let selectedProvider = $state<AIProvider | ''>('');
	let apiKey = $state('');
	let providerTouched = $state(false);
	let apiKeyTouched = $state(false);
	let showValidation = $state(false);

	// Connection test state
	let isTestingConnection = $state(false);
	let connectionTestResult = $state<'idle' | 'success' | 'error'>('idle');
	let connectionErrorMessage = $state('');
	let showValidationMessage = $state(false);

	// Derived state
	const canTestConnection = $derived.by(() => {
		return selectedProvider !== '' && apiKey.trim().length > 0;
	});

	const canProceedToNext = $derived.by(() => {
		return connectionTestResult === 'success';
	});

	// Test Connection handler
	async function handleTestConnection() {
		if (!canTestConnection) {
			showValidation = true;
			showValidationMessage = true;
			return;
		}

		isTestingConnection = true;
		connectionTestResult = 'idle';
		connectionErrorMessage = '';
		showValidationMessage = false;

		try {
			const isValid = await invoke<boolean>('test_api_connection', {
				provider: selectedProvider,
				apiKey: apiKey.trim()
			});

			if (isValid) {
				connectionTestResult = 'success';
			} else {
				connectionTestResult = 'error';
				connectionErrorMessage = 'Invalid API key';
			}
		} catch (error: any) {
			connectionTestResult = 'error';
			// Map backend error codes to user-friendly messages without exposing raw errors
			const errorMsg = error?.message || error || 'Connection test failed';
			if (errorMsg.includes('timeout')) {
				connectionErrorMessage = 'Connection timeout (10s)';
			} else if (errorMsg.includes('401') || errorMsg.includes('403')) {
				connectionErrorMessage = 'Invalid API key';
			} else if (errorMsg.includes('429')) {
				connectionErrorMessage = 'Rate limit exceeded - please try again later';
			} else if (errorMsg.includes('Network') || errorMsg.includes('network')) {
				connectionErrorMessage = 'Network connection error - check your internet connection';
			} else {
				// Don't expose raw error messages to prevent information disclosure
				connectionErrorMessage = 'Connection test failed - please check your API key and internet connection';
			}
		} finally {
			isTestingConnection = false;
		}
	}

	// Skip handler
	function handleSkip() {
		onNext({
			aiProvider: null,
			apiKey: null,
			aiProviderSkipped: true
		});
	}

	// Next handler (saves API key to secure storage)
	async function handleNext() {
		if (!canProceedToNext) {
			showValidation = true;
			return;
		}

		// Save to secure storage
		try {
			await invoke('store_api_key', {
				provider: selectedProvider,
				apiKey: apiKey.trim()
			});

			onNext({
				aiProvider: selectedProvider,
				apiKey: '***STORED_SECURELY***', // Don't pass actual key
				aiProviderSkipped: false
			});
		} catch (error: any) {
			connectionTestResult = 'error';
			connectionErrorMessage = 'Failed to save API key securely: ' + (error?.message || 'Unknown error');
		}
	}
</script>

<div class="p-6 space-y-6" data-testid="wizard-step-5">
	<!-- Progress Indicator -->
	<div
		class="flex items-center justify-between"
		role="progressbar"
		aria-label="Step 5 of 6: AI Provider (Optional)"
		aria-valuenow="5"
		aria-valuemin="1"
		aria-valuemax="6"
	>
		<span class="text-sm font-medium">Step 5 of 6: AI Provider (Optional)</span>
	</div>

	<!-- Optional Step Message -->
	<div class="p-3 rounded-md bg-muted border border-border" data-testid="optional-step-message">
		<p class="text-sm text-muted-foreground">
			You can configure this later from Settings
		</p>
	</div>

	<!-- AI Provider Selection -->
	<FormItem>
		<Label for="aiProvider">AI Provider</Label>
		<select
			id="aiProvider"
			bind:value={selectedProvider}
			onblur={() => (providerTouched = true)}
			data-testid="ai-provider-select"
			class="w-full p-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<option value="">Select a provider...</option>
			{#each AI_PROVIDERS as provider}
				<option value={provider}>{provider}</option>
			{/each}
		</select>
	</FormItem>

	<!-- API Key Input -->
	<FormItem>
		<Label for="apiKey">API Key</Label>
		{#if showValidationMessage && !canTestConnection}
			<p class="text-sm text-destructive mt-1" role="alert">
				Please enter a valid API key format for the selected provider
			</p>
		{/if}
		<div class="flex gap-2">
			<Input
				id="apiKey"
				type="password"
				bind:value={apiKey}
				onblur={() => (apiKeyTouched = true)}
				placeholder="Enter your API key"
				data-testid="api-key-input"
				class="flex-1"
			/>
			<Button
				variant="outline"
				onclick={handleTestConnection}
				disabled={!canTestConnection || isTestingConnection}
				data-testid="test-connection-button"
				aria-busy={isTestingConnection}
				aria-label={selectedProvider ? `Test connection to ${selectedProvider}` : 'Test connection to selected AI provider'}
			>
				{#if isTestingConnection}
					<Loader2 class="w-4 h-4 mr-2 animate-spin" />
					Testing...
				{:else}
					Test Connection
				{/if}
			</Button>
		</div>
	</FormItem>

	<!-- Connection Test Results -->
	{#if connectionTestResult !== 'idle'}
		<div
			class="p-3 rounded-md border flex items-start gap-2"
			class:border-green-600={connectionTestResult === 'success'}
			class:bg-green-50={connectionTestResult === 'success'}
			class:dark:bg-green-950={connectionTestResult === 'success'}
			class:border-destructive={connectionTestResult === 'error'}
			class:bg-red-50={connectionTestResult === 'error'}
			class:dark:bg-red-950={connectionTestResult === 'error'}
			role="alert"
			aria-live="polite"
			data-testid="connection-test-result"
		>
			{#if connectionTestResult === 'success'}
				<Check class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
				<p class="text-sm text-green-800 dark:text-green-200">Connection successful</p>
			{:else}
				<X class="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
				<p class="text-sm text-destructive">{connectionErrorMessage}</p>
			{/if}
		</div>
	{/if}

	<!-- Navigation Buttons -->
	<div class="flex justify-between pt-4">
		<div class="space-x-2">
			<Button variant="secondary" onclick={onCancel} data-testid="cancel-button">
				Cancel
			</Button>
			<Button variant="outline" onclick={onBack} data-testid="back-button"> Back </Button>
		</div>
		<div class="space-x-2">
			<Button variant="outline" onclick={handleSkip} data-testid="skip-button">
				Skip this step
			</Button>
			<Button
				variant="default"
				onclick={handleNext}
				disabled={!canProceedToNext}
				data-testid="next-button"
			>
				Next
			</Button>
		</div>
	</div>
</div>
