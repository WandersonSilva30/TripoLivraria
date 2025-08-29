// Alternar entre formulários
function toggleForm() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }
}

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const login = document.getElementById("login").value.trim();  // Captura o valor do input de login
  const password = document.getElementById("password").value;   // Captura o valor do input de senha

  try {
    const response = await fetch("http://127.0.0.1:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ login, password })
    });

    const data = await response.json();
    console.log("Resposta da API:", data);

    if (response.ok) {
      alert("Login realizado com sucesso!");

    console.log(localStorage.getItem("userID"))

      // Salvar tudo no localStorage
      localStorage.setItem("jwt_token", data.jwt_token);
      localStorage.setItem("username", data.userName);
      localStorage.setItem("userId", data.userID);

      window.location.href = data.redirectTo;

      // Adicionar um pequeno delay para garantir o redirecionamento
      setTimeout(() => {
        if (data.redirectTo === "adm.html") {
          window.location.href = "adm.html";  // Se for admin, vai para a página admin
        } else {
          window.location.href = "dashboard.html";  // Caso contrário, vai para o dashboard
        }
      }, 100);  // 100 ms de delay, pode ajustar conforme necessário
    } else {
      alert(data.erro || "Erro ao fazer login.");
    }
  } catch (err) {
    console.error("Erro na requisição de login:", err);
    alert("Erro ao conectar com o servidor.");
  }
});
// REGISTRO
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputs = e.target.querySelectorAll("input");
  const name = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const password = inputs[2].value;

  try {
    const response = await fetch("http://127.0.0.1:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registro realizado com sucesso! Agora faça login.");
      toggleForm(); // Alterna para o formulário de login
    } else {
      alert(data.erro || "Erro ao registrar.");
    }
  } catch (err) {
    console.error("Erro na requisição de registro:", err);
    alert("Erro ao conectar com o servidor.");
  }
});
