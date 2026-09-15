/* =========================================================================
   RUTACONTROL — LÓGICA DE INTERACCIÓN
   Cada bloque sigue el mismo patrón: SELECCIONAR -> ESCUCHAR -> PROCESAR -> REPRESENTAR
   No hay persistencia de datos: todo vive en memoria mientras la página está abierta.
   ========================================================================= */

/* ---------- Reloj de cabecera (contexto visual, no es una de las 10 interacciones) ---------- */
const relojEl = document.getElementById("reloj-actual");

function actualizarReloj() {
  const ahora = new Date();
  relojEl.textContent = ahora.toLocaleTimeString("es-CL", { hour12: false });
}
actualizarReloj();
setInterval(actualizarReloj, 1000);


/* =========================================================================
   INTERACCIÓN 01 — Actualización de estado
   ========================================================================= */
// SELECCIONAR
const btnActualizarEstado = document.getElementById("btn-actualizar-estado");
const estadoMensajeEl = document.getElementById("estado-mensaje-operativo");

const MENSAJES_OPERATIVOS = [
  "Centro de despacho en funcionamiento normal.",
  "Flota completa reportando ubicación.",
  "Zona sur con tránsito lento, sin incidentes.",
  "Todas las rutas de la mañana confirmadas.",
];
let indiceMensaje = 0;

// ESCUCHAR
btnActualizarEstado.addEventListener("click", () => {
  // PROCESAR: elegir el siguiente mensaje de la lista y obtener la hora actual
  indiceMensaje = (indiceMensaje + 1) % MENSAJES_OPERATIVOS.length;
  const hora = new Date().toLocaleTimeString("es-CL", { hour12: false });

  // REPRESENTAR: reemplazar el texto del párrafo de estado
  estadoMensajeEl.textContent = `${MENSAJES_OPERATIVOS[indiceMensaje]} (actualizado ${hora})`;
});


/* =========================================================================
   INTERACCIÓN 02 — Cambio de estado visual
   ========================================================================= */
// SELECCIONAR
const btnToggleRuta = document.getElementById("btn-toggle-ruta");
const badgeEstadoRuta = document.getElementById("badge-estado-ruta");

let rutaActiva = false; // estado booleano mantenido en JS

// ESCUCHAR
btnToggleRuta.addEventListener("click", () => {
  // PROCESAR: invertir el estado booleano
  rutaActiva = !rutaActiva;

  // REPRESENTAR: agregar/quitar la clase "activa" y actualizar el texto de la insignia
  badgeEstadoRuta.classList.toggle("activa", rutaActiva);
  badgeEstadoRuta.textContent = rutaActiva ? "En ruta" : "Detenida";
});


/* =========================================================================
   INTERACCIÓN 03 — Contador operativo
   ========================================================================= */
// SELECCIONAR
const btnSumarEntrega = document.getElementById("btn-sumar-entrega");
const btnReiniciarEntregas = document.getElementById("btn-reiniciar-entregas");
const contadorEntregasEl = document.getElementById("contador-entregas");

let totalEntregas = 0; // valor mantenido en una variable

// REPRESENTAR: función de renderizado reutilizada por ambos botones
function renderizarContador() {
  contadorEntregasEl.textContent = totalEntregas;
}

// ESCUCHAR
btnSumarEntrega.addEventListener("click", () => {
  // PROCESAR
  totalEntregas += 1;
  renderizarContador();
});

btnReiniciarEntregas.addEventListener("click", () => {
  // PROCESAR
  totalEntregas = 0;
  renderizarContador();
});


/* =========================================================================
   INTERACCIÓN 04 — Mostrar y ocultar detalle
   ========================================================================= */
// SELECCIONAR
const btnToggleDetalle = document.getElementById("btn-toggle-detalle");
const detalleTecnicoEl = document.getElementById("detalle-tecnico");

