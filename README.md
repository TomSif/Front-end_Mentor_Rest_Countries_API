# Frontend Mentor - REST Countries API with Color Theme Switcher 🌍

[![React](https://img.shields.io/badge/react_19-20232a?style=for-the-badge&logo=react&logocolor=61dafb)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/react_router_v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vite](https://img.shields.io/badge/vite-646cff?style=for-the-badge&logo=vite&logocolor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/tailwindcss_v4-0F172A?&logo=tailwindcss&logocolor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

![Design preview for the REST Countries API challenge](/images/screenshot-detail.png)

### 🌐 Live Demo:

**[View live site →](https://front-end-mentor-rest-countries-api-omega.vercel.app/)**

Deployed on Vercel with HTTPS and performance optimizations.

---

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region using a `select` dropdown
- Click on a country card to see more detailed information on a separate page
- Click through to border countries on the detail page
- Toggle the color scheme between light and dark mode

### Screenshot

![](/images/screensot.png)

### Links

- Solution URL: [GitHub Repository](https://github.com/TomSif/Front-end_Mentor_Rest_Countries_API)
- Live Site URL: [Vercel Deployment](https://front-end-mentor-rest-countries-api-omega.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup (`dl`, `dt`, `dd` for structured country data)
- Mobile-first workflow
- [React 19](https://react.dev/) - JS library
- [React Router v7](https://reactrouter.com/) - Client-side routing
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS (`@tailwindcss/vite` plugin, `@theme` variables, `@utility` presets, `@variant dark` class-based)
- [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) — `cn()` utility for conditional classNames

### What I learned

#### Context API architecture — two separate contexts

The architectural foundation of this project is two independent React contexts: `CountriesContext` (data) and `ThemeContext` (UI state). Each context is consumed through a dedicated custom hook with an `undefined` guard, so any consumer outside its provider fails loudly instead of silently:

```ts
// Consumed safely from any component
const { countries, loading, error } = useCountries();
const { isDark, toggleTheme } = useTheme();
```

A key insight was understanding _what belongs in a context_: the setter (`setCountries`) stays internal to the Provider; only the value consumers actually need is exposed. This distinction — between the mechanism and the interface — required deliberate work before it became clear.

#### `useEffect` + async data fetching with try/catch/finally

Fetching country data inside a `useEffect` required putting together several pieces that had never been used together before: the async wrapper pattern, loading/error state, type casting, and field filtering in the URL to reduce payload size:

```ts
useEffect(() => {
  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}?fields=name,alpha3Code,...`);
      const data = (await response.json()) as Country[];
      setCountries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  fetchCountries();
}, []);
```

A concrete bug was diagnosed and corrected during development: calling `setCountries` directly in the component body (instead of inside `useEffect`) caused an infinite re-render loop. The correction made the distinction between _initialising_ state and _modifying_ it tangible rather than theoretical.

#### Dark mode — class-based Tailwind v4 with `@variant`

Tailwind v4 handles class-based dark mode differently from v3. The setup requires two coordinated pieces: a `@variant` declaration in CSS and a `useEffect` in `ThemeProvider` that toggles the class on `document.documentElement`:

```css
/* index.css */
@variant dark (&:where(.dark, .dark *));
```

```ts
// ThemeProvider
useEffect(() => {
  document.documentElement.classList.toggle("dark", isDark);
}, [isDark]);
```

This means no component needs to import or call anything to get dark mode styling — `dark:` Tailwind variants just work everywhere as long as `.dark` is on the root element.

#### `useMemo` for combined search and region filter

Filtering 250 countries efficiently required combining two independent conditions in a single `useMemo`. The key pattern is short-circuiting each condition when its input is empty, so the full list is shown when neither filter is active:

```ts
const filteredCountries = useMemo(() => {
  return countries.filter((country) => {
    const matchesRegion = filter === "" || country.region === filter;
    const matchesSearch =
      searchInput === "" ||
      country.name.toLowerCase().includes(searchInput.toLowerCase());
    return matchesRegion && matchesSearch;
  });
}, [countries, filter, searchInput]);
```

The `(x === "" || condition)` pattern required several iterations before the logic became clear: the empty-string check is not comparing against an empty value — it's a short-circuit that bypasses the condition entirely when no filter is selected.

#### React Router — `Link` vs `NavLink` vs `navigate()`

This project required choosing deliberately between three navigation mechanisms on different occasions:

- **`Link`** — for cards and border buttons: URL known at render time, no active state needed
- **`navigate(-1)`** — for the Back button: destination is history-dependent, known only at runtime
- **`NavLink`** — deliberately _not_ used on cards, as active-link styling only makes sense in primary navigation

A structural bug was also identified and corrected: wrapping a `<li>` inside an `<a>` (i.e. `Link > li`) is invalid HTML. The correct pattern is `li > Link`, with the `key` on the `<li>` (the outermost element in the list):

```tsx
// ✅ Correct
<ul>
  {countries.map((country) => (
    <li key={country.alpha3Code}>
      <Link to={`/country/${country.alpha3Code}`}>
        <CountryCard country={country} />
      </Link>
    </li>
  ))}
</ul>
```

### Continued development

- **`find()?.property` not yet instinctive** — the reflex of asking "what type does `find()` return?" before chaining a property still requires deliberate effort. One more project with nested data structures should anchor it.
- **Combined boolean logic in `.filter()`** — the `(x === "" || condition) && (y === "" || condition)` pattern works but needed multiple iterations to click. The distinction between "short-circuit an empty filter" and "compare against an empty string" needs more practice to become automatic.
- **TypeScript: type alias union vs type alias object** — writing `type Region = "Africa" | "Europe" | ...` vs `type Region = { region?: ... }` still requires conscious verification. The distinction between a value type and a shape type isn't yet a reflex.
- **HTML validity in React lists** — the `Link > li` invalid pattern was reproduced twice across two components before being caught. The rule "the outermost element of a list item is the `<li>`" needs to become automatic.

## Author

- Frontend Mentor - [@TomSif](https://www.frontendmentor.io/profile/TomSif)
- GitHub - [@TomSif](https://github.com/TomSif)

## Acknowledgments

This project was built with AI-assisted mentoring (Claude). The approach: I code by hand, Claude acts as a Socratic mentor — asking questions, explaining concepts, reviewing my reasoning. Architectural decisions (how to structure contexts, when to use `useMemo`, how to handle routing) stayed mine.

Specific AI contributions are documented transparently in my [progression log](./progression.md):

- **Written by Claude:** project scaffold (`chore/setup` commits), design tokens in `index.css`, Tailwind v4 `@variant dark` syntax when blocked
- **My initiative:** autonomous extraction of `Currency` and `Language` sub-types, identification of the `setCountries`-in-body infinite loop, semantic key (`alpha3Code` over `index`) on border buttons, `navigate(-1)` justification against hardcoded Home link
- **Collaborative:** building the dual-context architecture after guided decomposition, working through the combined `useMemo` filter logic, debugging `Link > li` HTML validity, applying O7 pseudo-code protocol on the three main data flows
