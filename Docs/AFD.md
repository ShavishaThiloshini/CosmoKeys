# Cosmo Keys — Application Flow Document

## 1. Document Overview

**Project Name:** Cosmo Keys

**Document:** Application Flow Document

**Development Duration:** 7 Days

**Application Type:** Interactive Virtual Piano Web Application

**Core Pages:**

1. Normal Piano
2. Chords
3. Harmony

**Theme:** Galaxy-style dark mode

---

# 2. Application Structure

Cosmo Keys uses three dedicated pages connected through a shared navigation system.

```text
                         COSMO KEYS 🌌
                              │
                    ┌─────────┴─────────┐
                    │     Navigation    │
                    └─────────┬─────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
        🎹 PIANO          🎼 CHORDS       🎶 HARMONY
          PAGE              PAGE             PAGE
```

The user can move between any of the three pages at any time.

---

# 3. Entry Flow

When the user opens Cosmo Keys:

```text
Open Cosmo Keys
      ↓
Application Loads
      ↓
Initialize UI
      ↓
Display Piano Page
      ↓
User Can Choose a Mode
```

The default page should be:

**Normal Piano**

---

# 4. Global Navigation Flow

The main navigation should remain available across all pages.

```text
                   COSMO KEYS
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
     Piano           Chords          Harmony
       │               │                │
       └───────────────┼────────────────┘
                       │
                  Switch Mode
```

Users should not need to return to a homepage to switch modes.

---

# 5. Page 1 — Normal Piano Flow

## 5.1 Purpose

The Normal Piano page allows users to play individual piano notes.

## 5.2 Main Flow

```text
Open Piano Page
      ↓
Display Piano
      ↓
User Selects a Key
      ↓
Detect Input
      ↓
Highlight Key
      ↓
Play Note
      ↓
Release Key
      ↓
Return to Idle State
```

---

# 6. Piano Input Flow

Cosmo Keys should support multiple input methods.

```text
                 User Input
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
       Mouse       Touch     Keyboard
          │          │          │
          └──────────┼──────────┘
                     ▼
                Piano Key
                     ↓
              Active State
                     ↓
                Audio Note
```

---

# 7. Normal Piano — Mouse Flow

```text
User clicks piano key
        ↓
Identify key
        ↓
Identify note
        ↓
Activate visual state
        ↓
Play audio
        ↓
Mouse release
        ↓
Deactivate visual state
```

---

# 8. Normal Piano — Touch Flow

```text
User taps piano key
        ↓
Identify key
        ↓
Activate visual state
        ↓
Play audio
        ↓
Touch release
        ↓
Return to normal state
```

The touch targets should remain large enough for comfortable mobile interaction.

---

# 9. Normal Piano — Keyboard Flow

```text
User presses mapped keyboard key
        ↓
Find corresponding piano note
        ↓
Activate piano key
        ↓
Play note
        ↓
User releases keyboard key
        ↓
Deactivate piano key
```

Repeated `keydown` events should not unintentionally create multiple note triggers while the physical key remains held.

---

# 10. Volume Control Flow

```text
User changes volume
        ↓
Read new volume value
        ↓
Update Audio Engine
        ↓
Future sounds use new volume
```

The volume control should be available where appropriate without distracting from the piano.

---

# 11. Page 2 — Chords Flow

## 11.1 Purpose

The Chords page allows users to explore common chords and understand their notes.

## 11.2 Main Flow

```text
Open Chords Page
      ↓
Display Chord Options
      ↓
User Selects Chord
      ↓
Find Chord Data
      ↓
Identify Chord Notes
      ↓
Highlight Piano Keys
      ↓
Display Chord Information
      ↓
User Plays Chord
      ↓
Audio Playback
```

---

# 12. Chord Selection Flow

Example:

```text
User selects "C Major"
          ↓
Chord = C Major
          ↓
Retrieve notes
          ↓
C + E + G
          ↓
Highlight C, E, G
          ↓
Display "C Major"
          ↓
Display notes
```

