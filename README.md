# BFF-backend-for-frontend


----------
{
    npm installed:

    npm init, // because i want to manually fill
    npm i express,//frameworks
    npm i cors,//
    npm i mongoose,//mongodb bank
    npm i nodemon -D,//devDependence
    npm i bcryptjs,//The password will be hashed
    npm i jsonwebtoken,// token generator
    npm i dotenv,// for deploy in heroku
    npm i swagger-ui-express// Swagger
}
------------
BFF paste pattern
------------
some changes on package.json:
"scripts": {
  "dev": "nodemon src/index",
  "start": "node src/index"
},

Português:

Este projeto tem como objetivo ser uma API (Application Programming Interface) Interface de programação de aplicações(backend) com todas as funcionalidades de um crud (create, read, update e delete). Dados salvos no mongodb atlas, senhas criptocrfadas e documentação no swagger.

English:

This project aims to be an API Application programming interface (backend) with all the functionality of a crud (create, read, update and delete). Data saved in Mongodb Atlas, encrypted passwords and documentation in swagger.


Atenção:

Para faser o teste ao criar um character, achar por id, atualiza, ou deletar. Precisamso primeiro fazer o login e copiamos o token gerado e vamos lá no create character(a gente está falando do thunder client) vamos no header e escrever authorization Http Headers no valor escrever: Bearer (colar o token aqui).
Tinhamos excluido antes os itens que lá já existiam. 
já o token ou id do character colocamos na parte de cima na rota
