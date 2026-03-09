export function initUi(): void {
  const themeToggle = document.getElementById('themeToggle') as HTMLButtonElement | null;
  const mobileToggle = document.getElementById('mobileToggle') as HTMLButtonElement | null;
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop') as HTMLButtonElement | null;
  const progressBar = document.getElementById('progressBar') as HTMLDivElement | null;
  const yearNode = document.getElementById('year');

  yearNode && (yearNode.textContent = String(new Date().getFullYear()));

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  themeToggle?.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  mobileToggle?.addEventListener('click', () => navLinks?.classList.toggle('open'));

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', () => navLinks?.classList.remove('open'));
  });

  const sections = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((section) => observer.observe(section));

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
    backToTop?.classList.toggle('show', scrollTop > 400);
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
