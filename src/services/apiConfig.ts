
/**
 * API Configuration - This file configures connections to external APIs and services.
 * Frontend integration points for the specified technologies:
 * - Backend (Express/Flask): Through REST endpoints
 * - Database (MongoDB/PostgreSQL/Firebase): Via API calls
 * - ML (TensorFlow/Scikit-Learn): Through prediction endpoints
 * - External APIs: Twilio, Google Safe Browsing, OpenAI
 */

// Base API URLs (to be replaced with actual endpoints)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.fraudshield.example';

// API Endpoints for various services
export const ENDPOINTS = {
  // Fraud Detection Services
  SCAN_MESSAGE: '/api/scan/message',
  ANALYZE_LOAN_APP: '/api/analyze/loan-app',
  DETECT_VOICE_SCAM: '/api/detect/voice',
  GET_SCAM_STATISTICS: '/api/statistics/scams',
  REPORT_FRAUD: '/api/report/fraud',
  
  // External API Integration Points
  GOOGLE_SAFE_BROWSING: '/api/external/google-safe-browsing',
  OPENAI_ANALYSIS: '/api/external/openai',
  TWILIO_SMS: '/api/external/twilio/sms',
  
  // Mobile App Integration (for Flutter/React Native)
  MOBILE_AUTH: '/api/mobile/auth',
  MOBILE_SYNC: '/api/mobile/sync',
};

// Service status and health check
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.status === 200;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

