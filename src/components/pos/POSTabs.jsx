import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuSelection from '@/components/pos/MenuSelection';
import CurrentOrder from '@/components/pos/CurrentOrder';
import OrderQueue from '@/components/pos/OrderQueue';
import PaymentModal from '@/components/pos/PaymentModal';
import DiscountModal from '@/components/pos/DiscountModal';
import OrderHistoryModal from '@/components/pos/OrderHistoryModal';
import { usePOS } from './POSProvider';

const POSTabs = () => {
  const {
    activeTab,
    setActiveTab,
    categories,
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    addToOrder,
    currentOrder,
    discount,
    updateQuantity,
    removeFromOrder,
    clearOrder,
    removeDiscount,
    calculateSubtotal,
    calculateDiscountAmount,
    calculateTotal,
    setIsPaymentModalOpen,
    setIsDiscountModalOpen,
    setIsOrderHistoryModalOpen,
    orderQueue,
    updateOrderStatus,
    isPaymentModalOpen,
    paymentMethod,
    setPaymentMethod,
    processPayment,
    isDiscountModalOpen,
    discountInput,
    setDiscountInput,
    discountType,
    setDiscountType,
    applyDiscount,
    isOrderHistoryModalOpen,
    orderHistory,
  } = usePOS();

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="pos">Point of Sale</TabsTrigger>
          <TabsTrigger value="queue">Order Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="pos">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <MenuSelection
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAddToOrder={addToOrder}
            />

            <CurrentOrder
              currentOrder={currentOrder}
              discount={discount}
              onUpdateQuantity={updateQuantity}
              onRemoveFromOrder={removeFromOrder}
              onClearOrder={clearOrder}
              onRemoveDiscount={removeDiscount}
              calculateSubtotal={calculateSubtotal}
              calculateDiscountAmount={calculateDiscountAmount}
              calculateTotal={calculateTotal}
              onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
              onOpenDiscountModal={() => setIsDiscountModalOpen(true)}
              onOpenHistoryModal={() => setIsOrderHistoryModalOpen(true)}
            />
          </div>
        </TabsContent>

        <TabsContent value="queue">
          <OrderQueue
            orderQueue={orderQueue}
            updateOrderStatus={updateOrderStatus}
          />
        </TabsContent>
      </Tabs>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        currentOrder={currentOrder}
        discount={discount}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onProcessPayment={processPayment}
        calculateSubtotal={calculateSubtotal}
        calculateDiscountAmount={calculateDiscountAmount}
        calculateTotal={calculateTotal}
      />

      <DiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        discountInput={discountInput}
        setDiscountInput={setDiscountInput}
        discountType={discountType}
        setDiscountType={setDiscountType}
        onApplyDiscount={applyDiscount}
        calculateSubtotal={calculateSubtotal}
      />

      <OrderHistoryModal
        isOpen={isOrderHistoryModalOpen}
        onClose={() => setIsOrderHistoryModalOpen(false)}
        orderHistory={orderHistory}
      />
    </>
  );
};

export default POSTabs;