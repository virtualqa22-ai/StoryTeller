import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import PageLayout from './page-layout.svelte';

describe('PageLayout', () => {
    it('renders outer div with flex layout', () => {
        const { container } = render(PageLayout);
        const div = container.querySelector('div');
        expect(div).toBeTruthy();
        expect(div?.className).toContain('flex');
        expect(div?.className).toContain('min-h-screen');
        expect(div?.className).toContain('flex-col');
    });

    it('renders main element', () => {
        const { container } = render(PageLayout);
        const main = container.querySelector('main');
        expect(main).toBeTruthy();
        expect(main?.className).toContain('flex-1');
    });

    it('applies custom class', () => {
        const { container } = render(PageLayout, { props: { class: 'custom-layout' } });
        const div = container.querySelector('div');
        expect(div?.className).toContain('custom-layout');
    });
});
