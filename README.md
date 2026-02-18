# Tche Satsuma - Event Management System

Sistema de gerenciamento de membros e eventos anuais para a organização Tche Satsuma - Kagoshima RS.

## 📋 Sobre o Projeto

Sistema web desenvolvido para facilitar a gestão de membros e eventos anuais (almoço anual) de uma organização sem fins lucrativos de descendentes japoneses da Prefeitura de Kagoshima no Rio Grande do Sul, Brasil.

## ✨ Funcionalidades Principais

### Gerenciamento de Membros
- Cadastro e manutenção de membros
- Histórico de participação
- Gestão de relacionamentos familiares
- Preferências de comunicação (WhatsApp, Email, Correio)
- Categorização (Regular, VIP, Voluntário, Diretoria)

### Gerenciamento de Eventos
- Criação e planejamento de eventos anuais
- Gestão de reservas de local/restaurante
- Sistema de inscrições online
- Controle de capacidade e vagas
- Diferentes categorias de preços (adulto, criança, pacotes familiares)
- Gestão de voluntários e tarefas

### Comunicação Multi-Canal
- Envio de anúncios via WhatsApp
- Envio de emails personalizados
- Geração de materiais para envio por correio tradicional
- Templates de comunicação
- Agendamento de mensagens
- Tracking de entrega e visualização

### Gestão Financeira
- Controle de pagamentos e inscrições
- Registro de doações (dinheiro, comidas caseiras, outros)
- Tracking de doações para Kagoshima Brasil
- Controle de despesas do evento

### Relatórios
- Relatório financeiro detalhado pós-evento
- Relatório de presenças e participação
- Comparação com eventos anteriores
- Exportação em PDF e Excel
- Dashboards com visualizações

## 🛠️ Tecnologias

### Frontend
- **Framework**: Next.js 15 (React 18)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Formulários**: React Hook Form + Yup
- **Internacionalização**: i18next

### Backend (Planejado)
- **Runtime**: Node.js
- **Framework**: Next.js API Routes ou Express
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT

### Infraestrutura (Planejado)
- **Hosting**: Vercel (frontend)
- **Database**: Supabase ou Railway
- **Email**: SendGrid
- **WhatsApp**: Twilio WhatsApp API
- **Storage**: AWS S3 ou Cloudinary

## 📁 Estrutura do Projeto

```
tche-satsuma/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes React
│   ├── lib/             # Utilitários e configurações
│   ├── types/           # TypeScript types/interfaces
│   ├── utils/           # Funções auxiliares
│   └── styles/          # Estilos globais
├── public/              # Assets estáticos
├── DATABASE_SCHEMA.md   # Documentação do schema do banco
├── DEVELOPMENT_PROMPT.md # Documentação completa de desenvolvimento
└── README.md           # Este arquivo
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+ 
- npm 9+
- PostgreSQL 14+ (para desenvolvimento local)

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/uqueno/tche-satsuma.git
cd tche-satsuma
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute o servidor de desenvolvimento
```bash
npm run dev
```

5. Acesse http://localhost:3000

## 📚 Documentação

- **[DEVELOPMENT_PROMPT.md](./DEVELOPMENT_PROMPT.md)**: Documento completo com requisitos, arquitetura, roadmap e boas práticas
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)**: Schema completo do banco de dados com exemplos
- **[SECURITY_ADVISORIES.md](./SECURITY_ADVISORIES.md)**: Vulnerabilidades conhecidas e correções aplicadas

## 🗺️ Roadmap

### Fase 1: Foundation (MVP)
- [x] Estrutura inicial do projeto
- [x] Documentação completa
- [ ] Setup do banco de dados
- [ ] Sistema de autenticação
- [ ] Dashboard administrativo básico

### Fase 2: Gestão de Membros
- [ ] CRUD de membros
- [ ] Importação de planilhas
- [ ] Sistema de busca e filtros

### Fase 3: Gestão de Eventos
- [ ] Criação de eventos
- [ ] Sistema de inscrições
- [ ] Controle de pagamentos

### Fase 4: Comunicações
- [ ] Integração com email
- [ ] Integração com WhatsApp
- [ ] Templates de mensagens

### Fase 5: Relatórios
- [ ] Relatórios financeiros
- [ ] Relatórios de participação
- [ ] Dashboards e analytics

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar coverage
npm run test:coverage
```

## 🎨 Padrões de Código

```bash
# Lint
npm run lint

# Formatar código
npm run format

# Type check
npm run type-check
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Equipe

**Tche Satsuma - Kagoshima RS**
- Organização sem fins lucrativos
- Comunidade de descendentes japoneses no Rio Grande do Sul

## 📞 Contato

Para mais informações sobre o projeto ou a organização, entre em contato através do repositório no GitHub.

## 🙏 Agradecimentos

- À comunidade Tche Satsuma pela confiança no projeto
- Aos voluntários que contribuem com seu tempo e expertise
- À comunidade open-source pelas ferramentas utilizadas

---

**Status do Projeto**: 🚧 Em Desenvolvimento

**Versão Atual**: 1.0.0-alpha

**Última Atualização**: Fevereiro 2026
