(() => {
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function announce(message) {
    const region = qs('[data-pet-live-region]');
    if (!region) return;
    region.textContent = '';
    window.setTimeout(() => { region.textContent = message; }, 40);
  }

  function initHeader(scope = document) {
    qsa('[data-pet-header]', scope).forEach((header) => {
      if (header.dataset.initialized) return;
      header.dataset.initialized = 'true';
      const openButton = qs('[data-pet-menu-open]', header);
      const drawer = qs('[data-pet-menu-drawer]', header);
      const closeButtons = qsa('[data-pet-menu-close]', header);
      if (!openButton || !drawer) return;

      let lastFocus = null;
      const focusableSelector = 'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const open = () => {
        lastFocus = document.activeElement;
        drawer.hidden = false;
        openButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('pet-menu-open');
        qs(focusableSelector, drawer)?.focus();
      };
      const close = () => {
        drawer.hidden = true;
        openButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('pet-menu-open');
        lastFocus?.focus();
      };

      openButton.addEventListener('click', open);
      closeButtons.forEach((button) => button.addEventListener('click', close));
      drawer.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') close();
        if (event.key !== 'Tab') return;
        const focusable = qsa(focusableSelector, drawer).filter((element) => !element.hidden);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
    });
  }

  function initTabs(scope = document) {
    qsa('[data-pet-tabs]', scope).forEach((tabSet) => {
      if (tabSet.dataset.tabsInitialized) return;
      tabSet.dataset.tabsInitialized = 'true';
      const tabs = qsa('[data-pet-tab]', tabSet);
      const panels = qsa('[data-pet-panel]', tabSet);
      const activate = (tab) => {
        const target = tab.dataset.petTab;
        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-selected', String(active));
          item.tabIndex = active ? 0 : -1;
        });
        panels.forEach((panel) => { panel.hidden = panel.dataset.petPanel !== target; });
      };
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activate(tab));
        tab.addEventListener('keydown', (event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          let nextIndex = index;
          if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
          if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
          if (event.key === 'Home') nextIndex = 0;
          if (event.key === 'End') nextIndex = tabs.length - 1;
          tabs[nextIndex].focus();
          activate(tabs[nextIndex]);
        });
      });
    });
  }

  function initCarousels(scope = document) {
    qsa('[data-pet-carousel-prev], [data-pet-carousel-next]', scope).forEach((button) => {
      if (button.dataset.carouselInitialized) return;
      button.dataset.carouselInitialized = 'true';
      button.addEventListener('click', () => {
        const section = button.closest('section') || document;
        const carousel = qs('[data-pet-panel]:not([hidden]) [data-pet-carousel]', section) || qs('[data-pet-carousel]', section);
        if (!carousel) return;
        const direction = button.hasAttribute('data-pet-carousel-next') ? 1 : -1;
        carousel.scrollBy({ left: carousel.clientWidth * .78 * direction, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      });
    });
  }

  async function updateCartCount() {
    const response = await fetch('/cart.js', { headers: { Accept: 'application/json' } });
    if (!response.ok) return;
    const cart = await response.json();
    qsa('[data-pet-cart-count]').forEach((count) => {
      count.textContent = cart.item_count;
      count.classList.toggle('is-empty', cart.item_count === 0);
    });
  }

  function initQuickAdd(scope = document) {
    qsa('[data-pet-quick-add]', scope).forEach((form) => {
      if (form.dataset.quickAddInitialized) return;
      form.dataset.quickAddInitialized = 'true';
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = qs('button[type="submit"]', form);
        button?.setAttribute('disabled', 'disabled');
        try {
          const response = await fetch('/cart/add.js', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
          if (!response.ok) throw new Error('Cart request failed');
          await updateCartCount();
          announce(document.documentElement.lang === 'fr' ? 'Produit ajouté au panier' : 'Product added to cart');
          if (button) {
            const previous = button.innerHTML;
            button.textContent = '✓';
            window.setTimeout(() => { button.innerHTML = previous; }, 1200);
          }
        } catch (error) {
          HTMLFormElement.prototype.submit.call(form);
        } finally {
          button?.removeAttribute('disabled');
        }
      });
    });
  }

  function initCounters(scope = document) {
    qsa('[data-pet-counter]', scope).forEach((counter) => {
      if (counter.dataset.counterInitialized) return;
      counter.dataset.counterInitialized = 'true';
      const target = Number(String(counter.dataset.petCounter).replace(/\D/g, ''));
      if (!target) return;
      const formatter = new Intl.NumberFormat(document.documentElement.lang || 'fr-FR');
      const animate = () => {
        if (reducedMotion.matches) { counter.textContent = formatter.format(target); return; }
        const start = performance.now();
        const duration = 1400;
        const tick = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = formatter.format(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      if (!('IntersectionObserver' in window)) { animate(); return; }
      const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        animate();
        observer.disconnect();
      }, { threshold: .35 });
      observer.observe(counter);
    });
  }

  function initReveals(scope = document) {
    const elements = qsa('[data-pet-reveal]', scope);
    if (reducedMotion.matches || !('IntersectionObserver' in window)) { elements.forEach((item) => item.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    elements.forEach((item) => observer.observe(item));
  }

  function initForms(scope = document) {
    qsa('[data-pet-localization-select], [data-pet-auto-submit]', scope).forEach((select) => {
      if (select.dataset.formInitialized) return;
      select.dataset.formInitialized = 'true';
      select.addEventListener('change', () => select.form?.submit());
    });
    qsa('[data-pet-variant-select]', scope).forEach((select) => {
      if (select.dataset.variantInitialized) return;
      select.dataset.variantInitialized = 'true';
      select.addEventListener('change', () => {
        const option = select.selectedOptions[0];
        const price = qs('[data-pet-product-price]', select.closest('[data-pet-product]'));
        if (!price || !option) return;
        price.innerHTML = `<span>${option.dataset.price || ''}</span>${option.dataset.comparePrice && option.dataset.comparePrice !== option.dataset.price ? `<s>${option.dataset.comparePrice}</s>` : ''}`;
      });
    });
  }

  function initFooter(scope = document) {
    const sync = () => {
      qsa('.pet-footer__menu', scope).forEach((details) => {
        if (window.matchMedia('(min-width: 750px)').matches) details.open = true;
        else if (!details.dataset.mobileSynced) { details.open = false; details.dataset.mobileSynced = 'true'; }
      });
    };
    sync();
    window.addEventListener('resize', sync, { passive: true });
  }

  async function initRecommendations(scope = document) {
    qsa('[data-pet-recommendations]', scope).forEach(async (container) => {
      if (container.dataset.recommendationsInitialized) return;
      container.dataset.recommendationsInitialized = 'true';
      if (container.innerHTML.trim()) return;
      try {
        const response = await fetch(container.dataset.url);
        if (!response.ok) return;
        const text = await response.text();
        const html = new DOMParser().parseFromString(text, 'text/html');
        const replacement = qs('[data-pet-recommendations]', html);
        if (replacement?.innerHTML.trim()) {
          container.innerHTML = replacement.innerHTML;
          initQuickAdd(container);
        }
      } catch (error) {
        /* Recommendations remain optional. */
      }
    });
  }

  function init(scope = document) {
    initHeader(scope);
    initTabs(scope);
    initCarousels(scope);
    initQuickAdd(scope);
    initCounters(scope);
    initReveals(scope);
    initForms(scope);
    initFooter(scope);
    initRecommendations(scope);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
