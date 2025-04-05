
import React, { useState } from 'react';
import { FileText, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ReportFraudSection = () => {
  const [fraudType, setFraudType] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fraudType || !description) return;
    
    setSubmitting(true);
    // Simulate API call with a timeout
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFraudType('');
        setDescription('');
        setContact('');
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5 text-accent" />
        Report a Fraud Case
      </h2>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-green-800">Report Submitted!</h3>
          <p className="text-sm text-center text-gray-600 mt-2 max-w-md">
            Thank you for your report. Your complaint has been filed and will be forwarded to the relevant authorities.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fraud-type" className="block text-sm font-medium text-gray-700 mb-1">
              Type of Fraud
            </label>
            <Select 
              value={fraudType} 
              onValueChange={setFraudType}
            >
              <SelectTrigger id="fraud-type">
                <SelectValue placeholder="Select fraud type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="loan-app">Fraudulent Loan App</SelectItem>
                <SelectItem value="phishing">Phishing Message/Email</SelectItem>
                <SelectItem value="call">Scam Call</SelectItem>
                <SelectItem value="bank">Banking Fraud</SelectItem>
                <SelectItem value="kyc">KYC Fraud</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe the fraud incident, including any relevant details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Your Contact (optional)
            </label>
            <Input
              id="contact"
              type="text"
              placeholder="Email or phone number for follow-up"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll only use this to update you on your report
            </p>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90"
              disabled={!fraudType || !description || submitting}
            >
              {submitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReportFraudSection;
