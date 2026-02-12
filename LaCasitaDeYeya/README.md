# La Casita de Yeya | Demo Web + App

Propuesta visual y funcional para presentar a **La Casita de Yeya** una transformación digital con:
- Sitio web de marca (landing + menú interactivo)
- Vista tipo app móvil (menú, pedido y tracking)
- Configuración PWA instalable

## Demo local
1. En esta carpeta, levanta un servidor estático:
   ```bash
   python -m http.server 8080
   ```
2. Abre en el navegador:
   - `http://localhost:8080`

## Estructura
- `index.html`: landing principal + secciones comerciales
- `styles.css`: sistema visual basado en los colores del logo
- `app.js`: interacciones (filtros de menú, carrito demo, mockup app, tracking)
- `manifest.webmanifest`: configuración PWA
- `sw.js`: caché básico offline
- `assets/`: logo/avatar e íconos

## Publicación en GitHub Pages
Como este proyecto vive dentro del repo `PersonalProjects`, al publicarlo quedaría en:
- `https://luiscdano.github.io/PersonalProjects/LaCasitaDeYeya/`

## Notas
- Se usaron referencias públicas actuales del Linktree de la marca:
  - Menú: `https://tumenurd.com/menu/yeya/`
  - PedidosYa: `https://www.pedidosya.com.do/restaurantes/punta-cana---bavaro/la-casita-de-yeya-punta-cana-menu`
  - Ubicaciones: links de Google Maps publicados en su Linktree.
- Algunos platos/precios del demo son representativos para la propuesta visual y pueden ajustarse con el menú final oficial.
