
import { useState, useEffect } from 'react';
import { Feedback } from '@/types';
import { feedbackService } from '@/services/feedbackService';
import { toast } from 'sonner';

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await feedbackService.getFeedback();
      setFeedback(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch feedback';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const markResolved = async (id: string) => {
    try {
      const updatedFeedback = await feedbackService.markFeedbackResolved(id);
      setFeedback(prev => prev.map(item => item.id === id ? updatedFeedback : item));
      toast.success('Feedback marked as resolved');
      return updatedFeedback;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark feedback as resolved';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateFeedback = async (id: string, updates: Partial<Feedback>) => {
    try {
      const updatedFeedback = await feedbackService.updateFeedback(id, updates);
      setFeedback(prev => prev.map(item => item.id === id ? updatedFeedback : item));
      toast.success('Feedback updated successfully');
      return updatedFeedback;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update feedback';
      toast.error(errorMessage);
      throw err;
    }
  };

  const createFeedback = async (feedbackData: Omit<Feedback, 'id'>) => {
    try {
      const newFeedback = await feedbackService.createFeedback(feedbackData);
      setFeedback(prev => [...prev, newFeedback]);
      toast.success('Feedback created successfully');
      return newFeedback;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create feedback';
      toast.error(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return {
    feedback,
    loading,
    error,
    markResolved,
    updateFeedback,
    createFeedback,
    refetch: fetchFeedback,
  };
};
