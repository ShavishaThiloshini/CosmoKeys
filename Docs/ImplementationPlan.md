Cosmo Keys — Implementation Plan
1. Document Overview

Project Name: Cosmo Keys
Document: Implementation Plan
Development Duration: 7 Days
Project Type: Interactive Virtual Piano Web Application

Core Modes
🎹 Normal Piano
🎼 Chords
🎶 Harmony — Bass / Tenor / Alto / Soprano
Technology Stack
React
Vite
Tailwind CSS
React Router
Web Audio API / Audio Layer
JavaScript
Backend

Not required for MVP

2. Implementation Strategy

Cosmo Keys will be developed incrementally.

The development order will be:

Project Foundation
       ↓
Shared Design System
       ↓
Piano Engine
       ↓
Normal Piano
       ↓
Chord System
       ↓
Harmony System
       ↓
Integration & Responsive UX
       ↓
Polish & Deployment

The goal is to complete the core functionality first, then improve visual quality and user experience.

3. Seven-Day Development Schedule
Day	Main Focus	Primary Output
Day 1	Foundation & Design System	Project structure + Galaxy UI foundation
Day 2	Normal Piano	Fully playable virtual piano
Day 3	Chord Mode	Interactive chord explorer
Day 4	Harmony Mode	SATB harmony experience
Day 5	Integration & Responsive UX	Connected and responsive application
Day 6	Polish & Quality Improvements	Refined UI, audio, accessibility
Day 7	Finalization & Deployment	Production-ready Cosmo Keys
4. Day 1 — Project Foundation & Design System
Objective

Create the technical and visual foundation for the entire application.

Tasks
Project Setup
Create React + Vite project.
Configure Tailwind CSS.
Configure React Router.
Remove unnecessary starter files.
Establish clean source structure.

Recommended structure:

src/
├── assets/
├── components/
│   ├── audio/
│   ├── chords/
│   ├── harmony/
│   ├── navigation/
│   ├── piano/
│   └── common/
│
├── data/
├── hooks/
├── pages/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
Routing

Create:

/piano
/chords
/harmony

Set /piano as the default route.

Galaxy Theme

Implement:

Deep-space background.
Primary color variables.
Typography.
Surface/card styling.
Buttons.
Navigation.
Basic responsive layout.
Shared Components

Create initial versions of:

Navbar.
PageHeader.
Button.
Panel/Card.
End-of-Day Result
Cosmo Keys
    │
    ├── Piano Page
    ├── Chords Page
    └── Harmony Page

All routes work.
Galaxy theme is established.
Shared UI components exist.
5. Day 2 — Normal Piano
Objective

Build the core interactive piano system.

This is the foundation that will later be reused by Chords and Harmony.

Piano Data

Create:

notes.js

Include:

Note names.
Octaves.
MIDI values.
Key type.
Keyboard mapping.
Piano Components

Create:

Piano.jsx
PianoKey.jsx
WhiteKey.jsx
BlackKey.jsx
Piano Layout

Implement:

White keys.
Black keys.
Correct positioning.
Note labels.
Interaction

Support:

Mouse.
Touch.
Computer keyboard.
Key States

Implement:

Default
   ↓
Hover
   ↓
Pressed
   ↓
Released
Audio Engine

Create:

AudioEngine.js

Implement:

Audio context.
Individual note playback.
Note release.
Volume control.
Piano Page

Connect:

PianoPage
    ↓
Piano
    ↓
Audio Engine
End-of-Day Result

The user should be able to:

Open Cosmo Keys → press piano keys → see them react → hear notes.

6. Day 3 — Chord Mode
Objective

Build the interactive chord exploration system.

Chord Data

Create:

chords.js

Include common:

Major chords.
Minor chords.

Example:

C
Cm
D
Dm
E
Em
...
Chord Selector

Create:

ChordSelector.jsx

Users should be able to select a chord.

Chord Information

Create:

ChordDisplay.jsx

Display:

Chord name.
Chord symbol.
Notes.
Play button.
Piano Integration

When the user selects a chord:

Select Chord
     ↓
Retrieve Notes
     ↓
Highlight Piano Keys
Chord Playback

Implement:

Play Chord
     ↓
Retrieve Notes
     ↓
Trigger Multiple Notes
     ↓
Play Together
Visual States

Selected chord:

Accent
Glow
Active State

Unselected chords:

Neutral State
End-of-Day Result

The user should be able to:

Select a chord → see its notes → see the notes highlighted on the piano → hear the chord.

7. Day 4 — Harmony Mode
Objective

Implement four-part harmony using:

Soprano
Alto
Tenor
Bass

This is the most technically important day after the piano engine.

