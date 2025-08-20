
import { useState, useEffect } from 'react';
import { Sale, DashboardStats } from '@/types';
import { salesService } from '@/services/salesService';
import { toast } from 'sonner';

export const useSales = (params?: {
  startDate?: string;
  endDate?: string;
  employeeId?: string;
}) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await salesService.getSales(params);
      setSales(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sales data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createSale = async (sale: Omit<Sale, 'id'>) => {
    try {
      const newSale = await salesService.createSale(sale);
      setSales(prev => [...prev, newSale]);
      toast.success('Sale recorded successfully');
      return newSale;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to record sale';
      toast.error(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchSales();
  }, [params?.startDate, params?.endDate, params?.employeeId]);

  return {
    sales,
    loading,
    error,
    createSale,
    refetch: fetchSales,
  };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await salesService.getDashboardStats();
      setStats(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard stats';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
