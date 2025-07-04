document.getElementById('puntaje').addEventListener('input', e => {
  document.getElementById('sliderValue').textContent = e.target.value;
});
document.getElementById('encuestaForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  let valid = true;
  const email = document.getElementById('email').value.trim();
  const emailError = document.getElementById('emailError');
  emailError.classList.add('hidden');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.classList.remove('hidden');
    valid = false;
  }
  const opinion = document.getElementById('opinion').value.trim();
  const opinionError = document.getElementById('opinionError');
  opinionError.classList.add('hidden');
  if (!opinion) {
    opinionError.classList.remove('hidden');
    valid = false;
  }
  const fileInput = document.getElementById('imagen');
  const imagenError = document.getElementById('imagenError');
  imagenError.classList.add('hidden');
  const file = fileInput.files[0];
  if (file && (!file.type.startsWith('image/') || file.size > 2*1024*1024)) {
    imagenError.classList.remove('hidden');
    valid = false;
  }
  if (!valid) return;
  document.getElementById('modalGracias').classList.remove('hidden');
});
document.getElementById('omitir').onclick = () => {
  window.location.href = "home.html";
};
function cerrarModal() {
  document.getElementById('modalGracias').classList.add('hidden');
  window.location.href = "home.html";
}