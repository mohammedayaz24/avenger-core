
import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RiskMeter from './RiskMeter';
import { type AnalysisResult } from './VoiceRecorder';

interface AnalysisResultDisplayProps {
  result: AnalysisResult;
}

const AnalysisResultDisplay = ({ result }: AnalysisResultDisplayProps) => {
  if (!result) return null;
  
  return (
    <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
      <div className="flex items-start">
        <ShieldAlert className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-red-700">Deepfake Voice Detected</h3>
          <p className="text-sm text-red-600 font-medium">{result.message}</p>
          
          <div className="mt-3">
            <RiskMeter level={result.risk} />
          </div>
          
          <div className="mt-4 space-y-1">
            <h4 className="text-sm font-medium">Fraud Indicators:</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              {result.indicators.map((indicator, index) => (
                <li key={index}>{indicator}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-red-600 border-red-200">
              Block Number
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600">
              Report to Authorities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultDisplay;
