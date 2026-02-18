# Contributing to Tche Satsuma Event Management System

Obrigado por considerar contribuir com o sistema de gerenciamento da Tche Satsuma! Este documento fornece diretrizes para contribuir com o projeto.

## Código de Conduta

### Nossos Valores
- Respeito mútuo e inclusão
- Colaboração construtiva
- Foco no bem da comunidade
- Transparência e honestidade

### Comportamento Esperado
- Use linguagem acolhedora e inclusiva
- Respeite pontos de vista e experiências diferentes
- Aceite críticas construtivas de forma graciosa
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros da comunidade

## Como Contribuir

### Reportando Bugs

Se você encontrar um bug, por favor crie uma issue incluindo:

1. **Título descritivo** - Um resumo claro do problema
2. **Descrição detalhada** - Explique o que aconteceu
3. **Passos para reproduzir** - Como recriar o problema
4. **Comportamento esperado** - O que deveria acontecer
5. **Screenshots** - Se aplicável
6. **Ambiente** - Navegador, SO, versão do Node.js, etc.

### Sugerindo Melhorias

Para sugerir uma nova funcionalidade:

1. Verifique se já não existe uma issue similar
2. Crie uma issue com tag `enhancement`
3. Explique claramente o caso de uso
4. Descreva a solução proposta
5. Considere alternativas possíveis

### Pull Requests

#### Antes de Criar um PR

1. **Crie uma issue** primeiro para discussão (exceto para correções pequenas)
2. **Fork o repositório** e crie uma branch a partir de `main`
3. **Configure o ambiente** de desenvolvimento local
4. **Escreva testes** para suas mudanças
5. **Siga os padrões** de código do projeto

#### Processo de PR

1. **Branch naming**: Use nomes descritivos
   - `feature/nome-da-funcionalidade`
   - `fix/descricao-do-bug`
   - `docs/descricao-da-documentacao`
   - `refactor/descricao-da-refatoracao`

2. **Commits**: Use mensagens claras e descritivas
   ```
   feat: adiciona filtro de membros por status
   fix: corrige cálculo de preço para crianças
   docs: atualiza README com instruções de deploy
   refactor: reorganiza estrutura de componentes
   test: adiciona testes para registration form
   ```

3. **Código**: 
   - Siga o guia de estilo do projeto
   - Execute `npm run lint` e `npm run format`
   - Execute `npm run type-check` (TypeScript)
   - Adicione/atualize testes conforme necessário
   - Atualize documentação se relevante

4. **Descrição do PR**:
   - Referência à issue relacionada
   - Descrição clara das mudanças
   - Screenshots/GIFs para mudanças de UI
   - Checklist de validação

#### Template de PR

```markdown
## Descrição
[Descreva as mudanças realizadas]

## Issue Relacionada
Closes #[número da issue]

## Tipo de Mudança
- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova funcionalidade (mudança que adiciona funcionalidade)
- [ ] Breaking change (mudança que causa incompatibilidade)
- [ ] Documentação

## Como Foi Testado?
[Descreva os testes realizados]

## Checklist
- [ ] Meu código segue o guia de estilo do projeto
- [ ] Realizei self-review do meu código
- [ ] Comentei código em áreas complexas
- [ ] Atualizei a documentação
- [ ] Minhas mudanças não geram novos warnings
- [ ] Adicionei testes que provam que minha correção/funcionalidade funciona
- [ ] Testes unitários novos e existentes passam localmente
- [ ] Mudanças dependentes foram merged

## Screenshots (se aplicável)
[Adicione screenshots aqui]
```

## Guia de Estilo

### JavaScript/TypeScript

- Use TypeScript para novos arquivos
- Prefira `const` sobre `let`, evite `var`
- Use arrow functions quando apropriado
- Prefira template literals sobre concatenação
- Use destructuring quando possível
- Sempre use ponto e vírgula
- Use single quotes para strings

### React/Next.js

- Use functional components com hooks
- Prefira named exports para components
- Use TypeScript interfaces para props
- Mantenha components pequenos e focados
- Use `use client` directive apenas quando necessário
- Colocate estilos com components quando fizer sentido

### CSS/Tailwind

