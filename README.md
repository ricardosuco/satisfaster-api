# Satisfaster 🍹

## Descrição 📄

Satisfaster é uma API em Adonis 5 que permite realizar operações CRUD (Create, Read, Update, Delete) de drinks. As rotas correspondentes permitem adicionar novos drinks, remover drinks existentes, atualizar informações de drinks específicos e listar todos os drinks disponíveis. A estrutura da API é projetada para oferecer um gerenciamento eficiente e flexível dos dados relacionados aos drinks, facilitando a interação com a aplicação.
A configuração do banco de dados considera o uso do banco Postgres, caso deseje utilizar com outro é necessário que seja alterado.
Os drinks existentes foram obtidos a partir de um dump do [The cocktail DB](https://www.thecocktaildb.com).

## Funcionalidades ✨

- **Listagem de drinks:** <br>
  Visualização de todos os drinks, permitindo também filtro por categoria, nome, ou ID.
- **Adição de novos drinks:** <br>
  Novos drinks podem ser adicionados, caso deseje complementar a lista de drinks existentes.
- **Edição/Atualização de drinks:** <br>
  Drinks já existentes podem ser editados caso seja necessário.
- **Remoção de drinks:** <br>
  Remoção de drinks da lista.

## Tecnologias Utilizadas 🚀

- <img src="https://skillicons.dev/icons?i=typescript"> **TypeScript**
- <img src="https://skillicons.dev/icons?i=adonis"> **Adonis 5**
- <img src="https://skillicons.dev/icons?i=postgres"> **Postgres**

## Como Iniciar 💻

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/ricardosuco/satisfaster-api.git
   ```

2. **Instale as Dependências:**
   ```bash
   cd satisfaster-api
   npm install
   ```
3. **Adicionar variaveis de ambiente** <br>
   Adicione as variaveis de ambiente do projeto partir do .env.example

4. **Rode as migrations:**

   ```bash
   node ace migration:run
   ```
5. **Rode os seeders:**

   ```bash
   node ace db:seed
   ```

6. **Execute o Projeto:**

   ```bash
   npm run dev
   ```

7. **Acesse a partir do Insomnia ou Postman:**<br>
   O servidor ficará disponível em [http://localhost:3333](http://localhost:3333). A partir do insomnia, postman ou software similar, será possível consumir a API, com o auxilio da [documentação](https://satisfaster-api.onrender.com/docs).
