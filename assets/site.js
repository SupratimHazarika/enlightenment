// Preview interactions. NOTHING here transmits form data anywhere.
document.querySelectorAll('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{const d=document.getElementById('zoom');d.querySelector('img').src=b.dataset.zoom;d.querySelector('img').alt=b.querySelector('img').alt;d.showModal();}));
document.querySelectorAll('dialog [data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('[data-local-only]').forEach(f=>{const done=()=>{const s=f.querySelector('.status');s.hidden=false;s.textContent='Preview only: nothing was sent or saved. This form is disconnected until a provider, privacy notice and consent process are approved.';
  f.querySelectorAll('input,textarea').forEach(i=>{if(i.type==='checkbox')i.checked=false;else i.value='';});};
  f.querySelector('[data-local-submit]').addEventListener('click',done);});
