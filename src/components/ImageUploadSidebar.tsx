
import React, { useState } from 'react';
import { Upload, Image, Database, X, FileImage, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ImageUploadSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  uploadDate: Date;
  type: 'original' | 'reference';
}

export const ImageUploadSidebar = ({ isOpen, onClose }: ImageUploadSidebarProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([
    {
      id: '1',
      name: 'poster_reference_001.jpg',
      url: '/placeholder.svg',
      uploadDate: new Date(),
      type: 'reference'
    },
    {
      id: '2',
      name: 'original_poster_002.jpg',
      url: '/placeholder.svg',
      uploadDate: new Date(),
      type: 'original'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'original' | 'reference') => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newImage: UploadedImage = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: URL.createObjectURL(file),
          uploadDate: new Date(),
          type
        };
        setUploadedImages(prev => [...prev, newImage]);
      });
    }
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const originalImages = uploadedImages.filter(img => img.type === 'original');
  const referenceImages = uploadedImages.filter(img => img.type === 'reference');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-96 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Image Database</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {/* Upload Original Images */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <FileImage className="h-4 w-4 text-green-600" />
                  <span>Original Images</span>
                  <Badge variant="secondary">{originalImages.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'original')}
                    className="hidden"
                    id="original-upload"
                  />
                  <label htmlFor="original-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload Original Images</p>
                  </label>
                </div>

                {/* Original Images List */}
                <div className="space-y-2">
                  {originalImages.map((image) => (
                    <div key={image.id} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                      <Image className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{image.name}</p>
                        <p className="text-xs text-gray-500">{image.uploadDate.toLocaleDateString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(image.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Reference Images */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                  <FileImage className="h-4 w-4 text-blue-600" />
                  <span>Reference Images</span>
                  <Badge variant="secondary">{referenceImages.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'reference')}
                    className="hidden"
                    id="reference-upload"
                  />
                  <label htmlFor="reference-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload Reference Images</p>
                  </label>
                </div>

                {/* Reference Images List */}
                <div className="space-y-2">
                  {referenceImages.map((image) => (
                    <div key={image.id} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                      <Image className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{image.name}</p>
                        <p className="text-xs text-gray-500">{image.uploadDate.toLocaleDateString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(image.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Database Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Database Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">{originalImages.length}</p>
                    <p className="text-xs text-gray-600">Original</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">{referenceImages.length}</p>
                    <p className="text-xs text-gray-600">Reference</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
