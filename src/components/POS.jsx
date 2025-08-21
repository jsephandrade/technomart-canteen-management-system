import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  Receipt,
  CreditCard,
  DollarSign,
  Smartphone,
  AlertCircle,
  Tag,
  Clock,
  Package,
  Check
} from "lucide-react"

const POS = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentOrder, setCurrentOrder] = useState([])
  // Filipino categories and items (no images)
  const [categories] = useState([
    {
      id: "1",
      name: "Noodles",
      items: [
        {
          id: "1",
          name: "Bam-i",
          description: "A festive noodle dish with canton & bihon.",
          price: 30,
          category: "Noodles",
          available: true,
          popular: true
        },
        {
          id: "2",
          name: "Bihon",
          description: "Stir-fried vermicelli rice noodles.",
          price: 20,
          category: "Noodles",
          available: true,
          popular: true
        }
      ]
    },
    {
      id: "2",
      name: "Sandwich",
      items: [
        {
          id: "3",
          name: "Beef loaf",
          description: "Savory Filipino-style sandwich with beef loaf slices.",
          price: 15,
          category: "Sandwich",
          available: true,
          popular: false
        }
      ]
    },
    {
      id: "3",
      name: "Main Dish",
      items: [
        {
          id: "4",
          name: "Longganisa",
          description: "Filipino sweet pork sausage.",
          price: 15,
          category: "Main Dish",
          available: true,
          popular: false
        },
        {
          id: "5",
          name: "Ginaling",
          description: "Ground meat sautéed with vegetables.",
          price: 60,
          category: "Main Dish",
          available: true,
          popular: true
        },
        {
          id: "6",
          name: "Menudo",
          description: "Pork and liver stew.",
          price: 60,
          category: "Main Dish",
          available: true,
          popular: true
        }
      ]
    },
    {
      id: "4",
      name: "Viand",
      items: [
        {
          id: "7",
          name: "Monggos",
          description: "Hearty mung bean stew.",
          price: 20,
          category: "Viand",
          available: true,
          popular: false
        }
      ]
    },
    {
      id: "5",
      name: "Drinks",
      items: [
        {
          id: "8",
          name: "Coke",
          description: "Refreshing Coca-Cola soft drink.",
          price: 20,
          category: "Drinks",
          available: true,
          popular: false
        },
        {
          id: "9",
          name: "Royal",
          description: "Sweet Filipino orange soda.",
          price: 20,
          category: "Drinks",
          available: true,
          popular: false
        },
        {
          id: "10",
          name: "Sprite",
          description: "Lemon-lime flavored soda.",
          price: 20,
          category: "Drinks",
          available: true,
          popular: false
        }
      ]
    },
    {
      id: "6",
      name: "Combo Meals",
      items: [
        {
          id: "11",
          name: "Rice + Vegetable + Lumpia",
          description: "Complete combo meal with rice, vegetables, and lumpia.",
          price: 45,
          category: "Combo Meals",
          available: true,
          popular: true
        },
        {
          id: "12",
          name: "Rice + Hamburger + Egg",
          description: "Hearty combo with rice, hamburger, and egg.",
          price: 45,
          category: "Combo Meals",
          available: true,
          popular: true
        },
        {
          id: "13",
          name: "Rice + Bihon/Bam-i + Siomai",
          description: "Traditional combo with rice, noodles, and siomai.",
          price: 45,
          category: "Combo Meals",
          available: true,
          popular: true
        },
        {
          id: "14",
          name: "Rice + Chorizo + Boiled Egg",
          description: "Flavorful combo with rice, chorizo, and boiled egg.",
          price: 45,
          category: "Combo Meals",
          available: true,
          popular: false
        },
        {
          id: "15",
          name: "Rice + Hotdog + Nugahong",
          description: "Classic combo with rice, hotdog, and nugahong.",
          price: 45,
          category: "Combo Meals",
          available: true,
          popular: false
        },
        {
          id: "16",
          name: "Rice + Fried Egg + Chorizo",
          description:
            "Simple yet satisfying combo with rice, fried egg, and chorizo.",
          price: 45,
          category: "Combo Meals",
          available: true,
          popular: false
        }
      ]
    }
  ])

  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("pos")

  // Sample queue data - in a real app this would come from an API or database
  const [orderQueue, setOrderQueue] = useState([
    {
      id: "1001",
      orderNumber: "W-001",
      type: "walk-in",
      items: [
        { id: "oi1", menuItemId: "1", name: "Bam-i", price: 30, quantity: 2 },
        {
          id: "oi2",
          menuItemId: "4",
          name: "Longganisa",
          price: 15,
          quantity: 1
        }
      ],
      status: "pending",
      timeReceived: new Date(Date.now() - 5 * 60 * 1000) // 5 mins ago
    },
    {
      id: "1002",
      orderNumber: "O-101",
      type: "online",
      items: [
        {
          id: "oi3",
          menuItemId: "5",
          name: "Ginaling",
          price: 60,
          quantity: 1
        },
        { id: "oi4", menuItemId: "8", name: "Coke", price: 20, quantity: 2 }
      ],
      status: "preparing",
      timeReceived: new Date(Date.now() - 12 * 60 * 1000), // 12 mins ago
      customerName: "Juan Dela Cruz"
    },
    {
      id: "1003",
      orderNumber: "W-002",
      type: "walk-in",
      items: [
        { id: "oi5", menuItemId: "6", name: "Menudo", price: 60, quantity: 1 }
      ],
      status: "ready",
      timeReceived: new Date(Date.now() - 15 * 60 * 1000) // 15 mins ago
    },
    {
      id: "1004",
      orderNumber: "O-102",
      type: "online",
      items: [
        { id: "oi6", menuItemId: "2", name: "Bihon", price: 20, quantity: 3 },
        { id: "oi7", menuItemId: "9", name: "Royal", price: 20, quantity: 3 }
      ],
      status: "pending",
      timeReceived: new Date(Date.now() - 3 * 60 * 1000), // 3 mins ago
      customerName: "Maria Santos"
    }
  ])

  const addToOrder = menuItem => {
    setCurrentOrder(prevOrder => {
      // Check if item already exists in order
      const existingItemIndex = prevOrder.findIndex(
        item => item.menuItemId === menuItem.id
      )

      if (existingItemIndex !== -1) {
        // Item exists, increase quantity
        const updatedOrder = [...prevOrder]
        updatedOrder[existingItemIndex].quantity += 1
        return updatedOrder
      } else {
        // Item doesn't exist, add new item
        return [
          ...prevOrder,
          {
            id: `order-item-${Date.now()}`,
            menuItemId: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1
          }
        ]
      }
    })
  }

  const updateQuantity = (orderItemId, change) => {
    setCurrentOrder(prevOrder => {
      const updatedOrder = prevOrder.map(item => {
        if (item.id === orderItemId) {
          const newQuantity = item.quantity + change
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
        }
        return item
      })
      return updatedOrder
    })
  }

  const removeFromOrder = orderItemId => {
    setCurrentOrder(prevOrder =>
      prevOrder.filter(item => item.id !== orderItemId)
    )
  }

  const clearOrder = () => {
    setCurrentOrder([])
  }

  const calculateSubtotal = () => {
    return currentOrder.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  }

  const calculateTotal = () => {
    return calculateSubtotal()
  }

  const processPayment = () => {
    // This would typically integrate with a payment gateway
    alert(
      `Payment of $${calculateTotal().toFixed(
        2
      )} processed via ${paymentMethod}`
    )
    clearOrder()
    setIsPaymentModalOpen(false)
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrderQueue(prevQueue =>
      prevQueue.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  // Filter menu items based on search
  const filteredMenuItems =
    categories
      .find(cat => cat.id === activeCategory)
      ?.items.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []

  // Filter orders by type
  const walkInOrders = orderQueue.filter(order => order.type === "walk-in")
  const onlineOrders = orderQueue.filter(order => order.type === "online")

  // Format time ago
  const formatTimeAgo = date => {
    const now = new Date()
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    )

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes === 1) return "1 minute ago"
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

    const hours = Math.floor(diffInMinutes / 60)
    if (hours === 1) return "1 hour ago"
    return `${hours} hours ago`
  }

  const getStatusColor = status => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ready":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      {/* Top nav tabs */}
      <Tabs
        value={activeTab}
        onValueChange={value => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="pos">Point of Sale</TabsTrigger>
          <TabsTrigger value="queue">Order Queue</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Point of Sale Content */}
      {activeTab === "pos" && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {/* Menu Selection Side */}
          <div className="md:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Point of Sale</CardTitle>
                    <CardDescription>
                      Select menu items to add to order
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Register #1</Badge>
                </div>
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 pt-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search menu items..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden flex flex-col">
                <Tabs
                  defaultValue={categories[0].id}
                  value={activeCategory}
                  onValueChange={setActiveCategory}
                  className="flex-1 flex flex-col"
                >
                  <div className="border-b">
                    <TabsList className="w-full justify-start overflow-auto p-0 h-auto">
                      {categories.map(category => (
                        <TabsTrigger
                          key={category.id}
                          value={category.id}
                          className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
                        >
                          {category.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  {categories.map(category => (
                    <TabsContent
                      key={category.id}
                      value={category.id}
                      className="flex-1 overflow-y-auto p-0 mt-0"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
                        {filteredMenuItems.length > 0 ? (
                          filteredMenuItems.map(item => (
                            <div
                              key={item.id}
                              className="border rounded-md p-3 hover:bg-accent hover:cursor-pointer transition-colors"
                              onClick={() => addToOrder(item)}
                            >
                              {/* No image */}
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-medium">{item.name}</h4>
                                {item.popular && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {item.description}
                              </p>
                              <p className="text-sm font-semibold">
                                ₱{item.price.toFixed(2)}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full text-center py-12">
                            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                            <p className="text-muted-foreground">
                              No menu items found matching "{searchTerm}"
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <div className="flex justify-between w-full text-xs text-muted-foreground">
                  <span>Cashier: Admin User</span>
                  <span>
                    {new Date().toLocaleDateString()}{" "}
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
          {/* Order Side */}
          <div className="md:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Current Order
                </CardTitle>
                <CardDescription>Order #1254</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                {currentOrder.length > 0 ? (
                  <div className="space-y-3">
                    {currentOrder.map(item => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start p-2 border rounded-md"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
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
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive"
                              onClick={() => removeFromOrder(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p>₱{(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            ₱{item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No items in order</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Select menu items to begin
                    </p>
                  </div>
                )}
                {currentOrder.length > 0 && (
                  <div className="mt-6 border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₱{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-base pt-2 border-t">
                      <span>Total</span>
                      <span>₱{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col gap-3">
                <div className="flex gap-2 w-full">
                  <Button
                    className="flex-1"
                    size="sm"
                    variant="default"
                    disabled={currentOrder.length === 0}
                    onClick={() => setIsPaymentModalOpen(true)}
                  >
                    <CreditCard className="h-4 w-4 mr-1" /> Pay
                  </Button>
                  <Button
                    className="flex-1"
                    size="sm"
                    variant="outline"
                    disabled={currentOrder.length === 0}
                    onClick={clearOrder}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Clear
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button variant="outline" size="sm">
                    <Tag className="h-4 w-4 mr-1" /> Apply Discount
                  </Button>
                  <Button variant="outline" size="sm">
                    <Receipt className="h-4 w-4 mr-1" /> Order History
                  </Button>
                </div>
              </CardFooter>

              {/* Simple Payment Modal (would typically be a separate component) */}
              {isPaymentModalOpen && (
                <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
                  <Card className="w-full max-w-md mx-4">
                    <CardHeader>
                      <CardTitle>Complete Payment</CardTitle>
                      <CardDescription>Select payment method</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center mb-4">
                        <p className="text-3xl font-bold">
                          ₱{calculateTotal().toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total amount due
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <button
                          className={`flex items-center gap-3 p-3 rounded-md border ${
                            paymentMethod === "card"
                              ? "bg-primary text-primary-foreground"
                              : "bg-transparent"
                          }`}
                          onClick={() => setPaymentMethod("card")}
                        >
                          <CreditCard className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-xs">Visa, Mastercard, Amex</p>
                          </div>
                        </button>

                        <button
                          className={`flex items-center gap-3 p-3 rounded-md border ${
                            paymentMethod === "cash"
                              ? "bg-primary text-primary-foreground"
                              : "bg-transparent"
                          }`}
                          onClick={() => setPaymentMethod("cash")}
                        >
                          <DollarSign className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Cash</p>
                            <p className="text-xs">Physical currency</p>
                          </div>
                        </button>

                        <button
                          className={`flex items-center gap-3 p-3 rounded-md border ${
                            paymentMethod === "mobile"
                              ? "bg-primary text-primary-foreground"
                              : "bg-transparent"
                          }`}
                          onClick={() => setPaymentMethod("mobile")}
                        >
                          <Smartphone className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Mobile Payment</p>
                            <p className="text-xs">Apple Pay, Google Pay</p>
                          </div>
                        </button>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Items:</span>
                          <span className="text-sm">
                            {currentOrder.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Subtotal:</span>
                          <span className="text-sm">
                            ₱{calculateSubtotal().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-3">
                      <Button className="flex-1" onClick={processPayment}>
                        Process Payment
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsPaymentModalOpen(false)}
                      >
                        Cancel
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Order Queue Content */}
      {activeTab === "queue" && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Walk-in Orders */}
          <Card>
            <CardHeader className="bg-amber-50 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Walk-in Orders
                  </CardTitle>
                  <CardDescription>Orders placed at counter</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-800 border-amber-200"
                >
                  {walkInOrders.length} Orders
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {walkInOrders.length > 0 ? (
                <div className="divide-y">
                  {walkInOrders.map(order => (
                    <div key={order.id} className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />{" "}
                            {formatTimeAgo(order.timeReceived)}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </div>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-md">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>
                              ₱{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              updateOrderStatus(order.id, "preparing")
                            }
                          >
                            Start Preparing
                          </Button>
                        )}

                        {order.status === "preparing" && (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => updateOrderStatus(order.id, "ready")}
                          >
                            Mark Ready
                          </Button>
                        )}

                        {order.status === "ready" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() =>
                              updateOrderStatus(order.id, "completed")
                            }
                          >
                            <Check className="h-4 w-4 mr-1" /> Complete Order
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Package className="h-10 w-10 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">
                    No walk-in orders in queue
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Online Orders */}
          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Online Orders
                  </CardTitle>
                  <CardDescription>
                    Orders placed through app or website
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  {onlineOrders.length} Orders
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {onlineOrders.length > 0 ? (
                <div className="divide-y">
                  {onlineOrders.map(order => (
                    <div key={order.id} className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            #{order.orderNumber}
                          </h3>
                          <p className="text-sm font-medium">
                            {order.customerName}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />{" "}
                            {formatTimeAgo(order.timeReceived)}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </div>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-md">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>
                              ₱{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              updateOrderStatus(order.id, "preparing")
                            }
                          >
                            Start Preparing
                          </Button>
                        )}

                        {order.status === "preparing" && (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => updateOrderStatus(order.id, "ready")}
                          >
                            Mark Ready
                          </Button>
                        )}

                        {order.status === "ready" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() =>
                              updateOrderStatus(order.id, "completed")
                            }
                          >
                            <Check className="h-4 w-4 mr-1" /> Complete Order
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Smartphone className="h-10 w-10 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">
                    No online orders in queue
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics Overview */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Queue Statistics</CardTitle>
              <CardDescription>
                Overview of current order processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold">{orderQueue.length}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-yellow-800">Pending</p>
                  <p className="text-3xl font-bold text-yellow-800">
                    {orderQueue.filter(o => o.status === "pending").length}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-blue-800">Preparing</p>
                  <p className="text-3xl font-bold text-blue-800">
                    {orderQueue.filter(o => o.status === "preparing").length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-green-800">Ready</p>
                  <p className="text-3xl font-bold text-green-800">
                    {orderQueue.filter(o => o.status === "ready").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default POS
