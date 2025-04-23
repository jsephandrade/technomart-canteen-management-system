
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { menuItems } from '@/utils/mockData';
import { MenuItem } from '@/types';
import { Edit, Plus, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

// Online food image URLs to randomize
const foodImages = [
  "https://images.unsplash.com/photo-1559628231-d01dd61e1c77?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519864600265-abb23847ef57?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
];

// Helper to assign different images to default menu items, falling back to random selection
function assignMenuImages(items: MenuItem[]) {
  return items.map((item, idx) => ({
    ...item,
    image: foodImages[idx % foodImages.length]
  }));
}

const MenuManagement: React.FC = () => {
  // Assign new menu images to default items
  const [items, setItems] = useState<MenuItem[]>(assignMenuImages(menuItems));
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    available: true,
    popular: false
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const categories = Array.from(new Set(items.map(item => item.category)));

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || !newItem.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Assign a random image to new menu item
    const imageUrl = foodImages[Math.floor(Math.random() * foodImages.length)];

    const itemToAdd = {
      ...newItem,
      id: `P${items.length + 1}`,
      price: Number(newItem.price),
      available: newItem.available ?? true,
      popular: newItem.popular ?? false,
      image: imageUrl
    } as MenuItem;

    setItems([...items, itemToAdd]);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: '',
      available: true,
      popular: false
    });

    setDialogOpen(false);
    toast.success('Menu item added successfully');
  };

  const handleEditItem = () => {
    if (!editingItem) return;

    const updatedItems = items.map(item =>
      item.id === editingItem.id ? editingItem : item
    );

    setItems(updatedItems);
    setEditingItem(null);
    toast.success('Menu item updated successfully');
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success('Menu item deleted successfully');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Menu Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Add a new item to your canteen menu.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="available" className="text-right">Available</Label>
                <Switch
                  id="available"
                  checked={newItem.available}
                  onCheckedChange={(checked) => setNewItem({ ...newItem, available: checked })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="popular" className="text-right">Popular</Label>
                <Switch
                  id="popular"
                  checked={newItem.popular}
                  onCheckedChange={(checked) => setNewItem({ ...newItem, popular: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{item.name}</CardTitle>
                    {item.popular && <Badge className="bg-secondary">Popular</Badge>}
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                {/* Food image presented here */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded-bl rounded-br"
                  style={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    {/* Peso sign displayed here */}
                    <span className="font-bold text-lg">₱{item.price.toFixed(2)}</span>
                    <Badge variant={item.available ? "outline" : "destructive"}>
                      {item.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.filter(item => item.category === category).map(item => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{item.name}</CardTitle>
                      {item.popular && <Badge className="bg-secondary">Popular</Badge>}
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  {/* Food image presented here */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 object-cover rounded-bl rounded-br"
                    style={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      {/* Peso sign displayed here */}
                      <span className="font-bold text-lg">₱{item.price.toFixed(2)}</span>
                      <Badge variant={item.available ? "outline" : "destructive"}>
                        {item.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
              <DialogDescription>
                Make changes to the menu item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">Description</Label>
                <Input
                  id="edit-description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">Category</Label>
                <Input
                  id="edit-category"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-available" className="text-right">Available</Label>
                <Switch
                  id="edit-available"
                  checked={editingItem.available}
                  onCheckedChange={(checked) => setEditingItem({ ...editingItem, available: checked })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-popular" className="text-right">Popular</Label>
                <Switch
                  id="edit-popular"
                  checked={editingItem.popular}
                  onCheckedChange={(checked) => setEditingItem({ ...editingItem, popular: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
              <Button onClick={handleEditItem}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MenuManagement;
