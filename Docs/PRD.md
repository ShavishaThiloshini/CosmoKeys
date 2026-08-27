# Cosmo Keys — Product Requirements Document (PRD)

## 1. Project Overview

**Project Name:** Cosmo Keys

**Project Type:** Interactive Virtual Piano Web Application

**Development Duration:** 7 Days

**Theme:** Galaxy-style dark mode

**Primary Goal:**
Cosmo Keys is an interactive web-based music application that allows users to play a virtual piano, explore common chords, and understand four-part harmony through an interactive piano and visual interface.

The application will contain **three dedicated modes/pages**:

1. **Normal Piano** — Play individual piano notes.
2. **Chords** — Explore and play common chords.
3. **Harmony** — Visualize and play four-part SATB harmony using Bass, Tenor, Alto, and Soprano.

---

# 2. Problem Statement

Learning piano notes, chords, and harmony can be difficult when users have to rely on separate resources.

Traditional chord charts may show the notes of a chord but do not provide an interactive way to hear and visualize them. Similarly, understanding four-part harmony can be challenging because learners need to understand how individual voices work together within a chord.

Cosmo Keys aims to provide a single interactive environment where users can:

* Play piano notes.
* Learn and explore common chords.
* See which piano keys belong to a chord.
* Understand how chords are distributed across SATB voices.
* Hear individual notes, chords, and four-part harmony.

---

# 3. Product Goals

### Primary Goals

* Provide an intuitive virtual piano experience.
* Make individual piano notes easy to play and understand.
* Allow users to explore common musical chords interactively.
* Visually highlight the notes belonging to selected chords.
* Introduce four-part SATB harmony through visual and audio interaction.
* Create a visually engaging galaxy-themed music experience.
* Provide a responsive experience across desktop, tablet, and mobile devices.

### Secondary Goals

* Make music concepts easier to understand visually.
* Keep the interface simple enough for beginners.
* Build the application with reusable components.
* Maintain a clear separation between the three modes.

---

# 4. Target Users

## 4.1 Beginner Piano Learners

Users who are learning basic piano notes and want an interactive way to practice.

## 4.2 Music Students

Students who want to explore chords and four-part harmony.

## 4.3 Casual Users

Users who simply want to experiment with a virtual piano and play music.

## 4.4 Developers / Portfolio Viewers

The project should also demonstrate practical frontend development, audio interaction, reusable components, responsive design, and interactive UI implementation.

---

# 5. Core Application Structure

Cosmo Keys will use a multi-page structure.

```text
Cosmo Keys
│
├── Normal Piano
│
├── Chords
│
└── Harmony
```

Each mode will have its **own dedicated page** while sharing common piano and audio components.

---

# 6. Mode 1 — Normal Piano

## 6.1 Purpose

The Normal Piano page provides a traditional virtual piano experience.

Users should be able to play individual notes through the interface.

## 6.2 Functional Requirements

The page should provide:

* White piano keys.
* Black piano keys.
* Note labels.
* Mouse interaction.
* Touch interaction.
* Computer keyboard interaction.
* Visual feedback when a key is pressed.
* Audio playback for each note.
* Volume control.
* Responsive piano layout.

## 6.3 User Interaction

Users can:

1. Open the Normal Piano page.
2. Click or tap a piano key.
3. Hear the corresponding note.
4. See the key visually respond.
5. Use supported computer keyboard keys to play notes.

## 6.4 Expected Result

When a user activates a piano key:

```text
User Input
    ↓
Piano Key
    ↓
Visual Feedback
    ↓
Audio Playback
```

---

# 7. Mode 2 — Chords

## 7.1 Purpose

The Chords page allows users to explore common musical chords and understand which notes form each chord.

## 7.2 Functional Requirements

The page should provide:

* Common chord selection.
* Major chords.
* Minor chords.
* Diminished chords where appropriate.
* Chord note information.
* Visual piano-key highlighting.
* Chord playback.
* Selected chord indication.
* Clear chord naming.

## 7.3 Example

When the user selects:

**C Major**

The application should identify:

```text
C Major

C + E + G
```

The corresponding piano keys should be visually highlighted.

The user should also be able to play the complete chord.

