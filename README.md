# Teste Prático para Desenvolvedor Full Stack Kronoos

Este projeto foi desenvolvido como parte de um desafio prático para uma posição de desenvolvedor full stack na Kronoos. O objetivo principal foi criar uma aplicação capaz de lidar com o upload de planilhas CSV, validação de dados no backend, e exibição na interface frontend.

## Tecnologias Utilizadas

- **Frontend**:
  - Desenvolvido utilizando **React** com **Next.js** e **TypeScript**.
  - Deploy realizado na plataforma **Vercel**.
  - Link do Deploy: https://teste-vaga-fullstack.vercel.app/

- **Backend**:
  - Implementado com **Node.js** e **Nest.js** utilizando **TypeScript**.
  - Deploy realizado na plataforma **Render**.
  - Link do Deploy: https://teste-vaga-fullstack.onrender.com/

- **Banco de Dados**:
  - Utilização do **MongoDB Atlas** para armazenamento dos dados.

## Funcionalidades Implementadas

- **Upload de Planilhas**:
  - Interface para upload de arquivos CSV, com validação de formato e tamanho.
  - Processamento assíncrono no backend para manipulação e armazenamento dos dados.

- **Visualização Detalhada**:
  - Tabela na interface frontend para exibição das planilhas já enviadas.
  - Detalhamento das informações de cada planilha ao clicar em "Ver Detalhes".

- **Validações**:
  - Validação de CPF/CNPJ, valores monetários e datas para garantir que os dados estejam corretos.
  - Formatação e apresentação clara dos dados para melhor compreensão.

## Automação e CI/CD

- Implementação de **CI/CD automatizado** utilizando **Jenkins** (consultar o arquivo *Jenkinsfile*).
- Utilização de **Dockerfile** para containerização das aplicações frontend e backend.
