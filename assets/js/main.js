const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('[data-nav]').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.setAttribute('aria-current', 'page');
  }
});
