
import { API_BASE_URL, ENDPOINTS } from './apiConfig';

// Types for the fraud detection service
export type RiskLevel = 'low' | 'medium' | 'high';

export interface ScanResult {
  risk: RiskLevel;
  message: string;
  indicators?: string[];
  blockRecommended?: boolean;
}

export interface LoanAppAnalysis extends ScanResult {
  appDetails?: {
    name: string;
    permissions: string;
    reviews: string;
    policies: string;
  };
}

export interface VoiceAnalysis extends ScanResult {
  isAIGenerated?: boolean;
  confidenceScore?: number;
}

/**
 * Message Scanner Service
 * This would connect to backend ML services (TensorFlow/Scikit-Learn)
 */
export const scanMessage = async (messageText: string): Promise<ScanResult> => {
  // In a real implementation, this would call your backend API
  try {
    // Simulating backend call to ML models hosted on Express/Flask
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SCAN_MESSAGE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: messageText }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to scan message');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error scanning message:', error);
    
    // Fallback to frontend-only analysis for demo purposes
    return mockScanMessage(messageText);
  }
};

/**
 * Loan App Analysis Service
 * This would integrate with your database (MongoDB/PostgreSQL/Firebase)
 */
export const analyzeLoanApp = async (appName: string): Promise<LoanAppAnalysis> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.ANALYZE_LOAN_APP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appName }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to analyze loan app');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error analyzing loan app:', error);
    
    // Fallback to frontend-only analysis for demo purposes
    return mockLoanAppAnalysis(appName);
  }
};

/**
 * Voice Scam Detection Service
 * This would connect to TensorFlow/Scikit-Learn models via API
 */
export const analyzeVoiceRecording = async (audioData: Blob): Promise<VoiceAnalysis> => {
  try {
    const formData = new FormData();
    formData.append('audio', audioData);
    
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.DETECT_VOICE_SCAM}`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to analyze voice recording');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error analyzing voice recording:', error);
    
    // Fallback for demo purposes
    return {
      risk: 'high',
      message: 'SCAM ALERT – Deepfake voice detected. DO NOT SHARE OTP!',
      isAIGenerated: true,
      confidenceScore: 0.92,
      indicators: [
        'AI-generated voice patterns detected',
        'Urgency and pressure tactics identified',
        'Request for sensitive information (OTP)',
        'Impersonation of bank official'
      ]
    };
  }
};

/**
 * Fraud Reporting Service
 * This would connect to your database (MongoDB/PostgreSQL/Firebase)
 */
export const reportFraud = async (fraudData: {
  fraudType: string;
  description: string;
  contact?: string;
}): Promise<{ success: boolean; reportId?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.REPORT_FRAUD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fraudData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit fraud report');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error reporting fraud:', error);
    
    // Fallback for demo purposes
    return { 
      success: true, 
      reportId: `RPT${Math.floor(Math.random() * 1000000)}`
    };
  }
};

// Mock implementations for demo purposes
function mockScanMessage(message: string): ScanResult {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('loan') && 
     (lowerMessage.includes('instant') || 
      lowerMessage.includes('no verification') || 
      lowerMessage.includes('quick') ||
      lowerMessage.includes('click'))) {
    return {
      risk: 'high',
      message: "HIGH RISK! Fraudulent loan scam detected. DO NOT CLICK!",
      indicators: ['Promises instant money', 'No verification mentioned', 'Suspicious link'],
      blockRecommended: true
    };
  } else if (lowerMessage.includes('click here') || 
            lowerMessage.includes('http') || 
            lowerMessage.includes('verification')) {
    return {
      risk: 'medium',
      message: "Potential risk detected. Be cautious with links or attachments.",
      indicators: ['Contains suspicious link', 'Asks for action'],
      blockRecommended: false
    };
  }
  
  return {
    risk: 'low',
    message: "No fraudulent content detected. This message appears safe.",
    blockRecommended: false
  };
}

function mockLoanAppAnalysis(appName: string): LoanAppAnalysis {
  const lowerAppName = appName.toLowerCase();
  
  if (lowerAppName.includes('quick') || 
      lowerAppName.includes('cash') || 
      lowerAppName.includes('fast')) {
    return {
      risk: 'high',
      message: '90% users reported scams – DO NOT USE!',
      appDetails: {
        name: appName,
        permissions: 'Requests excessive access to contacts, SMS, and storage',
        reviews: 'Multiple users report hidden charges and identity theft',
        policies: 'Hidden terms allow them to access your personal data'
      },
      blockRecommended: true
    };
  } else if (lowerAppName.includes('loan') || 
            lowerAppName.includes('credit') || 
            lowerAppName.includes('money')) {
    return {
      risk: 'medium',
      message: 'Some concerning reports found - proceed with caution',
      appDetails: {
        name: appName,
        permissions: 'Requests access to contacts and SMS messages',
        reviews: 'Mixed reviews with some complaints about hidden fees',
        policies: 'Some terms could allow data sharing with third parties'
      },
      blockRecommended: false
    };
  }
  
  return {
    risk: 'low',
    message: 'This app appears to be legitimate and safe to use',
    appDetails: {
      name: appName,
      permissions: 'Requests only necessary permissions',
      reviews: 'Positive reviews with legitimate loan services',
      policies: 'Clear and transparent terms and conditions'
    },
    blockRecommended: false
  };
}
