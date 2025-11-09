
/* main.js - adds interactivity, simple search, forms validation + mailto, lightbox, accordion, modal, map init (Leaflet) */
document.addEventListener('DOMContentLoaded', function() {
  // Accordion
  document.querySelectorAll('.accordion button').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const panel = btn.nextElementSibling;
      const open = panel.style.display === 'block';
      document.querySelectorAll('.accordion .panel').forEach(p=>p.style.display='none');
      panel.style.display = open ? 'none' : 'block';
    });
  });

  // Lightbox
  const lightbox = document.createElement('div'); lightbox.className='lightbox';
  const lbImg = document.createElement('img'); lightbox.appendChild(lbImg);
  lightbox.addEventListener('click', ()=> lightbox.style.display='none');
  document.body.appendChild(lightbox);
  document.querySelectorAll('.img-gallery img').forEach(img=>{
    img.addEventListener('click', ()=> {
      lbImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  // Modal triggers
  document.querySelectorAll('[data-modal-target]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const id = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(id);
      if(modal) modal.style.display='flex';
    });
  });
  document.querySelectorAll('.modal .close').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btn.closest('.modal').style.display='none';
    });
  });

  // Simple search filter: elements with data-search
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input=>{
    input.addEventListener('input', ()=>{
      const q = input.value.toLowerCase();
      const listSelector = input.getAttribute('data-list');
      if(!listSelector) return;
      document.querySelectorAll(listSelector + ' [data-search]').forEach(item=>{
        const text = item.getAttribute('data-search').toLowerCase();
        item.style.display = text.includes(q) ? '' : 'none';
      });
    });
  });

  // Form validation & mailto generation
  function validateForm(form) {
    let valid = true;
    const errors = [];
    // simple required fields
    form.querySelectorAll('[data-required]').forEach(el=>{
      if(!el.value || el.value.trim()==='') {
        valid=false; errors.push(el.name || el.id || el.placeholder || 'field');
        el.classList.add('error');
      } else el.classList.remove('error');
    });
    // email pattern
    const email = form.querySelector('input[type="email"]');
    if(email && email.value){
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!re.test(email.value)){ valid=false; errors.push('email'); email.classList.add('error'); }
    }
    // phone pattern (optional)
    const phone = form.querySelector('input[type="tel"]');
    if(phone && phone.value){
      const re = /^[0-9+\-\s]{6,20}$/;
      if(!re.test(phone.value)){ valid=false; errors.push('phone'); phone.classList.add('error'); }
    }
    // honeypot
    const hp = form.querySelector('input[name="_hp"]');
    if(hp && hp.value){ valid=false; errors.push('bot'); }
    return {valid, errors};
  }

  document.querySelectorAll('form').forEach(form=>{
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const result = validateForm(form);
      const status = form.querySelector('.form-status');
      if(!result.valid){
        if(status) status.textContent = 'Please correct the highlighted fields.';
        return;
      }
      // If form has data-mailto attribute, prepare mailto and open
      const mailto = form.getAttribute('data-mailto');
      if(mailto){
        const subject = encodeURIComponent(form.getAttribute('data-subject') || 'Website enquiry');
        const bodyLines = [];
        new FormData(form).forEach((v,k)=> {
          if(k==='_hp') return;
          bodyLines.push(`${k}: ${v}`);
        });
        const body = encodeURIComponent(bodyLines.join('\n'));
        window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;
        if(status) status.textContent = 'Successfully subscribed.';
        return;
      }
      // Otherwise, simulate AJAX post to /submit (no server): show success message
      if(status) status.textContent = 'Successfully subscribed..';
      // reset if desired:
      // form.reset();
    });
  });

  // Simple dynamic content loader: loads posts from a posts.json if present (client-side)
  fetch('/posts.json').then(r=>r.json()).then(data=>{
    const container = document.querySelector('[data-posts]');
    if(container && Array.isArray(data)) {
      container.innerHTML = data.map(p=>`<article data-search="${p.title}"><h3>${p.title}</h3><p>${p.excerpt}</p></article>`).join('');
    }
  }).catch(()=>{ /* no posts.json - ignore */ });

  // Map init: initializes Leaflet map for elements with id 'map' if L is present
  if(window.L){
    document.querySelectorAll('#map').forEach(m=>{
      try{
        const map = L.map(m).setView([-26.2041,28.0473], 12); // default to Johannesburg
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' }).addTo(map);
        L.marker([-26.2041,28.0473]).addTo(map).bindPopup('Our main centre').openPopup();
      }catch(e){}
    });
  }

});
