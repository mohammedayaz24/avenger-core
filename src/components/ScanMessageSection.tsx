
import React, { useState } from 'react';
import { Search, AlertTriangle, Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import RiskMeter from './RiskMeter';
import { scanMessage, ScanResult } from '@/services/fraudDetectionService';

const ScanMessageSection = () => {
  const [message, setMessage] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    if (!message.trim()) return;
    
    setScanning(true);
    try {
      // Use our service to scan the message
      const scanResult = await scanMessage(message);
      setResult(scanResult);
    } catch (error) {
      console.error('Error scanning message:', error);
    } finally {
      setScanning(false);
    }
  };

  const handleReset = () => {
    setMessage('');
    setResult(null);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Search className="mr-2 h-5 w-5 text-accent" />
        Scam Message & Link Scanner
      </h2>

      <div className="space-y-4">
        <Textarea
          placeholder="Paste the suspicious message or link here..."
          className="min-h-[120px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={scanning}
        />
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleScan} 
            disabled={!message.trim() || scanning}
            className="bg-accent hover:bg-accent/90 flex-grow"
          >
            {scanning ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Scanning...
              </>
            ) : (
              <>Scan Message</>
            )}
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Screenshot
          </Button>
        </div>

        {result && (
          <div className={cn(
            "mt-4 p-4 rounded-lg border",
            {
              "bg-green-50 border-green-200": result.risk === 'low',
              "bg-yellow-50 border-yellow-200": result.risk === 'medium',
              "bg-red-50 border-red-200": result.risk === 'high',
            }
          )}>
            <div className="flex items-start">
              {result.risk === 'low' ? (
                <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              ) : result.risk === 'medium' ? (
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
              )}
              <div>
                <h3 className={cn(
                  "font-semibold",
                  {
                    "text-green-700": result.risk === 'low',
                    "text-yellow-700": result.risk === 'medium',
                    "text-red-700": result.risk === 'high',
                  }
                )}>
                  {result.risk === 'low' ? "Safe" : result.risk === 'medium' ? "Warning" : "Danger"}
                </h3>
                <p className={cn(
                  "text-sm",
                  {
                    "text-green-600": result.risk === 'low',
                    "text-yellow-600": result.risk === 'medium',
                    "text-red-600": result.risk === 'high',
                  }
                )}>
                  {result.message}
                </p>
                {result.indicators && result.indicators.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Detected issues:</h4>
                    <ul className="text-sm list-disc pl-5 mt-1">
                      {result.indicators.map((indicator, index) => (
                        <li key={index}>{indicator}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-2">
                  <RiskMeter level={result.risk} />
                </div>
                <Button 
                  variant="link" 
                  onClick={handleReset} 
                  className="mt-2 p-0 h-auto"
                >
                  Scan another message
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanMessageSection;

function cn(...inputs: any[]): string {
  return inputs.filter(Boolean).join(' ');
}
