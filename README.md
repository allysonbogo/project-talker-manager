# Talker Manager
#### _by [Allyson Belli Bogo](https://www.linkedin.com/in/allysonbogo/)_

## :page_with_curl: Sobre

O projeto consolida a utilização das ferramentas Docker, MySQL, Node.js e Express.js para a criação de uma API RESTful com CRUD completo. Como desafio, foi criada uma API CRUD para cadastro de pessoas palestrantes, em que é possível ler, cadastrar, editar e deletar informações do banco de dados.

Este projeto utiliza o módulo fs do Node.js para visualização e manipulação do banco de dados, permitindo o gerenciamento das informações das pessoas palestrantes de forma dinâmica e eficiente. Para me desafiar e me preparar para os próximos projetos, também fiz a conexão com o banco de dados relacional MySQL, fazendo uso da biblioteca mysql/promise.


## :man_technologist: Habilidades desenvolvidas

* Docker
* Node.js
* Express.js
* MySQL
* Construção de uma API CRUD


## 🛠️ Ferramentas Utilizadas

* Docker
* Node.js
* Express.js
* MySQL


## ⚙️ Como Executar

> :warning: &nbsp; _É necessário ter o Docker instalado para executar este projeto_

<details>
  <summary> Passo a passo </summary>
  <br>

1. Clone o repositório em uma pasta de preferência

```
git clone git@github.com:allysonbogo/project-talker-manager.git
```

2. Para rodar o projeto é necessario executar o comando abaixo no diretório raiz do projeto. Isso fará com que os containers docker sejam orquestrados e a aplicação esteja disponível

```
docker-compose up -d
```
3. As dependências do projeto serão instaladas juntamente com o início do container. Após isso, no mesmo terminal em que o container foi orquestrado, digite os comandos abaixo para acessar o bash do container e iniciar o servidor

```
docker exec -it talker_manager bash
npm start
```
4. Para iniciar o servidor com live-reload, ao invés de <code>npm start</code> digite o comando abaixo 

```
npm run dev
```
5. Para visualização da interface da API podem ser utilizados o Thunder Client, Postman, Insomnia ou alguma outra ferramenta de sua preferência
</details>

## 📚 Documentação (endpoints)

### :woman_teacher: Login

<details>
  <summary> Rotas </summary>
  <br>

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Retorna um token de autenticação aleatório | `http://localhost:3001/login`

<details>
  <summary> A estrutura do body da requisição deverá seguir o padrão abaixo:  </summary>
  
```
{
  "email": "email@email.com",
  "password": "123456"
}
```
</details>

<details>
  <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
  
```
{
  "token": "7mqaVRXJSp886CGr"
}
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"email\" é obrigatório" }</code> ao tentar cadastrar um token sem o campo email; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O \"email\" deve ter o formato \"email@email.com\"" }</code> ao tentar cadastrar um token com um email inválido;<br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"password\" é obrigatório" }</code> ao tentar cadastrar um token sem o campo password; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O \"password\" deve ter pelo menos 6 caracteres" }</code> ao tentar cadastrar um token com uma senha com menos de 6 caracteres; <br>
</details>
</details>


### :microphone: Talker
<details>
  <summary> Rotas </summary>
  <br>

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma lista de pessoas palestrantes cadastradas | `http://localhost:3001/talker`

<details>
  <summary> A resposta da requisição é a seguinte com <code>status 200</code>:  </summary>
  
```
[
  {
    "name: "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": {
      "watchedAt": "23/10/2020",
      "rate": 5
    }
  },
  ...
]
```
</details>

<details>
  <summary> Caso não exista nenhuma pessoa palestrante cadastrada a requisição deve retornar o <code>status 200</code> e um array vazio. Exemplo: </summary>
  <code>[]</code>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma pessoa palestrante através do id | `http://localhost:3001/talker/:id`

<details>
  <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
  
```
{
  "name": "Henrique Albuquerque",
  "age": 62,
  "id": 1,
  "talk": {
    "watchedAt": "23/10/2020",
    "rate": 5
  }
}
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - É disparado o erro <code>404</code> <code>{ message: "Pessoa palestrante não encontrada" }</code>, caso a pessoa palestrante não esteja cadastrada no banco de dados; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o cadastro de uma pessoa palestrante | `http://localhost:3001/talker`

<details>
  <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

```
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```
</details>

<details>
  <summary> A resposta da requisição é a seguinte com <code>status 201</code>: </summary>
  
