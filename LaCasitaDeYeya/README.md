# La Casita de Yeya

Sitio reiniciado desde cero con arquitectura seccionada por carpetas.

## Enlace principal
- `https://luiscdano.github.io/PersonalProjects/LaCasitaDeYeya/index.html`

## Estructura
- `index.html` (inicio)
- `shared/` (recursos globales)
  - `css/main.css`
  - `js/main.js`
  - `img/logo-yeya.jpg`
- `localidad/`
  - `index.html`
  - `img/`
  - `village/index.html`
  - `downtown/index.html`
  - `los-corales/index.html`
- `menu/`
  - `index.html`
  - `img/`
- `sobre/`
  - `index.html`
  - `img/`
  - `descripcion-general/index.html`
  - `nuestra-huella/index.html`
- `abastecimiento/`
  - `index.html`
  - `img/`
- `reserva/`
  - `index.html`
  - `img/`

## Navegación principal
- Localidad
  - Village
  - Downtown
  - Lo Corales
- Menú
- Sobre
  - Descripción General
  - Nuestra Huella
- Abastecimiento
- Reserva

## Desarrollo local
```bash
python3 -m http.server 8080
```
Abrir:
- `http://localhost:8080/index.html`
