(() => {
  const nav = document.querySelector('#top-nav');
  const softwareLink = nav?.querySelector('a[href="#software"]');
  const musicLink = nav?.querySelector('a[href="#music"]');
  const softwareSlide = document.querySelector('#software');

  if (softwareLink) softwareLink.textContent = 'Web Apps';
  if (softwareSlide) {
    softwareSlide.dataset.title = 'Web Apps';
    const eyebrow = softwareSlide.querySelector('.section-title-block .eyebrow');
    if (eyebrow) eyebrow.textContent = 'Web Apps';
  }

  const focusEyebrow = document.querySelector('.software-panel-mini .eyebrow');
  if (focusEyebrow) focusEyebrow.textContent = 'Web Apps';

  const focusButton = document.querySelector('.software-panel-mini a[href="#software"]');
  if (focusButton) focusButton.textContent = 'View Web Apps';

  if (nav && musicLink && !nav.querySelector('a[href="extensions-addons.html"]')) {
    const extensionsLink = document.createElement('a');
    extensionsLink.href = 'extensions-addons.html';
    extensionsLink.textContent = 'Extensions & Add-ons';
    musicLink.insertAdjacentElement('beforebegin', extensionsLink);
  }
})();
