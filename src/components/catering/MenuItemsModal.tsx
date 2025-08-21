
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Utensils, Plus, Minus, X, DollarSign } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  popular: boolean;
}

interface EventMenuItem {
  menuItemId: string;
  quantity: number;
  price: number;
}

interface CateringEvent {
  id: string;
  name: string;
  client: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  total: number;
  contactPerson: {
    name: string;
    phone: string;
  };
}

interface MenuItemsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CateringEvent | null;
  menuItems: MenuItem[];
  onUpdateMenuItems: (eventId: string, items: EventMenuItem[]) => void;
}

export const MenuItemsModal: React.FC<MenuItemsModalProps> = ({
  open,
  onOpenChange,
  event,
  menuItems,
  onUpdateMenuItems
}) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      const { [itemId]: removed, ...rest } = selectedItems;
      setSelectedItems(rest);
    } else {
      setSelectedItems(prev => ({
        ...prev,
        [itemId]: quantity
      }));
    }
  };

  const handleSave = () => {
    if (event) {
      const eventMenuItems: EventMenuItem[] = Object.entries(selectedItems).map(([itemId, quantity]) => {
        const item = menuItems.find(m => m.id === itemId);
        return {
          menuItemId: itemId,
          quantity,
          price: item ? item.price * quantity : 0
        };
      });
      
      onUpdateMenuItems(event.id, eventMenuItems);
      onOpenChange(false);
    }
  };

  const getTotalCost = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(m => m.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const categorizedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Menu Items Selection</span>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{event.name} - {event.attendees} attendees</p>
        </DialogHeader>
        
        <div className="space-y-6">
          {Object.entries(categorizedItems).map(([category, items]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.name}</h4>
                        {item.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, (selectedItems[item.id] || 0) - 1)}
                        disabled={!selectedItems[item.id]}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <Input
                        type="number"
                        min="0"
                        value={selectedItems[item.id] || 0}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                      />
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, (selectedItems[item.id] || 0) + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {Object.keys(selectedItems).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(selectedItems).map(([itemId, quantity]) => {
                    const item = menuItems.find(m => m.id === itemId);
                    return item ? (
                      <div key={itemId} className="flex justify-between items-center">
                        <span>{item.name} x{quantity}</span>
                        <span className="font-medium">${(item.price * quantity).toFixed(2)}</span>
                      </div>
                    ) : null;
                  })}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Cost:</span>
                      <span>${getTotalCost().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Menu Items
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
