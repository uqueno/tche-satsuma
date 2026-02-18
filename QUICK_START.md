# Quick Start Guide - Tche Satsuma Event Management System

## Para Desenvolvedores

### Setup Inicial (5 minutos)

1. **Clone e Instale**
```bash
git clone https://github.com/uqueno/tche-satsuma.git
cd tche-satsuma
npm install
```

2. **Configure Ambiente**
```bash
cp .env.example .env
# Edite .env com suas configurações
```

3. **Execute**
```bash
npm run dev
# Acesse http://localhost:3000
```

### Estrutura do Projeto

```
tche-satsuma/
├── DEVELOPMENT_PROMPT.md  ← Documentação completa do projeto
├── DATABASE_SCHEMA.md      ← Schema do banco de dados
├── CONTRIBUTING.md         ← Guia de contribuição
├── README.md               ← Visão geral do projeto
│
├── src/
│   ├── app/               ← Next.js App Router (páginas e rotas)
│   ├── components/        ← Componentes React reutilizáveis
│   ├── lib/              ← Configurações e integrações
│   ├── types/            ← TypeScript types/interfaces
│   └── utils/            ← Funções auxiliares
│
├── package.json           ← Dependências do projeto
├── tsconfig.json         ← Configuração TypeScript
└── tailwind.config.js    ← Configuração Tailwind CSS
```

### Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Verifica código com ESLint |
| `npm run format` | Formata código com Prettier |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm test` | Executa testes |

### Próximos Passos

1. **Leia a documentação**: Comece com `DEVELOPMENT_PROMPT.md`
2. **Entenda o schema**: Veja `DATABASE_SCHEMA.md`
3. **Configure o banco**: Instale PostgreSQL e crie o banco
4. **Implemente funcionalidades**: Siga o roadmap no README.md

## Para Gerentes de Projeto

### Fases de Implementação

**Fase 1: Foundation (2 semanas)**
- Setup do banco de dados
- Sistema de autenticação
- Dashboard administrativo básico

**Fase 2: Gestão de Membros (2 semanas)**
- CRUD de membros
- Importação de planilhas
- Sistema de busca

**Fase 3: Gestão de Eventos (3 semanas)**
- Criação de eventos
- Sistema de inscrições
- Controle de pagamentos

**Fase 4: Comunicações (2 semanas)**
- Integração com email
- Integração com WhatsApp
- Templates de mensagens

**Fase 5: Relatórios (2 semanas)**
- Relatórios financeiros
- Relatórios de participação
- Dashboards

### Priorização de Funcionalidades

#### Must Have (MVP)
1. ✅ Cadastro de membros
2. ✅ Criação de eventos
3. ✅ Sistema de inscrições
4. ✅ Notificações por email
5. ✅ Relatório básico

#### Should Have
- WhatsApp integração
- Dashboard analytics
- Exportação PDF
- Templates customizáveis

#### Could Have
- App mobile
- Pagamento online
- Galeria de fotos
- Sistema de feedback

## Para Usuários Finais

### Módulos Principais

#### 1. Gerenciamento de Membros
**O que faz**: Mantém cadastro atualizado de todos os membros da comunidade

**Funcionalidades**:
- Cadastro de novos membros
- Atualização de informações de contato
- Histórico de participação em eventos
- Preferências de comunicação

#### 2. Gerenciamento de Eventos
**O que faz**: Organiza e coordena o almoço anual e outros eventos

**Funcionalidades**:
- Criação do evento com data, local e preços
- Sistema de inscrições online
- Controle de vagas e lista de espera
- Gestão de voluntários

#### 3. Comunicações
**O que faz**: Envia anúncios e avisos para os membros

**Funcionalidades**:
- Envio de emails em massa
- Mensagens via WhatsApp
- Geração de cartas para correio
- Confirmações automáticas

#### 4. Finanças e Relatórios
**O que faz**: Controla pagamentos, doações e gera relatórios

**Funcionalidades**:
- Controle de pagamentos de inscrições
- Registro de doações
- Relatório financeiro do evento
- Relatório de participação

### Perguntas Frequentes

**Q: Como faço para cadastrar um novo membro?**
A: Acesse "Membros" > "Novo Membro" e preencha o formulário

**Q: Como envio convites para o evento?**
A: Acesse "Comunicações" > "Nova Mensagem" e selecione os destinatários

**Q: Como gero o relatório pós-evento?**
A: Acesse "Eventos" > [Seu Evento] > "Relatórios"

**Q: Posso importar membros de uma planilha Excel?**
A: Sim! Acesse "Membros" > "Importar" e faça upload do arquivo

## Recursos de Aprendizado

### Documentação Técnica
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Tutoriais Recomendados
- [Next.js Tutorial](https://nextjs.org/learn)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)

### Comunidade
- GitHub Issues: Reporte bugs e sugira features
- GitHub Discussions: Tire dúvidas e compartilhe ideias

## Glossário

| Termo | Significado |
|-------|-------------|
| **Membro** | Pessoa cadastrada na organização |
| **VIP** | Membro com status especial (ex: fundadores, diretoria) |
| **Inscrição** | Registro de participação em um evento |
| **Voluntário** | Membro que auxilia na organização do evento |
| **Doação** | Contribuição financeira ou em comida para o evento |
| **Early Bird** | Desconto para inscrições antecipadas |
| **No-show** | Pessoa inscrita que não compareceu |

## Suporte

- **Documentação**: Consulte os arquivos .md neste repositório
- **Issues**: Reporte problemas no GitHub
- **Email**: [Adicionar contato quando disponível]

## Checklist de Deploy

### Pré-Deploy
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Testes passando
- [ ] Build de produção funcionando
- [ ] Banco de dados criado e migrations executadas
- [ ] Backups configurados

### Deploy
- [ ] Deploy do banco de dados
- [ ] Deploy da aplicação
- [ ] Configuração de domínio
- [ ] Certificado SSL instalado
- [ ] Monitoring configurado

### Pós-Deploy
- [ ] Smoke tests executados
- [ ] Dados de exemplo carregados (se necessário)
- [ ] Documentação de usuário distribuída
- [ ] Treinamento de usuários realizado
- [ ] Suporte on-call disponível

---

**Precisa de ajuda?** Consulte a documentação completa em `DEVELOPMENT_PROMPT.md`