---

# 13. Chord Playback Flow

```text
Selected Chord
      ↓
Retrieve chord notes
      ↓
Convert notes to playable values
      ↓
Send notes to Audio Engine
      ↓
Play notes together
      ↓
Highlight active keys
      ↓
Return to selected state
```

---

# 14. Chord Switching Flow

When a different chord is selected:

```text
Current Chord
      ↓
User selects another chord
      ↓
Clear previous highlights
      ↓
Load new chord
      ↓
Identify new notes
      ↓
Highlight new piano keys
      ↓
Update chord information
```

Only the currently selected chord should remain highlighted unless multiple selection is intentionally introduced later.

---

# 15. Chord Information Flow

The selected chord should provide enough information for the user to understand it.

```text
Selected Chord
      ↓
Chord Name
      ↓
Chord Symbol
      ↓
Notes
      ↓
Piano Visualization
```

Example:

```text
C Major
C

Notes:
C4
E4
G4
```

---

# 16. Page 3 — Harmony Flow

## 16.1 Purpose

The Harmony page provides an interactive representation of four-part harmony.

The four voices are:

```text
Soprano
Alto
Tenor
Bass
```

---

# 17. Harmony Main Flow

```text
Open Harmony Page
       ↓
Display Chord Options
       ↓
User Selects Chord
       ↓
Find Harmony Data
       ↓
Assign SATB Notes
       ↓
Display Four Voices
       ↓
Highlight Piano Keys
       ↓
User Plays Harmony
       ↓
Play Four Voices Together
```

---

# 18. SATB Flow

The selected harmony should be separated into four voices.

```text
                    Selected Chord
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
         Soprano        Alto         Tenor
             │            │            │
             └────────────┼────────────┘
                          │
                         Bass
```

More specifically:

```text
Selected Chord
      ↓
Harmony Configuration
      ↓
┌───────────┐
│ Soprano   │ → Note
├───────────┤
│ Alto      │ → Note
├───────────┤
│ Tenor     │ → Note
├───────────┤
│ Bass      │ → Note
└───────────┘
      ↓
Piano Visualization
```

---

# 19. Harmony Visualization Flow

```text
Select Chord
      ↓
Generate / Retrieve Harmony
      ↓
Assign SATB notes
      ↓
Display voice cards
      ↓
Highlight corresponding piano keys
```

Example:

```text
Soprano → G4
Alto    → E4
Tenor   → C4
Bass    → C3
```

The piano should visually indicate all four active notes.

---

# 20. Harmony Playback Flow

```text
User selects harmony
        ↓
Retrieve SATB notes
        ↓
Prepare four notes
        ↓
Send notes to Audio Engine
        ↓
Play simultaneously
        ↓
Highlight four piano positions
        ↓
Playback complete
```

---

# 21. Individual Voice Interaction

If implemented within the MVP, users may be able to interact with individual voice information.

Example:

```text
Soprano
G4
[Play]

Alto
E4
[Play]

Tenor
C4
[Play]

Bass
C3
[Play]
```

Selecting an individual voice should:

```text
Select Voice
     ↓
Identify Voice Note
     ↓
Highlight Corresponding Piano Key
     ↓
Play Individual Note
```

If individual voice playback is not included during the core implementation, the interface should still clearly display the voice assignments.

---

# 22. Mode Switching Flow

Users can switch between modes from any page.

### Piano → Chords

```text
Piano Page
    ↓
Click Chords
    ↓
Chords Page
```

### Chords → Harmony

```text
Chords Page
    ↓
Click Harmony
    ↓
Harmony Page
```

### Harmony → Piano

```text
Harmony Page
    ↓
Click Piano
    ↓
Piano Page
```

No page should require a full application restart when switching modes.

---

# 23. Audio State Flow

All three modes should use the shared Audio Engine.

```text
User Action
     ↓
Page Logic
     ↓
Audio Request
     ↓
Audio Engine
     ↓
Web Audio API
     ↓
Sound Output
```

