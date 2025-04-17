
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Catering: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Catering Management</CardTitle>
          <CardDescription>Handle catering orders and events</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This module helps manage catering events, special orders, and event planning.
            Schedule staff, coordinate menus, and track client requirements.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>View scheduled catering events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">No upcoming catering events scheduled.</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Catering Menu</CardTitle>
          <CardDescription>Special offerings for catering</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            View and modify your specialized catering menu options and packages.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Catering;
