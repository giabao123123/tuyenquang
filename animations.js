

(function () {
  'use strict';

  
  const bar = document.createElement('div');
  bar.id = 'read-progress';
  bar.style.cssText = [
    'position:fixed',
    'top:' + (68 + 48) + 'px',   
    'left:0',
    'z-index:1001',
    'height:3px',
    'width:0%',
    'pointer-events:none',
    'transition:width .12s linear',
    'background:linear-gradient(90deg,#1A6B42 0%,#B5831A 50%,#C42C2C 100%)',
  ].join(';');
  document.body.appendChild(bar);

  function updateProgress() {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    const total    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = total > 0 ? Math.min(100, (scrolled / total) * 100) + '%' : '0%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  
  if (!window.IntersectionObserver) return;   

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

  
  var targets = document.querySelectorAll(
    'section, article, figure, table, .chart-container, details'
  );
  targets.forEach(function (el, i) {
    el.classList.add('reveal');
    
    el.style.transitionDelay = Math.min(i % 4 * 60, 180) + 'ms';
    io.observe(el);
  });

  
  function reposBar() {
    var nh = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 68;
    var bh = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--bar-h')) || 48;
    bar.style.top = (nh + bh) + 'px';
  }
  window.addEventListener('resize', reposBar, { passive: true });

})();
