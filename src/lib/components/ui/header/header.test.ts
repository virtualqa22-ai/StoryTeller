import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Header from './header.svelte';

describe('Header', () => {
    it('renders header element', () => {
        const { container } = render(Header);
        const header = container.querySelector('header');
        expect(header).toBeTruthy();
    });

    it('applies base classes', () => {
        const { container } = render(Header);
        const header = container.querySelector('header');
        expect(header?.className).toContain('flex');
        expect(header?.className).toContain('items-center');
        expect(header?.className).toContain('border-b');
    });

    it('applies sticky class when sticky prop is true', () => {
        const { container } = render(Header, { props: { sticky: true } });
        const header = container.querySelector('header');
        expect(header?.className).toContain('sticky');
        expect(header?.className).toContain('top-0');
    });

    it('does not apply sticky class by default', () => {
        const { container } = render(Header, { props: { sticky: false } });
        const header = container.querySelector('header');
        expect(header?.className).not.toContain('sticky');
    });

    it('applies custom class', () => {
        const { container } = render(Header, { props: { class: 'custom-header' } });
        const header = container.querySelector('header');
        expect(header?.className).toContain('custom-header');
    });
});
