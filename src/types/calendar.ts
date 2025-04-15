
export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  type: 'service' | 'meeting' | 'special' | 'other';
}
