import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatRelativeTime } from './formatDate';

describe('formatRelativeTime', () => {
	let nowMock: Date;

	beforeEach(() => {
		// Mock current time to 2025-01-15 12:00:00 UTC
		nowMock = new Date('2025-01-15T12:00:00Z');
		vi.useFakeTimers();
		vi.setSystemTime(nowMock);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('returns "Never opened" for null timestamp', () => {
		expect(formatRelativeTime(null)).toBe('Never opened');
	});

	it('returns "Unknown" for invalid timestamp', () => {
		expect(formatRelativeTime('invalid-date')).toBe('Unknown');
	});

	it('returns "just now" for timestamps less than 60 seconds ago', () => {
		const timestamp = new Date('2025-01-15T11:59:30Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('just now');
	});

	it('returns "just now" for future timestamps (clock skew)', () => {
		const timestamp = new Date('2025-01-15T12:05:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('just now');
	});

	it('returns minutes ago for timestamps less than 1 hour ago', () => {
		const timestamp = new Date('2025-01-15T11:45:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('15 minutes ago');
	});

	it('returns singular "minute ago" for 1 minute', () => {
		const timestamp = new Date('2025-01-15T11:59:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('1 minute ago');
	});

	it('returns hours ago for timestamps less than 1 day ago', () => {
		const timestamp = new Date('2025-01-15T09:00:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('3 hours ago');
	});

	it('returns singular "hour ago" for 1 hour', () => {
		const timestamp = new Date('2025-01-15T11:00:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('1 hour ago');
	});

	it('returns days ago for timestamps less than 1 week ago', () => {
		const timestamp = new Date('2025-01-13T12:00:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('2 days ago');
	});

	it('returns singular "day ago" for 1 day', () => {
		const timestamp = new Date('2025-01-14T12:00:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('1 day ago');
	});

	it('returns formatted date for timestamps more than 1 week ago', () => {
		const timestamp = new Date('2025-01-01T12:00:00Z').toISOString();
		const result = formatRelativeTime(timestamp);
		// The format depends on locale, but should contain "Jan" and "1"
		expect(result).toMatch(/Jan/);
		expect(result).toMatch(/1/);
		expect(result).toMatch(/2025/);
	});

	it('handles edge case: exactly 60 seconds ago', () => {
		const timestamp = new Date('2025-01-15T11:59:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('1 minute ago');
	});

	it('handles edge case: exactly 3600 seconds ago', () => {
		const timestamp = new Date('2025-01-15T11:00:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('1 hour ago');
	});

	it('handles edge case: exactly 86400 seconds ago (1 day)', () => {
		const timestamp = new Date('2025-01-14T12:00:00Z').toISOString();
		expect(formatRelativeTime(timestamp)).toBe('1 day ago');
	});
});
