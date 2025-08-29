const livros = [
  {
    Titulo: "Dom Casmurro",
    Autor: "Machado de Assis",
    Genero: "Romance",
    AnoPublicacao: 1899,
    Descricao: "Um romance psicológico sobre ciúmes e memória."
  },
  {
    Titulo: "A Revolução dos Bichos",
    Autor: "George Orwell",
    Genero: "Fábula",
    AnoPublicacao: 1945,
    Descricao: "Uma sátira política sobre a Revolução Russa."
  },
  {
    Titulo: "O Senhor dos Anéis",
    Autor: "J.R.R. Tolkien",
    Genero: "Fantasia",
    AnoPublicacao: 1954,
    Descricao: "Uma épica jornada pela Terra Média."
  },
  {
    Titulo: "1984",
    Autor: "George Orwell",
    Genero: "Distopia",
    AnoPublicacao: 1949,
    Descricao: "Uma visão sombria de um futuro totalitário."
  },
  {
    Titulo: "Capitães da Areia",
    Autor: "Jorge Amado",
    Genero: "Drama",
    AnoPublicacao: 1937,
    Descricao: "A história de meninos de rua em Salvador."
  }
];

const listaLivrosEl = document.getElementById("bookList");

const filtroTitulo = document.getElementById("filterTitle");
const filtroAutor = document.getElementById("filterAuthor");
const filtroGenero = document.getElementById("filterGenre");
const filtroAno = document.getElementById("filterYear");

function renderizarLivros(livrosFiltrados) {
  listaLivrosEl.innerHTML = "";

  if (livrosFiltrados.length === 0) {
    listaLivrosEl.innerHTML = "<p>Nenhum livro encontrado.</p>";
    return;
  }

  livrosFiltrados.forEach(livro => {
    const livroEl = document.createElement("div");
    livroEl.classList.add("livro");

    livroEl.innerHTML = `
      <h3>${livro.Titulo}</h3>
      <p><strong>Autor:</strong> ${livro.Autor}</p>
      <p><strong>Gênero:</strong> ${livro.Genero}</p>
      <p><strong>Ano:</strong> ${livro.AnoPublicacao}</p>
      <p><strong>Descrição:</strong> ${livro.Descricao}</p>
    `;

    listaLivrosEl.appendChild(livroEl);
  });
}

function filtrarLivros() {
  const titulo = filtroTitulo.value.toLowerCase();
  const autor = filtroAutor.value.toLowerCase();
  const genero = filtroGenero.value.toLowerCase();
  const ano = filtroAno.value;

  const filtrados = livros.filter(livro => {
    return (
      livro.Titulo.toLowerCase().includes(titulo) &&
      livro.Autor.toLowerCase().includes(autor) &&
      livro.Genero.toLowerCase().includes(genero) &&
      (ano === "" || livro.AnoPublicacao.toString() === ano)
    );
  });

  renderizarLivros(filtrados);
}

// Adiciona eventos aos campos
[filtroTitulo, filtroAutor, filtroGenero, filtroAno].forEach(input => {
  input.addEventListener("input", filtrarLivros);
});

// Render inicial
renderizarLivros(livros);

// Buscar do servidor e renderizar
function buscarLivros() {
  fetch('http://localhost:5000/livros')
    .then(response => response.json())
    .then(data => {
      renderizarLivros(data); // Renderiza livros do backend
    })
    .catch(error => {
      console.error('Erro ao buscar livros:', error);
    });
}

buscarLivros(); // Executa ao carregar
