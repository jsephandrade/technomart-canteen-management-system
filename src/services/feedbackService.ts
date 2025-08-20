
import { Feedback } from '@/types';
import { apiClient } from './api';

export const feedbackService = {
  async getFeedback(): Promise<Feedback[]> {
    return apiClient.get<Feedback[]>('/feedback');
  },

  async getFeedbackItem(id: string): Promise<Feedback> {
    return apiClient.get<Feedback>(`/feedback/${id}`);
  },

  async createFeedback(feedback: Omit<Feedback, 'id'>): Promise<Feedback> {
    return apiClient.post<Feedback>('/feedback', feedback);
  },

  async updateFeedback(id: string, feedback: Partial<Feedback>): Promise<Feedback> {
    return apiClient.put<Feedback>(`/feedback/${id}`, feedback);
  },

  async markFeedbackResolved(id: string): Promise<Feedback> {
    return apiClient.put<Feedback>(`/feedback/${id}`, { resolved: true });
  },
};
