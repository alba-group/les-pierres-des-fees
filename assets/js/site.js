document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('home-page')) {
    const officialStyle = document.createElement('link');
    officialStyle.rel = 'stylesheet';
    officialStyle.href = 'assets/css/official-home.css';
    document.head.appendChild(officialStyle);

    const officialLayout = document.createElement('link');
    officialLayout.rel = 'stylesheet';
    officialLayout.href = 'assets/css/official-home-layout.css';
    document.head.appendChild(officialLayout);
  }

  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.drop-trigger').forEach(button => {
    button.addEventListener('click', event => {
      if (window.innerWidth <= 1020) {
        event.preventDefault();
        button.closest('.dropdown')?.classList.toggle('open');
      }
    });
  });

  const cookie = document.querySelector('.cookie-banner');
  if (cookie && localStorage.getItem('lpdf-cookie-choice')) cookie.classList.add('hidden');
  document.querySelectorAll('[data-cookie-choice]').forEach(button => {
    button.addEventListener('click', () => {
      localStorage.setItem('lpdf-cookie-choice', button.dataset.cookieChoice || 'saved');
      cookie?.classList.add('hidden');
    });
  });

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Contact depuis le site Les Pierres des Fées');
      const body = encodeURIComponent(
        `Nom et prénom : ${data.get('name')}\n` +
        `Adresse e-mail : ${data.get('email')}\n` +
        `Téléphone : ${data.get('phone')}\n` +
        `Contact souhaité : ${data.get('contact_method')}\n\n` +
        `${data.get('message') || ''}`
      );
      window.location.href = `mailto:contact@lespierresdesfees.fr?subject=${subject}&body=${body}`;
    });
  }
});
