import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Sidebar from './sidebar.svelte';

describe('Sidebar', () => {
    it('renders aside element', () => {
        const { container } = render(Sidebar);
        const aside = container.querySelector('aside');
        expect(aside).toBeTruthy();
    });

    it('applies expanded width by default', () => {
        const { container } = render(Sidebar, { props: { collapsed: false } });
        const aside = container.querySelector('aside');
        expect(aside?.className).toContain('w-64');
    });

    it('applies collapsed width when collapsed', () => {
        const { container } = render(Sidebar, { props: { collapsed: true } });
        const aside = container.querySelector('aside');
        expect(aside?.className).toContain('w-16');
    });

    it('renders toggle button when collapsible', () => {
        render(Sidebar, { props: { collapsible: true } });
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
    });

    it('hides toggle button when not collapsible', () => {
        render(Sidebar, { props: { collapsible: false } });
        const button = screen.queryByRole('button');
        expect(button).toBeNull();
    });

    it('applies custom class', () => {
        const { container } = render(Sidebar, { props: { class: 'custom-sidebar' } });
        const aside = container.querySelector('aside');
        expect(aside?.className).toContain('custom-sidebar');
    });

    it('applies right border when side is right', () => {
        const { container } = render(Sidebar, { props: { side: 'right' } });
        const aside = container.querySelector('aside');
        expect(aside?.className).toContain('border-l');
    });
});
