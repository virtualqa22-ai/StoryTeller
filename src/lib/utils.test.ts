import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
    describe('cn', () => {
        it('merges tailwind classes correctly', () => {
            expect(cn('px-2 py-1', 'bg-red-500')).toBe('px-2 py-1 bg-red-500');
        });

        it('handles conflicts correctly', () => {
            expect(cn('p-2', 'p-4')).toBe('p-4');
        });

        it('handles conditionals', () => {
            const isTrue = true;
            const isFalse = false;
            expect(cn('base', isTrue && 'visible', isFalse && 'hidden')).toBe('base visible');
        });

        it('handles undefined and null', () => {
            expect(cn('base', undefined, null)).toBe('base');
        });
    });
});
