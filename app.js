const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

// Navigation
const menu = $('#menu');
const menuToggle = $('#menuToggle');
menuToggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
$$('#menu a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded','false');
}));

// Scroll progress
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#progress').style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
}, {passive:true});

// Reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, {threshold:.12});
$$('.reveal').forEach(el => io.observe(el));

// Quick service -> form
$$('[data-quick]').forEach(btn => btn.addEventListener('click', () => {
  $('#serviceSelect').value = btn.dataset.quick;
  $('#cotizacion').scrollIntoView({behavior:'smooth'});
}));

// Quote to WhatsApp
$('#quoteForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const lines = [
    'Hola INSEX, quiero solicitar un servicio.',
    '',
    `Nombre: ${fd.get('nombre')}`,
    `Teléfono: ${fd.get('telefono')}`,
    `Tipo de espacio: ${fd.get('espacio')}`,
    `Servicio: ${fd.get('servicio')}`,
    `Zona / colonia: ${fd.get('zona') || 'Por definir'}`,
    `Detalle: ${fd.get('detalle') || 'Sin detalle adicional'}`
  ];
  window.open(`https://wa.me/524421571646?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
});

// Chatbot
const chat = $('#chat');
const openChat = () => { chat.classList.add('is-open'); chat.setAttribute('aria-hidden','false'); };
const closeChat = () => { chat.classList.remove('is-open'); chat.setAttribute('aria-hidden','true'); };
$('#chatOpen')?.addEventListener('click', openChat);
$('#chatOpenMobile')?.addEventListener('click', openChat);
$('#chatClose')?.addEventListener('click', closeChat);

const chatReplies = {
  plagas: {
    user:'Tengo una plaga',
    bot:'Podemos orientarte con control de plagas. Indica si se trata de cucarachas, hormigas, insectos voladores u otra situación y el tipo de espacio.',
    wa:'Hola INSEX, necesito apoyo con una plaga. Quiero compartirles el tipo de plaga y el espacio para solicitar atención.'
  },
  roedores: {
    user:'Tengo roedores',
    bot:'INSEX maneja servicios de desratización preventivos y correctivos. Puedes enviar ubicación, tipo de instalación y dónde detectaste actividad.',
    wa:'Hola INSEX, requiero un servicio de desratización. Quiero compartirles la ubicación y detalles del problema.'
  },
  sanitizacion: {
    user:'Necesito sanitización',
    bot:'La sanitización puede revisarse para oficinas, escuelas, instalaciones y otros espacios. Comparte el tipo de lugar y tamaño aproximado para dar seguimiento.',
    wa:'Hola INSEX, me interesa un servicio de sanitización. Quiero compartirles datos del espacio.'
  },
  empresa: {
    user:'Servicio para empresa',
    bot:'Para atención empresarial conviene indicar giro, ubicación, tamaño aproximado y servicio requerido. INSEX puede continuar la revisión directamente contigo.',
    wa:'Hola INSEX, busco servicio para una empresa. Quiero compartirles giro, ubicación y necesidad para solicitar información.'
  }
};
$$('[data-chat]').forEach(btn => btn.addEventListener('click', () => {
  const r = chatReplies[btn.dataset.chat];
  const body = $('#chatBody');
  body.insertAdjacentHTML('beforeend', `<div class="user-msg">${r.user}</div><div class="bot-msg" style="margin-top:10px">${r.bot}<br><br><a style="font-weight:800;color:#116b4e" target="_blank" rel="noopener" href="https://wa.me/524421571646?text=${encodeURIComponent(r.wa)}">Continuar por WhatsApp →</a></div>`);
  body.scrollTop = body.scrollHeight;
}));

// Privacy dialog
const dlg = $('#privacyDialog');
$('#privacyBtn')?.addEventListener('click', () => dlg.showModal());
$('#privacyClose')?.addEventListener('click', () => dlg.close());
dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

$('#year').textContent = new Date().getFullYear();
