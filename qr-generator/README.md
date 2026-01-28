# QR Generator

Generador sencillo de códigos QR para texto o enlaces. Permite elegir tamaño, nivel de corrección de errores y descargar el resultado como PNG.

## Acceso rápido
- Versión publicada: https://luiscdano.github.io/PersonalProjects/qr-generator/

## Cómo usarlo
1. Abre el enlace publicado o ejecuta `index.html` en tu navegador.
2. Escribe el texto o URL.
3. Opcional: cambia el tamaño, nivel de corrección y nombre del archivo.
4. Pulsa **Generar** y luego **Descargar PNG**.
5. Botón **Limpiar** borra el contenido y el QR.

## Desarrollo local
- No requiere dependencias ni build; basta con servir los archivos estáticos (`index.html`, `styles.css`, `app.js`).
- Si necesitas un servidor local: `python -m http.server 8000` y visita `http://localhost:8000`.

## Notas
- Usa la librería `qrcode@1.4.4` desde CDN para mantener la compatibilidad con navegadores sin bundler.
- El canvas ajusta su tamaño según la opción seleccionada y mantiene una zona de silencio (`margin: 2`) para una lectura fiable.
