import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CustomBadge } from '@/components/ui/custom-badge';
import {
  Search,
  PlusCircle,
  ArrowUpDown,
  MoreVertical,
  Truck,
  PenSquare,
  Trash2,
  BarChart2,
  History,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: '1',
      name: 'Rice',
      category: 'Grains',
      currentStock: 25,
      minThreshold: 10,
      unit: 'kg',
      lastUpdated: '2025-04-15',
      supplier: 'Global Foods',
    },
    {
      id: '2',
      name: 'Chicken Breast',
      category: 'Meat',
      currentStock: 8,
      minThreshold: 5,
      unit: 'kg',
      lastUpdated: '2025-04-16',
      supplier: 'Fresh Farms',
    },
    {
      id: '3',
      name: 'Olive Oil',
      category: 'Condiments',
      currentStock: 2,
      minThreshold: 3,
      unit: 'bottles',
      lastUpdated: '2025-04-16',
      supplier: 'Gourmet Supplies',
    },
    {
      id: '4',
      name: 'Tomatoes',
      category: 'Vegetables',
      currentStock: 15,
      minThreshold: 8,
      unit: 'kg',
      lastUpdated: '2025-04-17',
      supplier: 'Local Farms',
    },
    {
      id: '5',
      name: 'Flour',
      category: 'Baking',
      currentStock: 12,
      minThreshold: 5,
      unit: 'kg',
      lastUpdated: '2025-04-14',
      supplier: "Baker's Choice",
    },
    {
      id: '6',
      name: 'Salt',
      category: 'Condiments',
      currentStock: 4,
      minThreshold: 2,
      unit: 'kg',
      lastUpdated: '2025-04-13',
      supplier: 'Seasoning Co.',
    },
    {
      id: '7',
      name: 'Milk',
      category: 'Dairy',
      currentStock: 6,
      minThreshold: 8,
      unit: 'liters',
      lastUpdated: '2025-04-17',
      supplier: 'Dairy Farms',
    },
  ]);
  const recentActivities = [
    {
      id: '1',
      action: 'Stock Update',
      item: 'Rice',
      quantity: '+50kg',
      timestamp: '2025-04-22 14:30',
      user: 'John Smith',
    },
    {
      id: '2',
      action: 'Stock Deduction',
      item: 'Chicken Breast',
      quantity: '-15kg',
      timestamp: '2025-04-22 13:45',
      user: 'Maria Garcia',
    },
    {
      id: '3',
      action: 'Low Stock Alert',
      item: 'Olive Oil',
      quantity: '2 bottles remaining',
      timestamp: '2025-04-22 12:20',
      user: 'System',
    },
    {
      id: '4',
      action: 'Inventory Count',
      item: 'Tomatoes',
      quantity: 'Updated to 15kg',
      timestamp: '2025-04-22 11:00',
      user: 'David Chen',
    },
  ];
  const categories = [
    'Grains',
    'Meat',
    'Vegetables',
    'Dairy',
    'Condiments',
    'Baking',
    'Fruits',
  ];
  const filteredItems = inventoryItems.filter((item) => {
    // Filter by search term
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    // Filter by category
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  // Items that are below threshold
  const lowStockItems = inventoryItems.filter(
    (item) => item.currentStock < item.minThreshold
  );
  // Calculate stock level percentage
  const getStockPercentage = (current, threshold) => {
    return Math.min(100, Math.round((current / (threshold * 2)) * 100));
  };
  // Determine badge color based on stock level
  const getStockBadgeVariant = (current, threshold) => {
    if (current <= threshold * 0.5) return 'destructive';
    if (current <= threshold) return 'warning';
    return 'success';
  };
  // Get text for stock status
  const getStockStatusText = (current, threshold) => {
    if (current <= threshold * 0.5) return 'Critical';
    if (current <= threshold) return 'Low';
    if (current >= threshold * 2) return 'Overstocked';
    return 'Good';
  };
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Raw Materials Inventory</CardTitle>
              <CardDescription>
                Track and manage inventory items
              </CardDescription>
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

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
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
                          <th className="h-10 px-4 text-left font-medium">
                            Category
                          </th>
                          <th className="h-10 px-4 text-left font-medium">
                            Stock Level
                          </th>
                          <th className="h-10 px-4 text-left font-medium hidden md:table-cell">
                            Supplier
                          </th>
                          <th className="h-10 px-4 text-right font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                            <tr
                              key={item.id}
                              className="border-b transition-colors hover:bg-muted/50"
                            >
                              <td className="p-4 align-middle font-medium">
                                {item.name}
                              </td>
                              <td className="p-4 align-middle">
                                <Badge variant="outline">{item.category}</Badge>
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between text-xs">
                                    <span>
                                      {item.currentStock} {item.unit}
                                    </span>
                                    <CustomBadge
                                      variant={getStockBadgeVariant(
                                        item.currentStock,
                                        item.minThreshold
                                      )}
                                    >
                                      {getStockStatusText(
                                        item.currentStock,
                                        item.minThreshold
                                      )}
                                    </CustomBadge>
                                  </div>
                                  <Progress
                                    value={getStockPercentage(
                                      item.currentStock,
                                      item.minThreshold
                                    )}
                                    className={`h-2 ${item.currentStock < item.minThreshold ? 'bg-red-200' : 'bg-green-200'}`}
                                  />
                                </div>
                              </td>
                              <td className="p-4 align-middle hidden md:table-cell">
                                {item.supplier}
                              </td>
                              <td className="p-4 align-middle text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <PenSquare className="mr-2 h-4 w-4" />{' '}
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Truck className="mr-2 h-4 w-4" /> Order
                                      More
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <BarChart2 className="mr-2 h-4 w-4" />{' '}
                                      Usage History
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
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
                  {filteredItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <CustomBadge
                          variant={getStockBadgeVariant(
                            item.currentStock,
                            item.minThreshold
                          )}
                        >
                          {getStockStatusText(
                            item.currentStock,
                            item.minThreshold
                          )}
                        </CustomBadge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>
                            Current: {item.currentStock} {item.unit}
                          </span>
                          <span>
                            Min: {item.minThreshold} {item.unit}
                          </span>
                        </div>
                        <Progress
                          value={getStockPercentage(
                            item.currentStock,
                            item.minThreshold
                          )}
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
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t py-3">
            <div className="text-xs text-muted-foreground">
              Showing {filteredItems.length} of {inventoryItems.length} items
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Inventory Activity</CardTitle>
            <CardDescription>
              Latest inventory changes and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                >
                  <div className="bg-muted rounded-full p-2">
                    <History className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.item} • {activity.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      By {activity.user}
                    </p>
                  </div>
                </div>
              ))}
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
