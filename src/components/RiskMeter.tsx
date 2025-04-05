
import React from 'react';
import { cn } from '@/lib/utils';

type RiskLevel = 'low' | 'medium' | 'high';

interface RiskMeterProps {
  level: RiskLevel;
  showLabel?: boolean;
  className?: string;
}

const riskLabels = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
};

const riskColors = {
  low: 'bg-safe',
  medium: 'bg-warning',
  high: 'bg-danger',
};

const riskWidths = {
  low: 'w-1/3',
  medium: 'w-2/3',
  high: 'w-full',
};

const RiskMeter = ({ level, showLabel = true, className }: RiskMeterProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className={level === 'low' ? "font-semibold" : "text-gray-500"}>Safe</span>
          <span className={level === 'medium' ? "font-semibold" : "text-gray-500"}>Warning</span>
          <span className={level === 'high' ? "font-semibold" : "text-gray-500"}>Danger</span>
        </div>
      )}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            "absolute h-full transition-all duration-700 ease-out",
            riskColors[level],
            riskWidths[level]
          )}
        />
      </div>
      {showLabel && (
        <div className="flex justify-end">
          <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            {
              'bg-green-100 text-green-800': level === 'low',
              'bg-yellow-100 text-yellow-800': level === 'medium',
              'bg-red-100 text-red-800': level === 'high',
            }
          )}>
            {riskLabels[level]}
          </span>
        </div>
      )}
    </div>
  );
};

export default RiskMeter;