- Prefira Tailwind utility classes
- Use componentes customizados para estilos repetidos
- Mantenha responsividade em mente (mobile-first)
- Use as cores do theme configurado

### Nomenclatura

- **Arquivos**: kebab-case (`member-list.tsx`)
- **Componentes**: PascalCase (`MemberList`)
- **Funções/variáveis**: camelCase (`getMemberById`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_MEMBERS`)
- **Interfaces/Types**: PascalCase com 'I' ou 'T' prefix opcional (`Member` ou `IMember`)

### Comentários

- Escreva comentários em português
- Documente funções complexas com JSDoc
- Explique o "porquê", não o "o que"
- Mantenha comentários atualizados

```typescript
/**
 * Calcula o preço total da inscrição considerando descontos
 * @param adults - Número de adultos
 * @param children - Número de crianças
 * @param earlyBird - Se aplica desconto early bird
 * @returns Valor total em reais
 */
function calculateRegistrationPrice(
  adults: number,
  children: number,
  earlyBird: boolean
): number {
  // implementação
}
```

## Estrutura de Diretórios

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Rotas autenticadas
│   ├── (public)/       # Rotas públicas
│   └── api/            # API routes
├── components/         # Componentes React
│   ├── common/        # Componentes reutilizáveis
│   ├── forms/         # Componentes de formulário
│   ├── layouts/       # Layouts
│   └── modules/       # Componentes específicos de módulo
├── lib/               # Configurações e utilitários
│   ├── auth/          # Lógica de autenticação
│   ├── db/            # Database client
│   └── validators/    # Schemas de validação
├── types/             # TypeScript types
├── utils/             # Funções auxiliares
└── styles/            # Estilos globais
```

## Testes

### Executando Testes

```bash
# Todos os testes
npm test

# Watch mode
npm run test:watch

# Com coverage
npm run test:coverage
```

### Escrevendo Testes

- Teste comportamento, não implementação
- Use nomes descritivos para testes
- Organize com describe/it
- Mock external dependencies
- Aim for >80% coverage em código crítico

```typescript
describe('MemberRegistrationForm', () => {
  it('deve validar campos obrigatórios', () => {
    // test implementation
  });

  it('deve calcular preço corretamente para crianças', () => {
    // test implementation
  });
});
```

## Segurança

### Reportando Vulnerabilidades

Se você descobrir uma vulnerabilidade de segurança:

1. **NÃO** abra uma issue pública
2. Envie um email para [security@tchesatsuma.org] (ou contato apropriado)
3. Inclua detalhes da vulnerabilidade
4. Aguarde resposta antes de disclosure público

### Práticas de Segurança

- Nunca commite secrets ou credentials
- Use variáveis de ambiente para dados sensíveis
- Valide e sanitize todas as entradas
- Use HTTPS em produção
- Mantenha dependências atualizadas

## Processo de Review

### Para Reviewers

- Seja construtivo e respeitoso
- Explique o raciocínio de suas sugestões
- Aprove quando estiver satisfeito
- Use labels apropriadas

### Para Contribuidores

- Responda a comentários prontamente
- Faça mudanças solicitadas
- Seja receptivo a feedback
- Pergunte se algo não estiver claro

## Ferramentas de Desenvolvimento

### Setup Recomendado

- **Editor**: VS Code
- **Extensões**:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - GitLens

### Scripts Úteis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Lint código
npm run format       # Formata código
npm run type-check   # Verifica tipos TypeScript
```

## Primeiros Passos

### Issues para Iniciantes

Procure por issues com as labels:
- `good first issue` - Ótimas para começar
- `help wanted` - Precisamos de ajuda
- `documentation` - Melhorias de documentação

### Contato

- **Issues**: Para bugs e features
- **Discussions**: Para perguntas e ideias
- **Email**: Para assuntos privados

## Reconhecimento

Contribuidores serão listados no README.md e terão nosso agradecimento eterno! 🙏

---

## Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Perguntas?

Se você tiver dúvidas sobre como contribuir, sinta-se à vontade para:
- Abrir uma discussion no GitHub
- Comentar em uma issue existente
- Entrar em contato com os maintainers

**Obrigado por contribuir! 🎉**
