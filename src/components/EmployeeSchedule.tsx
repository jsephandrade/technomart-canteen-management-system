import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { employees, scheduleData } from '@/utils/mockData';
import { ScheduleEntry, Employee } from '@/types';
import { CalendarDays, Edit, Plus, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const EmployeeSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(scheduleData);
  const [employeeList, setEmployeeList] = useState<Employee[]>(employees);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleEntry | null>(null);
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: '',
    position: '',
    hourlyRate: 0,
    contact: ''
  });
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [newScheduleEntry, setNewScheduleEntry] = useState<Partial<ScheduleEntry>>({
    employeeId: '',
    employeeName: '',
    day: '',
    startTime: '',
    endTime: ''
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAddSchedule = () => {
    if (!newScheduleEntry.employeeId || !newScheduleEntry.day || !newScheduleEntry.startTime || !newScheduleEntry.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const employee = employeeList.find(emp => emp.id === newScheduleEntry.employeeId);
    if (!employee) {
      toast.error('Employee not found');
      return;
    }

    const scheduleToAdd = {
      ...newScheduleEntry,
      id: `${schedule.length + 1}`,
      employeeName: employee.name
    } as ScheduleEntry;

    setSchedule([...schedule, scheduleToAdd]);
    setNewScheduleEntry({
      employeeId: '',
      employeeName: '',
      day: '',
      startTime: '',
      endTime: ''
    });

    setDialogOpen(false);
    toast.success('Schedule entry added successfully');
  };

  const handleEditSchedule = () => {
    if (!editingSchedule) return;

    const updatedSchedule = schedule.map(entry =>
      entry.id === editingSchedule.id ? editingSchedule : entry
    );

    setSchedule(updatedSchedule);
    setEditingSchedule(null);
    toast.success('Schedule updated successfully');
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedule(schedule.filter(entry => entry.id !== id));
    toast.success('Schedule entry deleted successfully');
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.contact) {
      toast.error('Please fill in all required fields');
      return;
    }

    const employeeToAdd = {
      ...newEmployee,
      id: `${employeeList.length + 1}`,
      hourlyRate: Number(newEmployee.hourlyRate),
      avatar: '/placeholder.svg'
    } as Employee;

    setEmployeeList([...employeeList, employeeToAdd]);
    setNewEmployee({
      name: '',
      position: '',
      hourlyRate: 0,
      contact: ''
    });

    setEmployeeDialogOpen(false);
    toast.success('Employee added successfully');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Employee</h2>
        <div className="flex gap-2">
          <Dialog open={employeeDialogOpen} onOpenChange={setEmployeeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Users size={14} /> Manage
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Add a new employee to your canteen staff.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">Position</Label>
                  <Input
                    id="position"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hourlyRate" className="text-right">Hourly Rate</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={newEmployee.hourlyRate}
                    onChange={(e) => setNewEmployee({ ...newEmployee, hourlyRate: parseFloat(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">Contact</Label>
                  <Input
                    id="contact"
                    value={newEmployee.contact}
                    onChange={(e) => setNewEmployee({ ...newEmployee, contact: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEmployeeDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddEmployee}>Add Employee</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1">
                <Plus size={14} /> Add Schedule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Schedule</DialogTitle>
                <DialogDescription>
                  Schedule an employee for a shift.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="employee" className="text-right">Employee</Label>
                  <Select 
                    onValueChange={(value) => setNewScheduleEntry({...newScheduleEntry, employeeId: value})}
                    value={newScheduleEntry.employeeId}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeeList.map(employee => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name} ({employee.position})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">Day</Label>
                  <Select 
                    onValueChange={(value) => setNewScheduleEntry({...newScheduleEntry, day: value})}
                    value={newScheduleEntry.day}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startTime" className="text-right">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newScheduleEntry.startTime}
                    onChange={(e) => setNewScheduleEntry({...newScheduleEntry, startTime: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endTime" className="text-right">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newScheduleEntry.endTime}
                    onChange={(e) => setNewScheduleEntry({...newScheduleEntry, endTime: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddSchedule}>Add Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Schedule</CardTitle>
              <CardDescription className="text-sm">
                Employee shifts for the current week
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  {/* Header Row */}
                  <div className="grid grid-cols-8 gap-1 mb-2 pb-1 border-b">
                    <div className="col-span-1 font-semibold text-left text-xs">Employee</div>
                    {daysOfWeek.map(day => (
                      <div key={day} className="text-center font-semibold text-xs">
                        {day.slice(0, 3)}
                      </div>
                    ))}
                  </div>
                  
                  {/* Schedule Rows */}
                  <div className="space-y-2">
                    {employeeList.map(employee => (
                      <div key={employee.id} className="grid grid-cols-8 gap-1 items-center min-h-[45px]">
                        <div className="col-span-1 flex items-center gap-1">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {employee.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <span className="font-medium text-xs truncate block">{employee.name}</span>
                            <span className="text-xs text-muted-foreground truncate block">{employee.position}</span>
                          </div>
                        </div>
                        
                        {daysOfWeek.map(day => {
                          const entry = schedule.find(s => 
                            s.employeeId === employee.id && s.day === day
                          );
                          
                          return (
                            <div key={day} className="flex items-center justify-center">
                              {entry ? (
                                <div className="bg-primary/10 border border-primary/20 p-1 rounded-md w-full text-xs">
                                  <div className="text-center font-medium mb-1 text-xs">
                                    {entry.startTime} - {entry.endTime}
                                  </div>
                                  <div className="flex gap-1 justify-center">
                                    <button 
                                      onClick={() => setEditingSchedule(entry)} 
                                      className="text-primary hover:text-primary/80 p-0.5"
                                      title="Edit schedule"
                                    >
                                      <Edit size={8} />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteSchedule(entry.id)} 
                                      className="text-destructive hover:text-destructive/80 p-0.5"
                                      title="Delete schedule"
                                    >
                                      <Trash2 size={8} />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="border-2 border-dashed border-muted rounded-md w-full h-8 flex items-center justify-center hover:border-primary/30 transition-colors">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0 hover:bg-primary/10" 
                                    onClick={() => {
                                      setNewScheduleEntry({
                                        employeeId: employee.id,
                                        day: day,
                                        startTime: '',
                                        endTime: ''
                                      });
                                      setDialogOpen(true);
                                    }}
                                    title={`Add schedule for ${day}`}
                                  >
                                    <Plus size={12} />
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Calendar View</CardTitle>
            <CardDescription className="text-sm">
              Monthly schedule overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md text-sm"
            />
            
            {date && (
              <div>
                <h4 className="font-medium mb-2 text-sm">
                  {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h4>
                <div className="space-y-2">
                  {schedule
                    .filter(entry => entry.day === date.toLocaleDateString('en-US', { weekday: 'long' }))
                    .map(entry => (
                      <div key={entry.id} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                        <div>
                          <p className="font-medium text-sm">{entry.employeeName}</p>
                          <p className="text-xs text-muted-foreground">{entry.startTime} - {entry.endTime}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{entry.day}</Badge>
                      </div>
                    ))}
                  
                  {schedule.filter(entry => entry.day === date.toLocaleDateString('en-US', { weekday: 'long' })).length === 0 && (
                    <p className="text-xs text-muted-foreground">No schedules for this day</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Employee Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Staff Overview</CardTitle>
          <CardDescription className="text-sm">
            Current team members and their positions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {employeeList.map(employee => (
              <div key={employee.id} className="bg-card border rounded-lg p-3 flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2 text-sm font-semibold">
                    {employee.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.position}</p>
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hourly Rate:</span>
                    <span>${employee.hourlyRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contact:</span>
                    <span className="truncate max-w-[100px]">{employee.contact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly Hours:</span>
                    <span>
                      {schedule
                        .filter(entry => entry.employeeId === employee.id)
                        .reduce((total, entry) => {
                          const start = new Date(`1970-01-01T${entry.startTime}`);
                          const end = new Date(`1970-01-01T${entry.endTime}`);
                          const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                          return total + diffHours;
                        }, 0).toFixed(1)}h
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingSchedule && (
        <Dialog open={!!editingSchedule} onOpenChange={(open) => !open && setEditingSchedule(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Schedule</DialogTitle>
              <DialogDescription>
                Update the employee's schedule.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-employee" className="text-right">Employee</Label>
                <Select 
                  onValueChange={(value) => {
                    const employee = employeeList.find(emp => emp.id === value);
                    setEditingSchedule({
                      ...editingSchedule, 
                      employeeId: value,
                      employeeName: employee?.name || ''
                    });
                  }}
                  value={editingSchedule.employeeId}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeList.map(employee => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} ({employee.position})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-day" className="text-right">Day</Label>
                <Select 
                  onValueChange={(value) => setEditingSchedule({...editingSchedule, day: value})}
                  value={editingSchedule.day}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-startTime" className="text-right">Start Time</Label>
                <Input
                  id="edit-startTime"
                  type="time"
                  value={editingSchedule.startTime}
                  onChange={(e) => setEditingSchedule({...editingSchedule, startTime: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-endTime" className="text-right">End Time</Label>
                <Input
                  id="edit-endTime"
                  type="time"
                  value={editingSchedule.endTime}
                  onChange={(e) => setEditingSchedule({...editingSchedule, endTime: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingSchedule(null)}>Cancel</Button>
              <Button onClick={handleEditSchedule}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmployeeSchedule;
