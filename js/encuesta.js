// encuesta.js

// Función de validación (orientada a cartas Pokémon)
function validarEncuesta(data) {
  const errores = [];
  if (!data.email || !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(data.email))
    errores.push("Ingresá un email válido.");
  if (!data.opinion || data.opinion.trim().length < 5)
    errores.push(
      "Contanos tu opinión sobre nuestras cartas Pokémon (mínimo 5 caracteres)."
    );
  if (!data.checkbox)
    errores.push("Debés seleccionar al menos una opción de recomendación.");
  if (!data.puntos || isNaN(data.puntos))
    errores.push("Calificá tu experiencia con las cartas usando el slider.");
  if (!data.imagenNombre)
    errores.push("Subí una imagen de tu carta favorita (archivo PNG/JPG).");
  return errores;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("encuesta-form");
  const modal = document.getElementById("modal-agradecimiento");
  const modalCharizardImg = document.getElementById("modal-charizard-img");
  const erroresDiv = document.getElementById("errores-encuesta");

  // Ocultar modal al principio
  if (modal) modal.style.display = "none";

  // Mostrar/Ocultar modal
  function mostrarModal() {
    if (modal) {
      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("show");
      }, 50);
    }
  }
  function ocultarModal() {
    if (modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 320);
    }
  }

  // Manejo de botón omitir
  const btnOmitir = document.getElementById("btn-omitir");
  if (btnOmitir) {
    btnOmitir.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }

  // Manejo de formulario
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (erroresDiv) erroresDiv.innerHTML = "";

      // Tomar datos
      const data = {
        email: form.email.value,
        opinion: form.opinion.value,
        checkbox: form.checkbox1.checked
          ? form.checkbox1.value
          : form.checkbox2.checked
          ? form.checkbox2.value
          : "",
        puntos: form.puntos.value,
        imagenNombre: form.imagen.files[0] ? form.imagen.files[0].name : "",
      };

      // Validación
      const errores = validarEncuesta(data);
      if (errores.length > 0) {
        erroresDiv.innerHTML = errores
          .map((err) => `<div class="error-message">${err}</div>`)
          .join("");
        return;
      }

      // Simular guardado de encuesta de cartas Pokémon (localStorage) + fecha
      const encuestas = JSON.parse(
        localStorage.getItem("encuestas_cartas_pokemon") || "[]"
      );
      data.fecha = new Date().toISOString().slice(0, 10);
      encuestas.push(data);
      localStorage.setItem(
        "encuestas_cartas_pokemon",
        JSON.stringify(encuestas)
      );

      // Mostrar modal de agradecimiento
      mostrarModal();
      // Reiniciar form después de unos segundos y redirigir
      setTimeout(() => {
        ocultarModal();
        window.location.href = "index.html";
      }, 3200);
    });
  }

  // Cerrar modal al clickear
  if (modal) {
    modal.addEventListener("click", function () {
      ocultarModal();
      window.location.href = "index.html";
    });
  }
});
