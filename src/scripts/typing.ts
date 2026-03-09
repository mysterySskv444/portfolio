const words = ['web apps.', 'Android experiences.', 'fast user interfaces.', 'scalable products.'];

export function initTypingEffect(): void {
  const node = document.getElementById('typingText');
  if (!node) return;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    node.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex === current.length) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(tick, deleting ? 45 : 95);
  };

  tick();
}
