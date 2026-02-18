# Security and Privacy Policy - Tche Satsuma Event Management System

## Overview

Este documento descreve as práticas de segurança e privacidade implementadas no sistema de gerenciamento da Tche Satsuma, em conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil.

## 1. Coleta de Dados

### 1.1 Dados Coletados

#### Membros
- **Dados de Identificação**: Nome completo, número de associado
- **Dados de Contato**: Email, telefone, endereço postal
- **Dados Pessoais**: Data de nascimento, foto (opcional)
- **Preferências**: Método de comunicação preferido
- **Dados de Relacionamento**: Vínculos familiares com outros membros

#### Eventos
- **Dados de Inscrição**: Número de participantes, idades das crianças
- **Dados Alimentares**: Restrições e preferências dietéticas
- **Dados Financeiros**: Valores pagos, método de pagamento
- **Dados de Presença**: Confirmação de comparecimento

#### Voluntários
- **Dados de Participação**: Funções, disponibilidade, tarefas

### 1.2 Finalidade da Coleta

Os dados são coletados exclusivamente para:
- Gestão de membros da organização
- Organização de eventos anuais
- Comunicação com membros sobre eventos e atividades
- Geração de relatórios para a diretoria
- Cumprimento de obrigações legais e estatutárias

### 1.3 Base Legal (LGPD)

- **Consentimento**: Obtido no momento do cadastro
- **Execução de Contrato**: Inscrição em eventos
- **Legítimo Interesse**: Gestão da organização sem fins lucrativos
- **Cumprimento de Obrigação Legal**: Relatórios fiscais

## 2. Segurança dos Dados

### 2.1 Medidas Técnicas

#### Criptografia
- **Em Trânsito**: TLS 1.3 para todas as comunicações HTTPS
- **Em Repouso**: Criptografia de dados sensíveis no banco de dados
- **Senhas**: Hashing com bcrypt (cost factor 12+)
- **Tokens**: JWT com assinatura HMAC-SHA256

#### Controle de Acesso
- **Autenticação**: Obrigatória para acesso ao sistema
- **Autorização**: Baseada em roles (RBAC)
- **Níveis de Acesso**:
  - **Super Admin**: Acesso total ao sistema
  - **Coordenador de Eventos**: Gestão de eventos e membros
  - **Tesoureiro**: Acesso a dados financeiros
  - **Voluntário**: Acesso limitado às suas tarefas
  - **Membro**: Acesso apenas aos próprios dados

#### Proteção de Infraestrutura
- **Firewall**: Configurado para bloquear acessos não autorizados
- **DDoS Protection**: Fornecida pelo Vercel
- **Rate Limiting**: Prevenção de ataques de força bruta
- **SQL Injection Prevention**: Uso de prepared statements e ORM
- **XSS Prevention**: Sanitização de inputs, CSP headers
- **CSRF Protection**: Tokens CSRF em todas as requisições de mudança de estado

#### Backups
- **Frequência**: Diários (automáticos)
- **Retenção**: 30 dias
- **Criptografia**: Backups criptografados
- **Testes**: Restauração testada mensalmente
- **Localização**: Múltiplas regiões geográficas

### 2.2 Medidas Organizacionais

#### Políticas
- **Acesso Mínimo**: Princípio do menor privilégio
- **Segregação de Funções**: Separação de responsabilidades
- **Auditoria**: Logs de todas as ações sensíveis
- **Revisão de Acessos**: Trimestral

#### Treinamento
- **Equipe Técnica**: Treinamento em segurança da informação
- **Voluntários**: Orientação sobre manuseio de dados
- **Usuários**: Guia de boas práticas

#### Resposta a Incidentes
1. **Detecção**: Monitoring 24/7
2. **Contenção**: Isolamento do problema
3. **Investigação**: Análise de causa raiz
4. **Remediação**: Correção e prevenção
5. **Notificação**: Comunicação aos afetados (se necessário)

## 3. Privacidade dos Dados

### 3.1 Direitos dos Titulares (LGPD)

Os membros têm os seguintes direitos:

#### Acesso
- Solicitar cópia de todos os dados pessoais armazenados
- **Como**: Enviar email para privacidade@tchesatsuma.org
- **Prazo**: Até 15 dias

