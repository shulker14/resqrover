import { parks, setPark, selectedPark, requireAccess, pageShell } from './common.js';
await requireAccess(); pageShell('locations');
const grid=document.querySelector('#locationGrid'); const current=selectedPark();
grid.innerHTML=Object.values(parks).map(p=>`<article class="location-card card ${p.id===current.id?'selected':''}" data-id="${p.id}"><img src="${p.image}" alt="${p.name}"><div class="content"><div class="eyebrow">${p.rover}</div><h3>${p.name}</h3><p class="muted">${p.city}</p><button class="btn primary">Use this location</button></div></article>`).join('');
grid.querySelectorAll('[data-id]').forEach(card=>card.addEventListener('click',()=>{setPark(card.dataset.id);location.href='/dashboard.html'}));
