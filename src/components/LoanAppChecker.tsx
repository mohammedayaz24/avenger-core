
import React, { useState } from 'react';
import { Shield, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RiskMeter from './RiskMeter';

type AppRiskLevel = 'low' | 'medium' | 'high';

interface AppCheckResult {
  name: string;
  risk: AppRiskLevel;
  message: string;
  details: {
    permissions: string;
    reviews: string;
    policies: string;
  };
}

const LoanAppChecker = () => {
  const [appName, setAppName] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<AppCheckResult | null>(null);

  const handleCheck = () => {
    if (!appName.trim()) return;
    
    setChecking(true);
    // Simulate API call with a timeout
    setTimeout(() => {
      let demoResult: AppCheckResult;

      // Simple check logic for demo
      if (appName.toLowerCase().includes('quick') || 
          appName.toLowerCase().includes('cash') || 
          appName.toLowerCase().includes('fast')) {
        demoResult = {
          name: appName,
          risk: 'high',
          message: '90% users reported scams – DO NOT USE!',
          details: {
            permissions: 'Requests excessive access to contacts, SMS, and storage',
            reviews: 'Multiple users report hidden charges and identity theft',
            policies: 'Hidden terms allow them to access your personal data'
          }
        };
      } else if (appName.toLowerCase().includes('loan') || 
                appName.toLowerCase().includes('credit') || 
                appName.toLowerCase().includes('money')) {
        demoResult = {
          name: appName,
          risk: 'medium',
          message: 'Some concerning reports found - proceed with caution',
          details: {
            permissions: 'Requests access to contacts and SMS messages',
            reviews: 'Mixed reviews with some complaints about hidden fees',
            policies: 'Some terms could allow data sharing with third parties'
          }
        };
      } else {
        demoResult = {
          name: appName,
          risk: 'low',
          message: 'This app appears to be legitimate and safe to use',
          details: {
            permissions: 'Requests only necessary permissions',
            reviews: 'Positive reviews with legitimate loan services',
            policies: 'Clear and transparent terms and conditions'
          }
        };
      }
      
      setResult(demoResult);
      setChecking(false);
    }, 1500);
  };

  const riskIconColor = result ? 
    result.risk === 'low' ? 'text-green-500' : 
    result.risk === 'medium' ? 'text-yellow-500' : 
    'text-red-500' : '';

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Shield className="mr-2 h-5 w-5 text-accent" />
        Loan App Risk Checker
      </h2>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter loan app name..."
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            disabled={checking}
            className="flex-grow"
          />
          <Button 
            onClick={handleCheck} 
            disabled={!appName.trim() || checking}
            className="bg-accent hover:bg-accent/90 whitespace-nowrap"
          >
            {checking ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Checking...
              </>
            ) : (
              <>Check App</>
            )}
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
                <Check className={`h-6 w-6 mr-2 flex-shrink-0 ${riskIconColor}`} />
              ) : (
                <AlertTriangle className={`h-6 w-6 mr-2 flex-shrink-0 ${riskIconColor}`} />
              )}
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{result.name}</h3>
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    {
                      'bg-green-100 text-green-800': result.risk === 'low',
                      'bg-yellow-100 text-yellow-800': result.risk === 'medium',
                      'bg-red-100 text-red-800': result.risk === 'high',
                    }
                  )}>
                    {result.risk === 'low' ? 'Safe' : result.risk === 'medium' ? 'Risky' : 'Dangerous'}
                  </span>
                </div>
                
                <p className="text-sm font-medium mt-1">{result.message}</p>
                
                <div className="mt-3">
                  <RiskMeter level={result.risk} />
                </div>
                
                <div className="mt-4 space-y-2 text-sm">
                  <h4 className="font-medium">Detailed Analysis:</h4>
                  <div className="flex">
                    <span className="font-medium w-28">Permissions:</span>
                    <span className="text-gray-600">{result.details.permissions}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-28">User Reviews:</span>
                    <span className="text-gray-600">{result.details.reviews}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-28">Privacy Policy:</span>
                    <span className="text-gray-600">{result.details.policies}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanAppChecker;

function cn(...inputs: any[]): string {
  return inputs.filter(Boolean).join(' ');
}
