import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Label from './label.svelte';

describe('Label', () => {
    it('renders label element', () => {
        render(Label, { props: { children: 'Test Label' } });
        const label = screen.getByText('Test Label');
        expect(label).toBeTruthy();
        expect(label.tagName).toBe('LABEL');
    });

    it('applies base classes', () => {
        render(Label, { props: { children: 'Test Label' } });
        const label = screen.getByText('Test Label');
        expect(label.className).toContain('text-sm');
        expect(label.className).toContain('font-medium');
    });

    it('applies custom class', () => {
        render(Label, { props: { children: 'Test Label', class: 'custom-label' } });
        const label = screen.getByText('Test Label');
        expect(label.className).toContain('custom-label');
    });

    it('forwards for attribute', () => {
        render(Label, { props: { children: 'Test Label', for: 'input-id' } });
        const label = screen.getByText('Test Label');
        expect(label.getAttribute('for')).toBe('input-id');
    });
});
