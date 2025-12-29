/**
 * Format timestamp as relative time (e.g., "2 hours ago")
 * @param timestamp - ISO 8601 timestamp string or null
 * @returns Formatted relative time string
 */
export function formatRelativeTime(timestamp: string | null): string {
	if (!timestamp) return 'Never opened';

	const now = new Date();
	const then = new Date(timestamp);

	// Handle invalid dates
	if (isNaN(then.getTime())) return 'Unknown';

	// Handle future dates (clock skew)
	const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
	if (seconds < 0) return 'just now';

	if (seconds < 60) return 'just now';
	if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
	}
	if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
	}
	if (seconds < 604800) {
		const days = Math.floor(seconds / 86400);
		return `${days} ${days === 1 ? 'day' : 'days'} ago`;
	}

	// More than a week ago, show actual date
	return then.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}
