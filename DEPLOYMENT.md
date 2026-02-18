# Deployment Guide - Tche Satsuma Event Management System

## Overview

Este guia cobre o deployment da aplicação em ambiente de produção usando as tecnologias recomendadas.

## Arquitetura de Deployment

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Vercel        │◄────►│   Supabase       │◄────►│   AWS S3        │
│   (Frontend +   │      │   (PostgreSQL)   │      │   (File Storage)│
│    API Routes)  │      └──────────────────┘      └─────────────────┘
└─────────────────┘               │
        │                         │
        │                         │
        ▼                         ▼
┌─────────────────┐      ┌──────────────────┐
│   SendGrid      │      │   Twilio         │
│   (Email)       │      │   (WhatsApp)     │
└─────────────────┘      └──────────────────┘
```

## Pré-requisitos

### Contas Necessárias
1. ✅ Conta no GitHub (para código-fonte)
2. ✅ Conta no Vercel (para hosting)
3. ✅ Conta no Supabase (para banco de dados)
4. ✅ Conta no SendGrid (para email)
5. ✅ Conta no AWS ou Cloudinary (para arquivos)
6. ⚠️ Conta no Twilio (opcional, para WhatsApp)

### Ferramentas Locais
- Node.js 18+
- Git
- PostgreSQL client (para backups)

## Passo 1: Setup do Banco de Dados (Supabase)

### 1.1 Criar Projeto

1. Acesse https://supabase.com
2. Clique em "New Project"
3. Preencha:
   - Project name: `tche-satsuma-production`
   - Database password: [Gere uma senha forte]
   - Region: `South America (São Paulo)`
4. Aguarde criação (~2 minutos)

### 1.2 Executar Schema

1. Acesse o SQL Editor no Supabase
2. Copie todo o conteúdo de `DATABASE_SCHEMA.md`
3. Execute os comandos SQL em ordem:
   - Criar tabelas
   - Criar índices
   - Criar triggers
   - Criar views
4. Verifique se todas as tabelas foram criadas

### 1.3 Obter Connection String

1. Vá em Settings > Database
2. Copie a `Connection string` em modo `Transaction`
3. Substitua `[YOUR-PASSWORD]` pela senha do banco
4. Guarde para uso nas variáveis de ambiente

**Exemplo:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

### 1.4 Configurar Backups Automáticos

Supabase faz backups automáticos diários. Verifique em:
- Settings > Database > Backups
- Retention: 7 dias (plano free) ou 30 dias (plano pago)

## Passo 2: Setup do File Storage (AWS S3)

### 2.1 Criar Bucket

1. Acesse AWS Console > S3
2. Clique em "Create bucket"
3. Configure:
   - Bucket name: `tche-satsuma-uploads`
   - Region: `sa-east-1` (São Paulo)
   - Block all public access: ❌ (desmarcar)
4. Criar bucket

### 2.2 Configurar CORS

Em Permissions > CORS, adicione:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://seu-dominio.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### 2.3 Criar IAM User

1. IAM > Users > Add user
2. User name: `tche-satsuma-app`
3. Access type: Programmatic access
4. Attach policy: `AmazonS3FullAccess` (ou criar policy customizada)
5. Salvar Access Key ID e Secret Access Key

**Alternativa:** Use Cloudinary para simplicidade
- Crie conta em https://cloudinary.com
- Obtenha Cloud name, API Key e API Secret

## Passo 3: Setup de Email (SendGrid)

### 3.1 Criar Conta

1. Acesse https://sendgrid.com
2. Crie conta gratuita (100 emails/dia)
3. Verifique email

### 3.2 Criar API Key

1. Settings > API Keys
2. Create API Key
3. Name: `tche-satsuma-production`
4. Permissions: Full Access
5. Copie e guarde a API Key

### 3.3 Configurar Sender Identity

1. Settings > Sender Authentication
2. Single Sender Verification
3. Adicione: `noreply@tchesatsuma.org`
4. Verifique o email recebido

### 3.4 Configurar Domain (Opcional)

Para emails profissionais:
1. Settings > Sender Authentication > Domain Authentication
2. Adicione seu domínio
3. Configure DNS records conforme instruções

## Passo 4: Setup de WhatsApp (Twilio - Opcional)

### 4.1 Criar Conta

1. Acesse https://twilio.com
2. Crie conta e verifique telefone
3. Acesse Console

### 4.2 Ativar WhatsApp Sandbox

1. Messaging > Try it out > Send a WhatsApp message
2. Siga instruções para conectar seu WhatsApp
3. Teste envio de mensagem

### 4.3 Obter Credenciais

- Account SID: Console > Account Info
- Auth Token: Console > Account Info
- WhatsApp Number: `whatsapp:+14155238886` (sandbox)

**Nota:** Para produção, você precisará:
- Request WhatsApp Business API access
- Aprovar uso empresarial
- Configurar templates

## Passo 5: Deploy no Vercel

### 5.1 Conectar GitHub

1. Acesse https://vercel.com
2. Login com GitHub
3. Import Repository
4. Selecione `uqueno/tche-satsuma`

### 5.2 Configurar Variáveis de Ambiente

No Vercel Dashboard > Settings > Environment Variables, adicione:

```bash
# Database
DATABASE_URL=postgresql://postgres:[senha]@db.xxx.supabase.co:5432/postgres

# Auth
JWT_SECRET=[gere_string_aleatoria_64_caracteres]
JWT_EXPIRES_IN=7d

# Email
EMAIL_FROM=noreply@tchesatsuma.org
SENDGRID_API_KEY=SG.xxxxxxxxxx

# WhatsApp (opcional)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# File Storage - AWS S3
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxx
AWS_REGION=sa-east-1
AWS_S3_BUCKET=tche-satsuma-uploads

