let books = [];

async function carregarLivros() {
  try {
    const response = await fetch("http://127.0.0.1:5000/livros", {
      headers: { "Authorization": `Bearer ${localStorage.getItem('jwt_token')}` }
    });

    if (!response.ok) throw new Error("Falha ao carregar livros");

    books = await response.json();
    renderBooks(books);
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
    alert("Erro ao carregar livros.");
  }
}

function renderBooks(filteredBooks = books) {
  const container = document.getElementById("booksContainer");
  container.innerHTML = "";

  filteredBooks.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h3>${book.Titulo}</h3>
      <p><strong>Autor:</strong> ${book.Autor}</p>
      <button onclick="emprestar(${book.id})">Fazer Empréstimo</button>
      <button onclick="avaliar(${book.id}, '${book.Titulo.replace(/'/g, "\\'")}')">Avaliar Livro</button>
    `;
    container.appendChild(card);
  });
}

async function emprestar(livroId) {
  const jwtToken = localStorage.getItem('jwt_token');
  const userId = localStorage.getItem('userId');

  if (!jwtToken) {
    alert("Você precisa estar logado para fazer um empréstimo!");
    window.location.href = "../html/login.html";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/emprestimos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        livroId: livroId,
        userId: userId
      })
    });

    const result = await response.json();
    console.log("Resposta da API:", result); // <-- Adicione isso também

    if (response.ok) {
      alert("✅ Empréstimo realizado com sucesso!");
    } else {
      alert(result.erro || "❌ Falha ao realizar empréstimo.");
    }
  } catch (error) {
    console.error("Erro ao emprestar livro:", error);
    alert("❌ Erro de conexão ao emprestar livro.");
  }
}

// dashboard.js (função avaliar atualizada)
async function avaliar(livroId, livroTitulo) {
  const comentario = prompt(`Digite seu comentário para o livro "${livroTitulo}":`);
  if (comentario === null || comentario.trim() === "") {
    alert("Comentário não pode ser vazio.");
    return;
  }

  const notaStr = prompt(`Digite sua nota para "${livroTitulo}" (de 1 a 5):`);
  const nota = parseInt(notaStr);

  if (isNaN(nota) || nota < 1 || nota > 5) {
    alert("Nota inválida. Digite um número de 1 a 5.");
    return;
  }

  const jwtToken = localStorage.getItem('jwt_token');
  const userId = localStorage.getItem('userId');

  if (!jwtToken) {
    alert("Você precisa estar logado para avaliar!");
    window.location.href = "../html/login.html";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/api/avaliacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        livroId: livroId,
        userId: userId,
        nota: nota,
        comentario: comentario
      })
    });

    const result = await response.json();
    if (response.ok) {
      alert("✅ Avaliação registrada com sucesso!");
    } else {
      alert(result.erro || "❌ Falha ao registrar avaliação.");
    }
  } catch (error) {
    console.error("Erro ao enviar avaliação:", error);
    alert("❌ Erro de conexão ao enviar avaliação. Verifique o console para mais detalhes.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  configurarMenu();
  carregarLivros();
});

function configurarMenu() {
  const username = localStorage.getItem("username") || "Usuário";
  const userElement = document.querySelector(".user-greeting");
  if (userElement) {
    userElement.textContent = `Olá, ${username}`;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "../html/login.html";
    });
  }

  const meusEmprestimosBtn = document.getElementById("meusEmprestimosBtn");
  if (meusEmprestimosBtn) {
    meusEmprestimosBtn.addEventListener("click", () => {
      window.location.href = "../html/perfil.html";
    });
  }

  const minhasAvaliacoesBtn = document.getElementById("minhasAvaliacoesBtn");
  if (minhasAvaliacoesBtn) {
    minhasAvaliacoesBtn.addEventListener("click", () => {
      window.location.href = "../html/avaliacoes.html";
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filtered = books.filter(book => book.Titulo.toLowerCase().includes(value));
      renderBooks(filtered);
    });
  }

  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const menu = document.getElementById("menu");
      menu.classList.toggle("show");
      menuToggle.classList.toggle("open");
    });
  }
}
