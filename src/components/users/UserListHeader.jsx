import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus } from 'lucide-react';

const UserListHeader = ({ searchTerm, setSearchTerm, onAddUser }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage system users and access</CardDescription>
        </div>
        <Button
          size="sm"
          className="flex gap-1"
          onClick={onAddUser}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Add User
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserListHeader;