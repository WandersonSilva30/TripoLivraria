console.log("Script carregado");

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM totalmente carregado");

    document.getElementById('livrosform').addEventListener('submit', function (e) {
        e.preventDefault();

        const livros = {
            Titulo: document.getElementById('Titulo').value,
            Autor: document.getElementById('Autor').value,
            Genero: document.getElementById('Genero').value,
            AnoPublicacao: document.getElementById('AnoPublicacao').value,
            Descricao: document.getElementById('Descricao').value
        };

        console.log("Enviando:", livros);

        fetch("http://localhost:5000/livros", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livros),
        })
        .then(response => {
            console.log("Status da resposta:", response.status);
            return response.json();
        })
        .then(data => {
            console.log('Livro cadastrado:', data);
            alert('Livro cadastrado com sucesso!');
            this.reset();
        })
        .catch(error => {
            console.error('Erro ao cadastrar livro:', error);
            alert('Erro ao cadastrar livro.');
        });
    });
});
