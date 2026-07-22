(() => {
  const DESKTOP_QUERY = '(min-width: 1120px)';
  const desktopMedia = window.matchMedia(DESKTOP_QUERY);
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setMegaState(trigger, open) {
    const panelId = trigger.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;
    trigger.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  }

  function closeMegaMenus(header, except = null) {
    qsa('[data-pet-mega-trigger]', header).forEach((trigger) => {
      if (trigger !== except) setMegaState(trigger, false);
    });
  }

  function initMegaMenus(header) {
    if (header.dataset.petMegaInitialized === 'true') return;
    header.dataset.petMegaInitialized = 'true';

    qsa('[data-pet-mega-item]', header).forEach((item) => {
      const trigger = qs('[data-pet-mega-trigger]', item);
      const panel = qs('[data-pet-mega-panel]', item);
      if (!trigger || !panel) return;

      let closeTimer = null;
      const open = () => {
        if (!desktopMedia.matches) return;
        window.clearTimeout(closeTimer);
        closeMegaMenus(header, trigger);
        setMegaState(trigger, true);
      };
      const close = (restoreFocus = false) => {
        window.clearTimeout(closeTimer);
        setMegaState(trigger, false);
        if (restoreFocus) trigger.focus();
      };
      const scheduleClose = () => {
        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(() => {
          if (!item.matches(':hover') && !item.contains(document.activeElement)) close();
        }, 140);
      };

      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        if (expanded) close();
        else open();
      });
      item.addEventListener('pointerenter', open);
      item.addEventListener('pointerleave', scheduleClose);
      item.addEventListener('focusin', open);
      item.addEventListener('focusout', scheduleClose);
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          open();
          qs('a[href], button:not([disabled])', panel)?.focus();
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          close(true);
        }
      });
      panel.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        close(true);
      });
    });

    document.addEventListener('pointerdown', (event) => {
      if (!header.contains(event.target)) closeMegaMenus(header);
    });
    desktopMedia.addEventListener('change', () => closeMegaMenus(header));
  }

  function initCompactHeader(header) {
    if (header.dataset.petCompactInitialized === 'true') return;
    header.dataset.petCompactInitialized = 'true';
    if (header.dataset.petCompactOnScroll !== 'true') return;

    let ticking = false;
    const update = () => {
      header.classList.toggle('is-compact', window.scrollY > 48);
      ticking = false;
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
  }

  function updateBagLabel(bag, count) {
    const label = count === 0
      ? bag.dataset.cartEmptyLabel
      : count === 1
        ? bag.dataset.cartOneLabel
        : bag.dataset.cartManyLabel.replace('__COUNT__', String(count));
    if (label) bag.setAttribute('aria-label', label);
  }

  function initBag(header) {
    const bag = qs('[data-pet-bag]', header);
    const countNode = qs('[data-pet-cart-count]', header);
    if (!bag || !countNode || bag.dataset.petBagInitialized === 'true') return;
    bag.dataset.petBagInitialized = 'true';

    let previousCount = Number.parseInt(countNode.textContent, 10) || 0;
    updateBagLabel(bag, previousCount);

    const sync = () => {
      const currentCount = Number.parseInt(countNode.textContent, 10) || 0;
      updateBagLabel(bag, currentCount);
      if (currentCount !== previousCount && !reducedMotion.matches) {
        bag.classList.remove('is-cart-updated');
        void bag.offsetWidth;
        bag.classList.add('is-cart-updated');
        window.setTimeout(() => bag.classList.remove('is-cart-updated'), 420);
      }
      previousCount = currentCount;
    };

    const observer = new MutationObserver(sync);
    observer.observe(countNode, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  async function refreshCartState() {
    try {
      const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`, {
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) return;
      const cart = await response.json();
      qsa('[data-pet-cart-count]').forEach((node) => {
        node.textContent = cart.item_count;
        node.classList.toggle('is-empty', cart.item_count === 0);
      });
    } catch (error) {
      /* Native cart navigation remains the fallback. */
    }
  }

  function initHeader(scope = document) {
    qsa('[data-pet-premium-header]', scope).forEach((header) => {
      initMegaMenus(header);
      initCompactHeader(header);
      initBag(header);
    });
  }

  function initGlobalCartEvents() {
    if (document.documentElement.dataset.petHeaderCartEvents === 'true') return;
    document.documentElement.dataset.petHeaderCartEvents = 'true';
    ['cart:updated', 'cart:refresh', 'ajaxProduct:added', 'product:added'].forEach((eventName) => {
      document.addEventListener(eventName, refreshCartState);
    });
  }

  const init = (scope = document) => {
    initHeader(scope);
    initGlobalCartEvents();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
