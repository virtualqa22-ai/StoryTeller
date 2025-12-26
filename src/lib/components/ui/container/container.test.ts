import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Container from './container.svelte';

describe('Container', () => {
    it('renders div element', () => {
        const { container } = render(Container);
        const div = container.querySelector('div');
        expect(div).toBeTruthy();
    });

    it('applies lg size by default', () => {
        const { container } = render(Container);
        const div = container.querySelector('div');
        expect(div?.className).toContain('max-w-screen-lg');
    });

    it('applies sm size', () => {
        const { container } = render(Container, { props: { size: 'sm' } });
        const div = container.querySelector('div');
        expect(div?.className).toContain('max-w-screen-sm');
    });

    it('applies md size', () => {
        const { container } = render(Container, { props: { size: 'md' } });
        const div = container.querySelector('div');
        expect(div?.className).toContain('max-w-screen-md');
    });

    it('applies xl size', () => {
        const { container } = render(Container, { props: { size: 'xl' } });
        const div = container.querySelector('div');
        expect(div?.className).toContain('max-w-screen-xl');
    });

    it('applies full size', () => {
        const { container } = render(Container, { props: { size: 'full' } });
        const div = container.querySelector('div');
        expect(div?.className).toContain('max-w-full');
    });

    it('applies padding by default', () => {
        const { container } = render(Container);
        const div = container.querySelector('div');
        expect(div?.className).toContain('px-4');
    });

    it('removes padding when padding is false', () => {
        const { container } = render(Container, { props: { padding: false } });
        const div = container.querySelector('div');
        expect(div?.className).not.toContain('px-4');
    });

    it('centers by default', () => {
        const { container } = render(Container);
        const div = container.querySelector('div');
        expect(div?.className).toContain('mx-auto');
    });

    it('removes centering when center is false', () => {
        const { container } = render(Container, { props: { center: false } });
        const div = container.querySelector('div');
        expect(div?.className).not.toContain('mx-auto');
    });

    it('applies custom class', () => {
        const { container } = render(Container, { props: { class: 'custom-container' } });
        const div = container.querySelector('div');
        expect(div?.className).toContain('custom-container');
    });
});
