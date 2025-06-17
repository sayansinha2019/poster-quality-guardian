
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Inspections Today',
      value: '247',
      change: '+12%',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Passed Inspections',
      value: '189',
      change: '+8%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Failed Inspections',
      value: '58',
      change: '-5%',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Success Rate',
      value: '76.5%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="flex items-center mt-1">
              <Badge 
                variant="secondary" 
                className={`text-xs ${stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-gray-500 ml-2">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
