import '@testing-library/jest-dom/vitest';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({ matches: false, media: query, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } }),
});

window.scrollTo = () => {};

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverStub;
