import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Select from './select.svelte';

describe('Select', () => {
    const options = [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' },
        { value: 'opt3', label: 'Option 3', disabled: true },
    ];

    it('renders with placeholder', () => {
        const { container } = render(Select, { props: { options, placeholder: 'Choose...' } });
        // bits-ui Select uses button with aria-haspopup="listbox"
        const trigger = container.querySelector('[data-select-trigger]') ||
                        container.querySelector('button[aria-haspopup="listbox"]');
        expect(trigger).toBeTruthy();
        expect(trigger?.textContent).toContain('Choose...');
    });

    it('renders with selected value', () => {
        const { container } = render(Select, { props: { options, value: 'opt1' } });
        const trigger = container.querySelector('[data-select-trigger]') ||
                        container.querySelector('button[aria-haspopup="listbox"]');
        expect(trigger?.textContent).toContain('Option 1');
    });

    it('applies custom class to trigger', () => {
        const { container } = render(Select, { props: { options, class: 'custom-select' } });
        const trigger = container.querySelector('[data-select-trigger]') ||
                        container.querySelector('button[aria-haspopup="listbox"]');
        expect(trigger?.className).toContain('custom-select');
    });

    it('can be disabled', () => {
        const { container } = render(Select, { props: { options, disabled: true } });
        const trigger = container.querySelector('[data-select-trigger]') ||
                        container.querySelector('button[aria-haspopup="listbox"]');
        expect(trigger?.hasAttribute('disabled') || trigger?.hasAttribute('data-disabled')).toBe(true);
    });
});
