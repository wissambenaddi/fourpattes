(() => {
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

  function initFilterDrawers(scope = document) {
    qsa('[data-fp-collection]', scope).forEach((root) => {
      if (root.dataset.fpFiltersInitialized === 'true') return;
      root.dataset.fpFiltersInitialized = 'true';

      const openButton = qs('[data-fp-filter-open]', root);
      const drawer = qs('[data-fp-filter-drawer]', root);
      if (!openButton || !drawer) return;

      const closeButtons = qsa('[data-fp-filter-close]', drawer);
      const panel = qs('[role="dialog"]', drawer);
      let lastFocused = null;

      const open = () => {
        lastFocused = document.activeElement;
        drawer.hidden = false;
        openButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('fp-collection-filter-open');
        requestAnimationFrame(() => qs(focusableSelector, panel)?.focus());
      };

      const close = () => {
        drawer.hidden = true;
        openButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('fp-collection-filter-open');
        lastFocused?.focus();
      };

      openButton.addEventListener('click', open);
      closeButtons.forEach((button) => button.addEventListener('click', close));

      drawer.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          close();
          return;
        }

        if (event.key !== 'Tab') return;
        const focusable = qsa(focusableSelector, panel).filter((element) => element.offsetParent !== null);
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });

      window.matchMedia('(min-width: 990px)').addEventListener('change', (event) => {
        if (event.matches && !drawer.hidden) close();
      });
    });
  }

  function initFaq(scope = document) {
    qsa('[data-fp-faq-button]', scope).forEach((button) => {
      if (button.dataset.fpFaqInitialized === 'true') return;
      button.dataset.fpFaqInitialized = 'true';

      const answer = document.getElementById(button.getAttribute('aria-controls'));
      if (!answer) return;

      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        answer.hidden = expanded;
      });
    });
  }

  function init(scope = document) {
    initFilterDrawers(scope);
    initFaq(scope);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
