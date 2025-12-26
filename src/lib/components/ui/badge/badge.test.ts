import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Badge from './badge.svelte';

describe('Badge', () => {
    it('renders with default class', () => {
        render(Badge, { props: { children: 'Badge' } });
        const badge = screen.getByText('Badge');
        expect(badge).toBeTruthy();
        expect(badge.className).toContain('bg-primary');
    });
});
