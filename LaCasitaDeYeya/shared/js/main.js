const menuToggle = document.querySelector('[data-menu-toggle]');
const mainNav = document.querySelector('#main-nav');

function initMobileMenu() {
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860) {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function truncateText(value, max = 120) {
  if (typeof value !== 'string') return '';
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

function formatFeedDate(value) {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';

  return new Intl.DateTimeFormat('es-DO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed);
}

function buildInstagramCard(post, profileUrl) {
  const card = document.createElement('a');
  card.className = 'instagram-post';
  card.href = post.permalink || profileUrl;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.ariaLabel = 'Abrir publicación de Instagram';

  const image = document.createElement('img');
  image.src = post.image || '';
  image.alt = truncateText(post.caption || 'Publicación reciente de Instagram', 90);
  image.loading = 'lazy';
  image.decoding = 'async';

  card.appendChild(image);

  if (post.is_video) {
    const badge = document.createElement('span');
    badge.className = 'instagram-badge';
    badge.textContent = 'Reel';
    card.appendChild(badge);
  }

  const caption = document.createElement('p');
  caption.className = 'instagram-caption';
  caption.textContent = truncateText(post.caption || 'Ver publicación', 110);
  card.appendChild(caption);

  return card;
}

function showInstagramFallback(container, profileUrl) {
  const message = document.createElement('p');
  message.className = 'instagram-empty';

  const text = document.createElement('span');
  text.textContent = 'No se pudo cargar el feed en este momento. ';

  const link = document.createElement('a');
  link.href = profileUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Ver perfil en Instagram';

  message.appendChild(text);
  message.appendChild(link);

  container.innerHTML = '';
  container.appendChild(message);
}

async function initInstagramFeed() {
  const container = document.querySelector('[data-instagram-feed]');
  if (!container) return;

  const meta = document.querySelector('[data-instagram-meta]');
  const feedPath = container.dataset.instagramFeed;
  const profileUrl =
    container.dataset.instagramProfile ||
    'https://www.instagram.com/lacasitadeyeya/?hl=es';
  const limit = Number.parseInt(container.dataset.instagramLimit || '8', 10);

  if (!feedPath) {
    showInstagramFallback(container, profileUrl);
    return;
  }

  try {
    const response = await fetch(feedPath, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Feed no disponible (${response.status})`);
    }

    const payload = await response.json();
    const posts = Array.isArray(payload.posts)
      ? payload.posts.filter((post) => post && post.image).slice(0, limit)
      : [];

    if (!posts.length) {
      throw new Error('Feed sin publicaciones');
    }

    const fragment = document.createDocumentFragment();
    posts.forEach((post) => {
      fragment.appendChild(buildInstagramCard(post, profileUrl));
    });

    container.innerHTML = '';
    container.appendChild(fragment);

    if (meta) {
      const formattedDate = formatFeedDate(payload.fetched_at);
      meta.textContent = formattedDate
        ? `Actualizado: ${formattedDate}`
        : 'Actualización automática de publicaciones';
    }
  } catch (error) {
    if (meta) {
      meta.textContent = 'Feed temporalmente no disponible';
    }
    showInstagramFallback(container, profileUrl);
  }
}

initMobileMenu();
initInstagramFeed();
