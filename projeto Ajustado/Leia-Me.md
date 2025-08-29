# login no heroku
heroku login

# dentro da pasta do projeto
git init
git add .
git commit -m "deploy teste API"

# criar app no heroku
heroku create nome-do-seu-app --> Aqui bota o nome do APP de voces

# configurar postgres (se precisar de banco)
heroku addons:create heroku-postgresql:hobby-dev

# enviar para o heroku
git push heroku master
