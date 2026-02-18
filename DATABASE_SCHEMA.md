# Database Schema for Tche Satsuma Event Management System

## Overview
This document defines the PostgreSQL database schema for the Tche Satsuma Members and Annual Lunch Event Management System.

## Schema Design

### Members Table
```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_number VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  postal_address TEXT,
  date_of_birth DATE,
  photo_url VARCHAR(500),
  membership_status VARCHAR(20) NOT NULL CHECK (membership_status IN ('active', 'inactive', 'honorary')),
  member_type VARCHAR(20) NOT NULL CHECK (member_type IN ('regular', 'vip', 'volunteer', 'board')),
  communication_preference VARCHAR(20) NOT NULL DEFAULT 'email' CHECK (communication_preference IN ('whatsapp', 'email', 'post', 'all')),
  is_vip BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR email IS NULL)
);

CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_membership_number ON members(membership_number);
CREATE INDEX idx_members_status ON members(membership_status);
```

### Family Relationships Table
```sql
CREATE TABLE family_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  related_member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  relationship_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(member_id, related_member_id)
);
```

### Venues Table
```sql
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  address TEXT NOT NULL,
  contact_person VARCHAR(100),
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  capacity INTEGER NOT NULL,
  deposit_required DECIMAL(10, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Events Table
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_open_date TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_close_date TIMESTAMP WITH TIME ZONE NOT NULL,
  venue_id UUID REFERENCES venues(id),
  capacity INTEGER NOT NULL,
  adult_price DECIMAL(10, 2) NOT NULL,
  child_price DECIMAL(10, 2) NOT NULL,
  child_age_limit INTEGER DEFAULT 12,
  family_package_price DECIMAL(10, 2),
  early_bird_discount DECIMAL(10, 2),
  early_bird_deadline TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'closed', 'completed', 'cancelled')),
  venue_reservation_status VARCHAR(20) CHECK (venue_reservation_status IN ('pending', 'confirmed', 'cancelled')),
  venue_deposit_paid BOOLEAN DEFAULT FALSE,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
```

### Event Registrations Table
```sql
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  number_of_adults INTEGER NOT NULL DEFAULT 1,
  number_of_children INTEGER NOT NULL DEFAULT 0,
  children_ages INTEGER[],
  dietary_restrictions TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  paid_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'completed')),
  payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'transfer', 'card')),
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  confirmed BOOLEAN DEFAULT FALSE,
  attended BOOLEAN,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, member_id)
);

CREATE INDEX idx_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_registrations_member ON event_registrations(member_id);
CREATE INDEX idx_registrations_payment_status ON event_registrations(payment_status);
```

### Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES event_registrations(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('cash', 'transfer', 'card')),
  transaction_id VARCHAR(100),
  receipt_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_registration ON payments(registration_id);
```

### Donations Table
```sql
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  donor_id UUID REFERENCES members(id) ON DELETE SET NULL,
  donor_name VARCHAR(200) NOT NULL,
  donation_type VARCHAR(20) NOT NULL CHECK (donation_type IN ('money', 'food', 'other')),
  amount DECIMAL(10, 2),
  description TEXT NOT NULL,
  estimated_value DECIMAL(10, 2) NOT NULL,
  received_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  destination_fund VARCHAR(30) CHECK (destination_fund IN ('general', 'kagoshima-brazil', 'charity')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_donations_event ON donations(event_id);
CREATE INDEX idx_donations_type ON donations(donation_type);
```

### Volunteers Table
```sql
CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  role VARCHAR(100) NOT NULL,
  availability TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(member_id, event_id, role)
);

CREATE INDEX idx_volunteers_event ON volunteers(event_id);
CREATE INDEX idx_volunteers_member ON volunteers(member_id);
```

### Volunteer Tasks Table
```sql
CREATE TABLE volunteer_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  due_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_volunteer ON volunteer_tasks(volunteer_id);
CREATE INDEX idx_tasks_status ON volunteer_tasks(status);
```

### Communications Table
```sql
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  subject VARCHAR(300) NOT NULL,
  body TEXT NOT NULL,
  channel VARCHAR(20) NOT NULL CHECK (channel IN ('email', 'whatsapp', 'post')),
  template_id UUID,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  sent_date TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_communications_event ON communications(event_id);
