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

