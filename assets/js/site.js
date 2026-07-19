document.addEventListener('DOMContentLoaded', () => {
  const addressReplacements = new Map([
    ['22 rue du vistre, résidence la malamousque dorée, 30 220 Aigues-Mortes', 'Pôle Constance, 165 Route de Nîmes, 30220 Aigues-Mortes'],
    ['Chez les milles et un soins d’Amalya', 'Pôle Constance'],
    ['Rue des Oliviers, 30640 Beauvoisin', '165 Route de Nîmes, 30220 Aigues-Mortes']
  ]);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(node => {
    let updatedText = node.nodeValue;
    addressReplacements.forEach((replacement, oldText) => {
      updatedText = updatedText.replace(oldText, replacement);
    });
    if (updatedText !== node.nodeValue) node.nodeValue = updatedText;
  });

  if (document.body.classList.contains('home-page')) {
    const officialStyle = document.createElement('link');
    officialStyle.rel = 'stylesheet';
    officialStyle.href = 'assets/css/official-home.css?v=20260718-2';
    document.head.appendChild(officialStyle);

    const officialLayout = document.createElement('link');
    officialLayout.rel = 'stylesheet';
    officialLayout.href = 'assets/css/official-home-layout.css?v=20260718-2';
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

  document.querySelector('.cookie-banner')?.remove();

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