# La Casita de Yeya | Web Modular

Primera fase de la propuesta: estructura seccionada y escalable con navegación por módulos.

## Estructura actual
- `Home`
- `Village`
- `Downtown`
- `Los Corales`
- `Nosotros`

## Implementado en esta fase
- TopBar con navegación por anclas a cada sección.
- Home con breve historia de marca.
- Tarjetas flotantes en movimiento (izquierda/derecha/izquierda) para:
  - La Casita de Yeya Village
  - La Casita de Yeya Downtown
  - La Casita de Yeya Los Corales
- Placeholder por color aplicado por local:
  - Azul: Village
  - Amarillo: Downtown
  - Rojo: Los Corales
- Cada tarjeta enlaza a su sección correspondiente.
- Secciones base separadas para cada local y para Nosotros.
- Carpeta lista para reemplazo de imágenes reales: `assets/locales/`.

## Enlaces de ubicaciones (Google)
- Village: `https://share.google/HPCH2DRd57vGc7hVA`
- Downtown: `https://share.google/Q7YqUKmgGGEUhB9pp`
- Los Corales: `https://share.google/tYgUz1eL5Of8qEaNY`

## Desarrollo local
```bash
python3 -m http.server 8080
```
Abrir: `http://localhost:8080`

## Publicación (GitHub Pages)
Ruta esperada:
- `https://luiscdano.github.io/PersonalProjects/LaCasitaDeYeya/`
