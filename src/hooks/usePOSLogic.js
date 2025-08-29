import { useState } from 'react';
import ImagePlaceholder from '@/assets/placeholder.svg';

export const usePOSLogic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentOrder, setCurrentOrder] = useState([]);
  const [discount, setDiscount] = useState({ type: 'percentage', value: 0 });
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState(false);
  const [discountInput, setDiscountInput] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [activeCategory, setActiveCategory] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pos');

  // Order history data
  const [orderHistory] = useState([
    {
      id: 'h001',
      orderNumber: 'W-045',
      items: [
        { id: 'hi1', menuItemId: '1', name: 'Bam-i', price: 30, quantity: 2 },
        { id: 'hi2', menuItemId: '8', name: 'Coke', price: 20, quantity: 1 },
      ],
      total: 80,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      paymentMethod: 'Cash',
    },
    {
      id: 'h002',
      orderNumber: 'W-044',
      items: [
        {
          id: 'hi3',
          menuItemId: '11',
          name: 'Rice + Vegetable + Lumpia',
          price: 45,
          quantity: 1,
        },
      ],
      total: 45,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      paymentMethod: 'Card',
    },
    {
      id: 'h003',
      orderNumber: 'W-043',
      items: [
        {
          id: 'hi4',
          menuItemId: '5',
          name: 'Ginaling',
          price: 60,
          quantity: 1,
        },
        { id: 'hi5', menuItemId: '2', name: 'Bihon', price: 20, quantity: 2 },
      ],
      total: 100,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      paymentMethod: 'Mobile',
    },
  ]);

  // Categories and menu data
  const [categories] = useState([
    {
      id: '1',
      name: 'Noodles',
      items: [
        {
          id: '1',
          name: 'Bam-i',
          description: 'A festive noodle dish with canton & bihon.',
          price: 30,
          category: 'Noodles',
          available: true,
          image: ImagePlaceholder,
        },
        {
          id: '2',
          name: 'Bihon',
          description: 'Stir-fried vermicelli rice noodles.',
          price: 20,
          category: 'Noodles',
          available: true,
          image: ImagePlaceholder,
        },
      ],
    },
    {
      id: '2',
      name: 'Main Dish',
      items: [
        {
          id: '3',
          name: 'Pork Chop',
          description: 'Grilled marinated pork chop.',
          price: 50,
          category: 'Main Dish',
          available: true,
          image: ImagePlaceholder,
        },
        {
          id: '4',
          name: 'Longganisa',
          description: 'Sweet and savory Filipino sausage.',
          price: 15,
          category: 'Main Dish',
          available: true,
          image: ImagePlaceholder,
        },
        {
          id: '5',
          name: 'Ginaling',
          description: 'Ground pork cooked in tomato sauce.',
          price: 60,
          category: 'Main Dish',
          available: true,
          image: ImagePlaceholder,
        },
      ],
    },
    {
      id: '3',
      name: 'Drinks',
      items: [
        {
          id: '6',
          name: 'Water',
          description: 'Purified drinking water.',
          price: 10,
          category: 'Drinks',
          available: true,
          image: ImagePlaceholder,
        },
        {
          id: '7',
          name: 'Juice',
          description: 'Freshly squeezed juice.',
          price: 25,
          category: 'Drinks',
          available: true,
          image: ImagePlaceholder,
        },
        {
          id: '8',
          name: 'Coke',
          description: 'Coca-cola softdrink.',
          price: 20,
          category: 'Drinks',
          available: true,
          image: ImagePlaceholder,
        },
      ],
    },
    {
      id: '4',
      name: 'Others',
      items: [
        {
          id: '9',
          name: 'Siopao',
          description: 'Steamed bun with savory filling.',
          price: 35,
          category: 'Others',
          available: true,
          image: ImagePlaceholder,
        },
        {
          id: '10',
          name: 'Siomai',
          description: 'Steamed dumpling with pork and shrimp.',
          price: 40,
          category: 'Others',
          available: true,
          image: ImagePlaceholder,
        },
        {
          id: '11',
          name: 'Rice + Vegetable + Lumpia',
          description: 'Value meal with rice, vegetable dish and lumpia.',
          price: 45,
          category: 'Others',
          available: true,
          image: ImagePlaceholder,
        },
      ],
    },
  ]);

  // Order queue data
  const [orderQueue, setOrderQueue] = useState([
    {
      id: '1001',
      orderNumber: 'W-001',
      type: 'walk-in',
      items: [
        { id: 'oi1', menuItemId: '1', name: 'Bam-i', price: 30, quantity: 2 },
        {
          id: 'oi2',
          menuItemId: '4',
          name: 'Longganisa',
          price: 15,
          quantity: 1,
        },
      ],
      status: 'pending',
      timeReceived: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: '1002',
      orderNumber: 'W-002',
      type: 'online',
      items: [
        {
          id: 'oi3',
          menuItemId: '5',
          name: 'Ginaling',
          price: 60,
          quantity: 1,
        },
        { id: 'oi4', menuItemId: '8', name: 'Coke', price: 20, quantity: 2 },
      ],
      status: 'preparing',
      timeReceived: new Date(Date.now() - 10 * 60 * 1000),
    },
    {
      id: '1003',
      orderNumber: 'W-003',
      type: 'walk-in',
      items: [
        {
          id: 'oi5',
          menuItemId: '11',
          name: 'Rice + Vegetable + Lumpia',
          price: 45,
          quantity: 2,
        },
      ],
      status: 'ready',
      timeReceived: new Date(Date.now() - 20 * 60 * 1000),
    },
  ]);

  // Business logic functions
  const addToOrder = (menuItem) => {
    setCurrentOrder((prevOrder) => {
      const existingItemIndex = prevOrder.findIndex(
        (item) => item.menuItemId === menuItem.id
      );

      if (existingItemIndex !== -1) {
        const updatedOrder = [...prevOrder];
        updatedOrder[existingItemIndex].quantity += 1;
        return updatedOrder;
      } else {
        return [
          ...prevOrder,
          {
            id: `order-item-${Date.now()}`,
            menuItemId: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  const updateQuantity = (orderItemId, change) => {
    setCurrentOrder((prevOrder) => {
      const updatedOrder = prevOrder.map((item) => {
        if (item.id === orderItemId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      });
      return updatedOrder;
    });
  };

  const removeFromOrder = (orderItemId) => {
    setCurrentOrder((prevOrder) =>
      prevOrder.filter((item) => item.id !== orderItemId)
    );
  };

  const clearOrder = () => {
    setCurrentOrder([]);
    setDiscount({ type: 'percentage', value: 0 });
  };

  const calculateSubtotal = () => {
    return currentOrder.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (discount.type === 'percentage') {
      return (subtotal * discount.value) / 100;
    } else {
      return Math.min(discount.value, subtotal);
    }
  };

  const calculateTotal = () => {
    return Math.max(0, calculateSubtotal() - calculateDiscountAmount());
  };

  const applyDiscount = () => {
    const value = parseFloat(discountInput);
    if (isNaN(value) || value < 0) {
      alert('Please enter a valid discount value');
      return;
    }

    if (discountType === 'percentage' && value > 100) {
      alert('Percentage discount cannot exceed 100%');
      return;
    }

    setDiscount({ type: discountType, value });
    setIsDiscountModalOpen(false);
    setDiscountInput('');
  };

  const removeDiscount = () => {
    setDiscount({ type: 'percentage', value: 0 });
  };

  const processPayment = () => {
    alert(
      `Payment of ₱${calculateTotal().toFixed(
        2
      )} processed via ${paymentMethod}`
    );
    clearOrder();
    setIsPaymentModalOpen(false);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrderQueue((prevQueue) =>
      prevQueue.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return {
    // State
    searchTerm,
    setSearchTerm,
    currentOrder,
    discount,
    isDiscountModalOpen,
    setIsDiscountModalOpen,
    isOrderHistoryModalOpen,
    setIsOrderHistoryModalOpen,
    discountInput,
    setDiscountInput,
    discountType,
    setDiscountType,
    activeCategory,
    setActiveCategory,
    paymentMethod,
    setPaymentMethod,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    activeTab,
    setActiveTab,
    orderHistory,
    categories,
    orderQueue,
    
    // Functions
    addToOrder,
    updateQuantity,
    removeFromOrder,
    clearOrder,
    calculateSubtotal,
    calculateDiscountAmount,
    calculateTotal,
    applyDiscount,
    removeDiscount,
    processPayment,
    updateOrderStatus,
  };
};
