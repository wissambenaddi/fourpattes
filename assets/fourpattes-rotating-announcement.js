(() => {
  if (window.FourpattesAnnouncement) {
    window.FourpattesAnnouncement.initializeAll(document);
    return;
  }

  const selector = '[data-rotating-announcement]';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileViewport = window.matchMedia('(max-width: 749px)');

  const queryAll = (query, scope = document) => [...scope.querySelectorAll(query)];

  function updateFocusableElements(item, active) {
    queryAll('a, button, input, select, textarea, [tabindex]', item).forEach((element) => {
      if (active) element.removeAttribute('tabindex');
      else element.setAttribute('tabindex', '-1');
    });
  }

  function initialize(root) {
    if (root.dataset.announcementInitialized === 'true') return;

    const items = queryAll('[data-announcement-item]', root);
    if (!items.length) return;

    root.dataset.announcementInitialized = 'true';

    const rotationEnabled = root.dataset.rotationEnabled === 'true';
    const pauseOnHover = root.dataset.pauseHover === 'true';
    const mobileFirstOnly = root.dataset.mobileBehavior === 'first';
    const duration = Math.max(3000, Number.parseInt(root.dataset.duration, 10) || 5000);
    const transitionDuration = Math.max(0, Number.parseInt(root.dataset.transition, 10) || 400);

    let activeIndex = Math.max(0, items.findIndex((item) => item.classList.contains('is-active')));
    let timer = null;
    let cleanupTimer = null;
    let pointerPaused = false;
    let focusPaused = false;

    function setAccessibleState(item, active) {
      item.setAttribute('aria-hidden', active ? 'false' : 'true');
      updateFocusableElements(item, active);
    }

    function show(nextIndex, immediate = false) {
      if (nextIndex === activeIndex && items[nextIndex].classList.contains('is-active')) return;

      const current = items[activeIndex];
      const next = items[nextIndex];

      window.clearTimeout(cleanupTimer);
      current.classList.remove('is-active');
      current.classList.toggle('is-leaving', !immediate && !reducedMotion.matches);
      setAccessibleState(current, false);

      next.classList.remove('is-leaving');
      next.classList.add('is-active');
      setAccessibleState(next, true);
      activeIndex = nextIndex;

      if (current.classList.contains('is-leaving')) {
        cleanupTimer = window.setTimeout(() => current.classList.remove('is-leaving'), transitionDuration);
      } else {
        current.classList.remove('is-leaving');
      }
    }

    function shouldRotate() {
      return rotationEnabled
        && items.length > 1
        && !reducedMotion.matches
        && !(mobileFirstOnly && mobileViewport.matches)
        && !pointerPaused
        && !focusPaused
        && !document.hidden;
    }

    function stop() {
      window.clearTimeout(timer);
      timer = null;
    }

    function schedule() {
      stop();
      if (!shouldRotate()) return;
      timer = window.setTimeout(() => {
        show((activeIndex + 1) % items.length);
        schedule();
      }, duration);
    }

    function resetForPreference() {
      stop();
      show(0, true);
      schedule();
    }

    function handleVisibilityChange() {
      if (document.hidden) stop();
      else schedule();
    }

    function handlePointerEnter() {
      pointerPaused = true;
      stop();
    }

    function handlePointerLeave() {
      pointerPaused = false;
      schedule();
    }

    function handleFocusIn() {
      focusPaused = true;
      stop();
    }

    function handleFocusOut() {
      window.requestAnimationFrame(() => {
        focusPaused = root.contains(document.activeElement);
        if (!focusPaused) schedule();
      });
    }

    items.forEach((item, index) => setAccessibleState(item, index === activeIndex));

    if (pauseOnHover) {
      root.addEventListener('pointerenter', handlePointerEnter);
      root.addEventListener('pointerleave', handlePointerLeave);
    }
    root.addEventListener('focusin', handleFocusIn);
    root.addEventListener('focusout', handleFocusOut);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', resetForPreference);
    else reducedMotion.addListener(resetForPreference);
    if (mobileViewport.addEventListener) mobileViewport.addEventListener('change', resetForPreference);
    else mobileViewport.addListener(resetForPreference);

    root.announcementCleanup = () => {
      stop();
      window.clearTimeout(cleanupTimer);
      if (pauseOnHover) {
        root.removeEventListener('pointerenter', handlePointerEnter);
        root.removeEventListener('pointerleave', handlePointerLeave);
      }
      root.removeEventListener('focusin', handleFocusIn);
      root.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (reducedMotion.removeEventListener) reducedMotion.removeEventListener('change', resetForPreference);
      else reducedMotion.removeListener(resetForPreference);
      if (mobileViewport.removeEventListener) mobileViewport.removeEventListener('change', resetForPreference);
      else mobileViewport.removeListener(resetForPreference);
      delete root.announcementCleanup;
      delete root.dataset.announcementInitialized;
    };

    if (reducedMotion.matches || (mobileFirstOnly && mobileViewport.matches)) show(0, true);
    schedule();
  }

  function initializeAll(scope = document) {
    queryAll(selector, scope).forEach(initialize);
  }

  window.FourpattesAnnouncement = { initializeAll };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeAll());
  } else {
    initializeAll();
  }

  document.addEventListener('shopify:section:load', (event) => initializeAll(event.target));
  document.addEventListener('shopify:section:unload', (event) => {
    queryAll(selector, event.target).forEach((root) => root.announcementCleanup?.());
  });
})();