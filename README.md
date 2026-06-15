# A Saga da São Paulo Railway — Estudo Filológico-Histórico (1867)

Este projeto é uma plataforma digital requintada e interativa de leitura (E-book) dedicada ao estudo filológico-histórico do pioneirismo ferroviário no Brasil. A obra reconstitui em detalhes o projeto da **São Paulo Railway**, engenhada por Daniel Fox com seu inovador sistema de planos inclinados funiculares na Serra do Mar, as negociações do Barão de Mauá e a atmosfera histórica da Vila de Paranapiacaba.

---

## 🎨 Principais Recursos Funcionais e Visuais

- **Plataforma de Leitura Otimizada (E-Reader):**
  - Navegação fluida entre os capítulos.
  - Ajuste dinâmico de tamanho de fonte e contraste adaptado para leitura confortável.
  - Layout totalmente responsivo com tipografia serifada de alta legibilidade.
- **Simulador de Fatos Históricos (Quiz):**
  - Questionário interativo integrado para testar o domínio cognitivo do leitor sobre os fatos reais de 1867.
  - Sistema de pontuação acadêmica com ranks personalizados ao final.
- **Sistema Comercial Integrado com Simulação Pix:**
  - Bloqueio automático de leitura a partir do Capítulo 3 (Seções comerciais).
  - Simulação realista em tempo real de pagamento por Pix (com geração real do código Copia e Cola via CRC16 CCITT).
  - Tela de validação sincronizada acompanhando as etapas de compensação bancária e geração de chave.
- **Persistência Segura em Nuvem (Firebase Firestore):**
  - Integração com banco de dados em tempo real para armazenamento de chaves de licença autorizadas.
  - **Sistema de Controle de Vínculo de Dispositivos (Anti-Compartilhamento):** Cada chave possui limite de uso em até 2 dispositivos simultâneos para evitar pirataria.
- **Painel Administrativo do Autor (Evandro Felix Marcondes):**
  - Acesso protegido por senha administrativa.
  - Gerenciamento completo de chaves: geração de novos códigos aleatórios, criação de senhas personalizadas, exclusão permanente de licenças e liberação instantânea de vagas/sessões de aparelhos associados com 1 clique.
- **Modo Sandbox / Teste de Vendas:**
  - Uma área interativa que permite bloquear novamente o livro localmente no navegador, permitindo repetições completas do fluxo de venda por Pix e uso de códigos do absoluto zero.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18+ com TypeScript e Vite.
- **Estilização:** Tailwind CSS (com classes utilitárias e design responsivo).
- **Animações:** Framer Motion (para transações de página elegantes e fades suaves).
- **Ícones:** Lucide React (padronizado de acordo com as diretrizes do projeto).
- **Banco de Dados & Regras:** Firebase Firestore com regras de segurança (`firestore.rules`) otimizadas para leitura livre de chaves e escrita restrita sob verificação.

---

## 🚀 Como Executar o Projeto Localmente

### 1. Clonar o Repositório e Instalar Dependências

```bash
# Navegue até a pasta do projeto
cd spr-railway-ebook

# Instale os pacotes necessários do npm
npm install
```

### 2. Executar o Servidor de Desenvolvimento

O servidor será iniciado na porta `3000` (porta de escuta padrão e obrigatória):

```bash
npm run dev
```

Abra o seu navegador e acesse: [http://localhost:3000](http://localhost:3000)

### 3. Compilar para Produção (Build)

Para gerar os arquivos estáticos prontos para deploy em servidores de produção:

```bash
npm run build
```

Os arquivos compilados serão exportados para a pasta `/dist`.

---

## 📦 Como Atualizar o Seu GitHub e Disparar o Deploy

Se a sua aplicação está conectada ao painel de integração contínua (CI/CD) do GitHub, **toda modificação requer um commit com uma mensagem explicativa de código** para disparar com sucesso os gatilhos de compilação automática. Sem um novo commit de atualização, a versão hospedada online não será atualizada.

Você pode usar a seguinte mensagem oficial de atualização técnica abaixo para realizar o seu commit no Git:

```bash
# 1. Adicionar as alterações do projeto
git add .

# 2. Realizar o commit com a mensagem de atualização oficial
git commit -m "feat: implementar persistência segura de chaves no Firestore, painel administrativo do autor e área de sandbox de vendas"

# 3. Enviar as alterações para o seu repositório no GitHub
git push origin main
```

---

*Estudo desenvolvido sob a Série Preservação e Memória Nacional • São Paulo Railway, 1867.*
