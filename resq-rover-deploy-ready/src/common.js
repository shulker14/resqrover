import { getUser, logout, handleAuthCallback } from 'https://esm.sh/@netlify/identity@2.0.0';

export const parks = {
  central: { id:'central', name:'Central Park', city:'New York, United States', rover:'Rover 01', image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80' },
  zilker: { id:'zilker', name:'Zilker Metropolitan Park', city:'Austin, Texas', rover:'Rover 02', image:'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=600&q=80' },
  discovery: { id:'discovery', name:'Discovery Green', city:'Houston, Texas', rover:'Rover 03', image:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80' }
};

export function getSession(){
  const guest = sessionStorage.getItem('resq_guest') === '1';
  return { guest };
}
export function startGuest(){ sessionStorage.setItem('resq_guest','1'); }
export function endGuest(){ sessionStorage.removeItem('resq_guest'); sessionStorage.removeItem('resq_activity'); }
export function selectedPark(){ return parks[localStorage.getItem('resq_park') || 'central'] || parks.central; }
export function setPark(id){ if(parks[id]) localStorage.setItem('resq_park', id); }

export async function currentAccount(){
  try { return await getUser(); } catch { return null; }
}
export async function requireAccess(){
  const user = await currentAccount();
  if(!user && !getSession().guest) location.href='/';
  return user;
}
export async function endSession(){
  const user = await currentAccount();
  if(user){ try{ await logout(); }catch{} }
  endGuest();
  location.href='/';
}
export async function processAuthCallback(){
  try { const result = await handleAuthCallback(); if(result?.user) return result; } catch {}
  return null;
}
export function nav(active=''){
  const host=document.querySelector('[data-nav]'); if(!host) return;
  host.innerHTML=`<a href="/locations.html" class="${active==='locations'?'active':''}">Locations</a><a href="/dashboard.html" class="${active==='dashboard'?'active':''}">Dashboard</a><a href="/experience.html" class="${active==='experience'?'active':''}">Experience</a><a href="/project.html" class="${active==='project'?'active':''}">Project</a><a href="/how.html" class="${active==='how'?'active':''}">How Rover works</a><a href="/" data-login-link>Log in</a><button class="link-btn" data-end-session>End session</button>`;
  host.querySelector('[data-end-session]')?.addEventListener('click', endSession);
  currentAccount().then(user=>{ const link=host.querySelector('[data-login-link]'); if(user && link) link.textContent=user.email || 'Account'; else if(getSession().guest && link) link.textContent='Guest'; });
}
export function pageShell(active=''){
  nav(active);
}
export function getActivity(){ try{return JSON.parse(sessionStorage.getItem('resq_activity')||'[]')}catch{return[]} }
export function addActivity(item){ const a=getActivity(); a.unshift({time:new Date().toISOString(),...item}); sessionStorage.setItem('resq_activity',JSON.stringify(a.slice(0,20))); }
