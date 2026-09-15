# Guía de entrega — RutaControl (EPE1 IPCHILE)

Pasos para dejar el proyecto en Git, subirlo a GitHub, crear la rama/PR y publicarlo
con GitHub Pages. Comandos para **PowerShell en Windows**.

> ⚠️ La pauta indica como fecha de entrega el domingo 13 de septiembre de 2026.
> Si estás leyendo esto después de esa fecha, confirma con tu profesor si corresponde
> entrega atrasada o si hubo una prórroga antes de enviar el enlace final.

## 1. Ubicar los archivos

Copia estos 6 archivos a una carpeta llamada `rutacontrol` en tu equipo:
`index.html`, `styles.css`, `app.js`, `README.md`, `.gitignore`, `GUIA_ENTREGA.md`.

## 2. Inicializar Git y hacer los primeros commits

Desde PowerShell, dentro de la carpeta `rutacontrol`:

```powershell
git init
git add index.html styles.css .gitignore
git commit -m "Estructura inicial: HTML y CSS base de RutaControl"

git add app.js
git commit -m "Agrega interacciones 01 a 05: estado, toggle, contador, detalle y vista previa"

git add README.md
git commit -m "Agrega README con descripcion del proyecto"
```

Esto ya te da un historial con más de tres commits que muestran avances distintos,
tal como pide el requerimiento 18.

## 3. Crear el repositorio en GitHub

1. En GitHub, crea un repositorio nuevo llamado `rutacontrol` (vacío, sin README).
2. Conéctalo con tu repositorio local y sube `main`:

```powershell
git branch -M main
git remote add origin https://github.com/<tu-usuario>/rutacontrol.git
git push -u origin main
```

## 4. Rama de trabajo y Pull Request

Crea una rama para evidenciar una mejora o funcionalidad adicional (por ejemplo,
un ajuste visual o una validación extra) y súbela:

```powershell
git checkout -b feature/interacciones
# realiza el cambio o mejora en app.js / styles.css
git add .
git commit -m "Mejora: ajuste de validacion en el formulario de incidencias"
git push -u origin feature/interacciones
```

Luego en GitHub: **Pull requests → New pull request** → base `main` ← compare
`feature/interacciones` → describe el cambio → **Create pull request** → **Merge pull request**.

## 5. Publicar con GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En "Source" selecciona la rama `main` y la carpeta `/ (root)`.
3. Guarda. GitHub entrega una URL como:
   `https://<tu-usuario>.github.io/rutacontrol/`
4. Ábrela y confirma que las 10 tarjetas funcionan sin errores en la consola
   (F12 → pestaña *Console*).

## 6. Qué entregar

- Enlace al repositorio: `https://github.com/<tu-usuario>/rutacontrol`
- Enlace público de GitHub Pages: `https://<tu-usuario>.github.io/rutacontrol/`

## Checklist rápido antes de enviar

- [ ] `index.html`, `styles.css`, `app.js`, `README.md`, `.gitignore` están en el repositorio
- [ ] Al menos 3 commits con mensajes descriptivos
- [ ] Existe la rama `feature/interacciones` y su Pull Request está fusionado a `main`
- [ ] GitHub Pages abre el sitio y las 10 interacciones funcionan
- [ ] No hay errores en la consola del navegador
