export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ORGANIZER';
  is_admin: boolean;
  status: 'ACTIVE' | 'SUSPENDED';
}

export interface Booking {
  id: string;
  event_id: string;
  user_id: string;
  tickets: number;
  total_price: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED';
  created_at: string;
}

export interface BookingWithEvent extends Booking {
  event_title: string;
  event_start_datetime: string;
}
