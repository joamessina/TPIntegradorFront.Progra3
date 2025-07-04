async function cargarProducto() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const contenedor = document.getElementById('producto');
  const producto = {
    id,
    nombre: "Producto " + id,
    descripcion: "Descripción del producto " + id,
    precio: 1599,
    imagen: "https://via.placeholder.com/200"
  };
  contenedor.innerHTML = `
    <img src="${producto.imagen}" alt="" class="rounded-xl mb-4 mx-auto w-40 h-40 object-cover">
    <h2 class="text-2xl font-bold mb-2">${producto.nombre}</h2>
    <p class="mb-2">${producto.descripcion}</p>
    <div class="text-xl font-bold text-green-600 mb-2">$${producto.precio}</div>
    <a href="productos.html" class="text-blue-600 underline">Volver</a>
  `;
}
cargarProducto();