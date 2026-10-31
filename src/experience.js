import { requireAccess, pageShell } from './common.js';
await requireAccess(); pageShell('experience');
const scenarios=[['Lost hiker','You are separated from your group after dark and are unsure which direction to take.'],['Minor injury','You slipped on a trail and can walk, but your ankle hurts.'],['Low visibility','Fog or darkness makes the route difficult to see.'],['Custom situation','Start from your own outdoor-assistance scenario.']];
const grid=document.querySelector('#scenarioGrid');grid.innerHTML=scenarios.map((s,i)=>`<article class="scenario card" data-i="${i}"><div class="eyebrow">Scenario 0${i+1}</div><h3>${s[0]}</h3><p>${s[1]}</p><a class="btn primary" href="/dashboard.html#demo-tools">Open in dashboard</a></article>`).join('');
