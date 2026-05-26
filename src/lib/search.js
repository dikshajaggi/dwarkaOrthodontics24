import Fuse from 'fuse.js';

const FUSE_OPTIONS = {
  threshold: 0.4,       // 0 = exact, 1 = match anything — 0.4 handles ~2 typos
  distance: 200,
  minMatchCharLength: 2,
  keys: [
    { name: 'name',       weight: 3 },
    { name: 'sku',        weight: 2 },
    { name: 'category',   weight: 1.5 },
    { name: 'shortSpecs', weight: 1 },
    { name: 'tags',       weight: 1 },
  ],
};

export function fuzzySearch(products, query, limit = 0) {
  const q = query.trim();
  if (!q) return [];

  const fuse = new Fuse(products, FUSE_OPTIONS);
  const results = fuse.search(q);
  const items = results.map((r) => r.item);
  return limit > 0 ? items.slice(0, limit) : items;
}
