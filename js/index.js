const API_URL = 'http://localhost:3000/api/productos';
const SOCKET_URL = 'http://localhost:3000';
if (!localStorage.getItem('token')) {
  window.location.href = '../pages/login.html';
}
async function cargarProductos() {
  const contenedor = document.getElementById('productos-list');
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '../pages/login.html';
      return;
    }
    const data = await res.json();
    const productos = data.rows || data;

    contenedor.innerHTML = productos
      .map(
        (p) => `
      <div class="product-card">
        <img src="${
          p.imagen
            ? p.imagen.startsWith('http')
              ? p.imagen
              : 'http://localhost:3000/images/' + p.imagen
            : 'https://static.wikia.nocookie.net/4edf6693-39d6-4d5c-b426-59f4a9e6c382/scale-to-width/755'
        }" alt="${p.nombre}" />
        <h2>${p.nombre}</h2>
        <div class="tipo">Tipo: ${p.tipo}</div>
        <div class="expansion">Expansión: ${p.expansion}</div>
        <div class="precio">${
          p.activo
            ? `$${Number(p.precio).toLocaleString()}`
            : '<span class="no-disponible">No disponible</span>'
        }</div>
        <button onclick='agregarAlCarrito(${JSON.stringify({
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
          stock: p.stock,
        })})' ${!p.activo ? 'disabled' : ''}>
          Agregar al carrito
        </button>
      </div>
    `
      )
      .join('');
  } catch (err) {
    contenedor.innerHTML = '<p>Error al cargar productos.</p>';
  }
}

function agregarAlCarrito(producto) {
  const carrito = getCarrito();
  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    if (existente.cantidad + 1 > producto.stock) {
      alert(`No hay stock suficiente. Stock disponible: ${producto.stock}`);
      return;
    }
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  setCarrito(carrito);
  actualizarCarritoNav();
}
function actualizarCarritoNav() {
  const carrito = getCarrito();
  const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const span = document.getElementById('carrito-cantidad');
  if (span) span.textContent = cantidad;
}

window.agregarAlCarrito = agregarAlCarrito;

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();

  // Año del footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Conexión Socket.io
  const socket = io(SOCKET_URL);

  socket.on('connect', () => {
    console.log('Conectado a socket.io');
  });

  socket.on('productos-updated', () => {
    console.log('Recibí productos-updated');
    cargarProductos();
  });

  socket.on('disconnect', () => {
    console.log('Desconectado de socket.io');
  });
});
