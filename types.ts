
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  isAudio?: boolean;
}

export interface StylingRequest {
  ownedItems: string;
  location: string;
  occasion: string;
  preference: string;
}

export enum StylePreference {
  CASUAL = 'Casual',
  FORMAL = 'Formal',
  PARTY = 'Party',
  TRADITIONAL = 'Traditional / Cultural',
  INDO_WESTERN = 'Indo-Western'
}

export enum Occasion {
  COLLEGE = 'College',
  OFFICE = 'Office',
  WEDDING = 'Wedding',
  FESTIVAL = 'Festival',
  TRAVEL = 'Travel'
}
