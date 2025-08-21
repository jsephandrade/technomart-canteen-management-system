
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, UserCheck, Clock, X } from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  role: string;
  hourlyRate: number;
  available: boolean;
}

interface CateringEvent {
  id: string;
  name: string;
  client: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  total: number;
  contactPerson: {
    name: string;
    phone: string;
  };
}

interface StaffAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CateringEvent | null;
  onAssignStaff: (eventId: string, staffIds: string[]) => void;
}

export const StaffAssignmentModal: React.FC<StaffAssignmentModalProps> = ({
  open,
  onOpenChange,
  event,
  onAssignStaff
}) => {
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);

  // Mock staff data
  const availableStaff: Staff[] = [
    { id: '1', name: 'Sarah Johnson', role: 'Head Chef', hourlyRate: 25, available: true },
    { id: '2', name: 'Mike Chen', role: 'Sous Chef', hourlyRate: 20, available: true },
    { id: '3', name: 'Lisa Rodriguez', role: 'Server', hourlyRate: 15, available: true },
    { id: '4', name: 'David Kim', role: 'Server', hourlyRate: 15, available: false },
    { id: '5', name: 'Emma Wilson', role: 'Bartender', hourlyRate: 18, available: true },
    { id: '6', name: 'James Brown', role: 'Server', hourlyRate: 15, available: true }
  ];

  const handleStaffToggle = (staffId: string) => {
    setSelectedStaff(prev => 
      prev.includes(staffId)
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleAssign = () => {
    if (event) {
      onAssignStaff(event.id, selectedStaff);
      onOpenChange(false);
      setSelectedStaff([]);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Staff Assignment</span>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{event.name} - {event.date}</p>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Available Staff
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableStaff.map((staff) => (
                <div 
                  key={staff.id} 
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${
                    staff.available ? 'hover:bg-muted/50 cursor-pointer' : 'opacity-50'
                  }`}
                  onClick={() => staff.available && handleStaffToggle(staff.id)}
                >
                  <Checkbox
                    checked={selectedStaff.includes(staff.id)}
                    disabled={!staff.available}
                    onCheckedChange={() => staff.available && handleStaffToggle(staff.id)}
                  />
                  <Avatar>
                    <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{staff.name}</p>
                      <Badge variant="outline" className="text-xs">{staff.role}</Badge>
                      {!staff.available && (
                        <Badge variant="destructive" className="text-xs">Unavailable</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>${staff.hourlyRate}/hour</span>
                    </div>
                  </div>
                  {selectedStaff.includes(staff.id) && (
                    <UserCheck className="h-4 w-4 text-primary" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {selectedStaff.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Selected Staff ({selectedStaff.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedStaff.map(staffId => {
                    const staff = availableStaff.find(s => s.id === staffId);
                    return staff ? (
                      <div key={staff.id} className="flex items-center justify-between p-2 bg-primary/5 rounded">
                        <span className="font-medium">{staff.name}</span>
                        <span className="text-sm text-muted-foreground">{staff.role}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={selectedStaff.length === 0}>
            Assign Staff ({selectedStaff.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
