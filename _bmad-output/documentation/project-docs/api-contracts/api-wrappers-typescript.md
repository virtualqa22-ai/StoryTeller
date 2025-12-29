# API Wrappers (TypeScript)

**Location:** `src/lib/api/projects.ts`

## Purpose
Type-safe wrappers around raw `invoke()` calls with proper TypeScript types.

## Example Wrappers
```typescript
import { invoke } from "@tauri-apps/api/core";
import type { Project, NewProject } from "./types";

export async function listRecentProjects(limit = 10): Promise<Project[]> {
    return await invoke<Project[]>("list_recent_projects", { limit });
}

export async function createProject(projectData: NewProject): Promise<number> {
    return await invoke<number>("create_project", { project_data: projectData });
}

export async function getProject(id: number): Promise<Project> {
    return await invoke<Project>("get_project", { id });
}

export async function updateProject(project: Project): Promise<void> {
    await invoke("update_project_metadata", { project });
}

export async function deleteProject(id: number): Promise<void> {
    await invoke("delete_project", { id });
}

export async function updateLastOpened(id: number): Promise<void> {
    await invoke("update_last_opened", { id });
}
```

## Usage in Components
```svelte
<script lang="ts">
import { listRecentProjects, type Project } from "$lib/api/projects";

let projects: Project[] = $state([]);

$effect(() => {
    listRecentProjects(10).then(data => {
        projects = data;
    }).catch(error => {
        console.error("Failed to load projects:", error);
    });
});
</script>
```

---
