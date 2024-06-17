
## Configuração

1. Clone este repositório:
    ```sh
    git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd NOME-DO-REPOSITORIO
    ```

3. Instale as dependências:
    ```sh
    npm install
    ```

4. Configure o banco de dados no arquivo `.env`:
    ```env
    DATABASE_URL=postgres://username:password@localhost:5432/database
    JWT_SECRET=your_jwt_secret
    ```

5. Sincronize o banco de dados:
    ```sh
    npx sequelize-cli db:migrate
    ```

6. Inicie o servidor:
    ```sh
    npm start
    ```

## Rotas

### Registro de Usuário

- **URL**: `/register`
- **Método**: `POST`
- **Body** (JSON):
    ```json
    {
      "nome": "John Doe",
      "email": "john@example.com",
      "senha": "senha123",
      "senhaRepetida": "senha123"
    }
    ```

### Autenticação de Usuário

- **URL**: `/auth`
- **Método**: `POST`
- **Body** (JSON):
    ```json
    {
      "email": "john@example.com",
      "senha": "senha123"
    }
    ```

### Logout de Usuário

- **URL**: `/logout`
- **Método**: `POST`
- **Headers**:
    - `user-id`: `<user-id-obtido-na-autenticacao>`

### Atualização de Dados do Usuário

- **URL**: `/update`
- **Método**: `PUT`
- **Headers**:
    - `user-id`: `<user-id-obtido-na-autenticacao>`
- **Body** (JSON):
    ```json
    {
      "nome": "Novo Nome",
      "senha": "novaSenha123"
    }
    ```

### Rotas Protegidas

- **URL**: `/`
- **Método**: `GET`
- **Headers**:
    - `user-id`: `<user-id-obtido-na-autenticacao>`

- **URL**: `/home`
- **Método**: `GET`
- **Headers**:
    - `user-id`: `<user-id-obtido-na-autenticacao>`

## Contato

Se tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato.

---

Feito por Gabriel Galli
