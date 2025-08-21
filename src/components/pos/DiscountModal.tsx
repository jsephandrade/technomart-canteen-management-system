
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Percent, DollarSign, X } from 'lucide-react';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  discountInput: string;
  setDiscountInput: (value: string) => void;
  discountType: 'percentage' | 'fixed';
  setDiscountType: (type: 'percentage' | 'fixed') => void;
  onApplyDiscount: () => void;
  calculateSubtotal: () => number;
}

const DiscountModal: React.FC<DiscountModalProps> = ({
  isOpen,
  onClose,
  discountInput,
  setDiscountInput,
  discountType,
  setDiscountType,
  onApplyDiscount,
  calculateSubtotal,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setDiscountInput('');
  };

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Apply Discount</CardTitle>
            <CardDescription>Enter discount details</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <button
              className={`flex-1 p-3 rounded-md border text-sm ${discountType === 'percentage' ? 'bg-primary text-primary-foreground' : 'bg-transparent'}`}
              onClick={() => setDiscountType('percentage')}
            >
              <Percent className="h-4 w-4 mx-auto mb-1" />
              Percentage
            </button>
            <button
              className={`flex-1 p-3 rounded-md border text-sm ${discountType === 'fixed' ? 'bg-primary text-primary-foreground' : 'bg-transparent'}`}
              onClick={() => setDiscountType('fixed')}
            >
              <DollarSign className="h-4 w-4 mx-auto mb-1" />
              Fixed Amount
            </button>
          </div>
          
          <div>
            <Input
              type="number"
              placeholder={discountType === 'percentage' ? 'Enter percentage (0-100)' : 'Enter amount (₱)'}
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              min="0"
              max={discountType === 'percentage' ? '100' : undefined}
            />
          </div>
          
          {discountInput && (
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm">
                <strong>Preview:</strong>
              </p>
              <p className="text-sm">
                Subtotal: ₱{calculateSubtotal().toFixed(2)}
              </p>
              <p className="text-sm text-green-600">
                Discount: -₱{(() => {
                  const value = parseFloat(discountInput) || 0;
                  const subtotal = calculateSubtotal();
                  if (discountType === 'percentage') {
                    return ((subtotal * value) / 100).toFixed(2);
                  } else {
                    return Math.min(value, subtotal).toFixed(2);
                  }
                })()}
              </p>
              <p className="text-sm font-semibold">
                Total: ₱{(() => {
                  const value = parseFloat(discountInput) || 0;
                  const subtotal = calculateSubtotal();
                  let discountAmount = 0;
                  if (discountType === 'percentage') {
                    discountAmount = (subtotal * value) / 100;
                  } else {
                    discountAmount = Math.min(value, subtotal);
                  }
                  return Math.max(0, subtotal - discountAmount).toFixed(2);
                })()}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button className="flex-1" onClick={onApplyDiscount}>
            Apply Discount
          </Button>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DiscountModal;
