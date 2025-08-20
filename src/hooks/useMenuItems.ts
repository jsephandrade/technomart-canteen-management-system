
import { useState, useEffect } from 'react';
import { MenuItem } from '@/types';
import { menuService } from '@/services/menuService';
import { toast } from 'sonner';

export const useMenuItems = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await menuService.getMenuItems();
      setItems(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch menu items';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      const newItem = await menuService.createMenuItem(item);
      setItems(prev => [...prev, newItem]);
      toast.success('Menu item added successfully');
      return newItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add menu item';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const updatedItem = await menuService.updateMenuItem(id, updates);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
      toast.success('Menu item updated successfully');
      return updatedItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update menu item';
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await menuService.deleteMenuItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
      toast.success('Menu item deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete menu item';
      toast.error(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    items,
    loading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refetch: fetchMenuItems,
  };
};
