document.documentElement.classList.add('js');
// Portfolio filter
document.querySelectorAll('.filters button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filters button').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var f = btn.dataset.filter;
    document.querySelectorAll('#gallery figure').forEach(function (fig) {
      fig.classList.toggle('hidden', f !== 'all' && fig.dataset.cat !== f);
    });
  });
});
// Pre-select package when a pricing button is clicked
document.querySelectorAll('[data-package]').forEach(function (a) {
  a.addEventListener('click', function () {
    document.getElementById('package').value = a.dataset.package;
  });
});
document.getElementById('year').textContent = new Date().getFullYear();


// Scroll reveal
var revealEls = document.querySelectorAll('.section h2, .proof div, .card, .about > *, .steps li, .gallery figure, .form');
revealEls.forEach(function (el) { el.classList.add('reveal'); });
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { io.observe(el); });
} else { revealEls.forEach(function (el) { el.classList.add('in'); }); }

// Lightbox
var lb = document.createElement('div');
lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
lb.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><button class="lb-prev" aria-label="Previous">&#8249;</button><img alt=""><button class="lb-next" aria-label="Next">&#8250;</button><p class="lb-cap"></p>';
document.body.appendChild(lb);
var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lb-cap'), idx = 0, list = [], lastFocus = null;
function visibleFigs() { return Array.prototype.filter.call(document.querySelectorAll('#gallery figure'), function (f) { return !f.classList.contains('hidden') && f.querySelector('img'); }); }
function show(i) { idx = (i + list.length) % list.length; var im = list[idx].querySelector('img'); lbImg.src = im.src; lbImg.alt = im.alt; lbCap.textContent = im.alt; }
function openLb(fig) { list = visibleFigs(); lastFocus = document.activeElement; show(list.indexOf(fig)); lb.classList.add('open'); lb.querySelector('.lb-close').focus(); }
function closeLb() { lb.classList.remove('open'); if (lastFocus) lastFocus.focus(); }
document.querySelectorAll('#gallery figure').forEach(function (fig) {
  if (!fig.querySelector('img')) return;
  fig.tabIndex = 0; fig.setAttribute('role', 'button'); fig.setAttribute('aria-label', 'Open photo: ' + fig.querySelector('img').alt);
  fig.addEventListener('click', function () { openLb(fig); });
  fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(fig); } });
});
lb.querySelector('.lb-close').addEventListener('click', closeLb);
lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', function (e) {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowLeft') show(idx - 1); else if (e.key === 'ArrowRight') show(idx + 1);
});
