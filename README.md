# Desafio FPass Marvel

Este projeto é parte do desafio Marvel para a empresa FPass. O objetivo deste desafio é desenvolver uma aplicação integrado com a API da Marvel.

## Tecnologias Utilizadas

- NestJS: Framework NodeJS.
- RabbitMQ: Mecanismo de mensageria para se comunicar com o micro-serviço de e-mail.
- Redis: Armazenamento in memory.
- Swagger: Ferramenta de documentação.

## Arquitetura

Utilizei boa parte dos conceitos do SOLID e Clean Architecture para desenvolver a arquitetura do projeto. O projeto é divido em micro-serviços que se comunicam através do RabbitMQ. As classes foram implementadas de forma abstrata respeitando o princípio de inversão de dependência. Os micro-serviços são:

- **Gateway**: Responsável por receber as requisições e encaminhar para o serviço correto.
- **E-mail**: Responsável por enviar e-mails.

## Pré-requisitos

Antes de executar o projeto, verifique se você tem os seguintes pré-requisitos instalados:

- Docker: https://docs.docker.com/get-docker/
- NodeJS: https://nodejs.org/en/download/

## Como Executar o Projeto

Siga as etapas abaixo para executar o projeto em sua máquina:

1. Faça um clone deste repositório.
2. Navegue até o diretório do projeto: `cd nome-do-projeto`.
3. Instale as dependências do projeto: `npm install` ou `yarn install`.
4. Garanta que não exista nenhum serviço rodando nas portas 3000, 5672 e 6379.
5. Remova possíveis containers que estejam rodando: `docker rm -f $(docker ps -aq)`.
6. Execute o projeto: `docker compose up`.
7. Abra o navegador e acesse `http://localhost:3000`.

## Observações

- Alguns dados sensíveis estão disponíveis no docker-compose.yml para facilitar a execução do projeto. Em um ambiente de produção, esses dados devem ser armazenados em variáveis de ambiente.
