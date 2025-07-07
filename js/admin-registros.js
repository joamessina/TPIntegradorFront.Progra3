// admin-registros.js

// MOCK DE DATOS
const productosMasVendidos = [
  { nombre: "Carta Pikachu Holo", vendidos: 320 },
  { nombre: "Carta Charizard VMAX", vendidos: 298 },
  { nombre: "Carta Eevee Evolución", vendidos: 285 },
  { nombre: "Carta Mewtwo EX", vendidos: 271 },
  { nombre: "Carta Snorlax GX", vendidos: 250 },
  { nombre: "Carta Bulbasaur", vendidos: 228 },
  { nombre: "Carta Gengar", vendidos: 205 },
  { nombre: "Carta Lugia Rare", vendidos: 196 },
  { nombre: "Carta Sylveon Full Art", vendidos: 181 },
  { nombre: "Carta Greninja", vendidos: 172 },
];

const ventasMasCaras = [
  { producto: "Carta Charizard VMAX", precio: 45000 },
  { producto: "Carta Mewtwo EX", precio: 38000 },
  { producto: "Carta Lugia Rare", precio: 32000 },
  { producto: "Carta Sylveon Full Art", precio: 29500 },
  { producto: "Carta Pikachu Holo", precio: 27000 },
  { producto: "Carta Eevee Evolución", precio: 25000 },
  { producto: "Carta Snorlax GX", precio: 21000 },
  { producto: "Carta Gengar", precio: 18900 },
  { producto: "Carta Greninja", precio: 17400 },
  { producto: "Carta Bulbasaur", precio: 16200 },
];

// Simula logs de login admin
const logsLogin = [
  { usuario: "admin1", fecha: "2025-07-05 09:12" },
  { usuario: "admin2", fecha: "2025-07-04 17:31" },
  { usuario: "admin1", fecha: "2025-07-03 08:50" },
  { usuario: "admin3", fecha: "2025-07-03 08:35" },
];

// Estadísticas extra (mock)
const stats = {
  encuestasRealizadas: 128,
  productosTotales: 10,
  ventasTotales: 2475,
  adminsActivos: 3,
};

// MOCK de encuestas para exportar
const encuestas = [
  {
    email: "ash@poke.com",
    opinion: "¡Me encantaron las cartas holográficas! Volveré a comprar.",
    puntos: 10,
    checkbox: "Recomendaría",
    fecha: "2025-07-07",
    imagen: "pikachu-holo.jpg",
  },
  {
    email: "misty@poke.com",
    opinion: "Gran variedad de cartas, excelente atención.",
    puntos: 9,
    checkbox: "Recomendaría",
    fecha: "2025-07-06",
    imagen: "charizard-vmax.jpg",
  },
];

// --------- CARGA DE TABLAS ---------

function cargarTablaProductosMasVendidos() {
  const tbody = document.getElementById("tabla-productos-vendidos");
  if (!tbody) return;
  tbody.innerHTML = "";
  productosMasVendidos.forEach((prod, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td>${prod.nombre}</td>
        <td>${prod.vendidos}</td>
      </tr>
    `;
  });
}

function cargarTablaVentasMasCaras() {
  const tbody = document.getElementById("tabla-ventas-caras");
  if (!tbody) return;
  tbody.innerHTML = "";
  ventasMasCaras.forEach((venta, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td>${venta.producto}</td>
        <td>$${venta.precio}</td>
      </tr>
    `;
  });
}

function cargarTablaLogs() {
  const tbody = document.getElementById("tabla-logs-login");
  if (!tbody) return;
  tbody.innerHTML = "";
  logsLogin.forEach((log, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td>${log.usuario}</td>
        <td>${log.fecha}</td>
      </tr>
    `;
  });
}

function cargarStats() {
  const stats1 = document.getElementById("stat-encuestas");
  const stats2 = document.getElementById("stat-productos");
  const stats3 = document.getElementById("stat-ventas");
  const stats4 = document.getElementById("stat-admins");

  if (stats1) stats1.innerText = stats.encuestasRealizadas;
  if (stats2) stats2.innerText = stats.productosTotales;
  if (stats3) stats3.innerText = stats.ventasTotales;
  if (stats4) stats4.innerText = stats.adminsActivos;
}

// --------- EXPORTAR ENCUESTAS A EXCEL ---------
// Requiere SheetJS (xlsx.full.min.js)

function exportarEncuestasExcel() {
  if (typeof XLSX === "undefined") {
    alert("¡Falta SheetJS (xlsx.full.min.js) para exportar Excel!");
    return;
  }
  // Estructura simple: convierto array a hoja
  const ws = XLSX.utils.json_to_sheet(encuestas);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Encuestas");
  XLSX.writeFile(wb, "encuestas_cartas_pokemon.xlsx");
}

// --------- INICIALIZAR ---------

document.addEventListener("DOMContentLoaded", function () {
  cargarTablaProductosMasVendidos();
  cargarTablaVentasMasCaras();
  cargarTablaLogs();
  cargarStats();

  // Botón de exportar encuestas
  const btnExportar = document.getElementById("btn-exportar-encuestas");
  if (btnExportar) {
    btnExportar.addEventListener("click", exportarEncuestasExcel);
  }
});