Harmony Data

Create:

harmony.js

Each harmony should contain:

Chord
 ↓
Soprano
Alto
Tenor
Bass

Example:

C Major

Soprano → G4
Alto    → E4
Tenor   → C4
Bass    → C3
Harmony Components

Create:

HarmonyDisplay.jsx
VoiceCard.jsx
Voice Cards

Each voice should display:

SOPRANO
G4
ALTO
E4
TENOR
C4
BASS
C3
Harmony Piano Visualization

Selected SATB notes should appear on the shared piano.

Harmony Data
     ↓
SATB Notes
     ↓
Piano Highlighting
Harmony Playback

Implement:

Soprano
Alto
Tenor
Bass
   ↓
Audio Engine
   ↓
Simultaneous Playback
End-of-Day Result

The user should be able to:

Select a chord → see its SATB arrangement → see the notes on the piano → play the four-part harmony.

8. Day 5 — Integration & Responsive UX
Objective

Connect the entire application and make it comfortable across screen sizes.

Navigation

Verify:

Piano ↔ Chords ↔ Harmony

All pages should use the same navigation.

Shared Components

Review and reuse:

Piano.
Buttons.
Panels.
Audio controls.
Page headers.

Avoid creating duplicate versions of the same component.

Responsive Design

Test:

Desktop
Full piano
Large panels
Horizontal layouts
Tablet
Flexible piano
Wrapped controls
Adjusted spacing
Mobile
Stacked sections
Touch-friendly controls
Scrollable/adaptive piano
Compact voice cards
Chord Mobile Layout

Chord buttons should wrap or horizontally scroll.

Harmony Mobile Layout

SATB cards should adapt to:

2 × 2

or

1 × 4

depending on available space.

End-of-Day Result

All three pages should feel like one application, not three separate mini-projects.

9. Day 6 — Polish & Quality Improvements
Objective

Improve the overall experience after all major functionality is complete.

Visual Polish

Refine:

Spacing.
Typography.
Borders.
Shadows.
Galaxy effects.
Active states.
Hover states.
Button states.
Piano Polish

Improve:

Key animations.
Press feedback.
Black-key positioning.
Responsive sizing.
Visual consistency.
Audio Polish

Review:

Audio responsiveness.
Volume control.
Multiple simultaneous notes.
Chord playback.
Harmony playback.
Audio context initialization.
Accessibility

Review:

Keyboard interaction.
Focus states.
Button labels.
Contrast.
Touch target sizes.
Non-color visual feedback.
Galaxy Effects

Add final subtle effects such as:

Stars.
Nebula gradients.
Soft glow.
Background movement.

Keep effects lightweight.

Error Handling

Add safe handling for:

Audio initialization problems.
Invalid chord data.
Invalid harmony data.
Unexpected states.
End-of-Day Result

Cosmo Keys should feel polished rather than like a raw prototype.

10. Day 7 — Finalization & Deployment
Objective

Prepare Cosmo Keys for its final release.

Functional Review

Verify:

Normal Piano
 White keys work.
 Black keys work.
 Mouse works.
 Touch works.
 Keyboard mapping works.
 Audio works.
 Volume works.
Chords
 Chord selection works.
 Chord notes display correctly.
 Piano highlighting works.
 Chord playback works.
 Chord switching works.
Harmony
 Chord selection works.
 SATB voices display correctly.
 Piano highlighting works.
 Harmony playback works.
 Voice information is clear.
Navigation Review

Check:

Piano → Chords
Piano → Harmony
Chords → Piano
Chords → Harmony
Harmony → Piano
Harmony → Chords
Responsive Review

Check:

Desktop.
Tablet.
Mobile.
Build

Run:

npm run build

Resolve any build errors or important warnings.

Deployment

Deploy to the selected static hosting platform.

Possible options:

Netlify.
Vercel.
GitHub Pages.
Final Documentation

Prepare:

README.
Project screenshots.
Feature descriptions.
Tech stack.
Deployment information.
End-of-Day Result

🎹 Cosmo Keys is ready for presentation and deployment.

11. Component Implementation Order

To avoid dependency problems, components should be developed approximately in this order:

1. Navbar
2. PageHeader
3. Button / Panel
4. PianoKey
5. WhiteKey / BlackKey
6. Piano
7. AudioEngine
8. ChordSelector
9. ChordDisplay
10. VoiceCard
11. HarmonyDisplay
12. Data Implementation Order
notes.js
    ↓
chords.js
    ↓
harmony.js

The harmony data depends conceptually on the chord and note systems.

13. Page Implementation Order
PianoPage
    ↓
ChordsPage
    ↓
