
import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type AnalysisResult = {
  risk: 'low' | 'medium' | 'high';
  message: string;
  indicators: string[];
} | null;

interface VoiceRecorderProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const VoiceRecorder = ({ onAnalysisComplete }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const startRecording = () => {
    setIsRecording(true);
    onAnalysisComplete(null);
    
    // Simulate recording timer
    const interval = setInterval(() => {
      setRecordingTime(time => {
        if (time >= 5) {
          clearInterval(interval);
          setIsRecording(false);
          analyzeRecording();
          return 0;
        }
        return time + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    analyzeRecording();
  };

  const analyzeRecording = () => {
    // Simulate voice analysis
    setTimeout(() => {
      onAnalysisComplete({
        risk: 'high',
        message: 'SCAM ALERT – Deepfake voice detected. DO NOT SHARE OTP!',
        indicators: [
          'AI-generated voice patterns detected',
          'Urgency and pressure tactics identified',
          'Request for sensitive information (OTP)',
          'Impersonation of bank official'
        ]
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mb-4 ${isRecording ? 'bg-red-100 animate-pulse-scale' : 'bg-muted'}`}>
        <Mic className={`h-10 w-10 sm:h-12 sm:w-12 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
      </div>
      
      {isRecording ? (
        <div className="text-center mb-4">
          <p className="text-xl font-semibold mb-2">Recording {recordingTime}s</p>
          <p className="text-sm text-muted-foreground">Recording call audio to detect scam patterns...</p>
        </div>
      ) : (
        <div className="text-center mb-4">
          <p className="text-lg font-medium mb-2">Tap to start recording</p>
          <p className="text-sm text-muted-foreground">Record the suspicious call to scan for deepfake voice patterns</p>
        </div>
      )}
      
      <Button 
        onClick={isRecording ? stopRecording : startRecording}
        className={`${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-accent hover:bg-accent/90'} px-8`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
    </div>
  );
};

export default VoiceRecorder;
