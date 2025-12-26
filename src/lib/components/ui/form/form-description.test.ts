import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import FormDescription from './form-description.svelte';

describe('FormDescription', () => {
    it('renders p element', () => {
        render(FormDescription, { props: { children: 'Description text' } });
        const p = screen.getByText('Description text');
        expect(p).toBeTruthy();
        expect(p.tagName).toBe('P');
    });

    it('applies muted foreground class', () => {
        render(FormDescription, { props: { children: 'Description text' } });
        const p = screen.getByText('Description text');
        expect(p.className).toContain('text-muted-foreground');
        expect(p.className).toContain('text-sm');
    });

    it('applies custom class', () => {
        render(FormDescription, { props: { children: 'Description text', class: 'custom-desc' } });
        const p = screen.getByText('Description text');
        expect(p.className).toContain('custom-desc');
    });
});