## 7.4 User Interaction

```text
Select Chord
     ↓
Identify Chord Notes
     ↓
Highlight Piano Keys
     ↓
Display Notes
     ↓
Play Chord
```

## 7.5 Future-Ready Design

The chord system should be structured so additional chord types can be added later without rebuilding the entire page.

Potential future additions include:

* Seventh chords.
* Suspended chords.
* Extended chords.
* Chord inversions.
* Chord progressions.

These are **not required for the initial 7-day version** unless implementation time allows.

---

# 8. Mode 3 — Harmony

## 8.1 Purpose

The Harmony page introduces four-part harmony using the standard SATB voice structure.

The four voices are:

* **Bass**
* **Tenor**
* **Alto**
* **Soprano**

The goal is to allow users to see and hear how a chord can be distributed across four different voices.

## 8.2 Functional Requirements

The Harmony page should provide:

* Bass voice.
* Tenor voice.
* Alto voice.
* Soprano voice.
* Chord selection.
* Note assignment for each voice.
* Visual representation of each voice.
* Piano-key highlighting.
* Four-part harmony playback.
* Clear separation between voices.

## 8.3 Example

For a C Major harmony:

```text
Soprano → G4
Alto    → E4
Tenor   → C4
Bass    → C3
```

The selected notes should be represented visually on the piano.

## 8.4 User Interaction

```text
Select Chord
      ↓
Generate / Select Harmony
      ↓
Assign SATB Notes
      ↓
Visualize Voices
      ↓
Highlight Piano Keys
      ↓
Play Harmony
```

## 8.5 Harmony Visualization

The interface should make the four voices easy to distinguish.

Example:

```text
SOPRANO
G4

ALTO
E4

TENOR
C4

BASS
C3
```

The exact visual treatment will be defined in **UI_UX_BRIEF.md**.

---

# 9. Shared Piano System

The three modes should use a reusable piano component rather than implementing separate piano keyboards for each page.

```text
              Piano Engine
                   │
        ┌──────────┼──────────┐
        │          │          │
     Normal      Chords     Harmony
      Page        Page        Page
```

The shared piano system should handle:

* Piano key rendering.
* White keys.
* Black keys.
* Key interaction.
* Note mapping.
* Audio triggering.
* Visual key states.

Mode-specific logic should determine what the piano does with the selected notes.

---

# 10. Audio Requirements

The application must provide real-time audio feedback for piano interaction.

## Required

* Individual note playback.
* Chord playback.
* Harmony playback.
* Immediate response to user interaction.
* Volume control.

## Audio Architecture

The implementation should use a browser-compatible audio solution.

The technical implementation will be defined in **TRD.md**.

---

# 11. Navigation Requirements

The application should provide clear navigation between the three modes.

Primary navigation:

```text
🎹 Piano
🎼 Chords
🎶 Harmony
```

Users should be able to move between pages without confusion.

The navigation design should remain consistent across the application.

---

# 12. Visual Design Requirements

Cosmo Keys will use a **galaxy-inspired dark theme**.

## Visual Direction

The interface should feel:

* Futuristic.
* Musical.
* Calm.
* Immersive.
* Modern.
* Clean.

## Design Elements

Possible visual elements include:

* Deep-space backgrounds.
* Subtle stars.
* Nebula-inspired gradients.
* Soft glowing elements.
* Glass-like panels.
* Subtle purple/blue lighting.
* Dark piano surfaces.
* Glowing active keys.

The design should avoid excessive visual effects that interfere with usability.

Detailed visual specifications will be defined in **UI_UX_BRIEF.md**.

---

# 13. Responsive Requirements

Cosmo Keys should work across:

* Desktop.
* Laptop.
* Tablet.
* Mobile devices.

The piano keyboard should remain usable on smaller screens.

The interface should adapt rather than simply shrinking the desktop layout.

---

# 14. Accessibility Requirements

The application should aim to provide:

* Readable text.
* Sufficient contrast.
* Clear active states.
* Keyboard interaction where applicable.
* Accessible button labels.
* Logical navigation.
* Visual feedback that does not rely exclusively on color.

---

# 15. Performance Requirements

The application should:

