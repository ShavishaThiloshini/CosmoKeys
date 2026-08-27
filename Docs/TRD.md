# Cosmo Keys — Technical Requirements Document (TRD)

## 1. Document Overview

**Project Name:** Cosmo Keys

**Document:** Technical Requirements Document (TRD)

**Project Type:** Interactive Virtual Piano Web Application

**Development Duration:** 7 Days

**Primary Architecture:** Frontend-focused web application

**Backend:** Not required for the MVP

---

# 2. Technical Objective

The technical objective of Cosmo Keys is to create a responsive, interactive, and reusable virtual piano application supporting three independent pages:

1. **Normal Piano**
2. **Chords**
3. **Harmony**

The application should share a common piano and audio engine while keeping mode-specific logic separated.

The architecture should be simple enough to complete within seven days while remaining maintainable and expandable.

---

# 3. Recommended Technology Stack

## 3.1 Frontend

### React

React will be used to build the application's component-based interface.

Reasons:

* Component reusability.
* Easy state management for interactive piano keys.
* Suitable for multi-page SPA architecture.
* Good ecosystem.
* Easy integration with audio APIs.

### Vite

Vite will be used as the development and build tool.

Benefits:

* Fast development server.
* Fast production builds.
* Simple configuration.
* Suitable for React applications.

---

# 4. Styling Technology

## Tailwind CSS

Tailwind CSS will be used for application styling.

It will be used for:

* Layout.
* Responsive design.
* Spacing.
* Typography.
* Colors.
* Component states.
* Dark theme.
* Animations and transitions where appropriate.

The galaxy theme should be implemented primarily through reusable Tailwind classes and CSS variables rather than repeating large amounts of custom CSS.

---

# 5. Routing

## React Router

React Router will be used to manage the three application pages.

Recommended routes:

```text
/
├── /piano
├── /chords
└── /harmony
```

The root route can redirect to `/piano` or display a simple landing/entry screen if required.

### Route Responsibilities

| Route      | Purpose              |
| ---------- | -------------------- |
| `/piano`   | Normal virtual piano |
| `/chords`  | Chord exploration    |
| `/harmony` | SATB harmony         |

---

# 6. Application Architecture

The application should follow a modular component architecture.

```text
src/
│
├── assets/
│
├── components/
│   ├── piano/
│   │   ├── Piano.jsx
│   │   ├── PianoKey.jsx
│   │   ├── WhiteKey.jsx
│   │   └── BlackKey.jsx
│   │
│   ├── audio/
│   │   └── AudioEngine.js
│   │
│   ├── chords/
│   │   ├── ChordButton.jsx
│   │   └── ChordDisplay.jsx
│   │
│   ├── harmony/
│   │   ├── VoiceCard.jsx
│   │   └── HarmonyDisplay.jsx
│   │
│   ├── navigation/
│   │   └── Navbar.jsx
│   │
│   └── common/
│       ├── Button.jsx
│       └── Panel.jsx
│
├── pages/
│   ├── PianoPage.jsx
│   ├── ChordsPage.jsx
│   └── HarmonyPage.jsx
│
├── data/
│   ├── notes.js
│   ├── chords.js
│   └── harmony.js
│
├── hooks/
│   ├── usePiano.js
│   └── useAudio.js
│
├── utils/
│   └── musicUtils.js
│
├── App.jsx
├── main.jsx
└── index.css
```

The exact file structure may be adjusted during implementation if a simpler structure is more appropriate.

---

# 7. Shared Piano Engine

The piano should be implemented as a reusable component.

```text
Piano
│
├── White Keys
│
└── Black Keys
```

The same component should be usable by:

* Piano Page.
* Chords Page.
* Harmony Page.

The parent page should control which notes are:

* Played.
* Highlighted.
* Selected.
* Disabled, if required.

---

# 8. Piano Key Data Model

Each piano key should be represented using structured data.

Example:

```javascript
{
  note: "C",
  octave: 4,
  type: "white",
  midi: 60,
  keyboardKey: "a"
}
```

A black key may use:

```javascript
{
  note: "C#",
  octave: 4,
  type: "black",
  midi: 61,
  keyboardKey: "w"
}
```

The data structure should make it possible to:

* Render keys.
* Identify notes.
* Map computer keyboard inputs.
* Trigger audio.
* Highlight selected notes.

