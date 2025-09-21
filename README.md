# Todo App

A modern Todo application built with React, TypeScript, and Vite.

## Features
- Add, edit, and delete todos
- Mark todos as completed
- Responsive and accessible UI
- Mock API for local development
- Error and loading states

## Project Structure
```
Todo-app/
├── public/              # Static assets (favicon, etc.)
├── src/
│   ├── components/      # React components
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions (mock API)
│   ├── App.tsx          # Main App component
│   ├── App.css          # App styles
│   └── index.tsx        # Entry point
├── index.html           # Main HTML file (Vite root)
├── package.json         # Project metadata and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.mjs      # Vite configuration
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (v9 or newer recommended)

### Installation
1. Clone the repository or download the source code.
2. Open a terminal in the project directory.
3. Install dependencies:
   ```
   npm install
   ```

### Running the App
Start the development server:
```
npm run dev
```
The app will be available at [http://localhost:5173/](http://localhost:5173/).

### Building for Production
To build the app for production:
```
npm run build
```
The output will be in the `dist/` folder.

### Previewing the Production Build
To preview the production build locally:
```
npm run preview
```

## Scripts
- `npm run dev` — Start the Vite development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build

## Accessibility & Best Practices
- All form elements have labels or placeholders
- Error and loading states are clearly indicated
- Responsive design for mobile and desktop

## Troubleshooting
- If you see a blank page, check the browser console for errors
- Ensure `index.html` is in the project root and includes:
  ```html
  <script type="module" src="/src/index.tsx"></script>
  ```
- If you get ESM/CJS errors, ensure your `vite.config.mjs` uses ESM syntax
- For port conflicts, change the port in `vite.config.mjs`

## License
MIT
