/**
 * Step 1 form data matching database schema
 */
export interface WizardStep1Data {
	title: string;
	authorName: string | null;
	penName: string | null;
	tagline: string | null;
}

/**
 * Full wizard state for all 6 steps
 * Steps 2-6 data interfaces will be added in subsequent stories
 */
export interface WizardState {
	currentStep: 1 | 2 | 3 | 4 | 5 | 6;
	step1Data: WizardStep1Data | null;
	// step2Data: WizardStep2Data | null; // Story 2.4
	// step3Data: WizardStep3Data | null; // Story 2.5
	// step4Data: WizardStep4Data | null; // Story 2.6
	// step5Data: WizardStep5Data | null; // Story 2.7
	// step6Data: WizardStep6Data | null; // Story 2.8
}
