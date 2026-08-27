# entertainment-hub

Peter's entertainment tracker — a browsable, searchable queue of movies, music, TV, and books he wants to watch / listen to / read.

Live at: **https://pcmccullagh.github.io/entertainment-hub/**

## How it works

- `data.json` — the database. Each entry is categorized (`music` / `movie` / `tv` / `book`) with a cover image and links to stream / listen / buy.
- `index.html` + `assets/app.js` + `assets/app.css` — a static single-page app: search bar + type filters, rendered from `data.json`.
- No build step. Edit `data.json`, push to `main`, and GitHub Pages serves it.

## Adding items

Text Hermes anything — a movie, album, show, or book — and it's added to `data.json` with the right category, cover, and links.