// ESCUCHAR
btnToggleDetalle.addEventListener("click", () => {
  // PROCESAR: invertir la visibilidad actual
  const estaOculto = detalleTecnicoEl.classList.toggle("oculto");

  // REPRESENTAR: el texto del botón refleja la acción disponible
  btnToggleDetalle.textContent = estaOculto ? "Ver detalle técnico" : "Ocultar detalle técnico";
});


/* =========================================================================
   INTERACCIÓN 05 — Vista previa en tiempo real
   ========================================================================= */
// SELECCIONAR
const inputNotaDespacho = document.getElementById("input-nota-despacho");
const previewNotaEl = document.getElementById("preview-nota");
const contadorCaracteresEl = document.getElementById("contador-caracteres");
const btnLimpiarNota = document.getElementById("btn-limpiar-nota");

// ESCUCHAR: se dispara con cada tecla presionada
inputNotaDespacho.addEventListener("input", () => {
  // PROCESAR: leer el valor actual del campo
  const texto = inputNotaDespacho.value;

  // REPRESENTAR: reflejar el texto y su longitud
  previewNotaEl.textContent = texto.trim() === "" ? "La nota aparecerá aquí…" : texto;
  contadorCaracteresEl.textContent = texto.length;
});

// Operación de limpieza adicional
btnLimpiarNota.addEventListener("click", () => {
  inputNotaDespacho.value = "";
  previewNotaEl.textContent = "La nota aparecerá aquí…";
  contadorCaracteresEl.textContent = "0";
});


/* =========================================================================
   INTERACCIÓN 06 — Selección y cálculo
   ========================================================================= */
// SELECCIONAR
const selectVehiculo = document.getElementById("select-vehiculo");
const inputDistanciaKm = document.getElementById("input-distancia-km");
const btnCalcularCosto = document.getElementById("btn-calcular-costo");
const resultadoCalculoEl = document.getElementById("resultado-calculo");

const TARIFAS_POR_KM = {
  moto: 180,
  furgon: 320,
  camion: 480,
};

// ESCUCHAR
btnCalcularCosto.addEventListener("click", () => {
  // PROCESAR: convertir explícitamente a número antes de calcular
  const distancia = Number(inputDistanciaKm.value);
  const tarifa = TARIFAS_POR_KM[selectVehiculo.value];

  if (Number.isNaN(distancia) || distancia <= 0) {
    resultadoCalculoEl.textContent = "Ingresa una distancia válida en kilómetros.";
    return;
  }

  const costoEstimado = distancia * tarifa;

  // REPRESENTAR
  resultadoCalculoEl.textContent = `Costo estimado: $${costoEstimado.toLocaleString("es-CL")}`;
});


/* =========================================================================
   INTERACCIÓN 07 — Rango y progreso
   ========================================================================= */
// SELECCIONAR
const rangeCarga = document.getElementById("range-carga");
const textoCargaPorcentaje = document.getElementById("texto-carga-porcentaje");
const barraCargaFill = document.getElementById("barra-carga-fill");

// ESCUCHAR
rangeCarga.addEventListener("input", () => {
  // PROCESAR: leer el valor numérico del control
  const valor = rangeCarga.value;

  // REPRESENTAR: mismo valor actualiza el texto y el ancho de la barra
  textoCargaPorcentaje.textContent = valor;
  barraCargaFill.style.width = `${valor}%`;
});


/* =========================================================================
   INTERACCIÓN 08 — Creación y eliminación dinámica
   ========================================================================= */
// SELECCIONAR
const inputNuevaTarea = document.getElementById("input-nueva-tarea");
const btnAgregarTarea = document.getElementById("btn-agregar-tarea");
const listaTareasEl = document.getElementById("lista-tareas");

// Crea un <li> de tarea con su botón de eliminar
function crearElementoTarea(texto) {
  const li = document.createElement("li");
  li.className = "lista__item";

  const span = document.createElement("span");
  span.textContent = texto;

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "boton-eliminar";
  boton.setAttribute("aria-label", "Eliminar tarea");
  boton.textContent = "✕";

  li.appendChild(span);
  li.appendChild(boton);
  return li;
}

