# entertainment-hub

Peter's entertainment tracker — a browsable, searchable queue of movies, music, TV, and books he wants to watch / listen to / read.

Live at: **https://pcmccullagh.github.io/entertainment-hub/**

## Source of truth

**The second brain** (`~/second-brain/entertainment/**/*.md` on the Dell) is the canonical record. Each item is a markdown file with YAML frontmatter (type, title, artist, year, cover, links, tags) + a notes body.

**This repo** (`data.json` + static site) is the *published mirror* — GitHub Pages serves it for browsing. `data.json` is generated, never hand-edited.

## Publishing

The sync script reads the second brain markdown and regenerates + pushes the library:

```
python3 /home/peter/.hermes/scripts/sync_entertainment.py
```

It: scans `~/second-brain/entertainment/` → parses frontmatter → writes `data.json` → commits + pushes to `main` → GitHub Pages updates.

## Adding items

Text Hermes anything — a movie, album, show, or book — and it's added as a markdown file in the second brain, then synced to publish.
