import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Switch from './switch.svelte';

describe('Switch', () => {
    it('renders unchecked by default', () => {
        render(Switch);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toBeTruthy();
        expect(switchEl.getAttribute('data-state')).toBe('unchecked');
    });

    it('renders checked when checked prop is true', () => {
        render(Switch, { props: { checked: true } });
        const switchEl = screen.getByRole('switch');
        expect(switchEl.getAttribute('data-state')).toBe('checked');
    });

    it('applies custom class', () => {
        render(Switch, { props: { class: 'custom-class' } });
        const switchEl = screen.getByRole('switch');
        expect(switchEl.className).toContain('custom-class');
    });

    it('can be disabled', () => {
        render(Switch, { props: { disabled: true } });
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toHaveProperty('disabled', true);
    });
});
