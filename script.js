// Bilingual toggle + UI interactions — no build step, GitHub Pages safe
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('langBtn');
  const saved = localStorage.getItem('hp-lang');
  let lang = saved === 'fa' ? 'fa' : 'en';

  function apply(l){
    lang = l;
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l === 'fa' ? 'fa' : 'en');
    root.setAttribute('dir', l === 'fa' ? 'rtl' : 'ltr');
    document.querySelectorAll('[data-en]').forEach(el=>{
      const v = el.getAttribute(l === 'fa' ? 'data-fa' : 'data-en');
      if(v != null) el.textContent = v;
    });
    localStorage.setItem('hp-lang', l);
  }
  btn.addEventListener('click', ()=> apply(lang === 'en' ? 'fa' : 'en'));
  apply(lang);

  // mobile menu
  const menu = document.getElementById('menuBtn');
  const links = document.getElementById('navLinks');
  menu.addEventListener('click', ()=> links.classList.toggle('open'));
  links.addEventListener('click', e=>{ if(e.target.tagName==='A') links.classList.remove('open'); });

  // reveal on scroll
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // gold halo following the cursor (desktop only, respects reduced motion)
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(fine && !calm){
    const glow = document.getElementById('cursorGlow');
    let tx = -600, ty = -600, x = -600, y = -600, shown = false, raf = null;
    function loop(){
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      if(Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5){ raf = requestAnimationFrame(loop); }
      else { raf = null; }
    }
    window.addEventListener('mousemove', e=>{
      tx = e.clientX; ty = e.clientY;
      if(!shown){ shown = true; document.body.classList.add('glow-on'); }
      if(!raf) raf = requestAnimationFrame(loop);
    }, {passive:true});

    // spotlight inside experience cards — tracks cursor position per card
    document.querySelectorAll('.job').forEach(card=>{
      card.addEventListener('pointermove', e=>{
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }, {passive:true});
    });
  }
})();