---

# 9. Piano Layout

The piano should contain both:

### White Keys

```text
C  D  E  F  G  A  B
```

### Black Keys

```text
C# D#    F# G# A#
```

The black keys should visually sit above the corresponding white keys.

The layout should be implemented using a predictable structure rather than manually positioning every key with arbitrary pixel values.

---

# 10. Keyboard Interaction

The application should support computer keyboard input.

A keyboard mapping should be defined in the note data.

Example:

```text
A → C
W → C#
S → D
E → D#
D → E
F → F
T → F#
G → G
Y → G#
H → A
U → A#
J → B
```

The exact mapping may be adjusted during implementation based on the final piano range.

The system should respond to:

* `keydown`
* `keyup`

Repeated browser key events should not unnecessarily trigger repeated sounds while a key is being held.

---

# 11. Mouse and Touch Interaction

Piano keys must support:

* Mouse click.
* Touch/tap.
* Press and release feedback.

The interaction should be responsive and should not require users to precisely hit tiny areas.

Touch behavior should be tested on mobile layouts.

---

# 12. Audio Architecture

The application requires a client-side audio system.

## Recommended Approach

Use the browser's **Web Audio API** as the base audio mechanism or a lightweight audio library built around it.

The audio system should provide functions conceptually similar to:

```text
playNote(note)
stopNote(note)

playChord(notes)
playHarmony(notes)

setVolume(value)
```

The implementation should keep audio logic separate from UI components.

---

# 13. Audio Engine Responsibilities

The Audio Engine should handle:

* Audio context initialization.
* Individual note playback.
* Note release.
* Multiple simultaneous notes.
* Chord playback.
* Harmony playback.
* Volume control.
* Audio cleanup.

UI components should request sounds rather than directly managing low-level audio logic.

---

# 14. Audio Initialization

Modern browsers may restrict automatic audio playback before user interaction.

Therefore, the application should initialize or resume the audio context after an intentional user interaction.

Example flow:

```text
User interacts
      ↓
Initialize / Resume Audio Context
      ↓
Play Requested Note
```

The application should not attempt to autoplay audio when the page first loads.

---

# 15. Normal Piano Technical Requirements

The Normal Piano page should:

* Render the shared piano.
* Allow individual note playback.
* Highlight pressed keys.
* Support keyboard controls.
* Support mouse/touch controls.
* Provide volume control.
* Maintain responsive layout.

Component relationship:

```text
PianoPage
   │
   ├── Piano
   │     ├── WhiteKey
   │     └── BlackKey
   │
   └── AudioEngine
```

---

# 16. Chord System

Chords should be stored as structured frontend data.

Example:

```javascript
{
  id: "c-major",
  name: "C Major",
  symbol: "C",
  notes: ["C4", "E4", "G4"]
}
```

A chord can therefore be:

```text
Chord
 ↓
Notes
 ↓
Piano Highlighting
 ↓
Audio Playback
```

---

# 17. Chord Categories

The initial MVP should focus on common chords.

### Major

* C
* D
* E
* F
* G
* A
* B

### Minor

* Cm
* Dm
* Em
* Fm
* Gm
* Am
* Bm

### Optional

If time allows:

* Diminished chords.
* Seventh chords.
* Suspended chords.

Advanced chord types are not required for the MVP.

---

# 18. Chord Page Architecture

```text
ChordsPage
│
├── ChordSelector
│
├── ChordDisplay
│
├── Piano
│
└── AudioEngine
```

When a chord is selected:

```text
Selected Chord
      ↓
Retrieve Notes
      ↓
Highlight Piano Keys
      ↓
Display Chord Information
      ↓
Play Chord
```

---

# 19. Harmony Data Model

Harmony will use four voice categories:

```text
Bass
Tenor
Alto
Soprano
```

Each harmony should contain note assignments.

Example:

```javascript
{
  chord: "C Major",
  voices: {
    bass: "C3",
    tenor: "C4",
    alto: "E4",
    soprano: "G4"
  }
}
```

The structure should allow future changes to voice assignments without modifying the UI architecture.

---

# 20. Harmony Page Architecture

```text
HarmonyPage
│
├── ChordSelector
│
├── HarmonyDisplay
│   ├── Bass
│   ├── Tenor
│   ├── Alto
│   └── Soprano
│
├── Piano
│
└── AudioEngine
```

