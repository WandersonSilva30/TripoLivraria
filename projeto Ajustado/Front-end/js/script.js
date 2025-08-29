document.getElementById("formLogin").addEventListener("submit", async function(event) {
    event.preventDefault();

    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login: login, password: password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("jwt_token", data.jwt_token);
            localStorage.setItem("userName", data.userName);
            window.location.href = "index.html";
        } else {
            alert("Erro ao logar: " + (data.erro || "Erro desconhecido"));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar ao servidor.");
    }
});

function tentarAutorizar() {
    let token = localStorage.getItem("jwt_token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    fetch("http://localhost:5000/users/authorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt_token: token })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            console.log("Usuário autorizado");
        } else {
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "login.html";
        }
    })
    .catch(error => {
        console.error("Erro na autorização:", error);
        alert("Erro ao verificar sessão.");
    });
}
