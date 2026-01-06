import { invoke } from '@tauri-apps/api/core';
import { DEFAULT_PROJECT_LIMIT } from '$lib/utils/constants';

/**
 * Project interface matching Rust Project struct
 */
export interface Project {
	id: number;
	title: string;
	author_name: string | null;
	pen_name: string | null;
	tagline: string | null;
	genre: string | null;
	subgenre: string | null;
	target_audience: string | null;
	tone: string | null;
	point_of_view: string | null;
	story_framework: string | null;
	chapter_count: number | null;
	target_words_per_chapter: number | null;
	plot_premise: string | null;
	language: string;
	created_at: string;
	updated_at: string;
	file_path: string;
	last_opened_at: string | null;
}

/**
 * Sanitize numeric input to prevent injection attacks
 * @param value - The value to sanitize
 * @param defaultValue - The default value to return if validation fails
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Sanitized number or default value
 */
function sanitizeNumber(value: unknown, defaultValue: number, min: number, max: number): number {
	if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
		return defaultValue;
	}

	const numValue = Math.floor(value);
	if (numValue < min || numValue > max) {
		return defaultValue;
	}

	return numValue;
}

/**
 * Sanitize string input to prevent injection attacks
 * @param value - The value to sanitize
 * @param maxLength - Maximum allowed length
 * @returns Sanitized string or empty string
 */
function sanitizeString(value: unknown, maxLength: number = 1000): string {
	if (typeof value !== 'string') {
		return '';
	}

	// Remove potentially dangerous characters
	const sanitized = value.replace(/[<>]/g, '');

	// Truncate to max length
	return sanitized.substring(0, maxLength);
}

/**
 * Sanitize file path to prevent directory traversal
 * @param path - The file path to sanitize
 * @returns Sanitized file path or empty string if invalid
 */
function sanitizeFilePath(path: unknown): string {
	if (typeof path !== 'string') {
		return '';
	}

	// Check for directory traversal attempts
	if (path.includes('../') || path.includes('..\\') || path.startsWith('..')) {
		return '';
	}

	// Additional sanitization can be added here as needed
	return path;
}

/**
 * Fetch recent projects ordered by last_opened_at DESC
 * @param limit - Number of projects to return (default: 10)
 * @returns Promise<Project[]>
 * @example
 * ```typescript
 * const projects = await listRecentProjects(10);
 * console.log(`Loaded ${projects.length} projects`);
 * ```
 */
export async function listRecentProjects(limit?: number): Promise<Project[]> {
	try {
		// Sanitize the limit parameter
		const sanitizedLimit = limit !== undefined
			? sanitizeNumber(limit, DEFAULT_PROJECT_LIMIT, 1, 100)
			: undefined;

		return await invoke<Project[]>('list_recent_projects', { limit: sanitizedLimit });
	} catch (e) {
		console.warn('Failed to invoke list_recent_projects, falling back to mock data:', e);
		return [];
	}
}

/**
 * Get project by ID
 * @param id - Project ID
 * @returns Promise<Project>
 * @example
 * ```typescript
 * const project = await getProject(1);
 * console.log(project.title);
 * ```
 */
export async function getProject(id: number): Promise<Project> {
	// Sanitize the id parameter
	const sanitizedId = sanitizeNumber(id, 1, 1, Number.MAX_SAFE_INTEGER);
	return invoke<Project>('get_project', { id: sanitizedId });
}

/**
 * Delete project by ID
 * @param id - Project ID
 * @returns Promise<void>
 * @example
 * ```typescript
 * await deleteProject(1);
 * console.log('Project deleted');
 * ```
 */
export async function deleteProject(id: number): Promise<void> {
	// Sanitize the id parameter
	const sanitizedId = sanitizeNumber(id, 1, 1, Number.MAX_SAFE_INTEGER);
	return invoke<void>('delete_project', { id: sanitizedId });
}

/**
 * Create project from wizard data
 * @param projectData - The project data from the wizard
 * @returns Promise<Project>
 * @example
 * ```typescript
 * const newProject = await createProject({
 *   title: 'My New Novel',
 *   author_name: 'John Doe',
 *   // ... other fields
 * });
 * console.log('Project created:', newProject.title);
 * ```
 */
export interface CreateProjectRequest {
	title: string;
	author_name?: string | null;
	pen_name?: string | null;
	tagline?: string | null;
	genre?: string | null;
	subgenres?: string[] | null;
	target_audience?: string | null;
	tones?: string[] | null;
	point_of_view?: string | null;
	story_framework?: string | null;
	chapter_count?: number | null;
	words_per_chapter?: number | null;
	plot_premise?: string | null;
	ai_provider?: string | null;
	language: string;
}

export async function createProject(projectData: CreateProjectRequest): Promise<Project> {
	// Sanitize input data
	const sanitizedData = {
		title: sanitizeString(projectData.title),
		author_name: projectData.author_name ? sanitizeString(projectData.author_name) : null,
		pen_name: projectData.pen_name ? sanitizeString(projectData.pen_name) : null,
		tagline: projectData.tagline ? sanitizeString(projectData.tagline) : null,
		genre: projectData.genre ? sanitizeString(projectData.genre) : null,
		subgenres: projectData.subgenres ? projectData.subgenres.map(s => sanitizeString(s)) : null,
		target_audience: projectData.target_audience ? sanitizeString(projectData.target_audience) : null,
		tones: projectData.tones ? projectData.tones.map(s => sanitizeString(s)) : null,
		point_of_view: projectData.point_of_view ? sanitizeString(projectData.point_of_view) : null,
		story_framework: projectData.story_framework ? sanitizeString(projectData.story_framework) : null,
		chapter_count: projectData.chapter_count ? sanitizeNumber(projectData.chapter_count, 0, 0, 10000) : null,
		words_per_chapter: projectData.words_per_chapter ? sanitizeNumber(projectData.words_per_chapter, 0, 0, 100000) : null,
		plot_premise: projectData.plot_premise ? sanitizeString(projectData.plot_premise, 5000) : null,
		ai_provider: projectData.ai_provider ? sanitizeString(projectData.ai_provider) : null,
		language: sanitizeString(projectData.language, 10)
	};

	return invoke<Project>('create_project', { request: sanitizedData });
}
