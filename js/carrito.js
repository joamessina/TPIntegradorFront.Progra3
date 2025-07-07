function getCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}
function setCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
function vaciarCarrito() {
  localStorage.removeItem('carrito');
}

// Render del carrito en carrito.html
function renderizarCarrito() {
  const carrito = getCarrito();
  const contenedor = document.getElementById('carrito-lista');
  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    document.getElementById('carrito-total').innerText = '';
    return;
  }

  let total = 0;
  contenedor.innerHTML = carrito
    .map((item) => {
      total += item.precio * item.cantidad;
      return `
      <div class="carrito-item">
        <span>${item.nombre}</span>
        <button onclick="actualizarCantidad(${item.id}, ${
        item.cantidad - 1
      })">-</button>
        <input type="number" min="1" max="${item.stock}" value="${
        item.cantidad
      }" onchange="actualizarCantidad(${item.id}, this.value)">
        <button onclick="actualizarCantidad(${item.id}, ${
        item.cantidad + 1
      })">+</button>
        <span>Stock: ${item.stock}</span>
        <span>Precio: $${item.precio}</span>
        <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
      </div>
    `;
    })
    .join('');

  document.getElementById('carrito-total').innerText = `Total: $${total}`;
}

window.actualizarCantidad = function (id, cantidad) {
  let carrito = getCarrito();
  const item = carrito.find((p) => p.id === id);
  if (!item) return;

  cantidad = parseInt(cantidad);
  if (cantidad < 1) cantidad = 1;
  if (cantidad > item.stock) {
    alert(`No hay stock suficiente. Stock disponible: ${item.stock}`);
    cantidad = item.stock;
  }
  item.cantidad = cantidad;
  setCarrito(carrito);
  renderizarCarrito();
  actualizarCarritoNav();
};

window.eliminarDelCarrito = function (id) {
  let carrito = getCarrito().filter((p) => p.id !== id);
  setCarrito(carrito);
  renderizarCarrito();
  actualizarCarritoNav();
};

// Para el numerito del carrito en todas las páginas
function actualizarCarritoNav() {
  const carrito = getCarrito();
  const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const span = document.getElementById('carrito-cantidad');
  if (span) span.textContent = cantidad;
}

document.addEventListener('DOMContentLoaded', function () {
  renderizarCarrito();
  actualizarCarritoNav();

  const btn = document.getElementById('finalizar-btn');
  if (btn) {
    btn.onclick = async function () {
      const carrito = getCarrito();
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión');
        window.location.href = 'login.html';
        return;
      }
      try {
        const res = await fetch('http://localhost:3000/api/compras', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            items: carrito.map((item) => ({
              id: item.id,
              cantidad: item.cantidad,
              precio: item.precio,
            })),
          }),
        });
        const data = await res.json();
        if (res.ok) {
          vaciarCarrito();
          alert('¡Compra realizada!');
          window.location.href = 'index.html';
        } else {
          alert(data.error || 'No se pudo realizar la compra');
        }
      } catch (error) {
        alert('Error al conectar con el servidor');
      }
    };
  }
});
