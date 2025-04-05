
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertBannerProps {
  message: string;
  className?: string;
}

const AlertBanner = ({ message, className }: AlertBannerProps) => {
  return (
    <div 
      className={cn(
        "bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-md shadow-sm",
        "flex items-center space-x-3",
        className
      )}
    >
      <AlertTriangle className="h-6 w-6 flex-shrink-0" />
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default AlertBanner;
