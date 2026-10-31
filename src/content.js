import { requireAccess, pageShell } from './common.js';
await requireAccess(); pageShell(document.body.dataset.active||'');
