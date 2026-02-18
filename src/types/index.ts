// Member types
export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  postalAddress?: string;
  membershipNumber: string;
  membershipStatus: 'active' | 'inactive' | 'honorary';
  memberType: 'regular' | 'vip' | 'volunteer' | 'board';
  communicationPreference: 'whatsapp' | 'email' | 'post' | 'all';
  isVIP: boolean;
  dateOfBirth?: Date;
  photoUrl?: string;
  familyMembers?: string[]; // IDs of related members
  createdAt: Date;
  updatedAt: Date;
}

// Event types
export interface Event {
  id: string;
  name: string;
  description: string;
  eventDate: Date;
  registrationOpenDate: Date;
  registrationCloseDate: Date;
  venue: Venue;
  capacity: number;
  pricing: EventPricing;
  status: 'draft' | 'open' | 'closed' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  capacity: number;
  depositRequired: number;
  depositPaid: boolean;
  reservationStatus: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}

export interface EventPricing {
  adultPrice: number;
  childPrice: number;
  childAgeLimit: number;
  familyPackagePrice?: number;
  earlyBirdDiscount?: number;
  earlyBirdDeadline?: Date;
}

// Registration types
export interface EventRegistration {
  id: string;
  eventId: string;
  memberId: string;
  numberOfAdults: number;
  numberOfChildren: number;
  childrenAges?: number[];
  dietaryRestrictions?: string;
  totalAmount: number;
  paymentStatus: 'pending' | 'partial' | 'completed';
  paymentMethod?: 'cash' | 'transfer' | 'card';
  paidAmount: number;
  registrationDate: Date;
  confirmed: boolean;
  attended?: boolean;
  notes?: string;
}

// Payment and Donation types
export interface Payment {
  id: string;
  registrationId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'cash' | 'transfer' | 'card';
  transactionId?: string;
  receiptUrl?: string;
  notes?: string;
}

export interface Donation {
  id: string;
  eventId: string;
  donorId?: string; // Optional if anonymous
  donorName: string;
  donationType: 'money' | 'food' | 'other';
  amount?: number; // For monetary donations
  description: string; // Description of food or other donation
  estimatedValue: number;
  receivedDate: Date;
  destinationFund?: 'general' | 'kagoshima-brazil' | 'charity';
}

// Volunteer types
export interface Volunteer {
  id: string;
  memberId: string;
  eventId: string;
  role: string;
  tasks: VolunteerTask[];
  availability: string;
  notes?: string;
}

export interface VolunteerTask {
  id: string;
  description: string;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: Date;
  completedDate?: Date;
}

// Communication types
export interface Communication {
  id: string;
  eventId?: string;
  subject: string;
  body: string;
  channel: 'email' | 'whatsapp' | 'post';
  recipients: string[]; // Member IDs
  recipientFilter?: RecipientFilter;
  scheduledDate?: Date;
  sentDate?: Date;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  deliveryStatus?: DeliveryStatus[];
  templateId?: string;
  createdBy: string;
  createdAt: Date;
}

export interface RecipientFilter {
  memberType?: string[];
  communicationPreference?: string[];
  isVIP?: boolean;
  registrationStatus?: string[];
}

export interface DeliveryStatus {
  recipientId: string;
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'failed';
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  error?: string;
}

// Report types
export interface FinancialReport {
  eventId: string;
  eventName: string;
  eventDate: Date;
  revenue: {
    registrations: number;
    donations: {
      money: number;
      food: number;
      other: number;
      total: number;
    };
    total: number;
  };
  expenses: {
    venue: number;
    food: number;
    decorations: number;
    entertainment: number;
    marketing: number;
    administrative: number;
    other: number;
    total: number;
  };
  netResult: number;
  kagoshimaBrasilDonation: number;
  generatedAt: Date;
}

export interface AttendanceReport {
  eventId: string;
  eventName: string;
  eventDate: Date;
  totalRegistrations: number;
  totalAttendees: number;
  adults: number;
  children: number;
  noShows: number;
  memberAttendees: number;
  guestAttendees: number;
  attendanceRate: number;
  generatedAt: Date;
}

// User authentication types
export interface User {
  id: string;
  email: string;
  role: 'super_admin' | 'event_coordinator' | 'treasurer' | 'volunteer' | 'member';
  memberId?: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}
