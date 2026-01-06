// This file provides demo project functionality separate from the component
// This allows proper exports for other modules to import

let isDemoModeValue = $state(false);
let demoProjectIdValue = $state<string | null>(null);

// Sample demo project data
const demoProjectData = {
  id: 'demo-project-1',
  name: 'Sample Novel - The Journey Home',
  description: 'A demo project showing StoryTeller capabilities',
  createdAt: new Date().toISOString(),
  lastOpenedAt: new Date().toISOString(),
  readOnly: true
};

// Sample demo content
const demoStoryBible = [
  {
    id: 'demo-char-1',
    type: 'character',
    name: 'Alex Rivers',
    description: 'A determined protagonist on a journey to find their way home after being lost in a strange land.',
    traits: ['determined', 'curious', 'brave']
  },
  {
    id: 'demo-char-2', 
    type: 'character',
    name: 'Elder Willow',
    description: 'A wise old sage who provides guidance to travelers.',
    traits: ['wise', 'mysterious', 'helpful']
  },
  {
    id: 'demo-char-3',
    type: 'character', 
    name: 'Finn the Guide',
    description: 'A local who knows the paths between worlds.',
    traits: ['knowledgeable', 'cautious', 'loyal']
  },
  {
    id: 'demo-setting-1',
    type: 'setting',
    name: 'The Lost Valley',
    description: 'A mystical valley between worlds where time moves differently.',
    features: ['ancient ruins', 'mystical creatures', 'time distortions']
  },
  {
    id: 'demo-setting-2',
    type: 'setting',
    name: 'The Crossroads Portal',
    description: 'A magical place where multiple dimensions intersect.',
    features: ['dimensional gates', 'shifting landscapes', 'reality distortions']
  },
  {
    id: 'demo-plot-1',
    type: 'plot',
    name: 'The Journey Home',
    description: 'The main character must find their way back to their world.',
    threads: ['finding the portal', 'overcoming obstacles', 'gaining allies']
  },
  {
    id: 'demo-plot-2',
    type: 'plot',
    name: 'The Guide\'s Dilemma',
    description: 'The guide must choose between helping the protagonist and protecting their own world.',
    threads: ['moral conflict', 'sacrifice', 'duty vs. friendship']
  },
  {
    id: 'demo-plot-3',
    type: 'plot',
    name: 'The Elder\'s Secret',
    description: 'Revealing the true purpose of the valley and the protagonist\'s role.',
    threads: ['revelation', 'destiny', 'hidden knowledge']
  },
  {
    id: 'demo-plot-4',
    type: 'plot',
    name: 'The Dimensional Balance',
    description: 'Maintaining stability between worlds during the protagonist\'s journey.',
    threads: ['consequences', 'balance', 'power']
  },
  {
    id: 'demo-plot-5',
    type: 'plot',
    name: 'The Final Choice',
    description: 'The protagonist must choose between staying in the new world or returning home.',
    threads: ['decision', 'growth', 'acceptance']
  }
];

const demoChapters = [
  {
    id: 'demo-ch-1',
    title: 'Chapter 1: Lost and Found',
    content: `Alex Rivers awoke to the sound of unfamiliar birds. The sky was a deep purple with two moons hanging like silver coins. This was definitely not home.

    The last thing they remembered was driving through the storm on Highway 9, trying to make it back in time for their sister's wedding. Then the lightning struck, or perhaps it was something else entirely. The details were hazy.

    Now, standing in a meadow filled with luminescent flowers, Alex realized they had a choice to make: panic or adapt. The practical part of their mind, the part that had helped them through college finals and job interviews, whispered for them to stay calm and assess the situation.`,
    wordCount: 245,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'demo-ch-2',
    title: 'Chapter 2: The Guide Appears',
    content: `As Alex wandered through the strange landscape, they noticed the vegetation was unlike anything from Earth. Trees with silver bark and leaves that chimed softly in the wind. Flowers that pulsed with gentle light in rhythm with some unseen heartbeat.

    "You're not from around here, are you?" came a voice from behind a crystalline boulder.

    Alex spun around to see a figure with kind eyes and travel-worn clothes. The stranger wore a satchel filled with curious objects: a compass with multiple needles, a map that seemed to shift and change, and a staff topped with a glowing orb.

    "I'm Finn," the figure said with a slight smile. "And you, my friend, appear to be very far from home. The question is: do you want to find your way back?"`,
    wordCount: 210,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    aiGenerated: true
  },
  {
    id: 'demo-ch-3',
    title: 'Chapter 3: The Elder\'s Wisdom',
    content: `Finn led Alex to a grove where an ancient tree grew. Its trunk was so wide that a dozen people holding hands couldn't encircle it. Carved into the bark were symbols that seemed to shift when viewed directly.

    "Elder Willow will help you," Finn said reverently. "But be warned - the path home is not always what it seems. Sometimes the journey changes us so much that home itself has changed."

    The tree's bark began to shimmer, and a face formed from the bark and leaves. Gentle, knowing eyes opened and looked at Alex with profound understanding.

    "Welcome, traveler from beyond the veil," the Elder spoke, voice like wind through leaves. "Your desire to return is strong, but the way is complex. Before I can show you the path, you must understand why you were brought here."`,
    wordCount: 195,
    createdAt: new Date(Date.now()).toISOString(), // today
    updatedAt: new Date(Date.now()).toISOString(),
    aiGenerated: true
  }
];

// Function to load the demo project
export async function loadDemoProject() {
  try {
    // In a real implementation, we might need to temporarily store the demo data
    // For now, we'll just set the demo mode flag
    isDemoModeValue = true;
    demoProjectIdValue = demoProjectData.id;
    
    // Store demo data in memory for the session
    // In a real implementation, this would be stored in a Svelte store
    // that other components can access
    (window as any).demoProjectData = demoProjectData;
    (window as any).demoStoryBible = demoStoryBible;
    (window as any).demoChapters = demoChapters;
    
    return demoProjectData;
  } catch (error) {
    console.error('Error loading demo project:', error);
    throw error;
  }
}

// Function to exit demo mode
export async function exitDemoMode() {
  isDemoModeValue = false;
  demoProjectIdValue = null;
  
  // Clean up demo data
  delete (window as any).demoProjectData;
  delete (window as any).demoStoryBible;
  delete (window as any).demoChapters;
}

// Check if currently in demo mode
export function getIsDemoMode() {
  return isDemoModeValue;
}

// For access to the state values
export { isDemoModeValue as isDemoMode, demoProjectIdValue as demoProjectId };
