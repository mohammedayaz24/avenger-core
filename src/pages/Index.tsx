
import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Phone, 
  BarChart2, 
  AlertTriangle,
  Shield,
} from 'lucide-react';
import AlertBanner from '@/components/AlertBanner';
import StatsCard from '@/components/StatsCard';
import FeatureCard from '@/components/FeatureCard';
import ScanMessageSection from '@/components/ScanMessageSection';
import LoanAppChecker from '@/components/LoanAppChecker';
import VoiceScamDetector from '@/components/VoiceScamDetector';
import ScamDashboard from '@/components/ScamDashboard';
import ReportFraudSection from '@/components/ReportFraudSection';
import TechnicalInfo from '@/components/TechnicalInfo';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const features = [
    {
      id: 'message-scanner',
      title: 'Scan Message/Link for Fraud',
      description: 'Check suspicious messages, links, or screenshots for potential fraud',
      icon: Search,
    },
    {
      id: 'loan-app',
      title: 'Check Loan App Risk Score',
      description: 'Verify if a loan app is legitimate or potentially fraudulent',
      icon: ShieldCheck,
    },
    {
      id: 'voice-scanner',
      title: 'Detect Scam Calls',
      description: 'Identify deepfake voices and scam calls to avoid fraud',
      icon: Phone,
    },
    {
      id: 'dashboard',
      title: 'View Scam Reports & Alerts',
      description: 'See latest scam trends, alerts, and hotspot areas',
      icon: BarChart2,
    },
    {
      id: 'report',
      title: 'Report a Fraud Case',
      description: 'Help others by reporting scams to authorities',
      icon: AlertTriangle,
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'message-scanner':
        return <ScanMessageSection />;
      case 'loan-app':
        return <LoanAppChecker />;
      case 'voice-scanner':
        return <VoiceScamDetector />;
      case 'dashboard':
        return <ScamDashboard />;
      case 'report':
        return <ReportFraudSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="flex justify-center items-center mb-3 sm:mb-4">
            <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-accent" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-2 sm:mb-3">
            AI-Powered Fraud Detection System
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Protect yourself from financial fraud with our advanced AI detection tools.
          </p>
        </div>

        {/* Alert Banner */}
        <AlertBanner 
          message="New scam detected: Fake PM Loan Yojana messages spreading on WhatsApp!" 
          className="mb-6 sm:mb-8"
        />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatsCard 
            title="Total Scams Prevented Today" 
            value="2,543" 
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard 
            title="Blocked Scam Links" 
            value="178" 
            description="Last 24 hours"
          />
          <StatsCard 
            title="Risky Loan Apps Identified" 
            value="37" 
            description="This week"
          />
          <StatsCard 
            title="Active Users Protected" 
            value="1.2M+" 
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Features Section */}
        {!activeSection && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  onClick={() => setActiveSection(feature.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Active Tool Section */}
        {activeSection && (
          <div className="mb-6 sm:mb-8">
            <button
              onClick={() => setActiveSection(null)}
              className="mb-3 sm:mb-4 text-sm flex items-center text-accent hover:text-accent/80 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to dashboard
            </button>
            {renderActiveSection()}
          </div>
        )}

        {/* Technical Info Section - Only shown on dashboard */}
        {!activeSection && <TechnicalInfo />}

        {/* Footer */}
        <footer className="border-t mt-10 sm:mt-16 pt-6 sm:pt-8 text-center text-sm text-gray-500">
          <p>© 2023 FraudShield. All rights reserved.</p>
          <p className="mt-2">
            Protected by advanced AI technology. Report scams to help keep everyone safe.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
