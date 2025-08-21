
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CustomBadge } from '@/components/ui/custom-badge';
import { 
  Receipt, 
  Download, 
  Print,
  CreditCard,
  Banknote,
  Smartphone,
  CircleDollarSign
} from 'lucide-react';

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  date: string;
  method: 'cash' | 'card' | 'mobile';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  customer?: string;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onOpenChange,
  payment
}) => {
  if (!payment) return null;

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash': return <Banknote className="h-4 w-4" />;
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      default: return <CircleDollarSign className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      case 'refunded': return 'outline';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simulate download functionality
    console.log('Downloading receipt for:', payment.orderId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment Receipt
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h3 className="font-bold text-lg">Restaurant POS</h3>
            <p className="text-sm text-muted-foreground">
              123 Main Street, City, State 12345
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: (555) 123-4567
            </p>
          </div>

          <Separator />

          {/* Receipt Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Receipt #:</span>
              <span className="font-mono">{payment.orderId}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Date & Time:</span>
              <span className="text-sm">{formatDate(payment.date)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Customer:</span>
              <span>{payment.customer || 'Walk-in Customer'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Payment Method:</span>
              <div className="flex items-center gap-2">
                {getPaymentMethodIcon(payment.method)}
                <span className="capitalize">{payment.method}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Status:</span>
              <CustomBadge variant={getStatusBadgeVariant(payment.status)} className="capitalize">
                {payment.status}
              </CustomBadge>
            </div>
          </div>

          <Separator />

          {/* Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount:</span>
              <span>₱{payment.amount.toFixed(2)}</span>
            </div>
            
            {payment.status === 'refunded' && (
              <div className="flex justify-between items-center text-sm text-destructive">
                <span>Refunded:</span>
                <span>-₱{payment.amount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>Thank you for your business!</p>
            <p className="mt-1">Have a great day!</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handlePrint}
            >
              <Print className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
