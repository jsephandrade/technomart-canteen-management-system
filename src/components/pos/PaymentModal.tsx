
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { OrderItem, Discount } from '@/types/pos';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOrder: OrderItem[];
  discount: Discount;
  paymentMethod: 'card' | 'cash' | 'mobile';
  setPaymentMethod: (method: 'card' | 'cash' | 'mobile') => void;
  onProcessPayment: () => void;
  calculateSubtotal: () => number;
  calculateDiscountAmount: () => number;
  calculateTotal: () => number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  currentOrder,
  discount,
  onProcessPayment,
  calculateSubtotal,
  calculateDiscountAmount,
  calculateTotal,
}) => {
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [change, setChange] = useState<number>(0);

  const totalAmount = calculateTotal();

  useEffect(() => {
    const payment = parseFloat(paymentAmount) || 0;
    const calculatedChange = payment - totalAmount;
    setChange(calculatedChange >= 0 ? calculatedChange : 0);
  }, [paymentAmount, totalAmount]);

  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setPaymentAmount(value);
    }
  };

  const isPaymentValid = () => {
    const payment = parseFloat(paymentAmount) || 0;
    return payment >= totalAmount;
  };

  const handleProcessPayment = () => {
    if (isPaymentValid()) {
      onProcessPayment();
      setPaymentAmount('');
      setChange(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Complete Payment</CardTitle>
            <CardDescription>Enter payment amount</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-3xl font-bold">₱{totalAmount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Total amount due</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="payment-amount" className="block text-sm font-medium mb-2">
                Payment Amount
              </label>
              <Input
                id="payment-amount"
                type="text"
                placeholder="0.00"
                value={paymentAmount}
                onChange={handlePaymentAmountChange}
                className="text-lg text-center"
              />
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-semibold text-green-600">₱{change.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Change</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Items:</span>
              <span className="text-sm">{currentOrder.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Subtotal:</span>
              <span className="text-sm">₱{calculateSubtotal().toFixed(2)}</span>
            </div>
            {discount.value > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-sm text-green-600">Discount:</span>
                <span className="text-sm text-green-600">-₱{calculateDiscountAmount().toFixed(2)}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button 
            className="flex-1" 
            onClick={handleProcessPayment}
            disabled={!isPaymentValid()}
          >
            Process Payment
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentModal;
