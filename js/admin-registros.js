const topProductos = [
  { nombre: "Producto 1", cantidad: 100 },
  { nombre: "Producto 2", cantidad: 90 },
  { nombre: "Producto 3", cantidad: 80 },
  { nombre: "Producto 4", cantidad: 77 },
  { nombre: "Producto 5", cantidad: 66 },
  { nombre: "Producto 6", cantidad: 55 },
  { nombre: "Producto 7", cantidad: 40 },
  { nombre: "Producto 8", cantidad: 39 },
  { nombre: "Producto 9", cantidad: 28 },
  { nombre: "Producto 10", cantidad: 10 }
];
const topVentas = [
  { cliente: "Juan", total: 25000 },
  { cliente: "María", total: 22000 },
  { cliente: "Ana", total: 21500 },
  { cliente: "Pablo", total: 20700 },
  { cliente: "Lucas", total: 19400 },
  { cliente: "Sofía", total: 18000 },
  { cliente: "Pedro", total: 17800 },
  { cliente: "Luz", total: 15000 },
  { cliente: "Bruno", total: 13000 },
  { cliente: "Lila", total: 12800 }
];
const logs = [
  { fecha: "2025-07-04 10:00", usuario: "admin" },
  { fecha: "2025-07-03 11:23", usuario: "admin" },
  { fecha: "2025-07-03 09:11", usuario: "jefe" }
];
const encuestas = [
  { email: "a@a.com", opinion: "Muy bueno", puntaje: 9, recomienda: true, fecha: "2025-07-04" },
  { email: "b@b.com", opinion: "Mejorable", puntaje: 6, recomienda: false, fecha: "2025-07-04" }
];
document.getElementById('topProductos').innerHTML =
  topProductos.map((p, i) => `<tr><td class="px-3 py-2">${i+1}</td><td class="px-3 py-2">${p.nombre}</td><td class="px-3 py-2">${p.cantidad}</td></tr>`).join('');
document.getElementById('topVentas').innerHTML =
  topVentas.map((v, i) => `<tr><td class="px-3 py-2">${i+1}</td><td class="px-3 py-2">${v.cliente}</td><td class="px-3 py-2">$${v.total}</td></tr>`).join('');
document.getElementById('logs').innerHTML =
  logs.map(l => `<tr><td class="px-3 py-2">${l.fecha}</td><td class="px-3 py-2">${l.usuario}</td></tr>`).join('');
document.getElementById('cantVentas').textContent = topVentas.length;
document.getElementById('promedioVenta').textContent = "$" + (topVentas.reduce((acc, v) => acc + v.total, 0) / topVentas.length).toFixed(2);
function descargarEncuestas() {
  const ws = XLSX.utils.json_to_sheet(encuestas);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Encuestas");
  XLSX.writeFile(wb, "encuestas.xlsx");
}