```
{
  "id": 1,
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token não encontrado" }</code>, caso o token de autenticação não seja encontrado; <br>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token inválido" }</code>, caso o token de autenticação seja inválido; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"name\" é obrigatório" }</code>, caso o campo name não seja passado ou esteja vazio; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O \"name\" deve ter pelo menos 3 caracteres" }</code>, caso o campo name não tenha pelo menos 3 caracteres; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"age\" é obrigatório" }</code>, caso o campo age não seja passado ou esteja vazio; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"age\" deve ser um número inteiro igual ou maior que 18" }</code>, caso o campo age não seja um número do tipo inteiro igual ou maior que 18; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"talk\" é obrigatório" }</code>, caso o campo talk não seja passado ou esteja vazio; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"watchedAt\" é obrigatório" }</code>, caso a chave watchedAt não seja informada ou esteja vazia; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"" }</code>, caso a chave watchedAt não respeite o formato <code>dd/mm/aaaa</code>; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"rate\" é obrigatório" }</code>, caso a chave rate não seja informada ou esteja vazia; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"rate\" deve ser um número inteiro entre 1 e 5" }</code>, caso a chave rate não seja um número inteiro entre 1 e 5; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `PUT` | Atualiza uma pessoa palestrante através do id | `http://localhost:3001/talker/:id`

<details>
  <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

```
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```
</details>

<details>
  <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
  
```
{
  "id": 1,
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 4
  }
}
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token não encontrado" }</code>, caso o token de autenticação não seja encontrado; <br>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token inválido" }</code>, caso o token de autenticação seja inválido; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"name\" é obrigatório" }</code>, caso o campo name não seja passado ou esteja vazio; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O \"name\" deve ter pelo menos 3 caracteres" }</code>, caso o campo name não tenha pelo menos 3 caracteres; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"age\" é obrigatório" }</code>, caso o campo age não seja passado ou esteja vazio; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"age\" deve ser um número inteiro igual ou maior que 18" }</code>, caso o campo age não seja um número do tipo inteiro igual ou maior que 18; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"talk\" é obrigatório" }</code>, caso o campo talk não seja passado ou esteja vazio; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"watchedAt\" é obrigatório" }</code>, caso a chave watchedAt não seja informada ou esteja vazia; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"" }</code>, caso a chave watchedAt não respeite o formato <code>dd/mm/aaaa</code>; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"rate\" é obrigatório" }</code>, caso a chave rate não seja informada ou esteja vazia; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"rate\" deve ser um número inteiro entre 1 e 5" }</code>, caso a chave rate não seja um número inteiro entre 1 e 5; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `DELETE` | Deleta uma pessoa palestrante através do id | `http://localhost:3001/talker/:id`

* A resposta da requisição é <code>204</code> e sem body em caso de sucesso

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token não encontrado" }</code>, caso o token de autenticação não seja encontrado; <br>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token inválido" }</code>, caso o token de autenticação seja inválido; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma lista de pessoas palestrantes de acordo com os termos de pesquisa | `http://localhost:3001/talker/search`

<details>
  <summary> A estrutura da pesquisa deverá seguir o padrão abaixo: </summary>

```
/talker/search?q=Danielle&rate=5&date=22/10/2019
```
</details>

<details>
  <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
  
```
[
  {
    "id": 1,
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5,
    },
  },
  ...
]
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token não encontrado" }</code>, caso o token de autenticação não seja encontrado; <br>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token inválido" }</code>, caso o token de autenticação seja inválido; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"rate\" deve ser um número inteiro entre 1 e 5" }</code>, caso o parâmetro rate não seja um número inteiro entre 1 e 5; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O parâmetro \"date\" deve ter o formato \"dd/mm/aaaa\"" }</code>, caso o parâmetro date não respeite o formato <code>dd/mm/aaaa</code>; <br>
</details>

<details>
  <summary> Caso os termos de pesquisa não sejam informados ou estejam vazios, o endpoint deverá retornar o <code>status 200</code> e um array com todas as pessoas palestrantes cadastradas: </summary>

  ```
  [
    {
      "id": 1,
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5,
      },
    },
    ...
  ]
```
</details>

<details>

<summary> Caso nenhuma pessoa palestrante satisfaça a busca, o endpoint deve retornar o <code>status 200</code> e um array vazio. Exemplo: </summary>
<code>[]</code>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `PATCH` | Atualiza a avaliação de uma pessoa palestrante através do id | `http://localhost:3001/talker/rate/:id`

<details>
  <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

```
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```
</details>

<details>
  <summary> A resposta da requisição é a seguinte com <code>status 200</code>: </summary>
  
```
{
  "id": 1,
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 4
  }
}
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token não encontrado" }</code>, caso o token de autenticação não seja encontrado; <br>
  - A rota retorna um erro <code>401</code> <code>{ "message": "Token inválido" }</code>, caso o token de autenticação seja inválido; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"rate\" é obrigatório" }</code>, caso o campo rate não seja informado ou esteja vazio; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "O campo \"rate\" deve ser um número inteiro entre 1 e 5" }</code>, caso o campo rate não seja um número inteiro entre 1 e 5; <br>
</details>

</details>
<br>


###### _README inspired by [Italo Amaral](https://www.linkedin.com/in/italo-rockenbach-594082132/)_

