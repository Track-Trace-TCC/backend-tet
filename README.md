# Backend de Rastreamento e Gestão de Entregas

Este é o backend do sistema de rastreamento e gestão de entregas, desenvolvido em [NestJS](https://nestjs.com/) e [TypeScript](https://www.typescriptlang.org/). Ele gerencia operações de CRUD para motoristas, administradores, pacotes, clientes e rotas. O sistema utiliza comunicação HTTP e WebSocket, e possui integração com PostgreSQL. O backend é completamente dockerizado.

## Pré-requisitos

Antes de iniciar o projeto, você precisa configurar algumas variáveis de ambiente que são essenciais para o funcionamento do sistema.

### Variáveis de Ambiente Necessárias

- `DATABASE_URL_DOCKER`: URL para o banco de dados quando o serviço está em execução dentro de um contêiner Docker.
- `DATABASE_URL_LOCAL`: URL para o banco de dados quando o serviço está em execução localmente.
- `GOOGLE_MAPS_API_KEY`: Chave de API para o Google Maps.
- `JWT_SECRET_DRIVER`: Chave secreta para geração de tokens JWT para motoristas.
- `JWT_SECRET_ADMIN`: Chave secreta para geração de tokens JWT para administradores.
- `JWT_SECRET`: Chave secreta geral para geração de tokens JWT.

### Como Configurar as Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione as seguintes linhas ao arquivo `.env` com os valores apropriados:

    ```plaintext
    DATABASE_URL_DOCKER="URL TO DATABASE IN DOCKER"
    DATABASE_URL_LOCAL="URL TO DATABASE IN LOCAL"
    GOOGLE_MAPS_API_KEY="API KEY TO GOOGLE MAPS"
    JWT_SECRET_DRIVER="YOUR SECRET"
    JWT_SECRET_ADMIN="YOUR SECRET"
    JWT_SECRET="YOUR SECRET"
    ```

3. Substitua os valores de exemplo com os dados reais do seu ambiente.

## Instalação

Siga os passos abaixo para configurar e executar o backend localmente.

1. Clone o repositório:

    ```bash
    git clone https://github.com/Track-Trace-TCC/backend.git
    cd backend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```
3. Se você está usando Docker, inicie o serviço com:

    ```bash
    docker-compose up
    ```

## Funcionalidades

- CRUD de motoristas, administradores, pacotes, clientes e rotas.
- Comunicação em tempo real via WebSocket.
- Integração com Google Maps para cálculos de rotas e localização.
- Autenticação baseada em JWT para diferentes tipos de usuários.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview)

## Contribuição

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adicione uma nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

- **Nome**: Vinícius
- **Email**: viniciusataides@gmail.com
- **GitHub**: [github.com/Track-Trace-TCC](https://github.com/Track-Trace-TCC)

---

**Nota**: Certifique-se de substituir os valores de exemplo e os contatos com as informações reais do seu projeto.
