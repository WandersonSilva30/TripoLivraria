document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username") || "Usuário";
    document.getElementById("user-name").textContent = `Olá, ${username}`;
  
    const emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];
    const container = document.getElementById("livros-emprestados");
  
    if (emprestimos.length === 0) {
      container.innerHTML = "<p>Você ainda não fez nenhum empréstimo.</p>";
    } else {
      emprestimos.forEach(item => {
        const livroDiv = document.createElement("div");
        livroDiv.className = "livro";
        livroDiv.innerHTML = `<h3>${item.titulo}</h3>`;
        container.appendChild(livroDiv);
      });
    }
  });


  // Carregar os empréstimos
  
  async function carregarEmprestimos() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Usuário não autenticado.");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/emprestimos?user_id=${userId}`);
        const data = await response.json();
        const emprestimos = Array.isArray(data) ? data : data.emprestimos || [];

        const container = document.getElementById("livros-emprestados");
        container.innerHTML = "";

        if (emprestimos.length === 0) {
            container.innerHTML = "<p>Você não possui empréstimos no momento.</p>";
            return;
        }

        emprestimos.forEach(item => {
            const div = document.createElement("div");
            div.className = "emprestimo-card";
            div.innerHTML = `
                <h3>${item.Titulo}</h3>
                <p><strong>Autor:</strong> ${item.Autor}</p>
                <p><strong>Data:</strong> ${item.data_emprestimo || '---'}</p>
                <button class="btn-devolver" data-id="${item.id}">Devolver</button>
            `;
            container.appendChild(div);
        });

        document.querySelectorAll('.btn-devolver').forEach(button => {
            button.addEventListener('click', async (e) => {
                const emprestimo_id = e.target.getAttribute("data-id");
                await devolverLivro(emprestimo_id, e.target);
            });
        });

    } catch (error) {
        console.error("Erro ao carregar empréstimos:", error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    carregarEmprestimos();
});


//devolver livro
async function devolverLivro(emprestimo_id, button) {
    try {
        console.log("ID enviado para devolver:", emprestimo_id);  // ← adicione isso
        
        const response = await fetch("http://127.0.0.1:5000/emprestimos/devolver", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emprestimo_id: emprestimo_id
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.mensagem);
            button.parentElement.remove();
        } else {
            alert(data.erro || "Erro ao devolver livro.");
        }

    } catch (error) {
        console.error("Erro ao devolver livro:", error);
        alert("Erro de conexão ao tentar devolver livro.");
    }
}