#### Correção
- Atualizar dados incompletos, inexatos ou desatualizados
- **Como**: Login no sistema e atualização do perfil
- **Alternativa**: Solicitar à administração

#### Eliminação (Direito ao Esquecimento)
- Solicitar exclusão dos dados pessoais
- **Como**: Enviar email para privacidade@tchesatsuma.org
- **Prazo**: Até 15 dias
- **Observação**: Alguns dados podem ser mantidos por obrigação legal

#### Portabilidade
- Receber dados em formato estruturado e interoperável
- **Formato**: JSON ou CSV
- **Como**: Solicitar via email

#### Revogação de Consentimento
- Retirar consentimento a qualquer momento
- **Impacto**: Pode impedir participação em eventos futuros

#### Oposição
- Opor-se ao tratamento de dados em certas situações
- **Como**: Enviar email justificando a oposição

### 3.2 Compartilhamento de Dados

#### Não Compartilhamos com Terceiros
Os dados dos membros **NÃO** são:
- Vendidos a terceiros
- Compartilhados com parceiros comerciais
- Usados para marketing externo

#### Compartilhamento Limitado
Dados podem ser compartilhados apenas com:
- **Prestadores de Serviços**: Apenas dados necessários
  - Serviço de email (SendGrid)
  - Serviço de WhatsApp (Twilio)
  - Hospedagem (Vercel, Supabase, AWS)
- **Autoridades**: Mediante ordem judicial

#### Contratos de Processamento
Todos os prestadores de serviços assinam DPA (Data Processing Agreement) garantindo:
- Tratamento adequado dos dados
- Medidas de segurança apropriadas
- Não utilização para fins próprios

### 3.3 Retenção de Dados

| Tipo de Dado | Período de Retenção | Justificativa |
|--------------|---------------------|---------------|
| Dados de membros ativos | Enquanto ativo | Gestão da organização |
| Dados de membros inativos | 2 anos | Histórico e possível reativação |
| Dados de eventos | 10 anos | Relatórios históricos |
| Dados financeiros | 10 anos | Obrigações fiscais |
| Logs de auditoria | 2 anos | Segurança e compliance |
| Dados de ex-membros | 1 ano | Transição |

#### Exclusão Automática
Após o período de retenção:
- Soft delete: Marcação como excluído
- Hard delete: Remoção permanente após 30 dias
- Anonimização: Para dados estatísticos

### 3.4 Transferência Internacional

**Não há transferência internacional** regular de dados. 

Se necessário no futuro:
- Consentimento explícito será solicitado
- Garantias adequadas serão implementadas
- Conformidade com LGPD será mantida

## 4. Cookies e Rastreamento

### 4.1 Cookies Utilizados

#### Cookies Essenciais (Necessários)
- **auth_token**: Token de autenticação JWT
- **session_id**: Identificação da sessão
- **Duração**: 7 dias
- **Finalidade**: Manter usuário logado

#### Cookies de Preferência
- **language**: Idioma preferido (pt-BR/ja)
- **theme**: Tema da interface
- **Duração**: 1 ano

#### Cookies Analíticos (Com Consentimento)
- **Vercel Analytics**: Análise de uso do site
- **Finalidade**: Melhorar experiência do usuário
- **Anonimizado**: Sim

### 4.2 Gerenciamento de Cookies

Usuários podem:
- Aceitar todos os cookies
- Aceitar apenas essenciais
- Gerenciar preferências nas configurações
- Excluir cookies via navegador

## 5. Notificação de Violação

### 5.1 Procedimento

Em caso de violação de dados:

1. **Notificação à ANPD**: Até 72 horas da ciência
2. **Notificação aos Titulares**: Sem demora indevida
3. **Conteúdo da Notificação**:
   - Natureza da violação
   - Dados afetados
   - Medidas tomadas
   - Riscos potenciais
   - Medidas de mitigação
   - Contato para mais informações

### 5.2 Registro de Violações

Todas as violações são registradas com:
- Data e hora da descoberta
- Descrição do incidente
- Dados afetados
- Ações tomadas
- Lições aprendidas

## 6. Encarregado de Dados (DPO)

