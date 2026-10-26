import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as H from './src/components/story/worlds/home.jsx';
import * as A from './src/components/story/worlds/about.jsx';
import * as S from './src/components/story/worlds/services.jsx';
import * as L from './src/components/story/worlds/living.jsx';
import * as C from './src/components/story/worlds/contact.jsx';
const all = {}; [H, A, S, L, C].forEach(m => Object.entries(m).forEach(([k, v]) => { if (k.endsWith('_WORLD')) all[k] = v; }));
const res = {};
for (const [k, w] of Object.entries(all)) {
  const layers = w.layers.map(l => { const s = renderToStaticMarkup(<svg>{l.node}</svg>); return { id: l.id, els: (s.match(/<(path|rect|circle|ellipse|line|polygon|polyline|image|use)\b/g) || []).length, grads: (s.match(/<(linear|radial)Gradient/g) || []).length, filters: (s.match(/<filter\b/g) || []).length, bytes: s.length }; });
  res[k] = { els: layers.reduce((a, l) => a + l.els, 0), bytes: layers.reduce((a, l) => a + l.bytes, 0), grads: layers.reduce((a, l) => a + l.grads, 0), filters: layers.reduce((a, l) => a + l.filters, 0), layers };
}
console.log(JSON.stringify(res));
