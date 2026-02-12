const menuData = [
  {
    id: "moro-carne",
    name: "Moro de Habichuelas + Carne Guisada",
    description: "Plato criollo completo con aguacate y ensalada fresca.",
    category: "almuerzo",
    price: 390,
    popular: true,
  },
  {
    id: "pollo-guisado",
    name: "Arroz Blanco + Pollo Guisado",
    description: "Sabor casero dominicano con sazón tradicional.",
    category: "almuerzo",
    price: 360,
    popular: false,
  },
  {
    id: "sancocho",
    name: "Sancocho de la Casa",
    description: "Receta especial al estilo Yeya con víveres mixtos.",
    category: "almuerzo",
    price: 450,
    popular: true,
  },
  {
    id: "empanadas",
    name: "Empanaditas Criollas",
    description: "Mix de pollo, queso y res. Crujientes y recién hechas.",
    category: "antojito",
    price: 220,
    popular: false,
  },
  {
    id: "quipes",
    name: "Quipes Artesanales",
    description: "Relleno de carne sazonada y toque de limón.",
    category: "antojito",
    price: 240,
    popular: true,
  },
  {
    id: "batida-lechoza",
    name: "Batida de Lechosa",
    description: "Natural, cremosa y perfecta para el calor de Punta Cana.",
    category: "bebida",
    price: 170,
    popular: false,
  },
  {
    id: "jugo-chinola",
    name: "Jugo de Chinola",
    description: "Refrescante y tropical, preparado al momento.",
    category: "bebida",
    price: 150,
    popular: true,
  },
  {
    id: "dulce-coco",
    name: "Dulce de Coco",
    description: "Postre dominicano tradicional de textura suave.",
    category: "postre",
    price: 180,
    popular: false,
  },
];

const state = {
  filter: "all",
  cart: [],
  activeMobileView: "menu",
  trackStep: 0,
};

const trackStages = [
  { label: "Pedido recibido", progress: 24 },
  { label: "En cocina", progress: 48 },
  { label: "En empaque", progress: 72 },
  { label: "Repartidor en camino", progress: 89 },
  { label: "Entregado", progress: 100 },
];

const menuItemsEl = document.querySelector("#menu-items");
const cartListEl = document.querySelector("#cart-list");
const cartTotalEl = document.querySelector("#cart-total");
const filterButtons = document.querySelectorAll(".pill");
const mobileViewEl = document.querySelector("#app-view");
const tabButtons = document.querySelectorAll(".tab");
const clockEl = document.querySelector("#mobile-clock");

const currency = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "DOP",
  maximumFractionDigits: 0,
});

function getFilteredMenu() {
  if (state.filter === "all") return menuData;
  return menuData.filter((item) => item.category === state.filter);
}

function renderMenu() {
  const items = getFilteredMenu();

  menuItemsEl.innerHTML = items
    .map(
      (item) => `
      <article class="menu-card">
        <header>
          <h3>${item.name}</h3>
          <span class="price">${currency.format(item.price)}</span>
        </header>
        <p>${item.description}</p>
        <div class="tags">
          <span class="tag">${item.category}</span>
          ${item.popular ? '<span class="tag hot">Popular</span>' : ""}
        </div>
        <button type="button" data-add-id="${item.id}">Agregar al pedido</button>
      </article>
    `,
    )
    .join("");
}

function addToCart(id) {
  const item = menuData.find((entry) => entry.id === id);
  if (!item) return;

  const existing = state.cart.find((entry) => entry.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }

  renderCart();
  if (state.activeMobileView === "order") {
    renderMobileView("order");
  }
}

function renderCart() {
  if (!state.cart.length) {
    cartListEl.innerHTML = "<li><small>Agrega platos para comenzar tu orden.</small></li>";
    cartTotalEl.textContent = currency.format(0);
    return;
  }

  cartListEl.innerHTML = state.cart
    .map(
      (item) => `
      <li>
        <span>${item.qty}x ${item.name}</span>
        <strong>${currency.format(item.price * item.qty)}</strong>
      </li>
    `,
    )
    .join("");

  const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotalEl.textContent = currency.format(total);
}

function renderMobileView(viewName = state.activeMobileView) {
  state.activeMobileView = viewName;

  if (viewName === "menu") {
    const featured = menuData.filter((item) => item.popular).slice(0, 3);
    mobileViewEl.innerHTML = `
      <h3 class="mini-title">Más pedidos hoy</h3>
      <ul class="mini-menu-list">
        ${featured
          .map(
            (item) => `
            <li>
              <strong>${item.name}</strong>
              <small>${currency.format(item.price)}</small>
            </li>
          `,
          )
          .join("")}
      </ul>
    `;
    return;
  }

  if (viewName === "order") {
    const preview = (state.cart.length ? state.cart : menuData.slice(0, 2).map((item) => ({ ...item, qty: 1 }))).slice(0, 3);
    const total = preview.reduce((sum, item) => sum + item.price * item.qty, 0);

    mobileViewEl.innerHTML = `
      <h3 class="mini-title">Resumen de tu pedido</h3>
      <ul class="mini-order-list">
        ${preview
          .map(
            (item) => `
            <li>
              <strong>${item.qty}x ${item.name}</strong>
              <small>${currency.format(item.price * item.qty)}</small>
            </li>
          `,
          )
          .join("")}
      </ul>
      <p class="track-step">Total estimado: <strong>${currency.format(total)}</strong></p>
    `;
    return;
  }

  const stage = trackStages[state.trackStep];
  mobileViewEl.innerHTML = `
    <h3 class="mini-title">Estado de orden #YEA-482</h3>
    <div class="track-wrap">
      <div class="track-status">${stage.label}</div>
      <div class="track-bar"><span style="width:${stage.progress}%"></span></div>
      <p class="track-step">Progreso: ${stage.progress}%</p>
    </div>
  `;
}

function setActiveFilter(button) {
  filterButtons.forEach((btn) => {
    const selected = btn === button;
    btn.classList.toggle("is-active", selected);
    btn.setAttribute("aria-selected", selected ? "true" : "false");
  });
}

function setActiveTab(button) {
  tabButtons.forEach((tab) => {
    const selected = tab === button;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", selected ? "true" : "false");
  });
}

function initFilterEvents() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      setActiveFilter(button);
      renderMenu();
    });
  });
}

function initMenuEvents() {
  menuItemsEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const id = target.dataset.addId;
    if (!id) return;

    addToCart(id);
  });
}

function initTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.view;
      if (!view) return;
      setActiveTab(button);
      renderMobileView(view);
    });
  });
}

function initClock() {
  const updateClock = () => {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString("es-DO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  updateClock();
  setInterval(updateClock, 1000);
}

function initTrackSimulation() {
  setInterval(() => {
    state.trackStep = (state.trackStep + 1) % trackStages.length;

    if (state.activeMobileView === "track") {
      renderMobileView("track");
    }
  }, 3300);
}

function initRevealOnScroll() {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealEls.forEach((element) => observer.observe(element));
}

function initServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

renderMenu();
renderCart();
renderMobileView();
initFilterEvents();
initMenuEvents();
initTabs();
initClock();
initTrackSimulation();
initRevealOnScroll();
initServiceWorker();
