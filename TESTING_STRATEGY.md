# Testing Strategy - Tche Satsuma Event Management System

## Overview

Este documento descreve a estratégia de testes para garantir qualidade, confiabilidade e segurança do sistema.

## Testing Pyramid

```
        /\
       /  \
      / E2E \
     /______\
    /        \
   /Integration\
  /____________\
 /              \
/  Unit Tests    \
/________________\
```

**Distribuição Recomendada:**
- 70% Unit Tests (rápidos, isolados)
- 20% Integration Tests (APIs, database)
- 10% E2E Tests (fluxos completos)

## 1. Unit Tests

### 1.1 Ferramentas

- **Framework**: Jest
- **Utilities**: React Testing Library
- **Coverage**: 80%+ para código crítico

### 1.2 O Que Testar

#### Componentes React
```typescript
// exemplo: src/components/MemberCard.test.tsx
describe('MemberCard', () => {
  it('deve renderizar nome do membro corretamente', () => {
    const member = { firstName: 'Maria', lastName: 'Tanaka' };
    render(<MemberCard member={member} />);
    expect(screen.getByText('Maria Tanaka')).toBeInTheDocument();
  });

  it('deve exibir badge VIP quando membro é VIP', () => {
    const member = { firstName: 'João', isVIP: true };
    render(<MemberCard member={member} />);
    expect(screen.getByText('VIP')).toBeInTheDocument();
  });
});
```

#### Funções Utilitárias
```typescript
// exemplo: src/utils/calculations.test.ts
describe('calculateRegistrationPrice', () => {
  it('deve calcular preço corretamente para adultos', () => {
    const price = calculateRegistrationPrice(2, 0, false);
    expect(price).toBe(160); // 2 * 80
  });

  it('deve aplicar desconto early bird', () => {
    const price = calculateRegistrationPrice(2, 0, true);
    expect(price).toBe(140); // (2 * 80) - 20
  });

  it('deve calcular preço de crianças corretamente', () => {
    const price = calculateRegistrationPrice(1, 2, false);
    expect(price).toBe(160); // (1 * 80) + (2 * 40)
  });
});
```

#### Validadores
```typescript
// exemplo: src/lib/validators.test.ts
describe('Email Validator', () => {
  it('deve aceitar email válido', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('deve rejeitar email inválido', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
  });
});
```

### 1.3 Coverage Goals

| Tipo | Target | Crítico |
|------|--------|---------|
| Statements | 80% | 90%+ |
| Branches | 75% | 85%+ |
| Functions | 80% | 90%+ |
| Lines | 80% | 90%+ |

### 1.4 Comandos

```bash
# Executar todos os testes
npm test

# Watch mode (desenvolvimento)
npm run test:watch

# Coverage report
npm run test:coverage

# Teste específico
npm test -- MemberCard

# Update snapshots
npm test -- -u
```

## 2. Integration Tests

### 2.1 Ferramentas

- **API Testing**: Supertest ou MSW (Mock Service Worker)
- **Database**: In-memory PostgreSQL ou test database

### 2.2 O Que Testar

#### API Endpoints
```typescript
// exemplo: src/app/api/members/route.test.ts
describe('POST /api/members', () => {
  it('deve criar membro com dados válidos', async () => {
    const response = await request(app)
      .post('/api/members')
      .send({
        firstName: 'Pedro',
        lastName: 'Yamamoto',
        email: 'pedro@example.com',
        membershipStatus: 'active'
      })
      .expect(201);

    expect(response.body).toMatchObject({
      firstName: 'Pedro',
      lastName: 'Yamamoto'
    });
  });

  it('deve retornar erro 400 com dados inválidos', async () => {
    const response = await request(app)
      .post('/api/members')
      .send({ firstName: 'Pedro' }) // missing required fields
      .expect(400);

    expect(response.body.error).toBeDefined();
  });
});
```

#### Database Operations
```typescript
// exemplo: tests/integration/database.test.ts
describe('Member Database Operations', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  it('deve criar e recuperar membro', async () => {
    const created = await createMember({
      firstName: 'Ana',
      lastName: 'Sato'
    });

    const retrieved = await getMemberById(created.id);
    expect(retrieved.firstName).toBe('Ana');
  });

  it('deve atualizar membro existente', async () => {
    const member = await createMember({ firstName: 'João' });
    await updateMember(member.id, { firstName: 'João Silva' });
    
    const updated = await getMemberById(member.id);
    expect(updated.firstName).toBe('João Silva');
  });
});
```

