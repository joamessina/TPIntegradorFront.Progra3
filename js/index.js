const API_URL = 'http://localhost:3000/api/productos';
const SOCKET_URL = 'http://localhost:3000';

// Redirige si no hay token
if (!localStorage.getItem('token')) {
  window.location.href = '../pages/login.html';
}

// Helper para fetch autenticado
async function fetchConAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = options.headers || {};
  if (token) headers['Authorization'] = 'Bearer ' + token;

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('token');
    alert('La sesión ha expirado, por favor volvé a iniciar sesión.');
    window.location.href = '../pages/login.html';
    return null;
  }

  return res;
}

// Renderiza productos con Bootstrap
async function cargarProductos() {
  const contenedor = document.getElementById('productos-list');
  const res = await fetchConAuth(API_URL);
  if (!res) return;

  try {
    const data = await res.json();
    const productos = data.rows || data;

    contenedor.innerHTML = productos
      .map(
        (p) => `
        <div class="product-card card shadow-sm mb-3">
          <img 
            src="${
              p.imagen
                ? p.imagen.startsWith('http')
                  ? p.imagen
                  : 'http://localhost:3000/images/' + p.imagen
                : 'https://static.wikia.nocookie.net/4edf6693-39d6-4d5c-b426-59f4a9e6c382/scale-to-width/755'
            }"
            class="card-img-top"
            style="max-height:170px;object-fit:contain;" 
            alt="${p.nombre}" 
          />
          <div class="card-body p-2">
            <h2 class="card-title h6 fw-bold mb-1">${p.nombre}</h2>
            <div class="text-muted small mb-1">Tipo: ${p.tipo}</div>
            <div class="text-muted small mb-2">Expansión: ${p.expansion}</div>
            <div class="precio mb-2">
              ${
                p.activo
                  ? `<span class="fw-bold text-success">$${Number(
                      p.precio
                    ).toLocaleString()}</span>`
                  : '<span class="badge bg-danger">No disponible</span>'
              }
            </div>
            <button
              class="btn btn-primary btn-sm w-100"
              onclick='agregarAlCarrito(${JSON.stringify({
                id: p.id,
                nombre: p.nombre,
                precio: p.precio,
                stock: p.stock,
              })})'
              ${!p.activo ? 'disabled' : ''}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
        `
      )
      .join('');
  } catch (err) {
    contenedor.innerHTML = '<p>Error al cargar productos.</p>';
  }
}

// Lógica de carrito igual
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
  mostrarToastAgregado();
}

// Función para mostrar el toast
function mostrarToastAgregado() {
  const toastEl = document.getElementById('toast-agregado');
  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl, { delay: 1600 });
    toast.show();
  }
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
  document.getElementById('year').textContent = new Date().getFullYear();

  // Socket.io
  const socket = io(SOCKET_URL);
  socket.on('connect', () => console.log('Conectado a socket.io'));
  socket.on('productos-updated', () => {
    console.log('Recibí productos-updated');
    cargarProductos();
  });
  socket.on('disconnect', () => console.log('Desconectado de socket.io'));
});
