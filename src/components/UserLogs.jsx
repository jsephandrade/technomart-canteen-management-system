import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Search, Download, AlertTriangle, Clock, Filter, ShieldAlert, UserCog, LogIn, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const UserLogs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLogType, setSelectedLogType] = useState('all');
    const [timeRange, setTimeRange] = useState('24h');
    const [logs, setLogs] = useState([
        {
            id: '1',
            action: 'User Login',
            user: 'admin@canteen.com',
            timestamp: '2025-04-17 09:32:15',
            details: 'Successful login from IP 192.168.1.105',
            type: 'login'
        },
        {
            id: '2',
            action: 'Menu Item Added',
            user: 'sarah@canteen.com',
            timestamp: '2025-04-17 10:15:22',
            details: 'Added new menu item "Grilled Chicken Sandwich" to lunch menu',
            type: 'action'
        },
        {
            id: '3',
            action: 'Inventory Updated',
            user: 'miguel@canteen.com',
            timestamp: '2025-04-17 11:25:40',
            details: 'Updated stock levels for Rice (-5kg) and Tomatoes (-2kg)',
            type: 'action'
        },
        {
            id: '4',
            action: 'Payment Processed',
            user: 'aisha@canteen.com',
            timestamp: '2025-04-17 12:10:05',
            details: 'Processed card payment of $45.75 for order #1289',
            type: 'action'
        },
        {
            id: '5',
            action: 'Failed Login Attempt',
            user: 'unknown',
            timestamp: '2025-04-17 13:27:51',
            details: 'Failed login attempt for admin@canteen.com from IP 203.45.67.89',
            type: 'security'
        },
        {
            id: '6',
            action: 'System Backup',
            user: 'system',
            timestamp: '2025-04-17 14:00:00',
            details: 'Automated system backup completed successfully',
            type: 'system'
        },
        {
            id: '7',
            action: 'User Role Changed',
            user: 'admin@canteen.com',
            timestamp: '2025-04-17 14:55:12',
            details: 'Changed role for david@canteen.com from Staff to Cashier',
            type: 'security'
        }
    ]);
    const getActionIcon = (type) => {
        switch (type) {
            case 'login': return <LogIn className="h-4 w-4"/>;
            case 'security': return <ShieldAlert className="h-4 w-4"/>;
            case 'system': return <Settings className="h-4 w-4"/>;
            case 'action': return <UserCog className="h-4 w-4"/>;
            default: return <FileText className="h-4 w-4"/>;
        }
    };
    const getActionColor = (type) => {
        switch (type) {
            case 'login': return 'bg-blue-100 text-blue-800';
            case 'security': return 'bg-red-100 text-red-800';
            case 'system': return 'bg-gray-100 text-gray-800';
            case 'action': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const filteredLogs = logs.filter(log => {
        // Filter by search term
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase());
        // Filter by log type
        const matchesType = selectedLogType === 'all' || log.type === selectedLogType;
        return matchesSearch && matchesType;
    });
    // Sort logs by timestamp (most recent first)
    const sortedLogs = [...filteredLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return (<div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>Track system and user activities</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4 mr-1"/> Export
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4 mr-1"/> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                <Input type="search" placeholder="Search logs..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>
              
              <Select value={selectedLogType} onValueChange={setSelectedLogType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Log Type"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="action">User Actions</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time Range"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left font-medium">Action</th>
                      <th className="h-10 px-4 text-left font-medium">User</th>
                      <th className="h-10 px-4 text-left font-medium">Timestamp</th>
                      <th className="h-10 px-4 text-left font-medium hidden md:table-cell">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLogs.length > 0 ? (sortedLogs.map((log) => (<tr key={log.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <div className={`rounded-full p-1 ${getActionColor(log.type)}`}>
                                {getActionIcon(log.type)}
                              </div>
                              <span>{log.action}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{log.user}</td>
                          <td className="p-4 align-middle whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3"/>
                              {log.timestamp}
                            </div>
                          </td>
                          <td className="p-4 align-middle hidden md:table-cell">
                            <span className="line-clamp-1">{log.details}</span>
                          </td>
                        </tr>))) : (<tr>
                        <td colSpan={4} className="h-24 text-center">
                          No logs found matching your criteria
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t py-3">
            <div className="text-xs text-muted-foreground">
              Showing {filteredLogs.length} of {logs.length} logs
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Important security notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5"/>
              <div>
                <h4 className="font-medium text-red-900">Failed Login Attempts</h4>
                <p className="text-sm text-red-700">Multiple failed login attempts detected for admin account from unknown IP address</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="destructive">Block IP</Button>
                  <Button size="sm" variant="outline">Dismiss</Button>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5"/>
                <div>
                  <h4 className="font-medium text-amber-900">Password Expiring</h4>
                  <p className="text-sm text-amber-700">2 user passwords will expire in the next 7 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Log Summary</CardTitle>
            <CardDescription>Activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>
              <TabsContent value="today">
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3 flex flex-col items-center">
                      <LogIn className="h-8 w-8 text-blue-500 mb-1"/>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs text-muted-foreground">Logins</div>
                    </div>
                    <div className="rounded-lg border p-3 flex flex-col items-center">
                      <UserCog className="h-8 w-8 text-green-500 mb-1"/>
                      <div className="text-2xl font-bold">28</div>
                      <div className="text-xs text-muted-foreground">Actions</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3 flex flex-col items-center">
                      <ShieldAlert className="h-8 w-8 text-red-500 mb-1"/>
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Security</div>
                    </div>
                    <div className="rounded-lg border p-3 flex flex-col items-center">
                      <Settings className="h-8 w-8 text-gray-500 mb-1"/>
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs text-muted-foreground">System</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="week" className="pt-4">
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Weekly log statistics</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="month" className="pt-4">
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Monthly log statistics</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>);
};
export default UserLogs;
