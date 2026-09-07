# Flowbite UI/UX Guidelines

**Project:** School RFID Attendance System  
**Document:** Flowbite UI/UX Design System & Implementation Guide  
**Status:** Active design direction  
**Primary UI framework:** Flowbite  
**Frontend:** Laravel Blade + Alpine.js + Tailwind CSS (Vite) — server-rendered monolith; a future Inertia/Livewire migration is out of scope until this design pass is done  
**Purpose:** Establish a consistent, accessible, professional visual language for the School RFID Attendance System.

---

## 1. Purpose

This document defines the visual and UX standards for the School RFID Attendance System.

It exists to prevent individual pages from developing unrelated visual styles and to give developers and AI coding agents a shared source of truth when implementing or improving the interface.

These guidelines apply to:

- Role overviews (Super Admin, Teacher, Student)
- RFID attendance taking
- Attendance monitoring and history
- Student management (sections and students)
- Teacher management (Super Admin)
- Geofence boundary management
- Student location tracking (Leaflet maps)
- Class schedule management (FullCalendar)
- Excuse request workflows
- Reports (quarterly PDF)
- Profile/Settings
- Authentication screens
- Tables
- Forms
- Dialogs/modals
- Cards
- Notifications
- Empty states
- Loading states
- Error states
- Responsive layouts

The goal is not to make every page visually identical. The goal is to make every page feel like it belongs to the same product.

---

## 2. Design Direction

### 2.1 Overall Character

The interface should feel:

- Modern
- Professional
- Clean
- Trustworthy
- Approachable
- Efficient
- School-oriented without looking childish
- Suitable for daily administrative use
- Easy to scan at a glance

Avoid making the application look like:

- A generic admin dashboard template
- An overly colorful education app
- A banking application
- A medical application
- A heavily decorative marketing website
- An AI-generated UI with excessive gradients, glass effects, or unnecessary animations

The product is an operational system. **Clarity and efficiency take priority over decoration.**

---

## 3. Brand Color Direction

### 3.1 Primary Decision

The project uses **green as its primary brand direction**.

Green should communicate:

- Attendance
- Active status
- Verification
- Reliability
- Progress
- Positive system feedback

However, green must **not dominate every surface**.

The interface should be primarily neutral with green used strategically for hierarchy and interaction.

### 3.2 Color Distribution

Use approximately this visual balance as a design target:

```text
Neutral surfaces/content: 70–85%
Primary green/accent:     10–20%
Semantic/support colors:   5–10%
```

These are visual guidelines, not strict CSS percentages.

### 3.3 Green Usage

Green is appropriate for:

- Primary actions
- Active navigation states
- Selected controls
- Important links
- Positive status indicators
- Attendance-present states
- Successful RFID scans
- Verified states
- Key dashboard accents
- Focus/interaction accents where appropriate

Do not use green for:

- Every button
- Every card
- Every heading
- Large decorative backgrounds
- Every badge
- Every icon
- All table rows

### 3.4 Semantic Colors

Semantic colors must retain their meaning independently of the brand.

| Meaning | Direction |
|---|---|
| Success / Present | Green |
| Warning / Late / Attention | Amber |
| Danger / Absent / Error | Red |
| Information | Blue |
| Neutral / Unknown | Gray/Slate |

A semantic status should never depend solely on color. Pair color with text, icons, or other visual cues when appropriate.

---

## 4. Flowbite Theme

The project uses Flowbite's theme system and should prefer generated/design-system tokens over arbitrary one-off colors.

The Flowbite MCP `generate-theme` tool should be used when establishing or substantially revising the project's theme.

### 4.1 Theme Generation Direction

When generating the theme, use the following design intent:

