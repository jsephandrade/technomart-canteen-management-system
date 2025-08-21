import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, DollarSign, Smartphone, X } from "lucide-react"

const PaymentModal = ({
  isOpen,
  onClose,
  currentOrder,
  discount,
  paymentMethod,
  setPaymentMethod,
  onProcessPayment,
  calculateSubtotal,
  calculateDiscountAmount,
  calculateTotal
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Complete Payment</CardTitle>
            <CardDescription>Select payment method</CardDescription>
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
        <CardContent className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-3xl font-bold">₱{calculateTotal().toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Total amount due</p>
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
                {currentOrder.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Subtotal:</span>
              <span className="text-sm">₱{calculateSubtotal().toFixed(2)}</span>
            </div>
            {discount.value > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-sm text-green-600">Discount:</span>
                <span className="text-sm text-green-600">
                  -₱{calculateDiscountAmount().toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button className="flex-1" onClick={onProcessPayment}>
            Process Payment
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PaymentModal