---

# 21. Harmony Playback

When the user selects a harmony:

```text
Bass Note
Tenor Note
Alto Note
Soprano Note
       │
       ▼
  Audio Engine
       │
       ▼
Simultaneous Playback
```

The system should play the four voices together as a harmony.

The application should also allow individual voice information to be viewed clearly.

---

# 22. State Management

The MVP does not require a dedicated global state management library.

React state and custom hooks should be sufficient.

Potential state:

```text
currentRoute
activeNotes
selectedChord
selectedHarmony
volume
pressedKeys
```

Local state should be preferred where possible.

Shared state should only be introduced when multiple components genuinely need it.

---

# 23. Custom Hooks

Custom React hooks may be used to isolate reusable logic.

### `usePiano`

Responsibilities:

* Key state.
* Keyboard mapping.
* Press/release handling.
* Active note management.

### `useAudio`

Responsibilities:

* Audio context.
* Note playback.
* Chord playback.
* Harmony playback.
* Volume.

The hooks should remain focused rather than becoming large "everything" hooks.

---

# 24. Styling Architecture

Tailwind CSS should be combined with CSS variables for the core visual theme.

Example conceptual variables:

```css
:root {
  --cosmo-bg: #050816;
  --cosmo-surface: #0B1026;
  --cosmo-purple: #7C3AED;
  --cosmo-violet: #A855F7;
  --cosmo-blue: #38BDF8;
  --cosmo-text: #F8FAFC;
  --cosmo-muted: #94A3B8;
}
```

The final visual values will be documented in `UI_UX_BRIEF.md`.

---

# 25. Galaxy Background

The galaxy theme should be implemented efficiently.

Possible techniques:

* CSS gradients.
* Subtle radial gradients.
* Lightweight star patterns.
* CSS animations.
* Minimal decorative elements.

Large background images should be avoided unless there is a strong design reason.

The background must not negatively affect performance or readability.

---

# 26. Component Reusability

The following components should be reusable:

* Navbar.
* Piano.
* PianoKey.
* Button.
* Panel/Card.
* ChordSelector.
* ChordDisplay.
* VoiceCard.
* Audio controls.

Mode-specific behavior should be passed through props or controlled by page-level logic.

---

# 27. Responsive Architecture

The application should use responsive Tailwind breakpoints.

### Desktop

* Full-width piano.
* Multi-column control panels where appropriate.

### Tablet

* Reduced spacing.
* Flexible piano sizing.
* Adapted control layout.

### Mobile

* Horizontally scrollable or appropriately scaled piano.
* Stacked controls.
* Touch-friendly buttons.
* Simplified layouts where required.

The piano must remain usable rather than becoming visually compressed.

---

# 28. Accessibility

Technical implementation should include:

* Semantic buttons for controls.
* Accessible labels.
* Keyboard navigation.
* Visible focus states.
* Appropriate ARIA attributes where needed.
* Non-color indicators for important states.

Piano interaction should remain understandable when visual effects are disabled.

---

# 29. Performance Requirements

The application should:

* Avoid unnecessary component re-renders.
* Reuse audio resources where appropriate.
* Avoid large unnecessary dependencies.
* Keep decorative animations lightweight.
* Avoid expensive effects on every piano key interaction.

The primary interaction priority is:

**Low input latency → reliable audio → smooth visual feedback.**

---

# 30. Error Handling

The application should gracefully handle:

* Audio initialization failure.
* Unsupported browser behavior.
* Missing note data.
* Invalid chord selection.
* Invalid harmony configuration.

The UI should avoid exposing raw JavaScript errors to users.

---

# 31. Browser Compatibility

The application should target modern browsers supporting:

* ES6+ JavaScript.
* React.
* Web Audio API.
* Modern CSS.
* Touch and pointer events.

Primary testing should include modern:

* Chrome.
* Edge.
* Firefox.
* Safari where available.

---

# 32. Backend Decision

No backend is required for the MVP.

### Reason

Cosmo Keys primarily consists of:

* Static musical data.
* Client-side interactions.
* Client-side audio.
* Temporary UI state.

Therefore:

```text
Frontend
   │
   ├── Piano Data
   ├── Chord Data
   ├── Harmony Data
   └── Audio Engine
```

