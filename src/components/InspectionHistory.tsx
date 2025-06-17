
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface InspectionRecord {
  id: string;
  posterId: string;
  date: string;
  time: string;
  status: 'passed' | 'failed';
  failureType?: string;
  department: string;
  subcontractor: string;
  inspector: string;
  actions: string[];
}

export const InspectionHistory = ({ onInspectionSelect }: { onInspectionSelect: (inspection: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Mock data for demonstration
  const inspections: InspectionRecord[] = [
    {
      id: 'INS-001',
      posterId: 'PST-2024-0156',
      date: '2024-06-17',
      time: '09:23:45',
      status: 'failed',
      failureType: 'Damage Detection',
      department: 'Quality Control',
      subcontractor: 'Metro Displays Inc.',
      inspector: 'Sarah Johnson',
      actions: ['Notify Sub', 'Schedule Repair']
    },
    {
      id: 'INS-002',
      posterId: 'PST-2024-0157',
      date: '2024-06-17',
      time: '09:45:12',
      status: 'passed',
      department: 'Quality Control',
      subcontractor: 'Urban Vision Co.',
      inspector: 'Mike Chen',
      actions: ['Report Generated']
    },
    {
      id: 'INS-003',
      posterId: 'PST-2024-0158',
      date: '2024-06-17',
      time: '10:12:33',
      status: 'failed',
      failureType: 'Object Obstruction',
      department: 'Site Management',
      subcontractor: 'Metro Displays Inc.',
      inspector: 'Sarah Johnson',
      actions: ['Notify Sub', 'Site Visit Required']
    },
    {
      id: 'INS-004',
      posterId: 'PST-2024-0159',
      date: '2024-06-17',
      time: '10:34:56',
      status: 'failed',
      failureType: 'Glue Waves',
      department: 'Quality Control',
      subcontractor: 'Premium Posters Ltd.',
      inspector: 'Alex Rivera',
      actions: ['Additional Sub Order', 'Training Required']
    },
    {
      id: 'INS-005',
      posterId: 'PST-2024-0160',
      date: '2024-06-17',
      time: '11:08:21',
      status: 'passed',
      department: 'Quality Control',
      subcontractor: 'Urban Vision Co.',
      inspector: 'Sarah Johnson',
      actions: ['Report Generated']
    }
  ];

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = searchTerm === '' || 
      inspection.posterId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.subcontractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.failureType?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || inspection.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (status: 'passed' | 'failed') => {
    return status === 'passed' 
      ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100">✅ Passed</Badge>
      : <Badge className="bg-red-100 text-red-700 hover:bg-red-100">❌ Failed</Badge>;
  };

  const handleViewDetails = (inspection: InspectionRecord) => {
    onInspectionSelect(inspection);
    console.log('Viewing details for:', inspection.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Inspection History</h2>
        <p className="text-gray-600">Browse and filter past quality inspections</p>
      </div>

      {/* Filters */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by Poster ID, Subcontractor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="passed">Passed Only</SelectItem>
                <SelectItem value="failed">Failed Only</SelectItem>
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Quality Control">Quality Control</SelectItem>
                <SelectItem value="Site Management">Site Management</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Showing {filteredInspections.length} of {inspections.length} inspections
        </span>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>{inspections.filter(i => i.status === 'passed').length} Passed</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>{inspections.filter(i => i.status === 'failed').length} Failed</span>
          </span>
        </div>
      </div>

      {/* Results Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Poster ID</TableHead>
                <TableHead className="font-semibold">Date & Time</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Failure Type</TableHead>
                <TableHead className="font-semibold">Subcontractor</TableHead>
                <TableHead className="font-semibold">Inspector</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
                <TableHead className="font-semibold">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInspections.map((inspection) => (
                <TableRow key={inspection.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">
                    {inspection.posterId}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{inspection.date}</div>
                      <div className="text-gray-500">{inspection.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(inspection.status)}
                  </TableCell>
                  <TableCell>
                    {inspection.failureType ? (
                      <Badge variant="outline" className="text-orange-700 border-orange-300">
                        {inspection.failureType}
                      </Badge>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {inspection.subcontractor}
                  </TableCell>
                  <TableCell className="text-sm">
                    {inspection.inspector}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {inspection.actions.slice(0, 2).map((action, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                      {inspection.actions.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{inspection.actions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(inspection)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredInspections.length === 0 && (
        <Card className="bg-gray-50">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">No inspections found matching your filters.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setDepartmentFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