CREATE INDEX idx_communications_status ON communications(status);
```

### Communication Recipients Table
```sql
CREATE TABLE communication_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  communication_id UUID NOT NULL REFERENCES communications(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comm_recipients_communication ON communication_recipients(communication_id);
CREATE INDEX idx_comm_recipients_member ON communication_recipients(member_id);
CREATE INDEX idx_comm_recipients_status ON communication_recipients(status);
```

### Communication Templates Table
```sql
CREATE TABLE communication_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  subject VARCHAR(300) NOT NULL,
  body TEXT NOT NULL,
  channel VARCHAR(20) NOT NULL CHECK (channel IN ('email', 'whatsapp', 'post')),
  category VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Users Table (Authentication)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL CHECK (role IN ('super_admin', 'event_coordinator', 'treasurer', 'volunteer', 'member')),
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### Audit Log Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_table ON audit_logs(table_name);
CREATE INDEX idx_audit_created ON audit_logs(created_at);
```

## Triggers for Updated At

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at column
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON event_registrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_volunteers_updated_at BEFORE UPDATE ON volunteers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON volunteer_tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_communications_updated_at BEFORE UPDATE ON communications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON communication_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Views for Reporting

### Event Summary View
```sql
CREATE VIEW event_summary AS
SELECT 
  e.id,
  e.name,
  e.event_date,
  e.status,
  v.name as venue_name,
  COUNT(DISTINCT er.id) as total_registrations,
  SUM(er.number_of_adults) as total_adults,
  SUM(er.number_of_children) as total_children,
  SUM(er.total_amount) as total_revenue,
  SUM(er.paid_amount) as total_paid,
  COUNT(CASE WHEN er.payment_status = 'completed' THEN 1 END) as paid_registrations,
  COUNT(CASE WHEN er.attended = TRUE THEN 1 END) as total_attended
FROM events e
LEFT JOIN venues v ON e.venue_id = v.id
LEFT JOIN event_registrations er ON e.id = er.event_id
GROUP BY e.id, v.name;
```

### Financial Summary View
```sql
CREATE VIEW financial_summary AS
SELECT 
  e.id as event_id,
  e.name as event_name,
  COALESCE(SUM(er.total_amount), 0) as registration_revenue,
  COALESCE(SUM(CASE WHEN d.donation_type = 'money' THEN d.amount ELSE 0 END), 0) as money_donations,
  COALESCE(SUM(CASE WHEN d.donation_type = 'food' THEN d.estimated_value ELSE 0 END), 0) as food_donations,
  COALESCE(SUM(CASE WHEN d.donation_type = 'other' THEN d.estimated_value ELSE 0 END), 0) as other_donations,
  COALESCE(SUM(d.estimated_value), 0) as total_donations,
  COALESCE(SUM(er.total_amount), 0) + COALESCE(SUM(d.estimated_value), 0) as total_revenue
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id
LEFT JOIN donations d ON e.id = d.event_id
GROUP BY e.id, e.name;
```

## Sample Data (for testing)

```sql
-- Insert sample venue
INSERT INTO venues (name, address, contact_person, contact_phone, contact_email, capacity)
VALUES ('Restaurante Sakura', 'Rua das Flores, 123, Porto Alegre, RS', 'João Silva', '51999999999', 'joao@sakura.com.br', 100);

-- Insert sample members
INSERT INTO members (membership_number, first_name, last_name, email, phone, membership_status, member_type, communication_preference)
VALUES 
  ('TCH001', 'Maria', 'Tanaka', 'maria.tanaka@email.com', '51988888888', 'active', 'regular', 'email'),
  ('TCH002', 'Pedro', 'Yamamoto', 'pedro.yamamoto@email.com', '51977777777', 'active', 'vip', 'whatsapp'),
  ('TCH003', 'Ana', 'Sato', NULL, NULL, 'active', 'regular', 'post');
```

## Migration Strategy

1. Use a migration tool like Prisma Migrate or node-pg-migrate
2. Version control all schema changes
3. Test migrations in development before production
4. Always backup before running migrations in production
5. Use transaction-wrapped migrations when possible

## Security Considerations

1. Use row-level security (RLS) for multi-tenant scenarios
2. Encrypt sensitive fields (email, phone, postal_address) at application level
3. Use prepared statements to prevent SQL injection
4. Implement proper indexes for query performance
5. Regular backups with point-in-time recovery
6. Audit log for all data modifications

## Backup and Recovery

- **Daily backups**: Automated full backups
- **Retention**: 30 days
- **Testing**: Monthly restore tests
- **PITR**: Point-in-time recovery enabled
