Cosmo Keys — Backend Schema Document
1. Document Overview

Project Name: Cosmo Keys
Document: Backend Schema Document
Project Type: Interactive Virtual Piano Web Application
Development Duration: 7 Days
MVP Backend: Not required
MVP Data Storage: Frontend static/structured data
Future Backend: Optional

2. Backend Strategy

The initial version of Cosmo Keys does not require a backend or database.

The core application can operate entirely on the client side because the MVP mainly contains:

Piano note definitions.
Piano key mappings.
Chord definitions.
Harmony/SATB definitions.
Audio interaction.
Temporary UI state.

Therefore, the initial architecture is:

                 COSMO KEYS
                      │
                  React App
                      │
        ┌─────────────┼─────────────┐
        │             │             │
     Note Data     Chord Data   Harmony Data
        │             │             │
        └─────────────┼─────────────┘
                      │
                Audio Engine
                      │
                User Interaction

No database connection is required for the MVP.

3. Why No Backend for MVP?

A backend would add unnecessary complexity during the 7-day development period.

The MVP does not require:

User registration.
Login.
User profiles.
Saved compositions.
Cloud synchronization.
User-generated content.
Persistent practice history.

The music data is mostly predefined and can be stored directly in the application.

4. MVP Data Architecture

The application should organize its data into three main categories.

Data
│
├── Notes
│
├── Chords
│
└── Harmony
5. Notes Data

The Notes dataset contains information required to render and control the virtual piano.

Suggested Structure
{
  id: "c4",
  note: "C",
  octave: 4,
  name: "C4",
  midi: 60,
  type: "white",
  keyboardKey: "a"
}
6. Note Fields
Field	Type	Description
id	String	Unique note identifier
note	String	Musical note name
octave	Number	Note octave
name	String	Display name
midi	Number	MIDI note number
type	String	White or black key
keyboardKey	String	Computer keyboard mapping
7. Piano Key Types

The application supports two key types:

WHITE
BLACK

Example:

{
  type: "white"
}

or:

{
  type: "black"
}

This allows the piano component to determine how each key should be rendered.

8. Chord Data

The Chord dataset contains predefined common chords.

Example:

{
  id: "c-major",
  name: "C Major",
  symbol: "C",
  type: "major",
  notes: [
    "C4",
    "E4",
    "G4"
  ]
}
9. Chord Fields
Field	Type	Description
id	String	Unique chord identifier
name	String	Full chord name
symbol	String	Standard chord symbol
type	String	Chord category
notes	Array	Notes contained in chord
10. Chord Categories

The MVP should primarily support:

Major
Minor

Optional categories:

Diminished
Seventh
Suspended

Optional categories should only be added if they fit within the development schedule.

11. Example Chord Records
C Major
{
  id: "c-major",
  name: "C Major",
  symbol: "C",
  type: "major",
  notes: ["C4", "E4", "G4"]
}
A Minor
{
  id: "a-minor",
  name: "A Minor",
  symbol: "Am",
  type: "minor",
  notes: ["A3", "C4", "E4"]
}
12. Harmony Data

The Harmony dataset stores predefined four-part harmony arrangements.

Each harmony contains:

Chord reference.
Soprano note.
Alto note.
Tenor note.
Bass note.

Example:

{
  id: "c-major-satb",
  chordId: "c-major",
  voices: {
    soprano: "G4",
    alto: "E4",
    tenor: "C4",
    bass: "C3"
  }
}
13. Harmony Fields
Field	Type	Description
id	String	Unique harmony identifier
chordId	String	Related chord
voices	Object	SATB note assignments
14. Voice Structure

The application uses four standard voices:

Soprano
Alto
Tenor
Bass

Each voice maps to a specific note.

voices: {
  soprano: "G4",
  alto: "E4",
  tenor: "C4",
  bass: "C3"
}
15. SATB Voice Rules

The application should maintain the expected vocal ordering:

Highest
   ↓
Soprano
   ↓
