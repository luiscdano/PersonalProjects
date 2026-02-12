# La Casita de Yeya | Sitio Multipagina

Estructura modular real por páginas: cada sección principal tiene su URL independiente.

## Arquitectura actual
- `index.html` -> `Home` (resumen general)
- `village.html` -> `Village`
- `downtown.html` -> `Downtown`
- `los-corales.html` -> `Los Corales`
- `nosotros.html` -> `Nosotros`

## Implementado en esta fase
- TopBar con enlaces entre páginas (no scroll interno por anclas).
- Home como resumen de marca con acceso rápido a cada local.
- Página individual para cada sucursal con módulos propios.
- Placeholder por color aplicado por local:
  - Azul: Village
  - Amarillo: Downtown
  - Rojo: Los Corales
- Carpeta lista para reemplazo de imágenes reales: `assets/locales/`.

## Enlaces de ubicaciones (Google)
- Village: `https://share.google/HPCH2DRd57vGc7hVA`
- Downtown: `https://share.google/Q7YqUKmgGGEUhB9pp`
- Los Corales: `https://share.google/tYgUz1eL5Of8qEaNY`

## Desarrollo local
```bash
python3 -m http.server 8080
```
Abrir:
- `http://localhost:8080/index.html`
- `http://localhost:8080/village.html`
- `http://localhost:8080/downtown.html`
- `http://localhost:8080/los-corales.html`
- `http://localhost:8080/nosotros.html`

## Publicación (GitHub Pages)
Ruta base:
- `https://luiscdano.github.io/PersonalProjects/LaCasitaDeYeya/`