# OU File Storage - Cloudinary
CLOUDINARY_CLOUD_NAME=xxxxxxxxxx
CLOUDINARY_API_KEY=xxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxx

# Application
NEXT_PUBLIC_APP_URL=https://tchesatsuma.vercel.app
NEXT_PUBLIC_API_URL=https://tchesatsuma.vercel.app/api

# Feature Flags
NEXT_PUBLIC_ENABLE_WHATSAPP=true
NEXT_PUBLIC_ENABLE_PAYMENTS=false

# Environment
NODE_ENV=production
```

### 5.3 Deploy

1. Click "Deploy"
2. Aguarde build (~2-3 minutos)
3. Acesse a URL gerada (ex: `tchesatsuma.vercel.app`)

### 5.4 Configurar Domínio Customizado

1. Domains > Add Domain
2. Digite seu domínio: `tchesatsuma.org`
3. Configure DNS conforme instruções:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Aguarde propagação DNS (~24h)

## Passo 6: Configurações Pós-Deploy

### 6.1 Criar Usuário Admin

Execute no SQL Editor do Supabase:

```sql
-- Insira um membro admin
INSERT INTO members (membership_number, first_name, last_name, email, membership_status, member_type)
VALUES ('ADMIN01', 'Admin', 'Sistema', 'admin@tchesatsuma.org', 'active', 'board');

-- Insira usuário admin (use bcrypt para hash da senha em produção)
INSERT INTO users (email, password_hash, role, first_name, last_name, member_id)
VALUES (
  'admin@tchesatsuma.org',
  'hash_da_senha_aqui', -- Use bcrypt para gerar
  'super_admin',
  'Admin',
  'Sistema',
  (SELECT id FROM members WHERE membership_number = 'ADMIN01')
);
```

### 6.2 Importar Dados Existentes

1. Acesse a aplicação
2. Login como admin
3. Vá em Membros > Importar
4. Faça upload da planilha Excel/CSV
5. Revise e confirme importação

### 6.3 Configurar Templates de Comunicação

Crie templates padrão:
- Convite para evento
- Confirmação de inscrição
- Lembrete de pagamento
- Confirmação de pagamento
- Lembrete de evento

### 6.4 Testar Funcionalidades

Checklist de testes:
- [ ] Login/Logout
- [ ] Cadastro de membro
- [ ] Criação de evento
- [ ] Inscrição em evento
- [ ] Envio de email
- [ ] Upload de arquivo
- [ ] Geração de relatório

## Passo 7: Monitoring e Manutenção

### 7.1 Configurar Monitoring (Vercel)

Vercel oferece monitoring automático:
- Analytics: Vercel Analytics (built-in)
- Logs: Vercel Logs
- Errors: Vercel Error Tracking

### 7.2 Configurar Alertas

No Supabase:
1. Settings > Alerts
2. Configure alertas para:
   - Database CPU > 80%
   - Database Memory > 80%
   - Storage > 80%

### 7.3 Backup Strategy

**Automático (Supabase):**
- Backups diários automáticos
- Retention de 7-30 dias

**Manual (Recomendado antes de grandes mudanças):**
```bash
# Backup do banco
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Backup de arquivos (se usando S3)
aws s3 sync s3://tche-satsuma-uploads ./backup-files/
```

### 7.4 Atualização de Dependências

Mensal:
```bash
npm outdated
npm update
npm audit
npm audit fix
```

## Passo 8: Security Checklist

- [ ] HTTPS habilitado (automático no Vercel)
- [ ] Variáveis de ambiente não commitadas
- [ ] Senha do banco forte (16+ caracteres)
- [ ] JWT secret aleatório (64+ caracteres)
- [ ] API Keys rotacionadas periodicamente
- [ ] CORS configurado corretamente
- [ ] Rate limiting habilitado
- [ ] SQL injection prevenido (use ORM)
- [ ] XSS prevenido (React automático)
- [ ] CSRF tokens implementados
- [ ] Validação de inputs no backend
- [ ] Logs não expõem dados sensíveis

## Troubleshooting

### Erro: "Failed to connect to database"
- Verifique DATABASE_URL
- Confirme IP whitelisting no Supabase (0.0.0.0/0 para permitir todos)

### Erro: "Failed to send email"
- Verifique SENDGRID_API_KEY
- Confirme sender verification
- Verifique quota diária

### Erro: "Failed to upload file"
- Verifique AWS credentials
- Confirme bucket permissions
- Verifique CORS configuration

### Site muito lento
- Verifique Vercel Analytics
- Otimize queries do banco (adicione índices)
- Implemente caching
- Otimize imagens (use Next.js Image)

## Custos Estimados (Mensal)

| Serviço | Plano | Custo |
|---------|-------|-------|
| Vercel | Pro | $20/mês ou Hobby (free) |
| Supabase | Free/Pro | $0-25/mês |
| SendGrid | Free/Essentials | $0-20/mês |
| AWS S3 | Pay-as-you-go | ~$5/mês |
| Twilio WhatsApp | Pay-as-you-go | ~$10/mês |
| **Total** | | **$0-80/mês** |

**Nota:** É possível começar com $0/mês usando planos free e escalar conforme necessário.

## Rollback Plan

Se algo der errado:

1. **Vercel:** 
   - Deployments > Previous Deployment > Promote to Production

2. **Database:**
   - Supabase > Backups > Restore

3. **Código:**
   ```bash
   git revert HEAD
   git push origin main
   ```

## Suporte

- **Vercel:** https://vercel.com/support
- **Supabase:** https://supabase.com/support
- **SendGrid:** https://support.sendgrid.com
- **AWS:** https://aws.amazon.com/support

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Next Review:** May 2026
