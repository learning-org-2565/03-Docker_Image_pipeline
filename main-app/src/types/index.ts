export interface Application {
  id: string;
  name: string;
  email: string;
  experience: string;
  background: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  startDate: string;
  topics: string[];
}