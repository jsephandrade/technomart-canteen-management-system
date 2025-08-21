import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreVertical, UserPlus, Edit, Trash2, Search, Shield, UserCheck, UserX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([
        {
            id: '1',
            name: 'Admin User',
            email: 'admin@canteen.com',
            role: 'admin'
        },
        {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah@canteen.com',
            role: 'manager'
        },
        {
            id: '3',
            name: 'Miguel Rodriguez',
            email: 'miguel@canteen.com',
            role: 'staff'
        },
        {
            id: '4',
            name: 'Aisha Patel',
            email: 'aisha@canteen.com',
            role: 'cashier'
        },
        {
            id: '5',
            name: 'David Chen',
            email: 'david@canteen.com',
            role: 'staff'
        }
    ]);
    const [roles] = useState([
        { label: 'Admin', value: 'admin', description: 'Full access to all settings and functions' },
        { label: 'Manager', value: 'manager', description: 'Can manage most settings and view reports' },
        { label: 'Staff', value: 'staff', description: 'Kitchen and service staff access' },
        { label: 'Cashier', value: 'cashier', description: 'POS and payment access only' }
    ]);
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const getRoleBadgeVariant = (role) => {
        switch (role) {
            case 'admin': return 'destructive';
            case 'manager': return 'default';
            case 'staff': return 'secondary';
            case 'cashier': return 'outline';
            default: return 'secondary';
        }
    };
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };
    return (<div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and access</CardDescription>
            </div>
            <Button size="sm" className="flex gap-1">
              <UserPlus className="h-4 w-4 mr-1"/>
              Add User
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
              <Input type="search" placeholder="Search users..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left font-medium">User</th>
                      <th className="h-10 px-4 text-left font-medium">Role</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                      <th className="h-10 px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (filteredUsers.map((user) => (<tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center">
                              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                              <span className="text-sm">Active</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4"/>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4"/> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="mr-2 h-4 w-4"/> Change Role
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <UserX className="mr-2 h-4 w-4"/> Deactivate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4"/> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>))) : (<tr>
                        <td colSpan={4} className="h-24 text-center">
                          No users found
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t py-3">
            <div className="text-xs text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Configure user roles and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (<div key={role.value} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <h4 className="font-medium capitalize">{role.label}</h4>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1"/> Configure
                  </Button>
                </div>))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Currently active system users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {users.map((user, index) => (index < 5 && (<div key={user.id} className="flex items-center gap-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className="flex gap-1 items-center">
                      <UserCheck className="h-3 w-3"/> {user.name.split(' ')[0]}
                    </Badge>
                  </div>)))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
};
export default Users;
