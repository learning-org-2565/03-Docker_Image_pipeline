import axios from 'axios';
import { Application, Course } from '../types';

const API_URL = 'https://api.devopspro-internship.com/v1'; // Replace with your actual API endpoint

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const courseService = {
  getCourses: () => api.get<Course[]>('/courses'),
  getCourseById: (id: string) => api.get<Course>(`/courses/${id}`),
};

export const applicationService = {
  submit: (data: Omit<Application, 'id' | 'status' | 'createdAt'>) => 
    api.post<Application>('/applications', data),
  getStatus: (id: string) => 
    api.get<Application>(`/applications/${id}`),
};