<h1 align="center">Chaminé's</h1>

>Status: Em desenvolvimento...

<!-- <p align="center">
  <img src="sua-imagem-preview.png" alt="Chaminé's Preview" style="border-radius: 4px">
</p> -->


<p align="center">Conecte-se de forma mais pessoal com seus amigos no Chaminé's, um clone do app Threads!</p>

## Visão Geral
O Chaminé's é uma versão simplificada do app Threads, uma rede social que permite que os usuários compartilhem postagens de texto, fotos e vídeos com seus amigos mais próximos. Esta versão simplificada é construída com Next.js, TypeScript e Tailwind CSS e é uma ótima maneira de se conectar de forma mais pessoal com seus amigos.

## Funcionalidades
- Compartilhe postagens de texto com seus amigos mais próximos.
- Conecte-se de forma mais íntima com amigos e compartilhe momentos especiais.
- Uma alternativa divertida e personalizada para compartilhar momentos especiais com seus amigos mais próximos.

## Tecnologias
Este projeto utiliza as seguintes tecnologias:

- Next.js with Server Actions
- TypeScript
- Tailwind CSS
- Shadcn
- Clerk Authentication
- e muito mais

### Instalação
Clone o repositório e instale as dependências:

```bash
git clone https://github.com/gafanhotoalexandre/chamines.git
cd chamines
npm install
```

Copie o conteúdo de ``` .env.example ``` para ``` .env.local ``` e preencha as variáveis de ambiente:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

Por fim, execute:
```bash
npm run dev
```