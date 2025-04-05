
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import VoiceRecorder, { type AnalysisResult } from './VoiceRecorder';
import PhoneNumberLookup from './PhoneNumberLookup';
import AnalysisResultDisplay from './AnalysisResultDisplay';

const VoiceScamDetector = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(null);

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Phone className="mr-2 h-5 w-5 text-accent" />
        Deepfake Voice Scam Detector
      </h2>

      {/* Phone Number Lookup Section */}
      <PhoneNumberLookup className="mb-6" />

      <VoiceRecorder onAnalysisComplete={setAnalysisResult} />

      <AnalysisResultDisplay result={analysisResult} />
    </div>
  );
};

export default VoiceScamDetector;
