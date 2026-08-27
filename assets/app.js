// Entertainment Tracker — renders data.json into a searchable/filterable grid.
const TYPE_LABELS = {
  music: "Album",
  movie: "Movie",
  tv: "TV Show",
  book: "Book",
};
const LINK_LABELS = {
  apple: "Apple Music",
  spotify: "Spotify",
  netflix: "Netflix",
  hulu: "Hulu",
  prime: "Prime",
  youtube: "YouTube",
  kindle: "Kindle",
  audible: "Audible",
  buy: "Buy",
  library: "Library",
};

let state = { all: [], type: "all", query: "" };

async function load() {
  const res = await fetch("data.json", { cache: "no-store" });
  state.all = (await res.json()).entries || [];
  render();
}

function filtered() {
  const q = state.query.trim().toLowerCase();
  return state.all.filter((e) => {
    if (state.type !== "all" && e.type !== state.type) return false;
    if (!q) return true;
    const hay = `${e.title} ${e.artist || ""} ${e.notes || ""}`.toLowerCase();
    return hay.includes(q);
  });
}

function card(e) {
  const sub = e.artist || e.author || (e.type === "movie" ? `${e.year || ""}` : "");
  const links = Object.entries(e.links || {})
    .map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener">${LINK_LABELS[k] || k}</a>`)
    .join("");
  const notes = e.notes ? `<p class="card-notes">${e.notes}</p>` : "";
  const badge = e.rank ? ` · #${e.rank}` : "";
  return `
    <article class="card">
      ${e.cover ? `<img class="cover" src="${e.cover}" alt="${e.title}" loading="lazy">` : `<div class="cover"></div>`}
      <div class="card-body">
        <span class="badge">${(TYPE_LABELS[e.type] || e.type)}${badge}</span>
        <h3 class="card-title">${e.title}</h3>
        ${sub ? `<p class="card-sub">${sub}${e.year ? " · " + e.year : ""}</p>` : ""}
        ${notes}
        ${links ? `<div class="card-links">${links}</div>` : ""}
      </div>
    </article>`;
}

function render() {
  const items = filtered();
  const grid = document.getElementById("grid");
  grid.innerHTML = items.map(card).join("");
  document.getElementById("empty").hidden = items.length > 0;
  document.getElementById("count").textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
}

document.getElementById("search").addEventListener("input", (e) => {
  state.query = e.target.value;
  render();
});
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  state.type = btn.dataset.type;
  render();
});

load();
