// Theme (dark mode)
(function () {
  const saved = localStorage.getItem('theme');
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefers)) document.documentElement.classList.add('dark');
})();
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  if (window.lucide) lucide.createIcons();
}

// Active nav
document.addEventListener('DOMContentLoaded', function () {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.getAttribute('href').endsWith(current)) a.setAttribute('aria-current', 'page');
  });
  if (window.lucide) lucide.createIcons();
});

// Mobile drawer
function toggleDrawer(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('hidden');
}

// Toast
function toast(message, type) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = '<i data-lucide="' + (type === 'error' ? 'alert-circle' : 'check-circle-2') + '" class="w-5 h-5 text-' + (type === 'error' ? 'red' : 'green') + '-500"></i><span>' + message + '</span>';
  document.body.appendChild(t);
  if (window.lucide) lucide.createIcons();
  setTimeout(() => t.remove(), 3000);
}
