import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import Step5 from './step-5.svelte';
import type { WizardStep5Data } from './types';

// Mock Tauri API
vi.mock('@tauri-apps/api/core', () => ({
	invoke: vi.fn()
}));

import { invoke } from '@tauri-apps/api/core';

describe('Step 5: AI Provider Configuration', () => {
	let mockOnNext: (data: WizardStep5Data) => void;
	let mockOnBack: () => void;
	let mockOnCancel: () => void;

	beforeEach(() => {
		mockOnNext = vi.fn();
		mockOnBack = vi.fn();
		mockOnCancel = vi.fn();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const getDefaultProps = () => ({
		onNext: mockOnNext,
		onBack: mockOnBack,
		onCancel: mockOnCancel
	});

	it('renders progress indicator with correct text and ARIA attributes', () => {
		render(Step5, { props: getDefaultProps() });

		const progress = screen.getByRole('progressbar');
		expect(progress).toBeDefined();
		expect(progress.getAttribute('aria-label')).toBe('Step 5 of 6: AI Provider (Optional)');
		expect(progress.getAttribute('aria-valuenow')).toBe('5');
		expect(progress.getAttribute('aria-valuemin')).toBe('1');
		expect(progress.getAttribute('aria-valuemax')).toBe('6');
		expect(screen.getByText('Step 5 of 6: AI Provider (Optional)')).toBeDefined();
	});

	it('displays optional step message', () => {
		render(Step5, { props: getDefaultProps() });

		const message = screen.getByTestId('optional-step-message');
		expect(message).toBeDefined();
		expect(message.textContent).toContain('You can configure this later from Settings');
	});

	it('renders AI provider dropdown with all 5 options (no Custom Provider)', () => {
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		expect(select).toBeDefined();

		// Check all options are present (including placeholder)
		const options = Array.from(select.options).map(opt => opt.value);
		expect(options).toContain('');
		expect(options).toContain('OpenAI');
		expect(options).toContain('Anthropic Claude');
		expect(options).toContain('Google Gemini');
		expect(options).toContain('Deepseek');
		expect(options).toContain('Yandex');
		// Should have 6 options total (5 providers + placeholder)
		expect(options.length).toBe(6);
	});

	it('renders API key input with type="password" (masked)', () => {
		render(Step5, { props: getDefaultProps() });

		const input = screen.getByTestId('api-key-input') as HTMLInputElement;
		expect(input).toBeDefined();
		expect(input.type).toBe('password');
		expect(input.placeholder).toBe('Enter your API key');
	});

	it('renders Skip this step button', () => {
		render(Step5, { props: getDefaultProps() });

		const skipButton = screen.getByTestId('skip-button');
		expect(skipButton).toBeDefined();
		expect(skipButton.textContent).toContain('Skip this step');
	});

	it('Test Connection button is disabled when provider or key is empty', () => {
		render(Step5, { props: getDefaultProps() });

		const testButton = screen.getByTestId('test-connection-button') as HTMLButtonElement;
		expect(testButton.disabled).toBe(true);
	});

	it('Test Connection button is enabled when provider and key are provided', async () => {
		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-api-key');

		const testButton = screen.getByTestId('test-connection-button') as HTMLButtonElement;
		expect(testButton.disabled).toBe(false);
	});

	it('Test Connection button triggers connection test', async () => {
		vi.mocked(invoke).mockResolvedValue(true);

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-api-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		expect(invoke).toHaveBeenCalledWith('test_api_connection', {
			provider: 'OpenAI',
			apiKey: 'test-api-key'
		});
	});

	it('displays loading state during connection test', async () => {
		// Mock a delayed response
		vi.mocked(invoke).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100)));

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-api-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		// Check loading state (button should have "Testing...")
		expect(testButton.textContent).toContain('Testing...');
	});

	it('displays success state after successful connection test', async () => {
		vi.mocked(invoke).mockResolvedValue(true);

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-api-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		// Wait for async operation
		await vi.waitFor(() => {
			const result = screen.queryByTestId('connection-test-result');
			expect(result).toBeDefined();
		});

		const result = screen.getByTestId('connection-test-result');
		expect(result.textContent).toContain('Connection successful');
	});

	it('displays error state after failed connection test', async () => {
		vi.mocked(invoke).mockRejectedValue({ message: 'Invalid API key' });

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'invalid-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		// Wait for async operation
		await vi.waitFor(() => {
			const result = screen.queryByTestId('connection-test-result');
			expect(result).toBeDefined();
		});

		const result = screen.getByTestId('connection-test-result');
		// With the new security-focused error handling, specific error messages are masked
		expect(result.textContent).toContain('Connection test failed');
	});

	it('connection test result has aria-live="polite" for screen readers', async () => {
		vi.mocked(invoke).mockResolvedValue(true);

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-api-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		await vi.waitFor(() => {
			const result = screen.queryByTestId('connection-test-result');
			expect(result).toBeDefined();
		});

		const result = screen.getByTestId('connection-test-result');
		expect(result.getAttribute('aria-live')).toBe('polite');
	});

	it('handles timeout error (10-second timeout)', async () => {
		vi.mocked(invoke).mockRejectedValue({ message: 'Connection timeout (10s)' });

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		await vi.waitFor(() => {
			const result = screen.queryByTestId('connection-test-result');
			expect(result).toBeDefined();
		});

		const result = screen.getByTestId('connection-test-result');
		expect(result.textContent).toContain('Connection timeout (10s)');
	});

	it('Next button is disabled when connection test has not succeeded', () => {
		render(Step5, { props: getDefaultProps() });

		const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
		expect(nextButton.disabled).toBe(true);
	});

	it('Next button is enabled after successful connection test', async () => {
		vi.mocked(invoke).mockResolvedValue(true);

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		await vi.waitFor(() => {
			const result = screen.queryByTestId('connection-test-result');
			expect(result).toBeDefined();
		});

		const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
		expect(nextButton.disabled).toBe(false);
	});

	it('Next button saves API key to secure storage and advances to Step 6', async () => {
		vi.mocked(invoke).mockResolvedValue(true);

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		await vi.waitFor(() => {
			const result = screen.queryByTestId('connection-test-result');
			expect(result).toBeDefined();
		});

		// Mock store_api_key command
		vi.mocked(invoke).mockResolvedValue(undefined);

		const nextButton = screen.getByTestId('next-button');
		await user.click(nextButton);

		await vi.waitFor(() => {
			expect(invoke).toHaveBeenCalledWith('store_api_key', {
				provider: 'OpenAI',
				apiKey: 'test-key'
			});
		});

		expect(mockOnNext).toHaveBeenCalledWith({
			aiProvider: 'OpenAI',
			apiKey: '***STORED_SECURELY***',
			aiProviderSkipped: false
		});
	});

	it('Skip button advances to Step 6 without saving any data', async () => {
		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const skipButton = screen.getByTestId('skip-button');
		await user.click(skipButton);

		expect(mockOnNext).toHaveBeenCalledWith({
			aiProvider: null,
			apiKey: null,
			aiProviderSkipped: true
		});
		expect(invoke).not.toHaveBeenCalled();
	});

	it('Back button calls onBack handler', async () => {
		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const backButton = screen.getByTestId('back-button');
		await user.click(backButton);

		expect(mockOnBack).toHaveBeenCalled();
	});

	it('Cancel button calls onCancel handler', async () => {
		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const cancelButton = screen.getByTestId('cancel-button');
		await user.click(cancelButton);

		expect(mockOnCancel).toHaveBeenCalled();
	});

	it('displays error message when secure storage fails', async () => {
		vi.mocked(invoke).mockResolvedValueOnce(true); // test_api_connection succeeds

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		await vi.waitFor(() => {
			const result = screen.queryByTestId('connection-test-result');
			expect(result).toBeDefined();
		});

		// Mock store_api_key failure
		vi.mocked(invoke).mockRejectedValue({ message: 'Keychain access denied' });

		const nextButton = screen.getByTestId('next-button');
		await user.click(nextButton);

		await vi.waitFor(() => {
			const result = screen.getByTestId('connection-test-result');
			expect(result.textContent).toContain('Failed to save API key securely');
		});

		expect(mockOnNext).not.toHaveBeenCalled();
	});

	it('Test Connection button has aria-busy during loading', async () => {
		vi.mocked(invoke).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100)));

		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		await user.selectOptions(select, 'OpenAI');
		await user.type(input, 'test-key');

		const testButton = screen.getByTestId('test-connection-button');
		await user.click(testButton);

		// Check aria-busy attribute during loading
		expect(testButton.getAttribute('aria-busy')).toBe('true');
	});

	it('Test Connection button is enabled for any API key format (no format validation)', async () => {
		const user = userEvent.setup();
		render(Step5, { props: getDefaultProps() });

		const select = screen.getByTestId('ai-provider-select') as HTMLSelectElement;
		const input = screen.getByTestId('api-key-input') as HTMLInputElement;

		// Select OpenAI provider
		await user.selectOptions(select, 'OpenAI');
		// Enter any key format (format validation removed)
		await user.type(input, 'any-key-format');

		const testButton = screen.getByTestId('test-connection-button') as HTMLButtonElement;
		expect(testButton.disabled).toBe(false);
	});
});