Examples:

```text
Piano Page
→ playNote()

Chords Page
→ playChord()

Harmony Page
→ playHarmony()
```

---

# 24. Error / Empty State Flow

The application should handle unexpected states gracefully.

## Invalid Chord

```text
Chord selection
      ↓
Chord data unavailable
      ↓
Show safe fallback
      ↓
Do not trigger invalid audio
```

## Invalid Harmony

```text
Harmony data unavailable
      ↓
Show unavailable state
      ↓
Keep page functional
```

## Audio Problem

```text
User attempts playback
      ↓
Audio unavailable
      ↓
Display helpful message
      ↓
Allow retry
```

---

# 25. Mobile Flow

On mobile devices:

```text
Open Application
      ↓
Responsive Layout
      ↓
Open Navigation
      ↓
Select Mode
      ↓
Use Touch Controls
      ↓
Interact With Piano
```

The piano should remain usable even when the available screen width is limited.

---

# 26. Overall User Journey

The complete primary journey can be represented as:

```text
                    START
                      │
                      ▼
               COSMO KEYS 🌌
                      │
                      ▼
                NORMAL PIANO
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
       Play Note    CHORDS      HARMONY
                      │           │
                      ▼           ▼
                 Select Chord   Select Chord
                      │           │
                      ▼           ▼
                 View Notes    View SATB
                      │           │
                      ▼           ▼
                 Play Chord    Play Harmony
                      │           │
                      └─────┬─────┘
                            │
                            ▼
                       Explore Again
```

---

# 27. Primary User Experience Loop

The core experience should follow:

```text
                EXPLORE
                   ↓
                 SELECT
                   ↓
                VISUALIZE
                   ↓
                  PLAY
                   ↓
               UNDERSTAND
                   ↓
                EXPLORE
```

This loop is especially important for the Chords and Harmony pages.

---

# 28. Navigation Rules

The application should follow these navigation principles:

1. Main navigation should always be accessible.
2. Current page should have a clear active state.
3. Users should be able to move directly between the three modes.
4. Navigation should not interrupt audio unexpectedly.
5. Page transitions should remain simple and fast.
6. Mobile navigation should be touch-friendly.

---

# 29. Page Responsibilities

| Page        | Primary Responsibility        |
| ----------- | ----------------------------- |
| **Piano**   | Play individual notes         |
| **Chords**  | Explore and play chords       |
| **Harmony** | Explore and play SATB harmony |

Shared responsibilities:

* Navigation.
* Piano rendering.
* Audio engine.
* Responsive layout.
* Galaxy theme.

---

# 30. Final Application Flow

```text
                         COSMO KEYS 🌌
                              │
                         Application
                              │
                    ┌─────────┴─────────┐
                    │                   │
                 Navigation         Shared Systems
                    │                   │
          ┌─────────┼─────────┐         ├── Piano Engine
          │         │         │         ├── Audio Engine
          ▼         ▼         ▼         └── Theme
       PIANO     CHORDS    HARMONY
          │         │         │
          │         │         └── SATB
          │         │
          │         └── Chord Data
          │
          └── Individual Notes
```

---

# 31. Flow Completion Criteria

The application flow is considered complete when:

* Users can enter the application.
* Users can access all three pages.
* Users can navigate between pages.
* Users can play individual piano notes.
* Users can select common chords.
* Selected chord notes are visualized.
* Users can play chords.
* Users can select harmony configurations.
* SATB voices are displayed.
* Harmony notes are visualized.
* Users can play four-part harmony.
* Touch and keyboard interaction work where applicable.
* Audio behavior is consistent across modes.
* Responsive navigation works on smaller screens.

---

## Document Status

**Status:** Approved

**Project:** Cosmo Keys

**Core Pages:** Piano / Chords / Harmony

**Harmony Structure:** Bass / Tenor / Alto / Soprano

**Primary User Flow:** Explore → Select → Visualize → Play → Understand

**Development Duration:** 7 Days