## 3. E2E Tests

### 3.1 Ferramentas

- **Framework**: Playwright ou Cypress
- **Environment**: Staging/Test environment

### 3.2 O Que Testar

#### Fluxos Críticos
```typescript
// exemplo: e2e/event-registration.spec.ts
test('Fluxo completo de inscrição em evento', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name=email]', 'user@example.com');
  await page.fill('[name=password]', 'password');
  await page.click('button[type=submit]');

  // Navegar para evento
  await page.goto('/events');
  await page.click('text=Almoço Anual 2026');

  // Fazer inscrição
  await page.click('button:has-text("Inscrever-se")');
  await page.fill('[name=numberOfAdults]', '2');
  await page.fill('[name=numberOfChildren]', '1');
  await page.click('button:has-text("Confirmar Inscrição")');

  // Verificar confirmação
  await expect(page.locator('text=Inscrição confirmada')).toBeVisible();
});
```

#### User Journeys
```typescript
// exemplo: e2e/member-management.spec.ts
test('Admin cadastra novo membro', async ({ page }) => {
  // Login como admin
  await loginAsAdmin(page);

  // Ir para cadastro
  await page.click('text=Membros');
  await page.click('text=Novo Membro');

  // Preencher formulário
  await page.fill('[name=firstName]', 'Maria');
  await page.fill('[name=lastName]', 'Tanaka');
  await page.fill('[name=email]', 'maria@example.com');
  await page.selectOption('[name=membershipStatus]', 'active');

  // Submeter
  await page.click('button[type=submit]');

  // Verificar sucesso
  await expect(page.locator('text=Membro cadastrado com sucesso')).toBeVisible();
  
  // Verificar na lista
  await page.goto('/members');
  await expect(page.locator('text=Maria Tanaka')).toBeVisible();
});
```

### 3.3 Cenários Prioritários

1. **Autenticação**
   - Login com sucesso
   - Login com credenciais inválidas
   - Logout
   - Redirecionamento para login quando não autenticado

2. **Gestão de Membros**
   - Cadastro de novo membro
   - Edição de membro existente
   - Busca e filtros
   - Importação de planilha

3. **Gestão de Eventos**
   - Criação de evento
   - Inscrição em evento
   - Cancelamento de inscrição
   - Visualização de lista de inscritos

4. **Comunicações**
   - Envio de email para grupo
   - Agendamento de mensagem
   - Visualização de status de entrega

5. **Relatórios**
   - Geração de relatório financeiro
   - Geração de relatório de participação
   - Exportação para PDF

## 4. Performance Tests

### 4.1 Ferramentas

- **Load Testing**: k6 ou Artillery
- **Monitoring**: Lighthouse, WebPageTest

### 4.2 Métricas Alvo

| Métrica | Target | Crítico |
|---------|--------|---------|
| First Contentful Paint | <1.5s | <2s |
| Largest Contentful Paint | <2.5s | <4s |
| Time to Interactive | <3.5s | <5s |
| Total Blocking Time | <200ms | <300ms |
| Cumulative Layout Shift | <0.1 | <0.25 |

### 4.3 Testes de Carga

```javascript
// exemplo: tests/load/api-members.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50 },  // Ramp up
    { duration: '5m', target: 50 },  // Stay at 50
    { duration: '2m', target: 100 }, // Spike
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições < 500ms
    http_req_failed: ['rate<0.01'],   // < 1% de erros
  },
};

export default function () {
  const res = http.get('https://api.tchesatsuma.org/members');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

## 5. Security Tests

### 5.1 Testes Automáticos

#### Dependências
```bash
# Auditoria de dependências
npm audit

# Fix vulnerabilities
npm audit fix

