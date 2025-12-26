import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Textarea from './textarea.svelte';

describe('Textarea', () => {
    it('renders textarea element', () => {
        render(Textarea, { props: { placeholder: 'Enter text...' } });
        const textarea = screen.getByPlaceholderText('Enter text...');
        expect(textarea).toBeTruthy();
        expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('applies base classes', () => {
        render(Textarea);
        const textarea = screen.getByRole('textbox');
        expect(textarea.className).toContain('rounded-md');
        expect(textarea.className).toContain('border');
        expect(textarea.className).toContain('min-h-[80px]');
    });

    it('applies custom class', () => {
        render(Textarea, { props: { class: 'custom-textarea' } });
        const textarea = screen.getByRole('textbox');
        expect(textarea.className).toContain('custom-textarea');
    });

    it('updates value on input', async () => {
        render(Textarea, { props: { value: '' } });
        const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
        await fireEvent.input(textarea, { target: { value: 'New content' } });
        expect(textarea.value).toBe('New content');
    });

    it('can be disabled', () => {
        render(Textarea, { props: { disabled: true } });
        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveProperty('disabled', true);
    });
});
