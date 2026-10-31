import { login, signup, requestPasswordRecovery } from 'https://esm.sh/@netlify/identity@2.0.0';
import { startGuest, processAuthCallback } from './common.js';

const msg=document.querySelector('#authMessage');
function show(text,type=''){msg.textContent=text;msg.className=`auth-message ${type}`}
function open(id){document.querySelector(id)?.classList.add('open')}
function closeAll(){document.querySelectorAll('.modal').forEach(m=>m.classList.remove('open'))}

document.querySelector('#loginForm').addEventListener('submit',async e=>{
  e.preventDefault(); const data=new FormData(e.currentTarget); show('Signing in…');
  try{ await login(data.get('email'),data.get('password')); location.href='/dashboard.html'; }
  catch(err){ show(err?.message || 'Unable to sign in. Make sure Netlify Identity is enabled.', 'error'); }
});
document.querySelector('#guestBtn').addEventListener('click',()=>{startGuest();location.href='/locations.html'});
document.querySelector('#createBtn').addEventListener('click',()=>open('#signupModal'));
document.querySelector('#forgotBtn').addEventListener('click',()=>open('#recoverModal'));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',closeAll));

document.querySelector('#signupForm').addEventListener('submit',async e=>{
  e.preventDefault(); const d=new FormData(e.currentTarget); const out=e.currentTarget.querySelector('.auth-message'); out.textContent='Creating account…';
  try{ const user=await signup(d.get('email'),d.get('password'),{full_name:d.get('name')}); out.textContent=user?.email ? 'Account created. Check your email if confirmation is required.' : 'Account created.'; out.className='auth-message success'; }
  catch(err){ out.textContent=err?.message || 'Account creation failed.'; out.className='auth-message error'; }
});
document.querySelector('#recoverForm').addEventListener('submit',async e=>{
  e.preventDefault(); const d=new FormData(e.currentTarget); const out=e.currentTarget.querySelector('.auth-message');
  try{ await requestPasswordRecovery(d.get('email')); out.textContent='Recovery email sent.'; out.className='auth-message success'; }
  catch(err){ out.textContent=err?.message || 'Could not send recovery email.'; out.className='auth-message error'; }
});

processAuthCallback().then(result=>{if(result?.user) location.href='/dashboard.html'});
