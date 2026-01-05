import { writable } from 'svelte/store';

export interface Toast {
	id: string;
	message: string;
	variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
	duration?: number;
}

interface ToastStore {
	toasts: Toast[];
}

function createToastStore() {
	const { subscribe, set, update } = writable<ToastStore>({ toasts: [] });

	return {
		subscribe,
		show: (toast: Omit<Toast, 'id'>) => {
			const id = Math.random().toString(36).substring(2, 9);
			update((state) => ({
				...state,
				toasts: [...state.toasts, { ...toast, id }]
			}));

			// Auto-remove toast after duration
			if (toast.duration !== 0) {
				setTimeout(() => {
					update((state) => ({
						...state,
						toasts: state.toasts.filter(t => t.id !== id)
					}));
				}, toast.duration || 5000);
			}
		},
		dismiss: (id: string) => {
			update((state) => ({
				...state,
				toasts: state.toasts.filter(t => t.id !== id)
			}));
		},
		clear: () => set({ toasts: [] })
	};
}

export const toastStore = createToastStore();