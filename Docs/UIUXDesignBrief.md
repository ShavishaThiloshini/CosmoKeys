# Cosmo Keys — UI/UX Design Brief

## 1. Document Overview

**Project Name:** Cosmo Keys

**Document:** UI/UX Design Brief

**Project Type:** Interactive Virtual Piano Web Application

**Development Duration:** 7 Days

**Visual Theme:** Galaxy-inspired dark mode

**Core Pages:**

1. Normal Piano
2. Chords
3. Harmony

**Primary UX Goal:**

Create an immersive but easy-to-use music interface where users can play notes, explore chords, and understand four-part harmony through clear visual feedback.

---

# 2. Design Vision

Cosmo Keys should feel like a **musical instrument floating in a calm digital universe**.

The design should combine:

* 🌌 Deep-space atmosphere.
* 🎹 Professional piano interface.
* ✨ Subtle futuristic effects.
* 🎼 Clear music-learning visuals.
* 💫 Smooth interactions.
* 🖤 Dark-mode comfort.

The galaxy theme should support the experience rather than overpower it.

The application should feel:

> **Elegant + Futuristic + Musical + Interactive**

---

# 3. Design Principles

## 3.1 Simplicity

The interface should remain easy to understand.

Users should immediately know:

* Where the piano is.
* How to play it.
* How to switch modes.
* Which chord is selected.
* Which harmony voices are active.

---

## 3.2 Visual Feedback

Every important interaction should provide immediate feedback.

Examples:

* Piano key press → key glow.
* Selected chord → highlighted notes.
* Selected voice → clear active state.
* Button click → visual response.
* Audio action → appropriate state feedback.

---

## 3.3 Consistency

The same design language should be used across all three pages.

Shared elements:

* Navigation.
* Buttons.
* Panels.
* Piano.
* Typography.
* Background.
* Spacing.
* Interaction states.

---

## 3.4 Controlled Effects

Galaxy effects should remain subtle.

Avoid:

* Excessive glowing.
* Constant animations.
* Overly bright backgrounds.
* Too many floating elements.
* Distracting motion.

The piano and music information must remain the primary focus.

---

# 4. Visual Identity

## 4.1 Primary Color Palette

### Deep Space

```text
#050816
```

Primary application background.

### Space Surface

```text
#0B1026
```

Cards, panels, navigation surfaces.

### Cosmic Purple

```text
#7C3AED
```

Primary accent.

### Nebula Violet

```text
#A855F7
```

Secondary accent.

### Cosmic Blue

```text
#38BDF8
```

Secondary highlight.

### Star White

```text
#F8FAFC
```

Primary text.

### Moon Gray

```text
#94A3B8
```

Secondary text.

---

# 5. Color Usage

The palette should follow a hierarchy.

```text
Background
     ↓
Deep Space

Containers
     ↓
Space Surface

Primary Actions
     ↓
Cosmic Purple

Secondary Highlights
     ↓
Cosmic Blue / Nebula Violet

Text
     ↓
Star White / Moon Gray
```

Accent colors should be used selectively.

---

# 6. Galaxy Background

The background should create a subtle sense of depth.

Recommended elements:

* Very dark base.
* Soft radial gradients.
* Small star particles.
* Subtle nebula glow.
* Occasional blurred light areas.

Concept:

```text
       ✦          ·
            ✧
  ·                    ✦

        COSMO KEYS

    ·        ✦       ·

             ✧
```

Stars should remain subtle enough that they do not compete with interface elements.

---

# 7. Typography

The typography should feel modern and slightly futuristic while remaining highly readable.

## Recommended Font Direction

Use a distinctive Google Font rather than relying on very common defaults.

Potential choices:

* **Space Grotesk**
* **Outfit**
* **Sora**
* **Manrope**

A final font can be selected during implementation based on visual testing.

### Typography Hierarchy

```text
Main Heading
Large / Bold

Page Heading
Medium / Semi-bold

Section Heading
Medium

Body
Regular

Supporting Text
Small / Muted
```

---

# 8. Navigation Design

The navigation bar should appear consistently across all three pages.

Concept:

```text
┌────────────────────────────────────────────────────────┐
│ 🌌 COSMO KEYS     🎹 Piano   🎼 Chords   🎶 Harmony   │
└────────────────────────────────────────────────────────┘
```

## Navigation Requirements