is sufficient for the initial release.

---

# 33. Potential Future Backend

A backend could be introduced in future versions for:

* User accounts.
* Saved compositions.
* Saved chord progressions.
* Practice history.
* User-created harmonies.
* Favorites.
* Learning progress.

These are outside the MVP.

---

# 34. Security Considerations

Since the MVP does not contain authentication or a backend, security requirements are minimal.

The application should still:

* Avoid unsafe HTML injection.
* Avoid storing unnecessary user information.
* Validate dynamic musical data.
* Keep dependencies updated.
* Avoid exposing unnecessary configuration.

---

# 35. Deployment Requirements

The application should produce a production build using:

```bash
npm run build
```

The resulting application should be deployable to a static hosting platform.

Potential deployment platforms include:

* Netlify.
* Vercel.
* GitHub Pages.

The final platform can be selected during the deployment stage.

---

# 36. Environment Variables

The MVP should require no sensitive environment variables.

If external services are introduced later, environment variables should be used rather than hardcoding credentials.

---

# 37. Development Standards

The project should follow:

* Reusable React components.
* Clear component naming.
* Meaningful variable names.
* Small focused functions.
* Separation of UI and audio logic.
* Structured musical data.
* Responsive-first styling.
* Avoidance of unnecessary dependencies.

---

# 38. Technical Constraints

The 7-day development schedule requires controlled scope.

Therefore:

* No unnecessary backend.
* No authentication.
* No complex state management.
* No large UI framework.
* No unnecessary third-party libraries.
* No advanced DAW features.
* No complex music-generation engine for the MVP.

The architecture should prioritize **working core functionality over excessive abstraction**.

---

# 39. High-Level Technical Flow

```text
                    Cosmo Keys
                        │
                  React Application
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       Piano Page    Chords Page   Harmony Page
          │             │             │
          └─────────────┼─────────────┘
                        │
                  Shared Piano
                        │
                ┌───────┴───────┐
                │               │
           Piano Data       Audio Engine
                │               │
          Notes / Keys      Web Audio API
                │               │
          ┌─────┴─────┐         │
          │           │         │
       Chord Data  Harmony Data │
          │           │         │
          └─────┬─────┴─────────┘
                │
          Interactive Output
```

---

# 40. MVP Technical Acceptance Criteria

The technical implementation will be considered complete when:

* React application runs successfully.
* All three routes/pages work.
* Piano keys render correctly.
* White and black keys are positioned correctly.
* Individual notes can be played.
* Computer keyboard interaction works.
* Mouse/touch interaction works.
* Chords can be selected.
* Chord notes can be highlighted.
* Chords can be played simultaneously.
* SATB harmony can be selected and visualized.
* Four-part harmony can be played.
* Shared piano components work across all three pages.
* Audio logic is separated from UI logic.
* The galaxy dark theme is consistently implemented.
* The application is responsive.
* Production build completes successfully.

---

# 41. Future Technical Expansion

The architecture should leave room for:

```text
Cosmo Keys MVP
      │
      ├── Scales
      ├── Arpeggios
      ├── Chord Progressions
      ├── Recording
      ├── Playback
      ├── MIDI
      ├── Ear Training
      ├── User Accounts
      └── Saved Music
```

These features should be added incrementally rather than over-engineering the MVP.

---

# 42. Technical Summary

Cosmo Keys will be implemented as a **React + Vite + Tailwind CSS** web application using a reusable piano component and client-side audio engine.

The three pages will share common infrastructure while maintaining separate mode-specific logic:

```text
Normal Piano
     ↓
Individual Notes

Chords
     ↓
Common Chords
     ↓
Highlighted Notes
     ↓
Chord Playback

Harmony
     ↓
SATB Assignment
     ↓
Voice Visualization
     ↓
Four-Part Playback
```

The MVP will remain **frontend-only**, lightweight, responsive, and suitable for completion within the planned **7-day development schedule**.

---

## Document Status

**Status:** Approved

**Project:** Cosmo Keys

**Version:** MVP Technical Requirements

**Development Duration:** 7 Days

**Frontend:** React + Vite

**Styling:** Tailwind CSS

**Routing:** React Router

**Audio:** Web Audio API / Lightweight Audio Layer

**Backend:** Not required for MVP

**Core Modes:** Piano / Chords / Harmony (SATB)
