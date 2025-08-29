const apiUrl = 'http://localhost:5000/livros'; // Endereço da sua API

// Navegação dos links
document.getElementById('linkCadastrar').addEventListener('click', function() {
    document.getElementById('sectionCadastrar').style.display = 'block';
    document.getElementById('sectionListar').style.display = 'none';
});

document.getElementById('linkListar').addEventListener('click', function() {
    document.getElementById('sectionCadastrar').style.display = 'none';
    document.getElementById('sectionListar').style.display = 'block';
    listarLivros();
});

// Formulário de cadastro
const formCadastro = document.getElementById('formCadastro');
const listaLivros = document.getElementById('listaLivros');

formCadastro.addEventListener('submit', async function(event) {
    event.preventDefault();

    const livro = {
        Titulo: document.getElementById('Titulo').value.trim(),
        Autor: document.getElementById('Autor').value.trim(),
        Genero: document.getElementById('Genero').value.trim(),
        AnoPublicacao: document.getElementById('AnoPublicacao').value,
        Descricao: document.getElementById('Descricao').value.trim()
    };

    if (livro.Titulo && livro.Autor && livro.Genero && livro.AnoPublicacao && livro.Descricao) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(livro)
            });

            if (response.ok) {
                alert("✅ Livro cadastrado com sucesso!");
                formCadastro.reset();
                listarLivros();
            } else {
                const error = await response.json();
                alert(`❌ Erro: ${error.mensagem || "Erro ao cadastrar livro."}`);
            }
        } catch (error) {
            console.error("Erro ao cadastrar livro:", error);
            alert("❌ Erro de conexão ao cadastrar livro.");
        }
    } else {
        alert("Preencha todos os campos!");
    }
});

// Listar livros
async function listarLivros() {
    try {
        const resposta = await fetch(apiUrl);
        if (!resposta.ok) throw new Error('Erro ao buscar livros.');

        const livros = await resposta.json();
        listaLivros.innerHTML = '';

        if (livros.length === 0) {
            listaLivros.innerHTML = '<li>Nenhum livro encontrado.</li>';
            return;
        }

        livros.forEach((livro) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${livro.Titulo}</strong> - ${livro.Autor} (${livro.Genero}, ${livro.AnoPublicacao})
                <button onclick="removerLivro(${livro.id})">Remover</button>
            `;
            listaLivros.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao listar livros:", error);
        listaLivros.innerHTML = '<li>Erro ao carregar livros.</li>';
    }
}

// Remover livro (sem verificação de login)
async function removerLivro(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmacao) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('✅ Livro deletado com sucesso!');
            listarLivros(); // Recarrega a lista após remoção
        } else {
            const erro = await response.json();
            alert(`❌ Erro ao deletar livro: ${erro.message || "Erro desconhecido."}`);
        }
    } catch (error) {
        console.error('Erro ao tentar deletar livro:', error);
        alert('❌ Erro ao tentar deletar livro.');
    }
}

// Botão de Sair
document.getElementById('btnLogout').addEventListener('click', function() {
    localStorage.clear();
    window.location.href = "index.html"; // Página de login
});

// Controle da sidebar
const sidebar = document.getElementById('sidebar');

sidebar.addEventListener('mouseenter', () => {
    sidebar.classList.remove('collapsed');
});

sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.add('collapsed');
});

// Carregar livros ao abrir
listarLivros();
