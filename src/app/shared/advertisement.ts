export interface Advertisement {
  id: number;
  title: string;
  description: string;
  authorId: number;
  authorUsername: string;
  authorEmail: string;
  authorPhoneNumber: string;
  name: string;

  lat: number;
  lng: number;
  address: string;
}