# Detailed report
npm audit --json > audit-report.json
```

#### OWASP ZAP
```bash
# Scan de segurança automático
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t https://tchesatsuma.org
```

### 5.2 Checklist Manual

- [ ] SQL Injection (testar inputs maliciosos)
- [ ] XSS (testar scripts em inputs)
- [ ] CSRF (verificar tokens)
- [ ] Authentication bypass
- [ ] Authorization bypass
- [ ] Sensitive data exposure
- [ ] Rate limiting
- [ ] File upload vulnerabilities

### 5.3 Testes de Penetração

**Frequência**: Semestral ou após mudanças significativas

**Escopo**:
- Autenticação e autorização
- APIs públicas e privadas
- Manipulação de dados
- File uploads
- Comunicações

## 6. Accessibility Tests

### 6.1 Ferramentas

- **axe-core**: Testes automáticos
- **WAVE**: Avaliação manual
- **Lighthouse**: Audit de acessibilidade

### 6.2 Testes

```typescript
// exemplo: tests/accessibility/homepage.test.ts
import { expect, test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('Homepage deve ser acessível', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  
  const results = await checkA11y(page);
  expect(results.violations).toHaveLength(0);
});
```

### 6.3 Checklist WCAG 2.1 AA

- [ ] Contraste de cores adequado (4.5:1)
- [ ] Navegação por teclado
- [ ] Labels em formulários
- [ ] Alt text em imagens
- [ ] Hierarquia de headings
- [ ] Focus visível
- [ ] Mensagens de erro descritivas
- [ ] ARIA labels apropriados

## 7. Test Data Management

### 7.1 Fixtures

```typescript
// tests/fixtures/members.ts
export const memberFixtures = {
  activeMember: {
    firstName: 'Maria',
    lastName: 'Tanaka',
    email: 'maria@example.com',
    membershipStatus: 'active',
    memberType: 'regular',
  },
  vipMember: {
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao@example.com',
    membershipStatus: 'active',
    memberType: 'vip',
    isVIP: true,
  },
};
```

### 7.2 Database Seeding

```typescript
// tests/seed.ts
export async function seedDatabase() {
  await prisma.member.createMany({
    data: [memberFixtures.activeMember, memberFixtures.vipMember],
  });
  
  await prisma.event.create({
    data: eventFixtures.upcomingEvent,
  });
}
```

### 7.3 Cleanup

```typescript
// tests/setup.ts
afterEach(async () => {
  // Limpar database após cada teste
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.member.deleteMany();
});
```

## 8. CI/CD Integration

### 8.1 GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

### 8.2 Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## 9. Monitoring e Alertas

### 9.1 Production Monitoring

**Ferramentas**:
- Vercel Analytics
- Sentry (error tracking)
- Uptime monitoring

**Métricas**:
- Error rate
- Response time
- Uptime
- User satisfaction

### 9.2 Alertas

Configurar alertas para:
- Error rate > 1%
- Response time > 2s (95th percentile)
- Downtime > 1 minuto
- Failed deployments

## 10. Test Documentation

### 10.1 Test Cases

Documentar em formato:
```markdown
## TC-001: Login com Sucesso

**Pré-condições**: Usuário existe no sistema
**Passos**:
1. Acessar /login
2. Preencher email válido
3. Preencher senha correta
4. Clicar em "Entrar"

**Resultado Esperado**: 
- Redirecionamento para dashboard
- Mensagem de boas-vindas
- Menu de navegação visível

**Status**: ✅ Passed
**Última Execução**: 2026-02-18
```

### 10.2 Bug Reports

Template:
```markdown
## Bug: [Título curto]

**Severidade**: Critical/High/Medium/Low
**Prioridade**: P0/P1/P2/P3

**Descrição**: 
[O que aconteceu]

**Passos para Reproduzir**:
1. ...
2. ...

**Comportamento Esperado**:
[O que deveria acontecer]

**Comportamento Atual**:
[O que realmente acontece]

**Screenshots/Videos**:
[Se aplicável]

**Ambiente**:
- Browser: Chrome 120
- OS: Windows 11
- Version: 1.0.0
```

## 11. Best Practices

### 11.1 Writing Good Tests

✅ **DO**:
- Use nomes descritivos
- Teste um comportamento por teste
- Mantenha testes independentes
- Use arrange-act-assert pattern
- Mock external dependencies

❌ **DON'T**:
- Não teste implementação, teste comportamento
- Não use números mágicos
- Não crie dependências entre testes
- Não ignore testes falhando

### 11.2 Test Maintenance

- Revise testes regularmente
- Remove testes obsoletos
- Atualize fixtures
- Mantenha coverage alto
- Documente testes complexos

---

**Versão**: 1.0  
**Última Atualização**: Fevereiro 2026  
**Responsável**: Equipe de Desenvolvimento
