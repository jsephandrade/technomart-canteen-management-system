
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Plus, Minus, X } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  popular: boolean;
}

interface SelectedMenuItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface MenuSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedItems: SelectedMenuItem[], total: number) => void;
  menuItems: MenuItem[];
}

export const MenuSelectionModal: React.FC<MenuSelectionModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
  menuItems
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Appetizers');
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedMenuItem>>({});

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const filteredItems = searchTerm.trim() 
    ? menuItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : menuItems.filter(item => item.category === activeCategory);

  const addToOrder = (item: MenuItem) => {
    setSelectedItems(prev => {
      const existing = prev[item.id];
      if (existing) {
        return {
          ...prev,
          [item.id]: { ...existing, quantity: existing.quantity + 1 }
        };
      } else {
        return {
          ...prev,
          [item.id]: {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
          }
        };
      }
    });
  };

  const updateQuantity = (itemId: string, change: number) => {
    setSelectedItems(prev => {
      const existing = prev[itemId];
      if (!existing) return prev;
      
      const newQuantity = existing.quantity + change;
      if (newQuantity <= 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [itemId]: { ...existing, quantity: newQuantity }
      };
    });
  };

  const getTotal = () => {
    return Object.values(selectedItems).reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleConfirm = () => {
    const items = Object.values(selectedItems);
    const total = getTotal();
    onConfirm(items, total);
    setSelectedItems({});
    setSearchTerm('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Menu Items</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
          {/* Menu Selection */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search menu items..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {!searchTerm.trim() && (
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-4">
                <TabsList className="grid w-full grid-cols-3">
                  {categories.slice(0, 3).map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
            
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-2">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="border rounded-md p-3 hover:bg-accent hover:cursor-pointer transition-colors"
                    onClick={() => addToOrder(item)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      {item.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                    <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Selected Items */}
          <div className="flex flex-col border-l pl-4">
            <h3 className="font-semibold mb-4">Selected Items</h3>
            <div className="flex-1 overflow-y-auto">
              {Object.keys(selectedItems).length > 0 ? (
                <div className="space-y-3">
                  {Object.values(selectedItems).map((item) => (
                    <div key={item.id} className="flex justify-between items-start p-2 border rounded-md">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground text-sm">No items selected</p>
                </div>
              )}
            </div>
            
            {Object.keys(selectedItems).length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={Object.keys(selectedItems).length === 0}
          >
            Confirm Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
