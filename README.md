# Online Store (Backend + Frontend)

**Stack:** HTML, SCSS, Tailwind, TS, React, Redux Toolkit, React Router, JSON, Axios, RTK Query, Zod, RHF, shadcn

----------------  
### Backend (Simple)
----------------  
- `db.json` as the database  
- `api.ts` (`src/services/api.ts`) as the API to work with the database

- Using **json-server** for a simple database
- Using **axios** to make HTTP requests to the API

-------------------------------  
### Frontend (Main part of the app)
-------------------------------  
**CONNECTION WITH BACKEND**

- The API file has functions for working with axios to communicate with the database
- Redux store thunk functions use API functions to change state in the store
- Components use dispatch and states from the store to display the information

**FOLDER STRUCTURE**

- `src` — main project part with all logic
- `public` — images for components
- `db.json` — app's database
- Other files are for building and running the app

**src:**

- `context` — has only one context file for accordion work (may be deleted)
- `entity` — folder with 10 entity folders (each has its own SLICE and TYPES for slice working)
- `pages` — folder with subfolders, each of which has components and styles for displaying a page
- `services` — has the `api` file + `routes` (for routing between pages)
- `index.tsx` + `main.tsx` — root React elements
- `main` — folder with main (general) parts of the app

**main:**
- `App` — folder with components that are displayed on each page + `App.tsx` (main component) and styles for them
- `components` — reusable components
- `fonts` — folder with font files
- `styles` — general styles and main (includes all styles for components) // poor performance, may be changed
- `store` — redux store file // may be moved




