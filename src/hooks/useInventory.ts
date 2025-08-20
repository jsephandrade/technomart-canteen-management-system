
import { useState, useEffect } from 'react';
import { InventoryItem, InventoryActivity, inventoryService } from '@/services/inventoryService';
import { toast } from 'sonner';

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await inventoryService.getInventoryItems();
      setItems(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch inventory';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addInventoryItem = async (item: Omit<InventoryItem, 'id'>) => {
    try {
      const newItem = await inventoryService.createInventoryItem(item);
      setItems(prev => [...prev, newItem]);
      toast.success('Inventory item added successfully');
      return newItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add inventory item';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateInventoryItem = async (id: string, updates: Partial<InventoryItem>) => {
    try {
      const updatedItem = await inventoryService.updateInventoryItem(id, updates);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
      toast.success('Inventory item updated successfully');
      return updatedItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update inventory item';
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteInventoryItem = async (id: string) => {
    try {
      await inventoryService.deleteInventoryItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
      toast.success('Inventory item deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete inventory item';
      toast.error(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return {
    items,
    loading,
    error,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    refetch: fetchInventory,
  };
};

export const useInventoryActivities = () => {
  const [activities, setActivities] = useState<InventoryActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await inventoryService.getInventoryActivities();
      setActivities(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch inventory activities';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities,
  };
};
