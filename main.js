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

// Booking form: sends through Web3Forms once a public access key is set; otherwise falls back to the mail app.
var WEB3FORMS_KEY = ''; // paste the public access key from web3forms.com here
var form = document.getElementById('bookForm');
form.addEventListener('submit', function (e) {
  if (!WEB3FORMS_KEY) return; // fallback: default mailto behavior
  e.preventDefault();
  var msg = document.getElementById('formMsg');
  var btn = form.querySelector('button[type=submit]');
  var data = new FormData(form);
  data.append('access_key', WEB3FORMS_KEY);
  data.append('subject', 'New session request from ' + (data.get('name') || 'website'));
  btn.disabled = true; msg.textContent = 'Sending...';
  fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
    .then(function (r) { return r.json(); })
    .then(function (j) {
      if (j.success) { form.reset(); msg.textContent = "Thanks! I'll reply within 48 hours."; }
      else { msg.textContent = 'Something went wrong. Please email me directly.'; }
    })
    .catch(function () { msg.textContent = 'Something went wrong. Please email me directly.'; })
    .then(function () { btn.disabled = false; });
});
