
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CustomBadge } from '@/components/ui/custom-badge';
import { 
  Package, 
  Search, 
  PlusCircle, 
  ArrowUpDown,
  MoreVertical,
  Truck,
  PenSquare,
  Trash2,
  BarChart2,
  History,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInventory, useInventoryActivities } from '@/hooks/useInventory';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { items, loading, error, deleteInventoryItem } = useInventory();
  const { activities, loading: activitiesLoading } = useInventoryActivities();

  const categories = Array.from(new Set(items.map(item => item.category)));
  
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = items.filter(item => item.currentStock < item.minThreshold);
  
  const getStockPercentage = (current: number, threshold: number) => {
    return Math.min(100, Math.round((current / (threshold * 2)) * 100));
  };
  
  const getStockBadgeVariant = (current: number, threshold: number) => {
    if (current <= threshold * 0.5) return 'destructive';
    if (current <= threshold) return 'warning';
    return 'success';
  };
  
  const getStockStatusText = (current: number, threshold: number) => {
    if (current <= threshold * 0.5) return 'Critical';
    if (current <= threshold) return 'Low';
    if (current >= threshold * 2) return 'Overstocked';
    return 'Good';
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteInventoryItem(id);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading inventory...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading inventory: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Raw Materials Inventory</CardTitle>
              <CardDescription>Track and manage inventory items</CardDescription>
            </div>
            <Button size="sm" className="flex gap-1">
              <PlusCircle className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inventory..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">
                            <div className="flex items-center gap-1">
                              Name <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </th>
                          <th className="h-10 px-4 text-left font-medium">Category</th>
                          <th className="h-10 px-4 text-left font-medium">Stock Level</th>
                          <th className="h-10 px-4 text-left font-medium hidden md:table-cell">Supplier</th>
                          <th className="h-10 px-4 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                            <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle font-medium">
                                {item.name}
                              </td>
                              <td className="p-4 align-middle">
                                <Badge variant="outline">{item.category}</Badge>
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between text-xs">
                                    <span>{item.currentStock} {item.unit}</span>
                                    <CustomBadge variant={getStockBadgeVariant(item.currentStock, item.minThreshold)}>
                                      {getStockStatusText(item.currentStock, item.minThreshold)}
                                    </CustomBadge>
                                  </div>
                                  <Progress
                                    value={getStockPercentage(item.currentStock, item.minThreshold)}
                                    className={`h-2 ${
                                      item.currentStock < item.minThreshold ? 'bg-red-200' : 'bg-green-200'
                                    }`}
                                  />
                                </div>
                              </td>
                              <td className="p-4 align-middle hidden md:table-cell">{item.supplier}</td>
                              <td className="p-4 align-middle text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <PenSquare className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Truck className="mr-2 h-4 w-4" /> Order More
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <BarChart2 className="mr-2 h-4 w-4" /> Usage History
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      className="text-destructive"
                                      onClick={() => handleDeleteItem(item.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="h-24 text-center">
                              No inventory items found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                  {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <CustomBadge variant={getStockBadgeVariant(item.currentStock, item.minThreshold)}>
                            {getStockStatusText(item.currentStock, item.minThreshold)}
                          </CustomBadge>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Current: {item.currentStock} {item.unit}</span>
                            <span>Min: {item.minThreshold} {item.unit}</span>
                          </div>
                          <Progress
                            value={getStockPercentage(item.currentStock, item.minThreshold)}
                            className="h-2"
                          />
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Supplier: {item.supplier}
                          </span>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">No inventory items found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t py-3">
            <div className="text-xs text-muted-foreground">
              Showing {filteredItems.length} of {items.length} items
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Inventory Activity</CardTitle>
            <CardDescription>Latest inventory changes and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activitiesLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm">Loading activities...</span>
                </div>
              ) : activities.length > 0 ? (
                activities.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="bg-muted rounded-full p-2">
                      <History className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.item} • {activity.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">By {activity.user}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm">No recent activities</p>
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