* Project logo/name on the left.
* Main navigation on the right or center.
* Current page clearly highlighted.
* Responsive mobile navigation.
* Subtle glass/dark surface.
* Minimal border or glow.

---

# 9. Navigation Active State

The active page should be clearly identifiable.

Example:

```text
Piano     Chords     Harmony
  ───
```

The active navigation item can use:

* Purple accent.
* Subtle glow.
* Background highlight.
* Underline.

The active state should not rely only on color.

---

# 10. Page Layout

All three pages should follow a consistent structure.

```text
┌──────────────────────────────────────┐
│              NAVIGATION              │
├──────────────────────────────────────┤
│                                      │
│           PAGE INTRODUCTION          │
│                                      │
│        Page Title + Description      │
│                                      │
├──────────────────────────────────────┤
│                                      │
│          MAIN INTERACTION            │
│                                      │
│                                      │
├──────────────────────────────────────┤
│                                      │
│        SUPPORTING CONTROLS           │
│                                      │
└──────────────────────────────────────┘
```

The piano should remain the visual centerpiece.

---

# 11. Page 1 — Normal Piano UI

## Layout

```text
┌──────────────────────────────────────────┐
│            🎹 Virtual Piano              │
│   Play notes using your keyboard         │
│                                          │
│          ┌──────────────────┐            │
│          │ Volume ────────  │            │
│          └──────────────────┘            │
│                                          │
│       ┌──────────────────────────┐       │
│       │        PIANO              │       │
│       │  ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯       │       │
│       │   ▪ ▪  ▪ ▪  ▪ ▪          │       │
│       └──────────────────────────┘       │
│                                          │
└──────────────────────────────────────────┘
```

## Main Elements

* Page title.
* Short instruction.
* Piano.
* Volume control.
* Optional keyboard mapping hint.

The piano should receive the strongest visual emphasis.

---

# 12. Piano Key Design

## White Keys

White keys should use a light piano-key appearance while fitting the dark galaxy environment.

They should have:

* Clear borders.
* Rounded or slightly softened edges.
* Strong pressed state.
* Note labels.
* Responsive sizing.

## Black Keys

Black keys should:

* Sit above white keys.
* Be visually distinct.
* Have subtle depth/shadow.
* Provide strong pressed feedback.

---

# 13. Piano Key States

Each piano key should support several states.

### Default

```text
Normal key
```

### Hover

```text
Slight visual elevation / glow
```

### Active

```text
Bright accent glow
```

### Keyboard Press

```text
Same active state as mouse/touch
```

The active state should feel satisfying without creating excessive glow.

---

# 14. Page 2 — Chords UI

The Chords page should emphasize **selection + visualization**.

Recommended structure:

```text
┌──────────────────────────────────────────┐
│              🎼 Chord Explorer           │
│        Explore common piano chords       │
│                                          │
│  [ C ] [ Dm ] [ Em ] [ F ] [ G ] [ Am ] │
│                                          │
│          ┌──────────────────┐            │
│          │   C Major        │            │
│          │   C • E • G      │            │
│          │                  │            │
│          │   [ Play Chord ] │            │
│          └──────────────────┘            │
│                                          │
│             ┌─────────────┐              │
│             │    PIANO    │              │
│             └─────────────┘              │
└──────────────────────────────────────────┘
```

---

# 15. Chord Selector

Chord buttons should be compact but easy to click.

Example:

```text
[C] [Dm] [Em] [F] [G] [Am]
```

Selected chord:

* Purple/blue accent.
* Subtle glow.
* Clear active state.

Unselected chords should remain visually quiet.

---

# 16. Chord Information Panel

The selected chord should have a dedicated information area.

Example:

```text
C Major

C4   E4   G4

Major Triad

[ ▶ Play Chord ]
```

The panel should not contain unnecessary information.

The primary purpose is to connect:

**Chord Name → Notes → Piano Keys → Sound**

---

# 17. Chord Piano Visualization

When a chord is selected:

```text
       ●           ●       ●
       C           E       G
       │           │       │
┌──────┴───────────┴───────┴──────┐
│  C  │  D  │  E  │  F  │  G ... │
└──────────────────────────────────┘
```

The selected keys should have a noticeable accent state.

Unselected keys should remain visually neutral.

---

# 18. Page 3 — Harmony UI

The Harmony page should be the most information-rich page while remaining clean.

Recommended structure:

```text
┌──────────────────────────────────────────┐
│             🎶 Harmony Studio            │
│        Explore four-part harmony         │
│                                          │
│          [ Select Chord ]                │
│                                          │
│  ┌────────┐ ┌────────┐ ┌────────┐        │
│  │Soprano │ │  Alto  │ │ Tenor  │        │
│  │  G4    │ │  E4    │ │  C4    │        │
│  └────────┘ └────────┘ └────────┘        │
│                                          │
│              ┌────────┐                  │
│              │  Bass  │                  │
│              │  C3    │                  │
│              └────────┘                  │
│                                          │
│           [ ▶ Play Harmony ]             │
│                                          │
│               PIANO                      │
└──────────────────────────────────────────┘
```

---

# 19. SATB Voice Cards

Each voice should have a dedicated visual representation.

### Soprano

Highest voice.

### Alto

Upper-middle voice.

### Tenor

Lower-middle voice.

### Bass

Lowest voice.

Each card should show:

```text
VOICE
Note
```

Example:

```text
SOPRANO
G4
```

---

# 20. Harmony Visual Hierarchy

The interface should visually communicate:

```text
             CHORD
               ↓
        ┌──────┼──────┐
        ↓      ↓      ↓
     Soprano Alto   Tenor
               ↓
              Bass
               ↓
             Piano
```

The user should be able to understand the relationship without reading a long explanation.

---

# 21. Harmony Piano Visualization

When harmony is selected, the piano should show all active voice notes.

Example:

```text
Soprano → G4
Alto    → E4
Tenor   → C4
Bass    → C3
```

The piano should visually identify these notes.

Where practical, voice labels can be associated with the corresponding active keys.

---

# 22. Buttons

Buttons should follow a consistent design system.

## Primary Button

Used for:

* Play Chord.
* Play Harmony.
* Important actions.

Visual direction:

```text
Purple accent
Rounded corners
Subtle glow
Clear text
```

## Secondary Button

Used for:

* Alternative controls.
* Supporting actions.

Should use a darker surface with an accent border.

---

# 23. Cards and Panels

Panels should use a subtle glass-inspired appearance.

Recommended characteristics:

* Dark translucent surface.
* Slight border.
* Soft shadow.
* Mild backdrop blur where supported.
* Moderate corner radius.

Avoid excessive glassmorphism.

---

# 24. Icons

Use a consistent icon library.

Icons may be used for:

* Piano.
* Music notes.
* Play.
* Volume.
* Navigation.
* Settings if added later.

Icons should support text rather than replace important labels.

---

# 25. Spacing System

Use consistent spacing throughout the application.

Suggested scale:

```text
4px
8px
12px
16px
24px
32px
48px
64px
```

Large spacing should be reserved for major page sections.

---

# 26. Border Radius

Recommended:

* Buttons: 8–12px.
* Cards: 12–16px.
* Main containers: 16–20px.
* Piano keys: subtle rounding.

Avoid excessive pill-shaped elements unless appropriate.

---

# 27. Animation

Animations should be subtle and purposeful.

### Recommended

* Piano key press animation.
* Button hover transition.
* Navigation active transition.
* Soft galaxy background movement.
* Chord selection transition.
* Harmony selection transition.

### Avoid

* Constant spinning elements.
* Aggressive particle effects.
* Long page transitions.
* Excessive bouncing.
* Distracting animations around the piano.

---

# 28. Microinteractions

Small interactions should make the application feel responsive.

Examples:

### Piano

```text
Press → Glow → Sound → Release
```

### Chord

```text
Select → Highlight → Display → Play
```

### Harmony

```text
Select → Assign → Visualize → Play
```

---

# 29. Responsive Design

## Desktop

Use the full available layout.

```text
Navigation
     ↓
Page Header
     ↓
Controls
     ↓
Piano
```

Harmony voice cards may use a horizontal arrangement.

---

## Tablet

Controls may wrap into multiple rows.

The piano should reduce in width while remaining usable.

---

## Mobile

Use stacked layouts.

```text
Navigation
     ↓
Page Title
     ↓
Controls
     ↓
Information
     ↓
Piano
```

Chord buttons may use horizontal scrolling or wrapping.

SATB cards should stack or use a compact grid.

---

# 30. Mobile Piano Strategy

The piano should not become unusably small.

Possible approach:

* Responsive key width.
* Horizontal scrolling when necessary.
* Touch-friendly key height.
* Avoid placing important controls directly over the piano.
* Preserve clear black-key positioning.

The user should be able to comfortably play using touch.

