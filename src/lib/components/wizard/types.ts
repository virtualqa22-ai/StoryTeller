/**
 * Step 1 form data matching database schema
 * Optional fields use empty string instead of null for cleaner input binding
 */
export interface WizardStep1Data {
	title: string;
	authorName: string;
	penName: string;
	tagline: string;
}

// Step 2: Genre and Audience data structures

// Genre options
export const GENRES = [
	'Thriller',
	'Romance',
	'Fantasy',
	'Sci-Fi',
	'Mystery',
	'Horror',
	'Literary Fiction',
	'Historical Fiction',
	'Other'
] as const;

export type Genre = typeof GENRES[number];

// Subgenre mapping (genre → subgenres)
export const SUBGENRES_BY_GENRE: Record<Genre, string[]> = {
	Thriller: ['Psychological Thriller', 'Legal Thriller', 'Spy Thriller', 'Action Thriller', 'Medical Thriller'],
	Romance: [
		'Contemporary Romance',
		'Historical Romance',
		'Paranormal Romance',
		'Romantic Suspense',
		'Romcom'
	],
	Fantasy: ['High Fantasy', 'Urban Fantasy', 'Epic Fantasy', 'Dark Fantasy', 'Sword & Sorcery', 'Magical Realism'],
	'Sci-Fi': [
		'Space Opera',
		'Cyberpunk',
		'Hard Science Fiction',
		'Time Travel',
		'Dystopian',
		'Alien First Contact'
	],
	Mystery: ['Cozy Mystery', 'Police Procedural', 'Whodunit', 'Noir', 'Thriller Mystery'],
	Horror: ['Supernatural Horror', 'Psychological Horror', 'Slasher', 'Body Horror', 'Gothic Horror'],
	'Literary Fiction': ['Contemporary Literary', 'Historical Literary', 'Magical Realism (Literary)', 'Experimental'],
	'Historical Fiction': ['Regency', 'Medieval', 'World War II', 'Ancient Civilizations', 'Victorian'],
	Other: ['Not Specified']
};

// Target audience options
export const TARGET_AUDIENCES = [
	'Young Adult (YA)',
	'New Adult (NA)',
	'Adult',
	'Middle Grade',
	'Children'
] as const;

export type TargetAudience = typeof TARGET_AUDIENCES[number];

// Tone options
export const TONES = ['Dark', 'Light', 'Humorous', 'Serious', 'Suspenseful', 'Romantic', 'Adventurous', 'Philosophical'] as const;

export type Tone = typeof TONES[number];

// Step 2 form data
export interface WizardStep2Data {
	genre: string; // Required, single selection
	subgenres: string[]; // Optional, multiple selections (empty array if none)
	targetAudience: string; // Required, single selection
	tones: string[]; // Optional, multiple selections (empty array if none)
}

/**
 * Full wizard state for all 6 steps
 * Steps 2-6 data interfaces will be added in subsequent stories
 */
export interface WizardState {
	currentStep: 1 | 2 | 3 | 4 | 5 | 6;
	step1Data: WizardStep1Data | null;
	step2Data: WizardStep2Data | null; // Story 2.4
	step3Data: WizardStep3Data | null; // Story 2.5
	step4Data: WizardStep4Data | null; // Story 2.6
	// step5Data: WizardStep5Data | null; // Story 2.7
	// step6Data: WizardStep6Data | null; // Story 2.8
}

// Step 3: Story Structure data structures
export const POV_OPTIONS = [
	'First Person',
	'Third Person Limited',
	'Third Person Omniscient',
	'Multiple POV'
] as const;

export type PointOfView = typeof POV_OPTIONS[number];

export const STORY_FRAMEWORKS = [
	'Three-Act Structure',
	'Five-Act Structure',
	"Hero's Journey",
	'Snowflake Method',
	'Seven-Point Story Structure',
	'Custom/Freeform'
] as const;

export type StoryFramework = typeof STORY_FRAMEWORKS[number];

// Framework descriptions for tooltips
export const FRAMEWORK_DESCRIPTIONS: Record<StoryFramework, string> = {
	'Three-Act Structure': 'Classic setup, confrontation, and resolution structure. Simple and widely used.',
	'Five-Act Structure': 'Expanded dramatic arc with exposition, rising action, climax, falling action, and denouement.',
	"Hero's Journey": "Campbell's monomyth: hero leaves home, faces trials, transforms, and returns changed.",
	'Snowflake Method': 'Start with a one-sentence summary and expand iteratively into detailed scenes.',
	'Seven-Point Story Structure': 'Hook, plot turn 1, pinch 1, midpoint, pinch 2, plot turn 2, resolution.',
	'Custom/Freeform': 'No predefined structure—follow your own narrative approach.'
};

export interface WizardStep3Data {
	pointOfView: PointOfView;
	storyFramework: StoryFramework;
	chapterCount: number;
	wordsPerChapter: number;
	totalTargetWords: number; // derived = chapterCount * wordsPerChapter
}

// Step 4: Plot Premise data structure
export interface WizardStep4Data {
	plotPremise: string;
}