### Informações de Contato

**Nome**: [A definir]  
**Email**: privacidade@tchesatsuma.org  
**Telefone**: [A definir]

### Responsabilidades
- Orientar sobre conformidade com LGPD
- Atuar como canal de comunicação com ANPD
- Responder solicitações de titulares
- Realizar análises de impacto
- Treinar equipe sobre privacidade

## 7. Menores de Idade

### Política Específica

- **Coleta**: Apenas com consentimento dos pais/responsáveis
- **Dados**: Mínimos necessários (nome, idade, restrições alimentares)
- **Uso**: Exclusivo para participação em eventos
- **Retenção**: Mesmos períodos, mas com revisão anual

### Responsabilidade dos Pais

Pais/responsáveis são responsáveis por:
- Fornecer dados corretos
- Manter dados atualizados
- Revisar e aprovar uso dos dados

## 8. Atualizações desta Política

### Notificação de Mudanças

- **Versão Atual**: 1.0
- **Data**: Fevereiro 2026
- **Mudanças Significativas**: Notificados por email
- **Mudanças Menores**: Atualizadas sem notificação
- **Histórico**: Disponível no rodapé desta página

### Aceitação

Ao continuar usando o sistema após mudanças, você aceita a nova política.

## 9. Conformidade Legal

### Legislação Aplicável

Este sistema está em conformidade com:
- **LGPD** (Lei 13.709/2018) - Brasil
- **Marco Civil da Internet** (Lei 12.965/2014)
- **Código de Defesa do Consumidor** (Lei 8.078/1990)

### Jurisdição

- **Foro**: Rio Grande do Sul, Brasil
- **Lei Aplicável**: Lei brasileira

## 10. Contato

### Dúvidas sobre Privacidade e Segurança

**Email**: privacidade@tchesatsuma.org  
**Assunto**: Privacidade e Proteção de Dados

### Exercício de Direitos

Para exercer seus direitos (acesso, correção, exclusão, etc.):
1. Envie email para privacidade@tchesatsuma.org
2. Identifique-se (nome, número de associado, email cadastrado)
3. Especifique o direito que deseja exercer
4. Aguarde resposta em até 15 dias

### Reclamações

Se não satisfeito com nossa resposta:
- **ANPD**: Autoridade Nacional de Proteção de Dados
- **Site**: https://www.gov.br/anpd
- **Procon**: Órgão de defesa do consumidor local

## 11. Certificações e Auditorias

### Planejado
- [ ] Auditoria de segurança anual
- [ ] Penetration testing semestral
- [ ] Certificação ISO 27001 (futuro)
- [ ] Relatório de impacto à privacidade (RIPD)

### Gestão de Vulnerabilidades

**Monitoramento Contínuo**:
- Verificação automática de dependências via `npm audit`
- GitHub Dependabot para atualizações de segurança
- CodeQL para análise estática de código
- Revisão mensal de advisories de segurança

**Processo de Atualização**:
- Vulnerabilidades críticas: Correção em 24 horas
- Vulnerabilidades altas: Correção em 1 semana
- Vulnerabilidades médias: Correção em 1 mês
- Vulnerabilidades baixas: Próximo ciclo de atualização

**Histórico**: Ver [SECURITY_ADVISORIES.md](./SECURITY_ADVISORIES.md) para lista completa de vulnerabilidades corrigidas

## 12. Transparência

### Relatório de Transparência

Publicaremos anualmente:
- Número de solicitações de dados
- Tipos de solicitações recebidas
- Tempo médio de resposta
- Incidentes de segurança (se houver)
- Melhorias implementadas

---

## Declaração de Compromisso

**Tche Satsuma - Kagoshima RS** compromete-se a:
- Tratar dados pessoais com respeito e segurança
- Cumprir todas as obrigações legais
- Manter transparência sobre o uso de dados
- Proteger a privacidade dos membros
- Melhorar continuamente as práticas de segurança

---

**Versão**: 1.0  
**Última Atualização**: Fevereiro 2026  
**Próxima Revisão**: Agosto 2026

**Aprovado por**: [Diretoria da Tche Satsuma]

---

## Histórico de Versões

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0 | Fev 2026 | Versão inicial da política |