Alto
   ↓
Tenor
   ↓
Bass
   ↓
Lowest

Harmony data should be validated so that a voice does not accidentally receive a note outside its intended range.

Exact vocal ranges can be defined during implementation if required.

16. Future Database Architecture

Although the MVP does not require a database, a future version could introduce persistent storage.

A possible database structure:

Users
  │
  ├── Saved Chords
  │
  ├── Saved Harmonies
  │
  └── Practice History

Possible future tables:

users
chords
chord_notes
harmony_arrangements
harmony_voices
saved_compositions
practice_sessions
17. Future Users Table

If authentication is added later:

users
Field	Type	Description
id	UUID	Unique user ID
name	VARCHAR	User display name
email	VARCHAR	User email
created_at	TIMESTAMP	Account creation time
updated_at	TIMESTAMP	Last update

Authentication should be handled by a dedicated authentication system rather than storing passwords directly in application tables.

18. Future Chords Table
chords
Field	Type	Description
id	UUID	Unique chord ID
name	VARCHAR	Chord name
symbol	VARCHAR	Chord symbol
type	VARCHAR	Chord type
created_at	TIMESTAMP	Creation time
19. Future Chord Notes Table
chord_notes
Field	Type	Description
id	UUID	Unique record ID
chord_id	UUID	Related chord
note	VARCHAR	Note name
octave	INTEGER	Note octave
position	INTEGER	Position within chord

Relationship:

Chord
  │
  ├── Note
  ├── Note
  └── Note
20. Future Harmony Arrangements Table
harmony_arrangements
Field	Type	Description
id	UUID	Unique harmony ID
chord_id	UUID	Related chord
name	VARCHAR	Harmony name
created_at	TIMESTAMP	Creation time
21. Future Harmony Voices Table
harmony_voices
Field	Type	Description
id	UUID	Unique record ID
harmony_id	UUID	Related harmony
voice	VARCHAR	Bass/Tenor/Alto/Soprano
note	VARCHAR	Assigned note
octave	INTEGER	Note octave

Relationship:

Harmony
   │
   ├── Soprano
   ├── Alto
   ├── Tenor
   └── Bass
22. Future Saved Compositions

A future version could allow users to save their own musical creations.

saved_compositions
Field	Type	Description
id	UUID	Composition ID
user_id	UUID	Owner
title	VARCHAR	Composition title
data	JSON	Musical sequence
created_at	TIMESTAMP	Creation time
updated_at	TIMESTAMP	Last modification

The musical sequence could contain:

{
  notes: [
    {
      note: "C4",
      duration: 500
    },
    {
      note: "E4",
      duration: 500
    }
  ]
}
23. Future Practice Sessions

A future learning-focused version could store practice activity.

practice_sessions
Field	Type	Description
id	UUID	Session ID
user_id	UUID	User
mode	VARCHAR	Piano/Chords/Harmony
duration	INTEGER	Session duration
started_at	TIMESTAMP	Start time
ended_at	TIMESTAMP	End time

This is outside the MVP.

24. Entity Relationship Overview

A possible future database relationship:

                    USERS
                      │
                      │
              ┌───────┴────────┐
              │                │
              ▼                ▼
     SAVED_COMPOSITIONS   PRACTICE_SESSIONS


                    CHORDS
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
       CHORD_NOTES      HARMONY_ARRANGEMENTS
                               │
                               ▼
                        HARMONY_VOICES
25. MVP vs Future Backend
Feature	MVP	Future
Piano notes	Local	Database optional
Chords	Local	Database optional
Harmony	Local	Database optional
Authentication	❌	✓
User profiles	❌	✓
Saved compositions	❌	✓
Practice history	❌	✓
Cloud storage	❌	✓
User-created harmony	❌	✓
Collaboration	❌	Possible
26. API Considerations

Since there is no backend in the MVP, API endpoints are not required.

A future backend could expose endpoints such as:

GET    /api/chords
GET    /api/chords/:id
GET    /api/harmony
GET    /api/harmony/:id

POST   /api/compositions
GET    /api/compositions
PUT    /api/compositions/:id
DELETE /api/compositions/:id

POST   /api/practice-sessions
GET    /api/practice-sessions

These endpoints are future considerations only.

27. Data Validation

Even without a backend, frontend data should be validated.

Note Validation
Note must exist.
Octave must be valid.
MIDI value should correspond to the note.
Key type must be white or black.
Chord Validation
Chord must have a valid ID.
Notes must exist.
Chord type must be supported.
Chord must contain at least the required notes.
Harmony Validation
Chord reference must exist.
All four voices must have valid notes.
Voice names must be valid.
Voice ordering should be musically reasonable.
28. Data Relationships

The logical relationship between the datasets is:

NOTE
  ↑
  │
CHORD
  ↑
  │
HARMONY
  │
  ├── Soprano
  ├── Alto
  ├── Tenor
  └── Bass

A harmony references a chord, and both use the common note system.

29. Data Storage Strategy

For the MVP, recommended files are:

src/
└── data/
    ├── notes.js
    ├── chords.js
    └── harmony.js

This keeps musical definitions separate from UI components.

30. Example Data Flow
Piano
notes.js
    ↓
Piano Component
    ↓
User Input
    ↓
Audio Engine
Chords
chords.js
    ↓
Chord Selector
    ↓
Selected Chord
    ↓
Chord Notes
    ↓
Piano Highlighting
    ↓
Audio Engine
Harmony
harmony.js
    ↓
Harmony Selector
    ↓
SATB Data
    ↓
Voice Display
    ↓
Piano Highlighting
    ↓
Audio Engine
31. Backend Security Considerations

If a backend is introduced later:

Authentication must use secure password handling or an authentication provider.
User-owned resources must be protected.
API inputs must be validated.
Authorization must be enforced server-side.
Sensitive configuration must use environment variables.
Database credentials must never be exposed to the frontend.
Rate limiting should be considered for public APIs.
32. Scalability Considerations

The initial local-data architecture should make it easy to move toward a backend later.

The frontend should avoid tightly coupling UI components to data storage.

For example:

UI Component
     ↓
Data Service
     ↓
Local Data

Later:

UI Component
     ↓
Data Service
     ↓
API
     ↓
Database

This allows the data source to change without completely rewriting the UI.

33. Recommended MVP Architecture

For the 7-day project, use:

React
  │
  ├── Static Music Data
  │     ├── Notes
  │     ├── Chords
  │     └── Harmony
  │
  ├── React State
  │
  └── Audio Engine
        │
        └── Web Audio API

No database is required.

34. Future Architecture

A later version could evolve into:

React Frontend
      │
      ▼
API / Backend
      │
 ┌────┴─────┐
 │          │
 ▼          ▼
Database   Auth
 │
 ├── Users
 ├── Chords
 ├── Harmony
 ├── Compositions
 └── Practice
35. Backend Schema Success Criteria

This document is considered complete when:

MVP backend requirements are clearly defined.
The decision to remain frontend-only is documented.
Piano note data structure is defined.
Chord data structure is defined.
Harmony/SATB data structure is defined.
Relationships between musical data are defined.
Future database requirements are documented.
Potential API requirements are documented.
Future scalability considerations are documented.
The schema does not introduce unnecessary backend complexity into the 7-day MVP.
36. Final Backend Decision
For Cosmo Keys MVP:

No backend or database will be implemented.

The application will use structured frontend data for:

🎹 Piano Notes
🎼 Chords
🎶 SATB Harmony

The architecture will remain backend-ready so future features such as accounts, saved compositions, practice history, and cloud synchronization can be introduced without rebuilding the core application.

Document Status

Status: Approved

Project: Cosmo Keys

MVP Backend: None

MVP Database: None

MVP Data Storage: Structured frontend data

Core Data: Notes / Chords / Harmony

Future Backend: Optional

Development Duration: 7 Days