document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login-client",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Guardar el token
        localStorage.setItem("token", data.token);

        // Guardar LOG de login (hora y usuario)
        const logs = JSON.parse(
          localStorage.getItem("logs_login_pokemon") || "[]"
        );
        logs.push({
          usuario: email,
          fecha: new Date().toLocaleString("es-AR"),
        });
        localStorage.setItem("logs_login_pokemon", JSON.stringify(logs));

        window.location.href = "../pages/index.html";
      } else {
        document.getElementById("login-error").textContent =
          data.error || "Error de login";
      }
    } catch (error) {
      document.getElementById("login-error").textContent =
        "No se pudo conectar con el servidor";
    }
  });
