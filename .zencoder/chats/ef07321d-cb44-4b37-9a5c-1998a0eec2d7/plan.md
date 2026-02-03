# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification

Assess the task's difficulty, as underestimating it leads to poor outcomes.

- easy: Straightforward implementation, trivial bug fix or feature
- medium: Moderate complexity, some edge cases or caveats to consider
- hard: Complex logic, many caveats, architectural considerations, or high-risk changes

Create a technical specification for the task that is appropriate for the complexity level:

- Review the existing codebase architecture and identify reusable components.
- Define the implementation approach based on established patterns in the project.
- Identify all source code files that will be created or modified.
- Define any necessary data model, API, or interface changes.
- Describe verification steps using the project's test and lint commands.

Save the output to `c:\Users\ashvi\OneDrive\Desktop\four-season-app\.zencoder\chats\ef07321d-cb44-4b37-9a5c-1998a0eec2d7/spec.md`

---

### [x] Step: Project Initialization
Initialize Vite project with TypeScript and Tailwind CSS. Install dependencies: `framer-motion`, `lucide-react`, `zustand`.

### [x] Step: State Management
Implement `useSeasonStore` with Zustand to manage the current season state.

### [x] Step: Parallax Engine
Implement `SceneWrapper` and `Layer` components using Framer Motion for the 3-layer parallax effect.

### [x] Step: Season Visuals (Phase 1)
Create the placeholder layers for each season with glassmorphism and the debug `SeasonSwitcher`.

### [x] Step: Phase 1 Interactive Features
Implement `DeskCompanion` (Spring) and `HotWaterBottle` (Winter button).

### [x] Step: Final Polish & Report
Ensure smooth transitions and write the final report.

---

### [x] Step: Weather Systems Implementation
Build `WeatherEffects.tsx` with particle systems for all 4 seasons.

### [x] Step: Interactive Interaction Upgrade
Update `HotWaterBottle.tsx` with hold-to-warmth logic and haptic feedback.

### [x] Step: Visual Integration
Refine `SeasonalScene` to include the new weather systems and atmospheric overlays.

---

### [x] Step: Seasonal Interactive Features
Implement `RantBox` (Autumn), Upgraded `DeskCompanion` (Spring), and `ComfortDock` (Global).
