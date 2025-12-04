document.addEventListener('DOMContentLoaded', () => {

/* ===== Mobile Menu ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

if (closeMenu) {
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
}

if (mobileMenu) {
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('active');
    }
  });
}


  /* ===== Carousel (dots, arrows, auto, touch) ===== */
  const slidesWrap = document.getElementById('carouselSlides');
  const dotsWrap = document.getElementById('carouselDots');
  const slides = slidesWrap ? Array.from(slidesWrap.children) : [];
  let idx = 0, timer = null, delay = 4500, autoplay = true;

  function createDots(){
    if(!dotsWrap) return;
    dotsWrap.innerHTML = '';
    slides.forEach((_,i) => {
      const d = document.createElement('button');
      d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      d.dataset.i = i;
      d.addEventListener('click', ()=> go(i));
      dotsWrap.appendChild(d);
    });
  }
  function updateDots(){
    if(!dotsWrap) return;
    Array.from(dotsWrap.children).forEach((d,i)=> d.classList.toggle('active', i===idx));
  }
  function go(i){
    if(!slidesWrap) return;
    idx = (i + slides.length) % slides.length;
    slidesWrap.style.transform = `translateX(${-idx * 100}%)`;
    updateDots();
  }
  function next(){ go(idx+1); }
  function prev(){ go(idx-1); }
  function startAuto(){ stopAuto(); timer = setInterval(next, delay); }
  function stopAuto(){ if(timer){ clearInterval(timer); timer = null; } }

  if(slidesWrap && slides.length){
    createDots();
    document.querySelectorAll('.carousel-arrow').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if(btn.classList.contains('next')) next(); else prev();
        if(autoplay) startAuto();
      });
    });

    slidesWrap.parentElement.addEventListener('mouseenter', stopAuto);
    slidesWrap.parentElement.addEventListener('mouseleave', ()=> { if(autoplay) startAuto(); });

    // touch support
    let startX = 0, endX = 0;
    slidesWrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stopAuto(); });
    slidesWrap.addEventListener('touchmove', e => { endX = e.touches[0].clientX; });
    slidesWrap.addEventListener('touchend', () => {
      const diff = startX - endX;
      if(Math.abs(diff) > 40) { diff>0 ? next() : prev(); }
      if(autoplay) startAuto();
    });

    startAuto();
  }

  /* ===== Animated title letter-by-letter ===== */
  (function titleAnim(){
    const text = 'MTH-VOYAGE';
    const container = document.getElementById('animatedTitle');
    if(!container) return;
    container.innerHTML = '';
    for(let i=0;i<text.length;i++){
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = text[i];
      s.style.animationDelay = (i*0.07)+'s';
      container.appendChild(s);
    }
    setTimeout(()=> container.classList.add('show'), 500);
    setInterval(()=>{
      container.classList.remove('show');
      void container.offsetWidth;
      setTimeout(()=> container.classList.add('show'), 300);
    }, 6000);
  })();

 (function titleAnim(){
    const text = 'CABISEN';
    const container = document.getElementById("animatedCabisen");
    if(!container) return;
    container.innerHTML = '';
    for(let i=0;i<text.length;i++){
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = text[i];
      s.style.animationDelay = (i*0.06)+'s';
      container.appendChild(s);
    }
    setTimeout(()=> container.classList.add('show'), 500);
    setInterval(()=>{
      container.classList.remove('show');
      void container.offsetWidth;
      setTimeout(()=> container.classList.add('show'), 300);
    }, 6000);
  })();

  /* ===== Accordion ===== */
  document.querySelectorAll('.acc-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.target;
      const panel = document.getElementById(id);
      if(!panel) return;
      const visible = panel.style.display === 'block';
      document.querySelectorAll('.acc-panel').forEach(p => p.style.display = 'none');
      panel.style.display = visible ? 'none' : 'block';
      if(!visible) panel.scrollIntoView({behavior:'smooth', block:'center'});
    });
  });

  /* ===== Team marquee (smooth center loop) ===== */
  (function teamLoop(){
    const track = document.getElementById('teamTrack');
    if(!track) return;
    let pos = 0;
    const speed = 0.4; // pixels per frame (adjust)
    function frame(){
      pos -= speed;
      if(Math.abs(pos) >= track.scrollWidth/2) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(frame);
    }
    frame();
  })();

  /* ===== Footer year ===== */
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

});

