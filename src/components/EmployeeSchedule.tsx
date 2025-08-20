
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEmployees, useSchedule } from '@/hooks/useEmployees';
import { Employee, ScheduleEntry } from '@/types';
import { Plus, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';

const EmployeeSchedule: React.FC = () => {
  const { employees = [], loading: employeesLoading, addEmployee } = useEmployees();
  const { schedule = [], loading: scheduleLoading, updateScheduleEntry } = useSchedule();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    hourlyRate: 0,
    contact: ''
  });

  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.contact) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addEmployee(newEmployee);
      setNewEmployee({ name: '', position: '', hourlyRate: 0, contact: '' });
      setShowAddEmployee(false);
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (employeesLoading || scheduleLoading) {
    return <div className="flex items-center justify-center h-64">Loading employee data...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Employee Schedule</h2>
        <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  placeholder="Employee name"
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                  placeholder="Job position"
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate (₱)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={newEmployee.hourlyRate}
                  onChange={(e) => setNewEmployee({ ...newEmployee, hourlyRate: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  value={newEmployee.contact}
                  onChange={(e) => setNewEmployee({ ...newEmployee, contact: e.target.value })}
                  placeholder="Phone number or email"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddEmployee(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmployee}>Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee List */}
        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription>Manage your team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employees.length > 0 ? employees.map(employee => (
                <div 
                  key={employee.id} 
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{employee.name}</h4>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                      <p className="text-xs text-muted-foreground">₱{employee.hourlyRate}/hr</p>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-center py-4 text-muted-foreground">No employees found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Grid */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Weekly Schedule
            </CardTitle>
            <CardDescription>
              {selectedEmployee ? `Schedule for ${selectedEmployee.name}` : 'Select an employee to view schedule'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedEmployee ? (
              <div className="space-y-4">
                {daysOfWeek.map(day => {
                  const daySchedule = schedule.filter(
                    s => s.employeeId === selectedEmployee.id && s.day === day
                  );
                  
                  return (
                    <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-20">
                          <span className="font-medium">{day}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {daySchedule.length > 0 ? (
                            <span className="text-sm">
                              {daySchedule[0].startTime} - {daySchedule[0].endTime}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not scheduled</span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select an employee to view and edit their schedule</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Employee Details */}
      {selectedEmployee && (
        <Card>
          <CardHeader>
            <CardTitle>Employee Details</CardTitle>
            <CardDescription>Information for {selectedEmployee.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                <p className="mt-1">{selectedEmployee.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Position</Label>
                <p className="mt-1">{selectedEmployee.position}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Hourly Rate</Label>
                <p className="mt-1">₱{selectedEmployee.hourlyRate.toFixed(2)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Contact</Label>
                <p className="mt-1">{selectedEmployee.contact}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeSchedule;
