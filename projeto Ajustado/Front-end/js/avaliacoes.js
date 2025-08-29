document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username") || "Usuário";
  document.getElementById("user-name").textContent = `Olá, ${username}`;

  const jwtToken = localStorage.getItem('jwt_token');

  if (!jwtToken) {
    alert('Você precisa estar logado para ver suas avaliações!');
    window.location.href = "../html/login.html";
    return;
  }

  const tokenPayload = JSON.parse(atob(jwtToken.split('.')[1]));
  const userId = tokenPayload.userID;

  fetch(`http://localhost:5000/api/avaliacoes?userId=${userId}`, {
    headers: {
      "Authorization": `Bearer ${jwtToken}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar avaliações');
    }
    return response.json();
  })
  .then(data => {  // Renomeie para 'data' para evitar confusão
    const container = document.getElementById("avaliacoesContainer");
    
    if (!data || !Array.isArray(data)) {
      container.innerHTML = "<p>Erro ao carregar avaliações</p>";
      return;
    }

    if (data.length === 0) {
      container.innerHTML = "<p>Você ainda não avaliou nenhum livro.</p>";
    } else {
      data.forEach(avaliacao => {  // Use 'data' aqui
        const card = document.createElement("div");
        card.className = "avaliacao-card";
        card.innerHTML = `
          <h3>${avaliacao.livro_titulo}</h3>  // Note que usei livro_titulo
          <p><strong>Nota:</strong> ${avaliacao.nota} / 5</p>
          <p><strong>Comentário:</strong> ${avaliacao.comentario}</p>
        `;
        container.appendChild(card);
      });
    }
  })
  .catch(error => {
    console.error('Erro ao carregar avaliações:', error);
    document.getElementById("avaliacoesContainer").innerHTML = 
      "<p>Erro ao carregar suas avaliações. Tente novamente mais tarde.</p>";
  });
});