> Modern school RFID attendance and administration system. Professional, clean, trustworthy, accessible, slightly warm and welcoming. Use green as the primary brand color. Avoid excessive use of green; use neutral surfaces for most UI. Optimize for dashboards, attendance records, tables, forms, dialogs, cards, filters, and administrative workflows. Maintain strong contrast and clear information hierarchy. Avoid excessive gradients, glassmorphism, decorative effects, and unnecessary visual complexity.

The exact generated shades are implementation details and may evolve. Do not manually replace the generated palette with arbitrary colors without a design reason.

### 4.2 Token-First Principle

Prefer:

- Existing Flowbite theme tokens
- Existing Tailwind theme values
- Existing project design tokens
- Semantic component variants

Avoid scattered hard-coded values such as:

```text
bg-[#123456]
text-[#654321]
border-[#abcdef]
```

unless there is a documented reason to use a one-off value.

---

## 5. Neutral Foundation

Most of the application should be built from neutral colors.

Use neutral colors for:

- Page backgrounds
- Cards
- Tables
- Forms
- Navigation surfaces
- Dialog surfaces
- Secondary controls
- Dividers
- Most text

The neutral foundation allows green to retain visual importance.

### 5.1 Surfaces

Prefer a clear hierarchy:

```text
Application background
    ↓
Section/card surface
    ↓
Elevated/interactive surface
    ↓
Focused/selected state
```

Avoid excessive borders on every element when spacing and surface contrast can establish hierarchy more cleanly.

---

## 6. Typography

Typography should prioritize readability and information scanning.

### 6.1 Hierarchy

Use a predictable hierarchy:

```text
Page title
    ↓
Section heading
    ↓
Subsection heading
    ↓
Body text
    ↓
Supporting/meta text
```

Page titles should clearly communicate where the user is.