// ESCUCHAR (agregar)
btnAgregarTarea.addEventListener("click", () => {
  // PROCESAR: leer y validar el texto ingresado
  const texto = inputNuevaTarea.value.trim();
  if (texto === "") {
    inputNuevaTarea.focus();
    return;
  }

  // REPRESENTAR: agregar el nuevo nodo al final de la lista
  listaTareasEl.appendChild(crearElementoTarea(texto));
  inputNuevaTarea.value = "";
  inputNuevaTarea.focus();
});

// ESCUCHAR (eliminar): delegación de eventos en el contenedor de la lista,
// así funciona tanto en la tarea de ejemplo del HTML como en las creadas por JS
listaTareasEl.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("boton-eliminar")) {
    // PROCESAR + REPRESENTAR: quitar el <li> que contiene al botón presionado
    evento.target.closest(".lista__item").remove();
  }
});

// Permite agregar también con la tecla Enter
inputNuevaTarea.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    btnAgregarTarea.click();
  }
});


/* =========================================================================
   INTERACCIÓN 09 — Filtrado de una colección
   ========================================================================= */
// SELECCIONAR
const inputFiltroRutas = document.getElementById("input-filtro-rutas");
const itemsRutas = document.querySelectorAll("#lista-rutas .lista-rutas__item");

// ESCUCHAR
inputFiltroRutas.addEventListener("input", () => {
  // PROCESAR: normalizar el texto de búsqueda
  const termino = inputFiltroRutas.value.trim().toLowerCase();

  // REPRESENTAR: mostrar u ocultar cada elemento según coincida o no
  itemsRutas.forEach((item) => {
    const contenido = item.textContent.toLowerCase();
    const coincide = contenido.includes(termino);
    item.classList.toggle("filtrado-oculto", !coincide);
  });
});


/* =========================================================================
   INTERACCIÓN 10 — Formulario y validación
   ========================================================================= */
// SELECCIONAR
const formIncidencia = document.getElementById("form-incidencia");
const campoOperador = document.getElementById("campo-operador");
const campoRutaIncidencia = document.getElementById("campo-ruta-incidencia");
const campoTipoIncidencia = document.getElementById("campo-tipo-incidencia");
const campoDescripcionIncidencia = document.getElementById("campo-descripcion-incidencia");
const mensajeFormularioEl = document.getElementById("mensaje-formulario");

function marcarCampo(campo, esValido) {
  campo.classList.toggle("campo-invalido", !esValido);
}

// ESCUCHAR
formIncidencia.addEventListener("submit", (evento) => {
  // PROCESAR: evitar el envío tradicional del formulario
  evento.preventDefault();

  const operador = campoOperador.value.trim();
  const ruta = campoRutaIncidencia.value.trim();
  const tipo = campoTipoIncidencia.value;
  const descripcion = campoDescripcionIncidencia.value.trim();

  const errores = [];
  if (operador === "") errores.push("el nombre del operador");
  if (ruta === "") errores.push("la ruta afectada");
  if (tipo === "") errores.push("el tipo de incidencia");
  if (descripcion.length < 10) errores.push("una descripción de al menos 10 caracteres");

  marcarCampo(campoOperador, operador !== "");
  marcarCampo(campoRutaIncidencia, ruta !== "");
  marcarCampo(campoTipoIncidencia, tipo !== "");
  marcarCampo(campoDescripcionIncidencia, descripcion.length >= 10);

  // REPRESENTAR
  if (errores.length > 0) {
    mensajeFormularioEl.textContent = `Falta completar: ${errores.join(", ")}.`;
    mensajeFormularioEl.className = "mensaje-formulario visible error";
    return;
  }

  mensajeFormularioEl.textContent = `Incidencia registrada para ${ruta}. Un supervisor la revisará a la brevedad.`;
  mensajeFormularioEl.className = "mensaje-formulario visible exito";
  formIncidencia.reset();
});