HarmonyPage

The Normal Piano should be completed first because the piano component becomes the foundation for the other two pages.

14. Feature Dependency Flow
                    Piano Data
                        │
                        ▼
                    Piano UI
                        │
                        ▼
                   Audio Engine
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
          Chord System        Harmony System
              │                   │
              ▼                   ▼
        Chord Playback       SATB Playback
15. State Implementation

The application should initially rely on React state.

Piano
activeNotes
pressedKeys
volume
Chords
selectedChord
activeChordNotes
Harmony
selectedHarmony
sopranoNote
altoNote
tenorNote
bassNote

Avoid introducing global state management unless it becomes necessary.

16. Audio Implementation Strategy

The audio engine should remain independent from the page components.

UI
 ↓
Audio Hook
 ↓
Audio Engine
 ↓
Web Audio API

Pages should not contain low-level audio implementation.

17. Styling Implementation Strategy

The visual system should be established globally and reused everywhere.

Global Theme
     ↓
Components
     ↓
Pages

The galaxy background, typography, spacing, buttons, panels, and interaction states should remain consistent.

18. Responsive Implementation Strategy

Responsive design should not be left until the final day.

Basic responsiveness should be implemented while building each page.

Day 5 is dedicated to a complete responsive pass.

Desktop
   ↓
Tablet
   ↓
Mobile
19. MVP Scope Control

To stay within seven days, the following features should not become blockers:

User authentication.
Backend/database.
MIDI support.
Recording.
Song library.
Advanced chord generation.
Complex composition tools.
Online collaboration.
User profiles.

If time remains after the MVP is complete, these can be considered future enhancements.

20. Daily Completion Rule

Each development day should end with a working feature, not just partially completed code.

Day 1

Foundation works.

Day 2

Piano works.

Day 3

Chords work.

Day 4

Harmony works.

Day 5

All pages work together responsively.

Day 6

Application is polished.

Day 7

Application is finalized and deployable.

21. Final Project Architecture

At the end of development, the application should approximately follow:

Cosmo Keys
│
├── Navigation
│
├── Piano Page
│   └── Shared Piano
│
├── Chords Page
│   ├── Chord Selector
│   ├── Chord Information
│   └── Shared Piano
│
├── Harmony Page
│   ├── Chord Selector
│   ├── SATB Voices
│   └── Shared Piano
│
├── Music Data
│   ├── Notes
│   ├── Chords
│   └── Harmony
│
└── Audio Engine
22. Final Acceptance Checklist
Foundation
 React + Vite configured.
 Tailwind configured.
 Routing configured.
 Galaxy theme implemented.
 Shared components created.
Normal Piano
 White keys.
 Black keys.
 Note labels.
 Mouse interaction.
 Touch interaction.
 Keyboard interaction.
 Audio playback.
 Volume control.
 Active key animation.
Chords
 Major chords.
 Minor chords.
 Chord selector.
 Chord information.
 Note highlighting.
 Chord playback.
Harmony
 Chord selection.
 Soprano.
 Alto.
 Tenor.
 Bass.
 SATB visualization.
 Piano highlighting.
 Harmony playback.
UX
 Navigation works.
 Responsive desktop layout.
 Responsive tablet layout.
 Responsive mobile layout.
 Consistent buttons.
 Consistent panels.
 Clear active states.
 Accessibility basics.
Finalization
 Build succeeds.
 No critical errors.
 Production version tested.
 Deployment completed.
 README completed.
 Screenshots prepared.
23. Definition of Done

Cosmo Keys is considered complete when a user can:

Open Cosmo Keys
      ↓
Choose Piano / Chords / Harmony
      ↓
Play individual notes
      ↓
Explore common chords
      ↓
Visualize chord notes
      ↓
Explore SATB harmony
      ↓
Visualize four voices
      ↓
Hear the selected music
      ↓
Navigate freely between modes

while experiencing a consistent, responsive galaxy-style dark interface.

24. Final Implementation Philosophy

The development should follow one simple principle:

Build the music experience first. Polish the universe around it second. 🌌🎹

The piano interaction, chord system, and harmony system are the heart of Cosmo Keys.

The galaxy visuals, animations, and decorative effects should enhance those features—not become the project themselves.

Document Status

Status: Approved for Development

Project: Cosmo Keys

Development Duration: 7 Days

Core Modes: Normal Piano / Chords / Harmony

Harmony: Bass / Tenor / Alto / Soprano

Frontend: React + Vite

Styling: Tailwind CSS

Routing: React Router

Audio: Web Audio API / Audio Layer

Backend: Not required for MVP

Development Approach: Incremental MVP → Integration → Polish → Deployment