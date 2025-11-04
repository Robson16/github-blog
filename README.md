<h1 align="center">
  GitHub Blog
</h1>

<p align="center">
  <img alt="Capa do projeto GitHub Blog" title="GitHub Blog" src="./cover.png" />
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

## 💻 Sobre o projeto

O **GitHub Blog** é uma aplicação desenvolvida como o terceiro desafio da formação **Ignite 2022 - Trilha ReactJS** da [Rocketseat](https://www.rocketseat.com.br/).

A proposta é criar um blog pessoal que consome a API do GitHub para exibir seu perfil, listar e filtrar as _issues_ de um repositório (que funcionam como posts) e renderizar a página de post completo com o conteúdo em Markdown.

O projeto reforça conceitos como comunicação com APIs REST, roteamento com React Router, manipulação de formulários e boas práticas de performance e acessibilidade.

## ✨ Funcionalidades

- **Exibição do Perfil do GitHub:** Mostra dados como avatar, nome, bio, nome de usuário, empresa, número de seguidores e link para o perfil.
- **Listagem de Posts:** As _issues_ de um repositório são listadas como posts na página inicial.
- **Busca de Posts:** Permite filtrar os posts por texto através de um campo de busca.
- **Página de Post:** Exibe o conteúdo completo de uma _issue_, com o corpo em Markdown renderizado como HTML.
- **Navegação:** Utiliza React Router para criar rotas para a Home (`/`) e para os Posts (`/post/:id`).
- **Responsividade:** O layout se adapta a diferentes tamanhos de tela.

## 🎨 Layout

O layout da aplicação foi desenvolvido com base no Figma disponibilizado pela Rocketseat.

<a href="https://www.figma.com/community/file/1138814951106121051" target="_blank">
  <img alt="Link para o Figma" src="https://img.shields.io/badge/Acessar%20Layout%20-Figma-%23F24E1E?style=for-the-badge&logo=figma">
</a>

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **React**
- **TypeScript**
- **Styled Components**
- **React Router DOM**
- **Axios**
- **React Markdown**
- **Date-fns**

## ▶️ Como executar

Siga os passos abaixo para rodar o projeto em seu ambiente local:

```bash
# 1. Clone este repositório
$ git clone https://github.com/Robson16/github-blog.git

# 2. Acesse a pasta do projeto
$ cd github-blog

# 3. Instale as dependências
$ npm install
# ou
$ yarn install

# 4. Inicie a aplicação
$ npm run dev
# ou
$ yarn dev

# A aplicação estará disponível em http://localhost:5173
```

> **Observação:** Para que a aplicação funcione corretamente, você precisará configurar as variáveis de ambiente com seu nome de usuário e o nome do repositório do GitHub. Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:
>
> ```
> VITE_GITHUB_USERNAME=seu-usuario
> VITE_GITHUB_REPONAME=seu-repositorio
> ```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

<p align="center">
  Feito com 💜 por <a href="https://github.com/Robson16/">Robson H. Rodrigues</a>
</p>
