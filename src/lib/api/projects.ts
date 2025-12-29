import { invoke } from '@tauri-apps/api/core';

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
	return invoke<Project[]>('list_recent_projects', { limit });
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
	return invoke<Project>('get_project', { id });
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
	return invoke<void>('delete_project', { id });
}