---

# 31. Accessibility Design

The visual design should support accessibility.

Requirements:

* High text contrast.
* Visible focus states.
* Large enough touch targets.
* Clear button labels.
* Keyboard accessibility.
* State indicators that do not rely only on color.
* Reduced-motion consideration where appropriate.

---

# 32. Empty and Loading States

The application should keep states simple.

Example:

```text
No chord selected

Select a chord to begin exploring.
```

Harmony:

```text
No harmony selected

Choose a chord to view its SATB arrangement.
```

Avoid unnecessary loading screens for lightweight local data.

---

# 33. Error State Design

Errors should be presented calmly.

Example:

```text
Audio unavailable

We couldn't start the audio engine.
Please interact with the piano and try again.

[ Try Again ]
```

Avoid exposing technical error messages directly to users.

---

# 34. Desktop Layout Guidelines

Recommended maximum content width:

```text
1200px – 1400px
```

Content should remain centered.

The piano may use a larger width than supporting cards.

---

# 35. Visual Priority

The interface should follow this hierarchy:

### Level 1

🎹 **Piano / Primary Interaction**

### Level 2

🎼 **Selected Chord / Harmony**

### Level 3

🎛️ **Controls**

### Level 4

ℹ️ **Supporting Information**

The visual hierarchy should guide users naturally toward interaction.

---

# 36. UX Flow by Page

## Piano

```text
Open
 ↓
See Piano
 ↓
Press Key
 ↓
Hear Note
 ↓
Continue Playing
```

## Chords

```text
Open
 ↓
Choose Chord
 ↓
See Notes
 ↓
See Highlighted Keys
 ↓
Play Chord
 ↓
Try Another Chord
```

## Harmony

```text
Open
 ↓
Choose Chord
 ↓
View SATB
 ↓
See Piano Notes
 ↓
Play Harmony
 ↓
Explore Another Chord
```

---

# 37. Design Consistency Matrix

| Element           | Piano | Chords | Harmony |
| ----------------- | ----- | ------ | ------- |
| Navigation        | ✓     | ✓      | ✓       |
| Galaxy Background | ✓     | ✓      | ✓       |
| Piano             | ✓     | ✓      | ✓       |
| Audio Controls    | ✓     | ✓      | ✓       |
| Chord Selector    | —     | ✓      | ✓       |
| Chord Information | —     | ✓      | ✓       |
| SATB Voices       | —     | —      | ✓       |
| Play Action       | ✓     | ✓      | ✓       |

---

# 38. Component Design System

The UI should be built from reusable components.

Recommended components:

```text
Navbar
PageHeader
Panel
Button
IconButton
Piano
PianoKey
VolumeControl
ChordSelector
ChordCard
VoiceCard
HarmonyPanel
PlayButton
```

This ensures visual consistency across the application.

---

# 39. Design Don'ts

Avoid:

* Bright white backgrounds.
* Excessive neon colors.
* Too many different accent colors.
* Overcrowded controls.
* Tiny piano keys.
* Excessive glassmorphism.
* Excessive animations.
* Unnecessary decorative text.
* Large distracting illustrations.
* Inconsistent button styles.

The galaxy theme should remain **premium and subtle**.

---

# 40. Final Visual Direction

Cosmo Keys should visually communicate:

```text
             🌌
       COSMIC ATMOSPHERE
              +
        🎹 REAL INSTRUMENT
              +
        🎼 MUSIC LEARNING
              +
       ✨ FUTURISTIC UI
```

The result should feel like a **modern interactive music laboratory inside a digital galaxy**.

---

# 41. UI/UX Success Criteria

The design will be considered successful when:

* Users immediately understand the three modes.
* Navigation is easy to find.
* The piano is the visual centerpiece.
* Piano keys are easy to interact with.
* Active notes are clearly visible.
* Chord information is easy to understand.
* SATB voices are clearly separated.
* The galaxy theme is consistent.
* Visual effects do not interfere with usability.
* The application works comfortably on mobile.
* Buttons and controls have clear interaction states.
* Typography remains readable.
* The overall experience feels cohesive across all three pages.

---

## Document Status

**Status:** Approved

**Project:** Cosmo Keys

**Visual Theme:** Galaxy Dark Mode

**Core Pages:** Piano / Chords / Harmony

**Primary Design Goal:** Immersive, clean, interactive music experience

**Design Personality:** Futuristic / Musical / Elegant / Educational
