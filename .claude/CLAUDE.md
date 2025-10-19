# Vertical Writing Sandbox - Project Guidelines

## Task Tracking Workflow

For complex, multi-step tasks that span multiple sessions:

### 1. Create CURRENT_TASK.md at project root
Structure:
- **Background and goal**: Why we're doing this task
- **Current state**: Where we are now
- **Migration/implementation plan**: Detailed steps organized in phases
- **Progress checkboxes**: `[ ]` for pending, `[x]` for completed
- **Next steps**: What to do next
- **Notes**: Findings, blockers, decisions made

### 2. Update CURRENT_TASK.md after each completed step
- Mark completed items with `[x]`
- Update "Current phase" section
- Update "Last updated" timestamp
- Add new findings or blockers to Notes section
- Commit the updated document WITH the related code changes

### 3. Commit pattern
- Code changes + CURRENT_TASK.md update in the SAME commit
- Commit message references the completed step
- Example: `feat: install HonoX dependencies (Phase 1.3)`

### 4. Benefits
- Any team member (or Claude in a new session) can resume work
- Clear audit trail of the decision-making process
- Prevents duplicate work or forgotten steps
- Easy to track progress and remaining work

## Project-Specific Notes

### Current Major Task
Migrating from Vite multi-page setup to HonoX for:
- File-based routing with clean URLs
- Better colocation of components and styles
- Improved developer experience

See `CURRENT_TASK.md` for detailed progress.
