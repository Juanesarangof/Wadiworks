const BOOKING_URL = 'https://calendly.com/juanes-arango';
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const nav=document.querySelector('.nav'), menu=document.querySelector('.menu-toggle'), navigation=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open)});
navigation.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(navigation.classList.contains('open')){closeMenu();menu.focus()}}});
matchMedia('(min-width:701px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
const dialog=document.querySelector('#agenda');
document.querySelectorAll('.booking').forEach(a=>{if(BOOKING_URL){a.href=BOOKING_URL;}else{a.addEventListener('click',e=>{e.preventDefault();dialog.showModal()})}});
document.querySelectorAll('.close-dialog,.close-action').forEach(b=>b.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.querySelector('#year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});
if(!reduce.matches)document.querySelectorAll('.section h2,.product-card,.steps article,.principles article,.comparison').forEach(e=>{e.classList.add('reveal');observer.observe(e)});
function onScroll(){nav.classList.toggle('scrolled',window.scrollY>30)}window.addEventListener('scroll',onScroll,{passive:true});onScroll();
document.querySelectorAll('.magnetic').forEach(a=>{a.addEventListener('pointermove',e=>{if(reduce.matches||e.pointerType==='touch')return;const r=a.getBoundingClientRect();a.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.035}px,${(e.clientY-r.top-r.height/2)*.07}px)`});a.addEventListener('pointerleave',()=>{a.style.transform=''})});

// Keep the active navigation item aligned with the reading position.
const sectionLinks = [...navigation.querySelectorAll(':scope > a[href^="#"]')];
const linkedSections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
let scrollFrame = 0;
function updateActiveSection() {
  scrollFrame = 0;
  let current = null;
  for (const section of linkedSections) {
    if (section.getBoundingClientRect().top <= innerHeight * 0.4) current = section.id;
  }
  for (const link of sectionLinks) {
    if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateActiveSection);
}, { passive: true });
updateActiveSection();
document.addEventListener('click', event => {
  if (!nav.contains(event.target)) closeMenu();
});
reduce.addEventListener('change', () => {
  if (reduce.matches) {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
    document.querySelectorAll('.magnetic').forEach(element => element.style.transform = '');
  }
});
