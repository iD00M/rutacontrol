# RutaControl

Prototipo web de panel de operaciones para una empresa de logística de última milla.
Desarrollado para la evaluación **EPE1 — Desarrollo Full Stack (IPCHILE)**.

El sitio funciona completamente en el navegador: no requiere servidor ni base de datos.
Toda la información es temporal y se reinicia al recargar la página.

## Tecnologías

- **HTML5** para la estructura (`index.html`)
- **CSS3** para la presentación visual (`styles.css`)
- **JavaScript** para la lógica de interacción con el DOM (`app.js`), sin frameworks ni dependencias externas

## Funcionalidades (10 interacciones)

1. **Actualización de estado** — cambia el mensaje operativo al presionar un botón, incluyendo la hora del registro.
2. **Cambio de estado visual** — alterna una ruta entre "En ruta" y "Detenida" cambiando su clase CSS.
3. **Contador operativo** — registra paquetes entregados en el turno, con opción de reinicio.
4. **Mostrar y ocultar detalle** — expande o contrae la ficha técnica de un vehículo.
5. **Vista previa en tiempo real** — refleja una nota de despacho mientras se escribe y cuenta caracteres.
6. **Selección y cálculo** — estima el costo de un envío según tipo de vehículo y distancia ingresada.
7. **Rango y progreso** — un control deslizante representa el porcentaje de carga del vehículo.
8. **Creación y eliminación dinámica** — agrega y elimina tareas pendientes del turno.
9. **Filtrado de una colección** — busca rutas por comuna o estado sin recargar la página.
10. **Registro de incidencia** — formulario validado con `preventDefault()` que confirma o señala errores.

## Estructura del proyecto

```
rutacontrol/
├── index.html   # Estructura y las 10 tarjetas de interacción
├── styles.css   # Estilos, organizados por sección
├── app.js       # Lógica JS de cada interacción, comentada
├── README.md
└── .gitignore
```

## Cómo verlo localmente

Abre `index.html` directamente en el navegador (doble clic, o extensión "Live Server" de VSCode).
No requiere `npm install`.

## Publicación

Versión final publicada mediante GitHub Pages desde la rama `main`:
`https://<tu-usuario>.github.io/rutacontrol/`
