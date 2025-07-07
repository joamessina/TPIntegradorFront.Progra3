// detalle.js

// MOCK de productos (simula una base de datos de cartas Pokémon)
const productos = [
  {
    id: "1",
    nombre: "Carta Pikachu Holo",
    precio: 27000,
    descripcion:
      "Edición holográfica limitada de Pikachu. ¡Una carta imprescindible para coleccionistas Pokémon!",
    imagen: "../assets/pikachu-carta.png", // Cambia el nombre según tu asset real
  },
  {
    id: "2",
    nombre: "Carta Charizard VMAX",
    precio: 45000,
    descripcion:
      "Charizard VMAX, ultra rara y con acabado brillante. Destaca en cualquier batalla y colección.",
    imagen: "../assets/charizard-carta.png", // Cambia el nombre según tu asset real
  },
  {
    id: "3",
    nombre: "Carta Mewtwo EX",
    precio: 38000,
    descripcion:
      "Poderosa carta Mewtwo EX, edición especial del campeonato mundial. Potencia máxima.",
    imagen: "../assets/mewtwo-carta.png", // Cambia el nombre según tu asset real
  },
  // Agrega más cartas si querés...
];

// Utilidad para obtener parámetro por nombre de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function mostrarDetalleProducto() {
  const id = getQueryParam("id");
  if (!id) {
    document.getElementById(
      "detalle-card"
    ).innerHTML = `<div class="error-message">Producto no especificado.</div>`;
    return;
  }
  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    document.getElementById(
      "detalle-card"
    ).innerHTML = `<div class="error-message">¡Producto no encontrado!</div>`;
    return;
  }

  // Armar el HTML del detalle
  document.getElementById("detalle-card").innerHTML = `
    <div class="pokeball-bg"></div>
    <img src="${producto.imagen}" class="detalle-img" alt="${producto.nombre}">
    <div class="detalle-info">
      <div class="detalle-titulo">${producto.nombre}</div>
      <div class="detalle-precio">$${producto.precio}</div>
      <div class="detalle-descripcion">${producto.descripcion}</div>
      <button class="btn-volver" onclick="window.history.back()">Volver</button>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", mostrarDetalleProducto);
