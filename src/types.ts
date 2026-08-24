export interface Guest {
  code: string;
  name: string;
  passes: number;
  confirmed?: boolean;
  attending?: boolean;
  confirmedPasses?: number;
  message?: string;
  updatedAt?: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description?: string;
  iconName: string;
}

export interface LocationDetail {
  id: 'ceremonia' | 'recepcion';
  type: string;
  name: string;
  time: string;
  address: string;
  mapUrl: string;
  embedQuery: string;
  note?: string;
}

export interface RsvpSubmission {
  code: string;
  guestName: string;
  attending: boolean;
  confirmedPasses: number;
  message: string;
}
