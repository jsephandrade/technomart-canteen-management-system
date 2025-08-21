import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Users, MapPin, User, Phone, Utensils, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { MenuSelectionModal } from './MenuSelectionModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NewEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateEvent: (event: any) => void;
}

interface SelectedMenuItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const menuItems = [
  { id: '1', name: 'Caesar Salad', category: 'Appetizers', price: 12.50, description: 'Fresh romaine lettuce with parmesan', popular: true },
  { id: '2', name: 'Bruschetta', category: 'Appetizers', price: 8.99, description: 'Toasted bread with tomato and basil', popular: false },
  { id: '3', name: 'Grilled Chicken', category: 'Main Course', price: 18.99, description: 'Herb-marinated grilled chicken breast', popular: true },
  { id: '4', name: 'Beef Steak', category: 'Main Course', price: 24.99, description: 'Premium cut beef with garlic butter', popular: true },
  { id: '5', name: 'Chocolate Cake', category: 'Desserts', price: 6.99, description: 'Rich chocolate layer cake', popular: false },
  { id: '6', name: 'Tiramisu', category: 'Desserts', price: 7.99, description: 'Classic Italian dessert', popular: true },
];

export const NewEventModal: React.FC<NewEventModalProps> = ({
  open,
  onOpenChange,
  onCreateEvent
}) => {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    date: undefined as Date | undefined,
    startTime: '',
    endTime: '',
    location: '',
    attendees: '',
    contactName: '',
    contactPhone: '',
    notes: ''
  });

  const [selectedMenuItems, setSelectedMenuItems] = useState<SelectedMenuItem[]>([]);
  const [menuTotal, setMenuTotal] = useState(0);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  const downpaymentRequired = menuTotal * 0.5; // 50% downpayment

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.client || !formData.date || !formData.startTime || !formData.endTime) {
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      name: formData.name,
      client: formData.client,
      date: format(formData.date, 'yyyy-MM-dd'),
      time: `${formData.startTime} - ${formData.endTime}`,
      location: formData.location,
      attendees: parseInt(formData.attendees) || 0,
      status: 'scheduled' as const,
      total: menuTotal,
      menuItems: selectedMenuItems,
      downpayment: {
        required: downpaymentRequired,
        paid: parseFloat(paymentAmount) || 0,
        remaining: downpaymentRequired - (parseFloat(paymentAmount) || 0)
      },
      contactPerson: {
        name: formData.contactName,
        phone: formData.contactPhone
      }
    };

    onCreateEvent(newEvent);
    
    // Reset form
    setFormData({
      name: '',
      client: '',
      date: undefined,
      startTime: '',
      endTime: '',
      location: '',
      attendees: '',
      contactName: '',
      contactPhone: '',
      notes: ''
    });
    setSelectedMenuItems([]);
    setMenuTotal(0);
    setPaymentAmount('');
    
    onOpenChange(false);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMenuSelection = (items: SelectedMenuItem[], total: number) => {
    setSelectedMenuItems(items);
    setMenuTotal(total);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Catering Event</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Event Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-name">Event Name *</Label>
                <Input
                  id="event-name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Corporate Lunch Meeting"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => updateFormData('client', e.target.value)}
                  placeholder="ABC Technologies"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => updateFormData('date', date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time *</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateFormData('startTime', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time *</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateFormData('endTime', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  placeholder="Conference Room B, ABC Technologies HQ"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendees">Number of Attendees</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="attendees"
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => updateFormData('attendees', e.target.value)}
                  placeholder="25"
                  className="pl-10"
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Contact Person</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contact-name"
                    value={formData.contactName}
                    onChange={(e) => updateFormData('contactName', e.target.value)}
                    placeholder="John Smith"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData('contactPhone', e.target.value)}
                    placeholder="555-123-4567"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Menu Selection Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Menu Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowMenuModal(true)}
                    className="w-full"
                  >
                    <Utensils className="mr-2 h-4 w-4" />
                    {selectedMenuItems.length > 0 ? `Edit Menu Selection (${selectedMenuItems.length} items)` : 'Select Menu Items'}
                  </Button>
                  
                  {selectedMenuItems.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Selected Items:</h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {selectedMenuItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm p-2 bg-muted rounded">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t">
                        <span>Total Menu Cost:</span>
                        <span>${menuTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Downpayment Section */}
            {menuTotal > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Downpayment Required (50%)</Label>
                      <Input
                        value={`$${downpaymentRequired.toFixed(2)}`}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-amount">Amount Paid</Label>
                      <Input
                        id="payment-amount"
                        type="number"
                        step="0.01"
                        min="0"
                        max={downpaymentRequired}
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  {parseFloat(paymentAmount) > 0 && (
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex justify-between text-sm">
                        <span>Remaining Balance:</span>
                        <span className={downpaymentRequired - parseFloat(paymentAmount) <= 0 ? 'text-green-600' : 'text-orange-600'}>
                          ${Math.max(0, downpaymentRequired - parseFloat(paymentAmount)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                placeholder="Special dietary requirements, setup preferences, etc."
                rows={3}
              />
            </div>
            
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <MenuSelectionModal
        open={showMenuModal}
        onOpenChange={setShowMenuModal}
        onConfirm={handleMenuSelection}
        menuItems={menuItems}
      />
    </>
  );
};
