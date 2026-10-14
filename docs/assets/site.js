/* UPVET Lavras: navegação, acessibilidade e movimento editorial progressivo. */
(function () {
  'use strict';
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const matches = (name, category, query, filter) => (filter === 'todas' || category === filter) && normalize(name).includes(normalize(query));
  function buildRequest(data) {
    const text = value => String(value || '').trim();
    const species = data.species === 'Outra espécie' ? text(data.otherSpecies) : text(data.species);
    return [
      'Olá, UPVET Lavras!',
      data.recipeStatus === 'sim' ? 'Gostaria de solicitar um orçamento de manipulação veterinária.' : 'Ainda não tenho receita e gostaria de orientação para iniciar uma solicitação.',
      '',
      'Solicitante: ' + text(data.name),
      'Perfil: ' + (data.role === 'veterinario' ? 'Médico-veterinário' : 'Tutor / responsável'),
      'Animal: ' + text(data.pet),
      'Espécie: ' + species,
      text(data.city) ? 'Cidade: ' + text(data.city) : '',
      '',
      text(data.medicine) ? 'Medicamento informado na receita: ' + text(data.medicine) : 'Medicamento: a confirmar na conversa / receita.',
      'Apresentação para avaliação: ' + (text(data.format) || 'Conforme a receita / confirmar'),
      'Sabor para avaliação: ' + (text(data.flavour) || 'Sem preferência / confirmar'),
      text(data.notes) ? 'Observações: ' + text(data.notes) : '',
      '',
      data.recipeStatus === 'sim' ? 'Vou anexar a receita veterinária nesta conversa.' : 'Entendo que o preparo depende da avaliação da receita veterinária.',
      'Aguardo a confirmação da equipe sobre viabilidade, valor e prazo.'
    ].filter((line, index, lines) => line !== '' || (index > 0 && lines[index - 1] !== '')).join('\n');
  }
  function whatsappUrl(message) { return 'https://wa.me/5535997655052?text=' + encodeURIComponent(message); }
  if (typeof module !== 'undefined' && module.exports) module.exports = {normalize, matches, buildRequest, whatsappUrl};
  if (typeof document === 'undefined') return;

  document.querySelectorAll('.demo-banner').forEach(banner => banner.remove());
  document.querySelector('.service-experience')?.remove();
  document.querySelectorAll('footer .footer-col a[href="gerencia.html"]').forEach(link => link.remove());
  document.querySelectorAll('.footer-intro').forEach(intro => {
    if (intro.querySelector('.manager-entry')) return;
    const manager=document.createElement('a');
    manager.className='manager-entry';
    manager.href='gerencia.html';
    manager.setAttribute('aria-label','Abrir gerência de pedidos');
    manager.innerHTML='<span class="manager-entry-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"/><path d="M8 4V2m8 2V2M7 9h10M7 13h3m4 0h3M7 17h3m4 0h3"/></svg></span><span><strong>Gerência</strong><small>Acompanhar pedidos</small></span>';
    intro.append(manager);
  });

  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu');
  function closeMenu() {
    header.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Abrir menu');
    menu.textContent = '☰';
  }
  menu.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.textContent = open ? '×' : '☰';
  });
  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('pointerdown', event => {
    if (header.classList.contains('open') && !header.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('open')) { closeMenu(); menu.focus(); }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); }, {passive: true});

  const currentFile = (location.pathname.split('/').pop() || 'up-vet').replace(/\.html$/, '');
  if (currentFile === 'medicamentos') {
    document.querySelectorAll('.product-info h3').forEach(heading => {
      const replacement = document.createElement('h2');
      replacement.innerHTML = heading.innerHTML;
      replacement.className = heading.className;
      heading.replaceWith(replacement);
    });
  }
  document.querySelectorAll('.nav-links a').forEach(link => {
    const target = (new URL(link.href, location.href).pathname.split('/').pop() || 'up-vet').replace(/\.html$/, '');
    if (target === currentFile || (currentFile === 'up-vet' && link.hash === '#sobre')) link.setAttribute('aria-current', 'page');
  });

  const revealGroups = [
    '.hero-copy > *', '.hero-art', '.service-heading > *', '.service-studio',
    '.unit-grid > *', '.product', '.contact-grid > *', '.page-hero .wrap > *',
    '.request-layout > *', '.manager-heading > *', '.login-panel'
  ];
  const revealItems = [...document.querySelectorAll(revealGroups.join(','))];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealItems.length && !reducedMotion && 'IntersectionObserver' in window) {
    document.body.classList.add('motion-ready');
    revealItems.forEach((item, index) => {
      item.dataset.reveal = '';
      item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`);
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {rootMargin: '0px 0px -7% 0px', threshold: .08});
    revealItems.forEach(item => observer.observe(item));
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

})();


