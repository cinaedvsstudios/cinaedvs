(() => {
  const comingSoonLinks = document.querySelectorAll('a[href="#link-coming-soon"]');
  comingSoonLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const toast = document.createElement('div');
      toast.textContent = 'Replace this placeholder with the live project URL when ready.';
      toast.style.position = 'fixed';
      toast.style.left = '50%';
      toast.style.bottom = '24px';
      toast.style.transform = 'translateX(-50%)';
      toast.style.zIndex = '999';
      toast.style.maxWidth = 'min(420px, calc(100% - 32px))';
      toast.style.padding = '14px 18px';
      toast.style.borderRadius = '999px';
      toast.style.background = 'rgba(8,7,6,.94)';
      toast.style.color = '#faf8f2';
      toast.style.border = '1px solid rgba(226,194,114,.4)';
      toast.style.boxShadow = '0 16px 48px rgba(0,0,0,.35)';
      toast.style.font = '700 13px system-ui, sans-serif';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2400);
    });
  });
})();
