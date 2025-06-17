
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ZoomIn, ZoomOut, RotateCw, Download, Maximize2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ImageComparison = ({ selectedInspection }: { selectedInspection: any }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeView, setActiveView] = useState('comparison');

  // Mock image data - in real app, these would come from selectedInspection
  const mockImages = {
    original: '/placeholder.svg',
    reference: '/placeholder.svg',
    processed: '/placeholder.svg',
    annotated: '/placeholder.svg'
  };

  const mockDetections = [
    { type: 'Damage', coordinates: { x: 150, y: 200 }, severity: 'High', description: 'Tear in bottom-left corner' },
    { type: 'Glue Wave', coordinates: { x: 300, y: 100 }, severity: 'Medium', description: 'Air bubble detected' },
    { type: 'Obstruction', coordinates: { x: 400, y: 150 }, severity: 'Low', description: 'Partial leaf coverage' }
  ];

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 25, 50));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-700 border-red-300';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Low': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Image Analysis & Comparison</h2>
          <p className="text-gray-600">
            {selectedInspection 
              ? `Analyzing ${selectedInspection.posterId}` 
              : 'Select an inspection to view detailed image analysis'
            }
          </p>
        </div>
        
        {selectedInspection && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoomLevel <= 50}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded">
              {zoomLevel}%
            </span>
            <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {!selectedInspection ? (
        <Card className="bg-gray-50">
          <CardContent className="pt-6 text-center py-12">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <Maximize2 className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">No Inspection Selected</h3>
                <p className="text-gray-500">
                  Go to the Inspection History tab and select an inspection to view detailed image analysis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
            <TabsTrigger value="overlay">Overlay View</TabsTrigger>
            <TabsTrigger value="processed">Processed</TabsTrigger>
            <TabsTrigger value="detections">Detections</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Original Image
                    <Badge variant="outline">Input</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
                    <img
                      src={mockImages.original}
                      alt="Original poster"
                      className="w-full h-full object-contain transition-transform duration-200"
                      style={{ transform: `scale(${zoomLevel / 100})` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Reference Template
                    <Badge variant="outline">Reference</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
                    <img
                      src={mockImages.reference}
                      alt="Reference template"
                      className="w-full h-full object-contain transition-transform duration-200"
                      style={{ transform: `scale(${zoomLevel / 100})` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="overlay" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overlay Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '500px' }}>
                  <img
                    src={mockImages.original}
                    alt="Overlay comparison"
                    className="w-full h-full object-contain transition-transform duration-200"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  />
                  <div className="absolute inset-0 bg-blue-500 opacity-20 mix-blend-multiply"></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processed" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Processed Analysis
                  <Badge className="bg-blue-100 text-blue-700">AI Enhanced</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '500px' }}>
                  <img
                    src={mockImages.processed}
                    alt="Processed image"
                    className="w-full h-full object-contain transition-transform duration-200"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detections" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Annotated Detections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '500px' }}>
                      <img
                        src={mockImages.annotated}
                        alt="Annotated detections"
                        className="w-full h-full object-contain transition-transform duration-200"
                        style={{ transform: `scale(${zoomLevel / 100})` }}
                      />
                      {/* Mock detection markers */}
                      <div className="absolute top-20 left-20 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute top-32 left-40 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute top-44 left-60 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Detection Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockDetections.map((detection, index) => (
                        <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{detection.type}</span>
                            <Badge className={getSeverityColor(detection.severity)}>
                              {detection.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{detection.description}</p>
                          <div className="text-xs text-gray-500">
                            Position: ({detection.coordinates.x}, {detection.coordinates.y})
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
