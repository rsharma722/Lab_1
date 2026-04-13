# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


## Lab 5.2 

## Data Caching and Server State Management

### What change I wanted to make in my application
For this lab, I wanted to improve how my application handles fetching and updating data from the backend. 
In the previous labs, I was using useEffect and manual fetch calls to get employee and role data. 
While that worked, it felt repetitive and required extra steps to refresh the data whenever something new was added. 
I wanted to clean this up and make the code easier to manage, while also learning a more modern and efficient way to handle server data in a React application.

### What tool or tools I made use of to make this change
To achieve this, I used TanStack Query in my React frontend. This tool is designed specifically for 
managing server data, which made it a good fit for my application. Instead of manually handling loading 
states and fetch logic, I used useQuery to handle data fetching automatically. 
I also added QueryClientProvider at the root of my app so that queries could be shared across components. 
This helped simplify my code and made the data handling much more structured and easier to understand.

### How this change affects the user experience
This change improves the user experience by making the app feel more responsive and consistent. 
Data is now loaded in a smoother way, and users do not have to worry about refreshing the page to see updates. 
For example, when a new employee or role is added, the list updates right away without extra steps. 
Overall, the app feels more reliable because data fetching and updating are handled in a more organized and predictable way.

### How this change affects my understanding or conceptualization of the app
This change helped me better understand the difference between local state and server state in a full-stack application. 
Before this, I was treating backend data like regular React state, which made things more complicated than necessary. 
Using TanStack Query showed me that server data should be managed differently, and that there are tools designed specifically 
for this purpose. It gave me a clearer understanding of how frontend and backend interact, and how using the right tools can simplify 
development and make the app easier to maintain and expand in the future.