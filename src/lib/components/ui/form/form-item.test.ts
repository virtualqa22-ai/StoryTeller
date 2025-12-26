import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import FormItem from './form-item.svelte';

describe('FormItem', () => {
    it('renders div element', () => {
        const { container } = render(FormItem);
        const div = container.querySelector('div');
        expect(div).toBeTruthy();
    });

    it('applies space-y-2 class', () => {
        const { container } = render(FormItem);
        const div = container.querySelector('div');
        expect(div?.className).toContain('space-y-2');
    });

    it('applies custom class', () => {
        const { container } = render(FormItem, { props: { class: 'custom-form-item' } });
        const div = container.querySelector('div');
        expect(div?.className).toContain('custom-form-item');
    });
});
