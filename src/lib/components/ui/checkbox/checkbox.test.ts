import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Checkbox from './checkbox.svelte';

describe('Checkbox', () => {
    it('renders without error', () => {
        // bits-ui components may have specific rendering requirements
        // This test verifies the component can be imported and rendered
        const { container } = render(Checkbox);
        expect(container).toBeTruthy();
    });

    it('accepts checked prop', () => {
        // Test that prop is accepted without error
        const { container } = render(Checkbox, { props: { checked: true } });
        expect(container).toBeTruthy();
    });

    it('accepts class prop', () => {
        // Test that class prop is accepted
        const { container } = render(Checkbox, { props: { class: 'custom-class' } });
        expect(container).toBeTruthy();
    });

    it('accepts disabled prop', () => {
        // Test that disabled prop is accepted
        const { container } = render(Checkbox, { props: { disabled: true } });
        expect(container).toBeTruthy();
    });
});
