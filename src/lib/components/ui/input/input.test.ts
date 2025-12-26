import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Input from './input.svelte';

describe('Input', () => {
    it('renders with placeholder', () => {
        render(Input, { props: { placeholder: 'Enter name' } });
        const input = screen.getByPlaceholderText('Enter name');
        expect(input).toBeTruthy();
    });

    it('updates value on change', async () => {
        const { component } = render(Input, { props: { value: '' } });
        const input = screen.getByRole('textbox') as HTMLInputElement;
        await fireEvent.input(input, { target: { value: 'New Value' } });
        expect(input.value).toBe('New Value');
    });
});
