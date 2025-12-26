import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import FormMessage from './form-message.svelte';

describe('FormMessage', () => {
    it('renders p element', () => {
        render(FormMessage, { props: { children: 'Error message' } });
        const p = screen.getByText('Error message');
        expect(p).toBeTruthy();
        expect(p.tagName).toBe('P');
    });

    it('applies destructive color class', () => {
        render(FormMessage, { props: { children: 'Error message' } });
        const p = screen.getByText('Error message');
        expect(p.className).toContain('text-destructive');
        expect(p.className).toContain('font-medium');
    });

    it('applies custom class', () => {
        render(FormMessage, { props: { children: 'Error message', class: 'custom-msg' } });
        const p = screen.getByText('Error message');
        expect(p.className).toContain('custom-msg');
    });
});
