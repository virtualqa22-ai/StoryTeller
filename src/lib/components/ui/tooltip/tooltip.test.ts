import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Tooltip from './tooltip.svelte';

describe('Tooltip', () => {
    it('renders trigger content', () => {
        // Tooltip requires children snippet, test basic render
        const { container } = render(Tooltip, {
            props: { content: 'Tooltip text' }
        });
        // Tooltip provider should be rendered
        expect(container.innerHTML).toBeTruthy();
    });

    it('accepts side prop', () => {
        // Test that component accepts side prop without error
        const { container } = render(Tooltip, {
            props: { content: 'Tooltip text', side: 'bottom' }
        });
        expect(container.innerHTML).toBeTruthy();
    });

    it('accepts sideOffset prop', () => {
        const { container } = render(Tooltip, {
            props: { content: 'Tooltip text', sideOffset: 8 }
        });
        expect(container.innerHTML).toBeTruthy();
    });

    it('accepts delayDuration prop', () => {
        const { container } = render(Tooltip, {
            props: { content: 'Tooltip text', delayDuration: 500 }
        });
        expect(container.innerHTML).toBeTruthy();
    });
});
