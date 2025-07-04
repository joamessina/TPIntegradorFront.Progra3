document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('productos-list');
  const API_URL = 'http://localhost:3000/api/productos'; // Cambia si deployás en otro lado

  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const productos = data.rows || data; // si usás findAndCountAll, es .rows

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
      </div>
    `
      )
      .join('');
  } catch (err) {
    contenedor.innerHTML = '<p>Error al cargar productos.</p>';
  }

  // Año del footer
  document.getElementById('year').textContent = new Date().getFullYear();
});
