import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, UserX, Trash2 } from 'lucide-react';

const UserTableRow = ({ user, getRoleBadgeVariant, getInitials, onEdit, onDeactivate, onDelete }) => {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 align-middle">
        <Badge
          variant={getRoleBadgeVariant(user.role)}
          className="capitalize"
        >
          {user.role}
        </Badge>
      </td>
      <td className="p-4 align-middle">
        <div className="flex items-center">
          <div
            className={`mr-2 h-2.5 w-2.5 rounded-full ${
              user.status === 'active'
                ? 'bg-green-500'
                : 'bg-red-500'
            }`}
          ></div>
          <span className="text-sm capitalize">
            {user.status}
          </span>
        </div>
      </td>
      <td className="p-4 align-middle text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(user)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeactivate(user.id)}>
              <UserX className="mr-2 h-4 w-4" />
              {user.status === 'active' ? 'Deactivate' : 'Activate'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(user.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default UserTableRow;