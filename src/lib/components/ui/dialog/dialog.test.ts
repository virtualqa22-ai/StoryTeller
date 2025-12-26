import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Dialog from './dialog.svelte';

describe('Dialog', () => {
    it('does not render content when closed', () => {
        render(Dialog, { props: { open: false, title: 'Test Title' } });
        // Dialog content should not be in the DOM when closed
        expect(screen.queryByText('Test Title')).toBeNull();
    });

    it('renders title and description when open', () => {
        render(Dialog, {
            props: {
                open: true,
                title: 'Test Title',
                description: 'Test Description'
            }
        });
        expect(screen.getByText('Test Title')).toBeTruthy();
        expect(screen.getByText('Test Description')).toBeTruthy();
    });

    it('renders close button by default when open', () => {
        render(Dialog, { props: { open: true, title: 'Test' } });
        const closeButton = screen.getByRole('button', { name: /close/i });
        expect(closeButton).toBeTruthy();
    });

    it('hides close button when showClose is false', () => {
        render(Dialog, { props: { open: true, title: 'Test', showClose: false } });
        const closeButton = screen.queryByRole('button', { name: /close/i });
        expect(closeButton).toBeNull();
    });

    it('applies custom class when open', () => {
        render(Dialog, {
            props: { open: true, title: 'Test', class: 'custom-dialog' }
        });
        // bits-ui Dialog renders to a portal, check document.body
        const dialogContent = document.querySelector('.custom-dialog');
        expect(dialogContent).toBeTruthy();
    });
});
