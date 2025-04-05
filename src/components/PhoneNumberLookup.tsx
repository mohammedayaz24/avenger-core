
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type PhoneInfo = {
  owner: string;
  reportCount: number;
  isSuspicious: boolean;
  tags: string[];
} | null;

interface PhoneNumberLookupProps {
  className?: string;
}

const PhoneNumberLookup = ({ className }: PhoneNumberLookupProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [phoneInfo, setPhoneInfo] = useState<PhoneInfo>(null);
  const { toast } = useToast();

  const lookupPhoneNumber = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLookingUp(true);
    setPhoneInfo(null);

    // Simulate API call to phone number database
    setTimeout(() => {
      setIsLookingUp(false);
      
      // Simulate different results based on input
      if (phoneNumber.endsWith('999')) {
        setPhoneInfo({
          owner: "Unknown",
          reportCount: 47,
          isSuspicious: true,
          tags: ["Scam", "Fraud", "Impersonation"]
        });
      } else if (phoneNumber.endsWith('000')) {
        setPhoneInfo({
          owner: "Bank of America (Official)",
          reportCount: 0,
          isSuspicious: false,
          tags: ["Verified", "Financial Institution"]
        });
      } else {
        setPhoneInfo({
          owner: "Unknown Caller",
          reportCount: phoneNumber.length > 8 ? Math.floor(Math.random() * 5) : 0,
          isSuspicious: phoneNumber.length > 9,
          tags: phoneNumber.length > 9 ? ["Suspicious", "Telemarketing"] : ["Unverified"]
        });
      }
    }, 1500);
  };

  return (
    <div className={`p-4 bg-gray-50 rounded-lg border ${className}`}>
      <h3 className="text-base font-medium mb-3 flex items-center">
        <Search className="mr-2 h-4 w-4 text-accent" />
        Phone Number Lookup
      </h3>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="phone-number">Enter Phone Number</Label>
          <div className="flex mt-1 gap-2">
            <Input
              id="phone-number"
              placeholder="e.g. +1 555 123 4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={lookupPhoneNumber} 
              disabled={isLookingUp}
              className="whitespace-nowrap"
            >
              {isLookingUp ? 'Searching...' : 'Lookup'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Check if a number has been reported as suspicious
          </p>
        </div>

        {phoneInfo && (
          <div className={`mt-4 p-3 rounded-lg ${phoneInfo.isSuspicious ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'} border`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-sm">
                  {phoneInfo.owner}
                  {!phoneInfo.isSuspicious && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Safe
                    </span>
                  )}
                </h4>
                <p className={`text-sm ${phoneInfo.isSuspicious ? 'text-red-700' : 'text-green-700'}`}>
                  {phoneInfo.reportCount > 0 
                    ? `${phoneInfo.reportCount} users reported this number` 
                    : 'No reports found'}
                </p>
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded ${phoneInfo.isSuspicious ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {phoneInfo.isSuspicious ? 'Suspicious' : 'Verified'}
              </div>
            </div>
            
            {phoneInfo.tags.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {phoneInfo.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberLookup;
