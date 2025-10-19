# Current Task: Migrate to HonoX

## Background
The project is currently a Vite-based multi-page application with a suboptimal structure where HTML files are in `src/pages/` but need clean URLs:
- `localhost:3000/` for index
- `localhost:3000/about/` for about page
- `localhost:3000/vertical-columns/` for vertical-columns page

The current structure lacks proper colocation of related files, making it difficult to maintain.

## Goal
Migrate the entire project to HonoX to achieve:
- File-based routing with clean URLs
- Proper colocation of page components, styles, and logic
- Better developer experience with SSR/SSG capabilities

## Current State
- Vite multi-page setup with 3 pages: index, about, vertical-columns
- Assets include Japanese literary texts for vertical writing demos
- Basic TypeScript + Vite configuration

## Migration Plan

### Phase 1: Setup & Structure (In Progress)
- [x] Create CURRENT_TASK.md for tracking
- [x] Update project-specific .claude/CLAUDE.md with task tracking workflow
- [x] Install HonoX and dependencies (hono, honox, @hono/vite-dev-server, vite-tsconfig-paths)
- [ ] Create HonoX project structure (app/routes/, app/islands/)

### Phase 2: Route Migration
- [ ] Migrate index page to `app/routes/index.tsx`
- [ ] Migrate about page to `app/routes/about/index.tsx`
- [ ] Migrate vertical-columns page to `app/routes/vertical-columns/index.tsx`

### Phase 3: Configuration
- [ ] Update vite.config.ts for HonoX
- [ ] Create app entry point (app/server.ts or similar)
- [ ] Update package.json scripts (dev, build, preview)

### Phase 4: Testing & Verification
- [ ] Test development server with all routes
- [ ] Verify asset loading (Japanese texts)
- [ ] Verify styling works correctly
- [ ] Test build process

### Phase 5: Cleanup
- [ ] Remove old src/pages/ structure
- [ ] Update .gitignore if needed
- [ ] Final commit with migration complete

## Next Steps
1. Update CLAUDE.md with workflow documentation
2. Install HonoX dependencies
3. Create basic HonoX structure

## Notes
- Keep assets in accessible location for all routes
- Ensure vertical writing CSS works correctly in new structure
- Maintain TypeScript strict mode throughout migration

---
Last updated: 2025-10-20
Current phase: Phase 1 (Setup & Structure)
