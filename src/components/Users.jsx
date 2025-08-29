import React, { useState } from 'react';
import { CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import UserListHeader from './users/UserListHeader';
import UserTableRow from './users/UserTableRow';
import RoleManagement from './users/RoleManagement';
import ActiveUsersSidebar from './users/ActiveUsersSidebar';
import { AddUserModal } from './users/AddUserModal';
import { EditUserModal } from './users/EditUserModal';
import { RoleConfigModal } from './users/RoleConfigModal';

const Users = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@canteen.com',
      role: 'admin',
      status: 'active',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@canteen.com',
      role: 'manager',
      status: 'active',
    },
    {
      id: '3',
      name: 'Miguel Rodriguez',
      email: 'miguel@canteen.com',
      role: 'staff',
      status: 'active',
    },
    {
      id: '4',
      name: 'Aisha Patel',
      email: 'aisha@canteen.com',
      role: 'cashier',
      status: 'active',
    },
    {
      id: '5',
      name: 'David Chen',
      email: 'david@canteen.com',
      role: 'staff',
      status: 'active',
    },
  ]);

  const [roles] = useState([
    {
      label: 'Admin',
      value: 'admin',
      description: 'Full access to all settings and functions',
    },
    {
      label: 'Manager',
      value: 'manager',
      description: 'Can manage most settings and view reports',
    },
    {
      label: 'Staff',
      value: 'staff',
      description: 'Kitchen and service staff access',
    },
    {
      label: 'Cashier',
      value: 'cashier',
      description: 'POS and payment access only',
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'manager':
        return 'default';
      case 'staff':
        return 'secondary';
      case 'cashier':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleAddUser = (newUser) => {
    const user = {
      ...newUser,
      id: (users.length + 1).toString(),
      status: 'active',
    };
    setUsers([...users, user]);
    toast({
      title: 'User Added',
      description: `${user.name} has been added successfully.`,
    });
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    toast({
      title: 'User Updated',
      description: `${updatedUser.name}'s information has been updated.`,
    });
  };

  const handleDeleteUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setUsers(users.filter((u) => u.id !== userId));
    toast({
      title: 'User Deleted',
      description: `${user?.name} has been removed from the system.`,
      variant: 'destructive',
    });
  };

  const handleDeactivateUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setUsers(
        users.map((u) =>
          u.id === userId
            ? { ...u, status: u.status === 'active' ? 'deactivated' : 'active' }
            : u
        )
      );
      const newStatus = user.status === 'active' ? 'deactivated' : 'activated';
      toast({
        title: `User ${
          newStatus === 'deactivated' ? 'Deactivated' : 'Activated'
        }`,
        description: `${user.name} has been ${newStatus}.`,
      });
    }
  };

  const handleConfigureRole = (role) => {
    setSelectedRole(role);
    setShowRoleModal(true);
  };

  const handleUpdateRole = (updatedRole) => {
    toast({
      title: 'Role Updated',
      description: `${updatedRole.label} role configuration has been updated.`,
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <UserListHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddUser={() => setShowAddModal(true)}
        />
        
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      getRoleBadgeVariant={getRoleBadgeVariant}
                      getInitials={getInitials}
                      onEdit={(user) => {
                        setSelectedUser(user);
                        setShowEditModal(true);
                      }}
                      onDeactivate={handleDeactivateUser}
                      onDelete={handleDeleteUser}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="h-24 text-center">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <CardFooter className="border-t py-3">
          <div className="text-xs text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardFooter>
      </div>

      <div className="space-y-4">
        <RoleManagement roles={roles} onConfigureRole={handleConfigureRole} />
        <ActiveUsersSidebar users={users} getInitials={getInitials} />
      </div>

      <AddUserModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAddUser={handleAddUser}
      />

      <EditUserModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
      />

      <RoleConfigModal
        open={showRoleModal}
        onOpenChange={setShowRoleModal}
        role={selectedRole}
        onUpdateRole={handleUpdateRole}
      />
    </div>
  );
};

export default Users;