Examples (matching the application's actual navigation):

- Overview
- Attendance
- Students
- Sections
- Class Schedule
- Excuse Requests
- Reports
- Geofence Boundary
- Teacher Management

Avoid unnecessary marketing-style headings such as:

- "Welcome to the Future of Attendance"
- "Your Amazing Dashboard"
- "Powerful Attendance Insights"

The interface should use direct operational language.

### 6.2 Text Weight

Use weight intentionally.

- Regular: body content
- Medium: labels/navigation
- Semibold: headings and important values
- Bold: major metrics or high-priority emphasis

Do not make entire interfaces semibold or bold.

### 6.3 Secondary Text

Secondary text should remain readable.

Do not use extremely light gray text simply to make the UI look minimal.

Accessibility and readability take precedence over visual subtlety.

---

## 7. Spacing

Use a consistent spacing rhythm based on Tailwind's spacing scale.

Avoid arbitrary spacing values unless necessary.

Prefer predictable patterns:

```text
Page padding
→ Section spacing
→ Card padding
→ Component spacing
→ Text spacing
```

Spacing should communicate grouping.

### 7.1 Dense Administrative Interfaces

Attendance and administrative screens may intentionally be denser than marketing pages.

Do not introduce excessive whitespace that forces users to scroll unnecessarily through:

- Attendance tables
- Student lists
- RFID records
- Reports
- Filters

The goal is **comfortable density**, not maximum whitespace.

---

## 8. Border Radius

Use moderate, consistent rounding.

The product should feel modern without becoming overly rounded.

Avoid:

- Every element being pill-shaped
- Excessive rounded containers
- Large "bubble" cards

Reserve pill shapes primarily for:

- Status badges
- Compact filters
- Small categorical indicators

Buttons, inputs, cards, and dialogs should follow the generated Flowbite theme consistently.

---

## 9. Buttons

Buttons must communicate hierarchy.

### 9.1 Primary

Use the green primary style for the main action of a section or workflow.

Examples:

- Add Student
- Add Section
- Create Class Schedule
- Save Changes
- Generate Report

### 9.2 Secondary

Use neutral secondary styles for supporting actions.

Examples:

- Cancel
- Filter
- Reset
- Back

### 9.3 Destructive

Use danger styling for irreversible or destructive operations.

Examples:

- Delete Student
- Delete Section
- Permanently Delete Record

Do not use the primary green button for destructive actions.

### 9.4 Button Rules

Avoid multiple visually dominant buttons competing in the same area.

A page should make the primary action obvious.

---

## 10. Navigation

Navigation should make the current location obvious.

### 10.1 Active State

The active navigation item should have:

- Clear visual distinction
- Appropriate green accent
- Strong enough contrast
- Optional subtle background treatment

Do not rely only on a tiny color change.

### 10.2 Navigation Labels

Use concise operational labels.

Prefer:

```text
Overview
Attendance
Students
Sections
Class Schedule
Excuse Requests
Reports
```

Avoid unnecessary wording such as:

```text
Manage Your Student Attendance Records
```

---

## 11. Overview Pages

The role overview pages should answer the user's most important questions quickly.

Typical high-level information may include:

- Students
- Present today
- Absent today
- Late today
- RFID activity
- Recent attendance
- Attendance trends
- Alerts

### 11.1 Metric Cards

Metric cards should:

- Have a clear label
- Display the important value prominently
- Include useful supporting information when available
- Avoid excessive decoration
- Avoid making every card a different color

Do not turn every metric card into a colored tile.

Use neutral cards with restrained accents.

### 11.2 Data Visualization

Charts should communicate information, not decorate the dashboard.

Prefer:

- Clear labels
- Readable axes
- Appropriate chart types
- Useful time ranges
- Accessible contrast
- Minimal visual noise

---

## 12. Attendance UX

Attendance is a core workflow and should receive especially strong UX treatment.

### 12.1 Status Clarity

Attendance states should be immediately understandable.

Possible states include:

- Present
- Late
- Absent
- Excused
- Unknown
- Pending

Use:

```text
Status text + semantic styling
```

rather than color alone.

### 12.2 RFID Scan Feedback

When an RFID scan succeeds, the UI should provide clear confirmation.

The user should be able to understand:

1. A card was detected.
2. Which student was identified.
3. What attendance action occurred.
4. Whether the operation succeeded or failed.
5. What should happen next.

Avoid ambiguous feedback such as simply changing a small icon.

### 12.3 Real-Time Information

If the interface displays live attendance activity:

- Make the live state obvious.
- Avoid excessive animation.
- Keep the latest event easy to locate.
- Preserve readable timestamps.
- Do not cause distracting page movement.

---

## 13. Tables

Tables are central to administrative workflows.

### 13.1 Table Priorities

Prioritize:

1. Readability
2. Scannability
3. Consistent alignment
4. Useful density
5. Clear actions
6. Responsive behavior

### 13.2 Table Headers

Headers should clearly describe the column.

Avoid overly decorative headers.

### 13.3 Row Actions

Common actions should be easy to discover without visually overpowering the table.

For example:

```text
View
Edit
Delete
```

may be represented through appropriate buttons or menus depending on available space.

### 13.4 Empty Tables

Never leave a blank table without explanation.

Provide:

- A clear empty-state message
- Optional explanation
- A relevant action when appropriate

Example:

> No students found.

Then optionally:

> Add a student to begin managing attendance records.

---

## 14. Forms

Forms should minimize cognitive load.

### 14.1 Labels

Every input should have a clear label.

Avoid relying on placeholders as the only label.

### 14.2 Input States

Inputs should clearly communicate:

- Default
- Hover
- Focus
- Filled
- Disabled
- Error
- Success where appropriate

### 14.3 Validation

Validation messages should:

- Appear near the relevant field
- Explain what is wrong
- Explain how to correct it where useful
- Not rely solely on red color

Avoid vague messages such as:

> Invalid input.

Prefer actionable messages.

### 14.4 Form Actions

The primary submission action should be visually clear.

For destructive or irreversible forms, make the consequences obvious before confirmation.

---

## 15. Dialogs and Modals

Dialogs should be used for focused tasks, not as a replacement for page navigation.

Good dialog use cases:

- Confirm deletion
- Quick create/edit
- RFID registration
- Small configuration tasks
- Focused detail views

Avoid very large dialogs containing entire application workflows.

### 15.1 Dialog Structure

Prefer:

```text
Title
Description/context
----------------
Content
----------------
Secondary action   Primary action
```

The dialog should have a clear purpose.

### 15.2 Destructive Confirmation

A destructive confirmation should explicitly state:

- What will happen
- Which record is affected
- Whether the action can be undone

---

## 16. Cards

Cards should group related information.

Use cards for:

- Dashboard metrics
- Related settings
- Summary information
- Focused content groups

Do not put every component inside a card merely because the design system supports cards.

Excessive card nesting makes the UI harder to scan.

---

## 17. Badges and Status Indicators

Badges are appropriate for compact categorical information.

Examples:

```text
Present
Late
Absent
Active
Inactive
Verified
Unassigned
```

Keep badge styling consistent.

Avoid creating a unique badge appearance for every page.

---

## 18. Alerts, Toasts, and Notifications

Feedback should be proportional to the importance of the event.

### Use inline feedback for:

- Form validation
- Persistent page-level problems
- Important warnings

### Use toast notifications for:

- Successful saves
- Small transient confirmations
- Non-blocking system feedback

### Use dialogs for:

- Important confirmations
- Destructive actions
- Decisions requiring user attention

Do not use a toast for an error that the user must actively resolve.

---

## 19. Loading States

Loading states should communicate that the system is working.

Prefer:

- Skeletons for large content areas
- Spinners for focused actions
- Disabled states for submitting buttons
- Clear progress indicators for longer operations

Avoid unnecessarily animating the entire page.

### Prevent Duplicate Actions

During submission:

- Disable the relevant action when appropriate.
- Show a loading state.
- Preserve the user's context.

---

## 20. Error States

Errors should be understandable and actionable.

A good error state answers:

1. What happened?
2. What does it affect?
3. What can the user do?

Avoid exposing raw technical errors to normal users.

Developer diagnostics may be logged separately.

---

## 21. Empty States

Empty states should explain the current situation.

Good empty state structure:

```text
Icon/visual cue
Title
Short explanation
Optional primary action
```

Example:

> No students in this section yet.

Then optionally:

> Add a student to begin tracking attendance for this section.

Avoid decorative empty states that add visual noise without helping the user.

---

## 22. Responsive Design

The application must remain usable across:

- Desktop
- Laptop
- Tablet
- Mobile

Administrative screens may prioritize desktop, but mobile layouts must not be treated as an afterthought.

### 22.1 Tables on Small Screens

Do not blindly force wide tables into tiny screens.

Depending on the workflow, use:

- Horizontal scrolling
- Reduced columns
- Responsive row/card representations
- Priority-based column visibility

Do not remove important information merely to avoid scrolling.

### 22.2 Navigation

Mobile navigation should preserve access to the core application areas without becoming difficult to operate.

---

## 23. Accessibility

Accessibility is part of UI quality, not an optional enhancement.

### Required practices

- Maintain sufficient color contrast.
- Use semantic HTML where practical.
- Provide accessible labels.
- Do not rely on color alone.
- Ensure interactive elements are keyboard accessible.
- Maintain visible focus states.
- Use appropriate button/link semantics.
- Associate form errors with their fields.
- Avoid extremely small text.
- Ensure dialogs have appropriate accessible structure.

### Color Independence

This is especially important for attendance.

For example:

```text
Green + "Present"
Amber + "Late"
Red + "Absent"
```

is preferable to:

```text
Green
Amber
Red
```

without labels.

---

## 24. Icons

Icons should support comprehension, not replace necessary text.

Use icons for:

- Navigation
- Familiar actions
- Status reinforcement
- Compact controls

Avoid ambiguous icons for important actions.

For destructive actions, an icon may reinforce the action but should not be the only way users understand it when clarity matters.

Maintain consistent icon sizing and alignment.

---

## 25. Animation and Motion

Motion should be purposeful and restrained.

Good uses:

- Dialog transitions
- Toast appearance
- Loading indicators
- Small state transitions
- Navigation feedback

Avoid:

- Constant pulsing
- Excessive bouncing
- Decorative animations
- Large page transitions
- Animation that delays routine administrative work

The system should feel responsive, not theatrical.

---

## 26. Avoiding AI-Generated UI Patterns

AI coding agents must not introduce visual patterns simply because they are fashionable.

Avoid unnecessary:

- Glassmorphism
- Huge gradients
- Excessive shadows
- Floating blobs
- Neon colors
- Excessive rounded corners
- Random illustrations
- Decorative badges
- Overly large hero sections
- Gradient text
- Excessive iconography
- Multiple competing accent colors

The interface should look intentionally designed for a real school administrative workflow.

---

## 27. Flowbite Component Principle

When a suitable Flowbite component exists, prefer it over creating a visually inconsistent custom equivalent.

Before creating a new component:

1. Check whether Flowbite provides an appropriate component.
2. Check existing project components.
3. Reuse an established project pattern where possible.
4. Only create a custom component when the workflow genuinely requires it.

Customization should preserve the project's design language.

Do not copy Flowbite examples blindly. Adapt them to the project's actual information architecture and UX.

---

## 28. Flowbite MCP Usage

The Flowbite MCP server is project-scoped through `.mcp.json`.

The documented tools include:

- `generate-theme`
- `convert-figma-to-code`

### 28.1 `generate-theme`

Use `generate-theme` when:

- Establishing the project theme
- Revising the core visual system
- Exploring a new brand direction
- Creating a consistent palette from a brand color

The project currently favors the **green primary direction**.

### 28.2 `convert-figma-to-code`

Do not use this tool unless the project begins using Figma and a valid Figma token is available.

### 28.3 MCP Workflow

For substantial UI/UX work:

```text
Understand current page
        ↓
Identify UX problems
        ↓
Confirm design-system rules
        ↓
Generate/use Flowbite theme
        ↓
Implement pilot page
        ↓
Review visual consistency
        ↓
Refine patterns
        ↓
Propagate patterns to other pages
```

Do not regenerate the theme independently for every page.

---

## 29. Pilot Page Strategy

UI/UX work should be incremental.

### Phase 1 — Theme

Establish:

- Primary green
- Neutral palette
- Typography
- Radius
- Spacing
- Component states

### Phase 2 — Pilot Page

Choose one representative page that contains several UI patterns.

A strong pilot page usually contains:

- Page header
- Primary/secondary actions
- Filters
- Table
- Status badges
- Pagination
- Dialog/form
- Empty state
- Loading/error states

### Phase 3 — Review

Check:

- Visual hierarchy
- Spacing
- Color usage
- Accessibility
- Responsive behavior
- Interaction states
- Information density
- Consistency with Flowbite

### Phase 4 — Propagation

Only after the pilot page establishes reliable patterns should those patterns be applied across the rest of the system.

---

## 30. UI/UX Refactoring Rules

When improving an existing page:

### Preserve

- Existing business logic
- Existing routes
- Existing permissions
- Existing API behavior
- Existing validation rules
- Existing data relationships
- Existing functionality unless a UX change explicitly requires otherwise

### Improve

- Layout
- Visual hierarchy
- Component consistency
- Responsiveness
- Accessibility
- Information grouping
- Interaction clarity
- Error/empty/loading states
- Scannability

### Do Not

- Rewrite working business logic unnecessarily
- Change database behavior as part of a visual-only task
- Introduce unrelated dependencies
- Replace existing architecture merely for visual preference
- Create one-off styling systems
- Change terminology without a UX reason
- Break existing workflows

---

## 31. Page Review Checklist

Before considering a UI/UX page complete, verify:

### Visual

- [ ] Green is used as an accent, not as the entire interface.
- [ ] Neutral surfaces establish the foundation.
- [ ] Typography hierarchy is clear.
- [ ] Spacing follows the established rhythm.
- [ ] Radius and component styles are consistent.
- [ ] Shadows are restrained.
- [ ] There are no unnecessary decorative effects.

### UX

- [ ] The page purpose is immediately clear.
- [ ] The primary action is obvious.
- [ ] Related information is grouped logically.
- [ ] Important information is easy to scan.
- [ ] Destructive actions are clearly differentiated.
- [ ] Empty states are useful.
- [ ] Loading states are understandable.
- [ ] Errors are actionable.

### Accessibility

- [ ] Text contrast is sufficient.
- [ ] Color is not the only status indicator.
- [ ] Form fields have labels.
- [ ] Focus states are visible.
- [ ] Interactive elements are keyboard accessible.
- [ ] Dialogs are accessible.

### Responsive

- [ ] Desktop layout is polished.
- [ ] Tablet layout remains usable.
- [ ] Mobile layout remains functional.
- [ ] Tables have an intentional small-screen strategy.
- [ ] Actions remain discoverable on smaller screens.

### Technical

- [ ] Existing functionality still works.
- [ ] Existing project conventions are followed.
- [ ] Flowbite components are used where appropriate.
- [ ] No unnecessary dependencies were introduced.
- [ ] No arbitrary color system was created.
- [ ] No duplicate design patterns were introduced.

---

## 32. Design Decision: Green vs. Blue

The project deliberately chooses **green as the primary brand direction**.

Blue remains available as an **informational/secondary semantic color**.

This decision is not based on green being inherently better than blue. It is based on giving the School RFID Attendance System a more distinctive identity while naturally aligning green with positive attendance and verification states.

The design must still maintain a professional administrative appearance.

Therefore:

```text
Primary brand → Green
Foundation    → Neutral/Slate
Success       → Green
Warning       → Amber
Danger        → Red
Information   → Blue
```

If future usability testing demonstrates that green creates confusion between brand and success states, the theme may be revised. Until then, green is the authoritative primary direction.

---

## 33. AI Agent Instructions

When an AI coding agent modifies UI in this project:

1. Read this document before substantial UI/UX work.
2. Follow the existing Flowbite theme.
3. Prefer Flowbite components and established project components.
4. Do not invent a new visual language for individual pages.
5. Use green strategically rather than saturating the interface.
6. Preserve neutral surfaces and strong information hierarchy.
7. Preserve application functionality unless the task explicitly changes behavior.
8. Do not make unnecessary architectural changes during UI work.
9. Validate responsive behavior.
10. Consider accessibility before declaring a UI task complete.
11. If a new recurring UI pattern is introduced, consider whether it should become a reusable component.
12. If an existing pattern conflicts with this guide, prefer the established project pattern unless the task is explicitly a design-system migration.
13. Do not regenerate the theme for individual pages.
14. When uncertain about a visual decision, prioritize clarity, consistency, accessibility, and workflow efficiency in that order.

---

## 34. Source Documentation

Flowbite documentation:

- Flowbite MCP
- Flowbite LLM documentation
- Flowbite component documentation

The project's MCP configuration is maintained separately in:

```text
.mcp.json
```

The project's general AI/development instructions remain in:

```text
CLAUDE.md
```

This document is specifically responsible for **UI/UX and visual design guidance**.

---

## 35. Change Management

Changes to the core design system should be deliberate.

Before changing:

- Primary color
- Typography
- Radius
- Major spacing rules
- Core component variants
- Semantic color meanings

consider the impact across the entire application.

A design-system change should ideally be tested on the pilot page before being propagated throughout the system.

---

**End of document**
