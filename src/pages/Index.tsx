
import React, { useState } from 'react';
import { InspectionWorkflow } from '@/components/InspectionWorkflow';
import { InspectionHistory } from '@/components/InspectionHistory';
import { ImageComparison } from '@/components/ImageComparison';
import { DashboardStats } from '@/components/DashboardStats';
import { Navigation } from '@/components/Navigation';
import { ImageUploadSidebar } from '@/components/ImageUploadSidebar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation onToggleSidebar={toggleSidebar} />
      
      <div className={`container mx-auto px-4 py-6 space-y-6 transition-all duration-300 ${isSidebarOpen ? 'mr-96' : ''}`}>
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Intelligent Poster Quality Check System
          </h1>
          <p className="text-gray-600 text-lg">
            Automated quality inspection with comprehensive workflow tracking
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Content Tabs */}
        <Tabs defaultValue="workflow" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="workflow" className="text-sm font-medium">
              Live Inspection
            </TabsTrigger>
            <TabsTrigger value="history" className="text-sm font-medium">
              Inspection History
            </TabsTrigger>
            <TabsTrigger value="comparison" className="text-sm font-medium">
              Image Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="mt-6">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <InspectionWorkflow onInspectionSelect={setSelectedInspection} />
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <InspectionHistory onInspectionSelect={setSelectedInspection} />
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <ImageComparison selectedInspection={selectedInspection} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Upload Sidebar */}
      <ImageUploadSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
