// Utilidad para obtener parámetro por nombre de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function mostrarDetalleProducto() {
  const id = getQueryParam('id');
  const contenedor =
    document.getElementById('detalle-card') ||
    document.getElementById('productos-lista');
  if (!id || !contenedor) {
    contenedor.innerHTML = `<div class="error-message">Producto no especificado.</div>`;
    return;
  }

  // Consultá a la API real
  try {
    const res = await fetch(`http://localhost:3000/api/productos/${id}`);
    if (!res.ok) throw new Error('No se pudo obtener el producto');
    const data = await res.json();

    // Puede venir como { producto: {...} } o {...}
    const p = data.producto || data;

    contenedor.innerHTML = `
  <div class="card mx-auto shadow-lg detalle-card" style="max-width: 500px;">
    <img 
      src="${
        p.imagen
          ? p.imagen.startsWith('http')
            ? p.imagen
            : 'http://localhost:3000/images/' + p.imagen
          : 'https://static.wikia.nocookie.net/4edf6693-39d6-4d5c-b426-59f4a9e6c382/scale-to-width/755'
      }"
      class="card-img-top p-4"
      style="object-fit:contain;max-height:280px;"
      alt="${p.nombre}"
    />
    <div class="card-body text-center">
      <h2 class="card-title h5 fw-bold mb-2 text-primary">${p.nombre}</h2>
      <div class="fw-bold text-success fs-4 mb-2">
        $${Number(p.precio).toLocaleString()}
      </div>
      <div class="text-muted mb-2">${p.expansion || ''}</div>
      <div class="mb-3">${p.descripcion || ''}</div>
      <button class="btn btn-secondary w-100" onclick="window.history.back()">Volver</button>
    </div>
  </div>
`;
  } catch (err) {
    contenedor.innerHTML = `<div class="error-message">¡Producto no encontrado!</div>`;
  }
}

document.addEventListener('DOMContentLoaded', mostrarDetalleProducto);