* Load quickly.
* Respond immediately to piano interactions.
* Avoid unnecessary re-renders.
* Keep audio interactions responsive.
* Use reusable components.
* Avoid unnecessarily large assets.

---

# 16. Data / Backend Requirements

The initial version of Cosmo Keys does **not require a traditional backend**.

The core functionality can operate entirely within the browser.

The application does not initially require:

* User accounts.
* Authentication.
* User profiles.
* Cloud storage.
* Persistent user data.

Chord and harmony definitions can initially be stored as structured frontend data.

A backend schema document will still be created to formally document the decision and identify potential future data requirements.

---

# 17. Out of Scope for Initial Version

The following features are intentionally excluded from the core 7-day scope:

* User authentication.
* User accounts.
* Online collaboration.
* Cloud-saved compositions.
* Advanced music composition tools.
* MIDI device integration.
* Full song library.
* Automatic song generation.
* Advanced music theory analysis.
* Professional DAW functionality.

These may be considered for future versions.

---

# 18. Future Enhancement Possibilities

Future versions could include:

### 🎵 Music Learning

* Scales.
* Arpeggios.
* Ear training.
* Note quizzes.
* Chord quizzes.
* Music theory lessons.

### 🎹 Piano Features

* Multiple piano sound types.
* Multiple octaves.
* Sustain pedal simulation.
* Recording.
* Playback.
* MIDI keyboard support.

### 🎼 Chord Features

* Chord inversions.
* Chord progressions.
* Extended chords.
* Custom chord builder.

### 🎶 Harmony Features

* More SATB chord examples.
* Voice-leading visualization.
* Cadence examples.
* Common progression examples.
* Individual voice playback.
* Harmony exercises.

---

# 19. Seven-Day Development Scope

The project will be developed within seven days.

| Day       | Main Focus                                                 |
| --------- | ---------------------------------------------------------- |
| **Day 1** | Project setup, routing, galaxy theme, shared architecture  |
| **Day 2** | Normal Piano page                                          |
| **Day 3** | Chords page                                                |
| **Day 4** | Harmony / SATB page                                        |
| **Day 5** | Integration and responsive UX                              |
| **Day 6** | Audio, accessibility, animations, and polish               |
| **Day 7** | Final refinement, optimization, and deployment preparation |

The detailed development tasks will be defined in **IMPLEMENTATION_PLAN.md**.

---

# 20. Success Criteria

Cosmo Keys will be considered successful when:

* Users can play individual piano notes.
* Users can interact with both black and white keys.
* Users can select and play common chords.
* Chord notes are clearly visualized on the piano.
* Users can view Bass, Tenor, Alto, and Soprano parts.
* Users can hear four-part harmony.
* The three modes work as separate pages.
* Navigation works correctly.
* The application is responsive.
* The galaxy dark theme is consistent across all pages.
* Audio interaction feels responsive.
* The application is stable enough for deployment.

---

# 21. MVP Definition

The **Minimum Viable Product** of Cosmo Keys consists of:

### 🎹 Normal Piano

* Interactive piano.
* Black and white keys.
* Individual note playback.
* Keyboard/mouse/touch interaction.

### 🎼 Chords

* Common chord selection.
* Chord note visualization.
* Highlighted piano keys.
* Chord playback.

### 🎶 Harmony

* SATB voices.
* Chord-based harmony.
* Voice note visualization.
* Piano-key highlighting.
* Four-part harmony playback.

### 🌌 Shared Experience

* Galaxy dark theme.
* Three-page navigation.
* Responsive design.
* Reusable piano/audio components.

---

# 22. Product Vision

> **Cosmo Keys is a small universe for discovering piano, chords, and harmony.**

The application should make users feel that they are not simply pressing buttons on a virtual piano, but **exploring music through an interactive visual experience**.

The first version should prioritize:

**Play → Explore → Understand**

rather than trying to become a full professional music-production application.

---

## Document Status

**Status:** Approved for Development Planning

**Project:** Cosmo Keys

**Planned Duration:** 7 Days

**Core Modes:** Normal Piano / Chords / Harmony

**Harmony Structure:** Bass / Tenor / Alto / Soprano

**Theme:** Galaxy Dark Mode
