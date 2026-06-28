(() => {
  const scaleStylesheet = document.createElement('link');
  scaleStylesheet.rel = 'stylesheet';
  scaleStylesheet.href = 'assets/css/desktop-scale.css';
  document.head.appendChild(scaleStylesheet);

  const addExtensionsSlide = () => {
    const nav = document.querySelector('#top-nav');
    const track = document.querySelector('.carousel-track');
    const softwareSlide = document.querySelector('#software');
    const musicSlide = document.querySelector('#music');
    if (!nav || !track || !softwareSlide || !musicSlide || document.querySelector('#extensions-addons')) return;

    const softwareLink = nav.querySelector('a[href="#software"]');
    const musicLink = nav.querySelector('a[href="#music"]');
    if (softwareLink) softwareLink.textContent = 'Web Apps';

    softwareSlide.dataset.title = 'Web Apps';
    const softwareEyebrow = softwareSlide.querySelector('.section-title-block .eyebrow');
    if (softwareEyebrow) softwareEyebrow.textContent = 'Web Apps';

    const focusEyebrow = document.querySelector('.software-panel-mini .eyebrow');
    if (focusEyebrow) focusEyebrow.textContent = 'Web Apps';

    const focusButton = document.querySelector('.software-panel-mini a[href="#software"]');
    if (focusButton) focusButton.textContent = 'View Web Apps';

    const extensionsLink = document.createElement('a');
    extensionsLink.href = '#extensions-addons';
    extensionsLink.textContent = 'Extensions & Add-ons';
    if (musicLink) musicLink.insertAdjacentElement('beforebegin', extensionsLink);

    const extensionsSlide = document.createElement('section');
    extensionsSlide.id = 'extensions-addons';
    extensionsSlide.className = 'slide';
    extensionsSlide.dataset.title = 'Extensions & Add-ons';
    extensionsSlide.setAttribute('aria-labelledby', 'extensions-addons-title');
    extensionsSlide.innerHTML = `
      <article class="slide-card marble-card roman-border software-card">
        <div class="section-title-block compact">
          <p class="eyebrow">Extensions & Add-ons</p>
          <h2 id="extensions-addons-title">Creative Tools for Blender</h2>
          <p>Browse extensions and add-ons by CINAEDVS Studios.</p>
        </div>
        <div class="app-grid" style="grid-template-columns:minmax(0,1fr);width:min(430px,100%);margin-inline:auto;">
          <article class="app-card">
            <div class="app-media organon-media">
              <img class="organon-logo" src="assets/img/cinaedvs/cinaedvs-lion-round.png" alt="CINAEDVS Studios lion crest">
            </div>
            <h3>Blender Extensions</h3>
            <p>Find published CINAEDVS Studios Blender extensions and add-ons on the Blender Extensions platform.</p>
            <a class="action gold" href="https://extensions.blender.org/author/81396/" target="_blank" rel="noopener">View Blender Extensions</a>
          </article>
        </div>
      </article>
    `;
    track.insertBefore(extensionsSlide, musicSlide);
  };

  addExtensionsSlide();

  const body = document.body;
  const enterButton = document.querySelector('.entry-lion');
  const viewport = document.querySelector('.carousel-viewport');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  const dotsWrap = document.querySelector('.carousel-dots');
  const slideName = document.querySelector('.slide-name');
  const navLinks = Array.from(document.querySelectorAll('[data-slide-link], #top-nav a'));
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#top-nav');

  navLinks.forEach((link) => {
    const targetId = link.getAttribute('href')?.replace(/^#/, '');
    const targetIndex = slides.findIndex((slide) => slide.id === targetId);
    if (targetIndex >= 0) link.dataset.slideLink = String(targetIndex);
  });

  let current = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let hasTouchStart = false;

  const wrapIndex = (index) => {
    if (!slides.length) return 0;
    return ((index % slides.length) + slides.length) % slides.length;
  };

  const openSite = () => {
    if (body.classList.contains('entered') || body.classList.contains('is-opening')) return;
    body.classList.add('is-opening');
    window.setTimeout(() => {
      body.classList.remove('is-opening');
      body.classList.add('entered');
      viewport?.focus({ preventScroll: true });
    }, 620);
  };

  const update = (index) => {
    current = wrapIndex(index);
    document.documentElement.style.setProperty('--slide-index', String(current));
    prevButton.disabled = false;
    nextButton.disabled = false;

    const title = slides[current]?.dataset.title || '';
    if (slideName) slideName.textContent = title;

    dotsWrap?.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === current);
      dot.setAttribute('aria-selected', String(dotIndex === current));
    });

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', Number(link.dataset.slideLink) === current);
    });

    if (slides[current]?.id) history.replaceState(null, '', `#${slides[current].id}`);
  };

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to ${slide.dataset.title || `section ${index + 1}`}`);
    dot.setAttribute('aria-selected', 'false');
    dot.addEventListener('click', () => {
      openSite();
      update(index);
    });
    dotsWrap?.appendChild(dot);
  });

  enterButton?.addEventListener('click', openSite);
  prevButton?.addEventListener('click', () => update(current - 1));
  nextButton?.addEventListener('click', () => update(current + 1));

  navToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetIndex = Number(link.dataset.slideLink);
      if (Number.isFinite(targetIndex)) {
        event.preventDefault();
        openSite();
        update(targetIndex);
        nav?.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (!body.classList.contains('entered')) {
      if (event.key === 'Enter' || event.key === ' ') openSite();
      return;
    }
    if (event.key === 'ArrowRight') update(current + 1);
    if (event.key === 'ArrowLeft') update(current - 1);
  });

  viewport?.addEventListener('touchstart', (event) => {
    if (!event.touches.length) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    hasTouchStart = true;
  }, { passive: true });

  viewport?.addEventListener('touchend', (event) => {
    if (!hasTouchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    hasTouchStart = false;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    update(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  const initialHash = window.location.hash ? window.location.hash.slice(1) : '';
  const initialIndex = slides.findIndex((slide) => slide.id === initialHash);
  update(initialIndex >= 0 ? initialIndex : 0);
})();
