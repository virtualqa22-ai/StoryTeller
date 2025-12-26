import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Button from './button.svelte';

describe('Button', () => {
    it('renders with default variant classes', () => {
        render(Button, { props: { children: 'Click me' } });
        const btn = screen.getByRole('button');
        expect(btn).toBeTruthy();
        expect(btn.className).toContain('bg-primary');
        expect(btn.className).toContain('text-primary-foreground');
    });

    it('renders with default size classes', () => {
        render(Button, { props: { children: 'Click me' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('h-10');
        expect(btn.className).toContain('px-4');
    });

    it('applies destructive variant classes', () => {
        render(Button, { props: { variant: 'destructive' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('bg-destructive');
        expect(btn.className).toContain('text-destructive-foreground');
    });

    it('applies secondary variant classes', () => {
        render(Button, { props: { variant: 'secondary' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('bg-secondary');
    });

    it('applies outline variant classes', () => {
        render(Button, { props: { variant: 'outline' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('border');
        expect(btn.className).toContain('bg-background');
    });

    it('applies ghost variant classes', () => {
        render(Button, { props: { variant: 'ghost' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('hover:bg-accent');
    });

    it('applies link variant classes', () => {
        render(Button, { props: { variant: 'link' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('underline-offset-4');
    });

    it('applies sm size classes', () => {
        render(Button, { props: { size: 'sm' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('h-9');
        expect(btn.className).toContain('px-3');
    });

    it('applies lg size classes', () => {
        render(Button, { props: { size: 'lg' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('h-11');
        expect(btn.className).toContain('px-8');
    });

    it('applies icon size classes', () => {
        render(Button, { props: { size: 'icon' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('h-10');
        expect(btn.className).toContain('w-10');
    });

    it('applies custom class', () => {
        render(Button, { props: { class: 'custom-button' } });
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('custom-button');
    });

    it('can be disabled', () => {
        render(Button, { props: { disabled: true } });
        const btn = screen.getByRole('button');
        expect(btn).toHaveProperty('disabled', true);
    });
});
