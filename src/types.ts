export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  longDescription: string;
  benefits: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualification: string;
  experience: string;
  specialization: string;
  image: string;
  bio: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  category: 'exterior' | 'interior' | 'reception' | 'equipment' | 'treatment';
  title: string;
  image: string;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  treatment: string;
  date: string;
  message: string;
  status: 'pending' | 'confirmed';
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  emergencyContact: string;
  mapEmbedUrl: string;
}
