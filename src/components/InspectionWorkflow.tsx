
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'passed' | 'failed';
  failureReason?: string;
  processingTime?: number;
}

export const InspectionWorkflow = ({ onInspectionSelect }: { onInspectionSelect: (inspection: any) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const [steps, setSteps] = useState<WorkflowStep[]>([
    { id: 'detection', name: 'Far/Near Detection', description: 'Detecting poster visibility and distance', status: 'pending' },
    { id: 'matching', name: 'Image Matching', description: 'Comparing with reference template', status: 'pending' },
    { id: 'glue', name: 'Glue Waves Check', description: 'Analyzing surface adhesion quality', status: 'pending' },
    { id: 'orientation', name: 'Orientation Check', description: 'Verifying correct poster alignment', status: 'pending' },
    { id: 'damage', name: 'Damage Detection', description: 'Scanning for tears, scratches, or defects', status: 'pending' },
    { id: 'obstruction', name: 'Object Obstruction', description: 'Checking for blocking objects', status: 'pending' },
    { id: 'water', name: 'Water Flow Check', description: 'Detecting water damage or stains', status: 'pending' },
    { id: 'darkness', name: 'Darkness Detection', description: 'Analyzing visibility in low light', status: 'pending' },
    { id: 'overlap', name: 'Overlapping Check', description: 'Ensuring no poster overlap issues', status: 'pending' }
  ]);

  const startInspection = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);
    setSteps(steps.map(step => ({ ...step, status: 'pending' })));
  };

  useEffect(() => {
    if (!isRunning || currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setSteps(prev => prev.map((step, index) => {
        if (index === currentStep) {
          // Simulate random pass/fail for demo
          const passed = Math.random() > 0.3;
          return {
            ...step,
            status: passed ? 'passed' : 'failed',
            failureReason: !passed ? getFailureReason(step.id) : undefined,
            processingTime: Math.floor(Math.random() * 3000) + 1000
          };
        }
        return step;
      }));

      setProgress(((currentStep + 1) / steps.length) * 100);
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsRunning(false);
      }
    }, 2000);

    // Set current step to processing
    setSteps(prev => prev.map((step, index) => 
      index === currentStep ? { ...step, status: 'processing' } : step
    ));

    return () => clearTimeout(timer);
  }, [currentStep, isRunning, steps.length]);

  const getFailureReason = (stepId: string): string => {
    const reasons: Record<string, string[]> = {
      detection: ['Poster not clearly visible', 'Distance measurement failed'],
      matching: ['Template mismatch detected', 'Reference image quality poor'],
      glue: ['Air bubbles detected', 'Adhesion failure on edges'],
      orientation: ['Poster rotated 15° clockwise', 'Alignment offset detected'],
      damage: ['Tear detected in bottom-left corner', 'Surface scratches visible'],
      obstruction: ['Tree branch blocking view', 'Vehicle parked in front']
    };
    
    const stepReasons = reasons[stepId] || ['Quality issue detected'];
    return stepReasons[Math.floor(Math.random() * stepReasons.length)];
  };

  const getStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusBadge = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">✅ Passed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">❌ Failed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">🔄 Processing</Badge>;
      default:
        return <Badge variant="secondary">⏳ Pending</Badge>;
    }
  };

  const hasFailures = steps.some(step => step.status === 'failed');
  const completedSteps = steps.filter(step => step.status === 'passed' || step.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Live Inspection Workflow</h2>
          <p className="text-gray-600">Monitor real-time quality check progress</p>
        </div>
        <Button 
          onClick={startInspection} 
          disabled={isRunning}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          {isRunning ? 'Inspecting...' : 'Start New Inspection'}
        </Button>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-blue-700">Inspection Progress</span>
                <span className="text-blue-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-blue-600">
                {completedSteps} of {steps.length} steps completed
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Steps */}
      <div className="grid gap-4">
        {steps.map((step, index) => (
          <Card 
            key={step.id} 
            className={`transition-all duration-300 hover:shadow-md ${
              step.status === 'processing' ? 'ring-2 ring-blue-500 shadow-lg' : ''
            } ${step.status === 'failed' ? 'bg-red-50 border-red-200' : ''} ${
              step.status === 'passed' ? 'bg-green-50 border-green-200' : ''
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{step.name}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    {step.failureReason && (
                      <div className="mt-2 flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-orange-700 font-medium">
                          {step.failureReason}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(step.status)}
                  {step.processingTime && (
                    <span className="text-xs text-gray-500">
                      {(step.processingTime / 1000).toFixed(1)}s
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Summary */}
      {!isRunning && completedSteps > 0 && (
        <Card className={`${hasFailures ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center space-x-2 ${hasFailures ? 'text-red-700' : 'text-green-700'}`}>
              {hasFailures ? <XCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
              <span>Inspection {hasFailures ? 'Failed' : 'Completed Successfully'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className={`text-sm ${hasFailures ? 'text-red-600' : 'text-green-600'}`}>
                {hasFailures 
                  ? `${steps.filter(s => s.status === 'failed').length} quality issues detected. Action required.`
                  : 'All quality checks passed. Poster meets standards.'
                }
              </p>
              {hasFailures && (
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                    📧 Notify Subcontractor
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    📋 Generate Report
                  </Button>
                  <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    🔧 Schedule Repair
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
