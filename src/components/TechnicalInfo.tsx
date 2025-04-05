
import React from 'react';
import { Info, Server, Database, Brain, Cloud, Code } from 'lucide-react';

const TechnicalInfo = () => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-6 mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
        <Info className="mr-2 h-5 w-5 text-accent" />
        Technical Implementation Notes
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
        <div className="border rounded-lg p-3 sm:p-4 bg-gray-50">
          <div className="flex items-center mb-1 sm:mb-2">
            <Server className="h-4 w-4 sm:h-5 sm:w-5 text-accent mr-2" />
            <h3 className="font-medium text-base sm:text-lg">Backend Integration</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            The frontend is designed to connect with Node.js (Express) or Python (Flask) 
            backends through RESTful API endpoints. Service interfaces have been prepared 
            for seamless integration.
          </p>
        </div>
        
        <div className="border rounded-lg p-3 sm:p-4 bg-gray-50">
          <div className="flex items-center mb-1 sm:mb-2">
            <Database className="h-4 w-4 sm:h-5 sm:w-5 text-accent mr-2" />
            <h3 className="font-medium text-base sm:text-lg">Database Connectivity</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Data services are configured to connect with MongoDB, PostgreSQL, or Firebase
            through API calls. Data models and interfaces mirror the expected database schema.
          </p>
        </div>
        
        <div className="border rounded-lg p-3 sm:p-4 bg-gray-50">
          <div className="flex items-center mb-1 sm:mb-2">
            <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-accent mr-2" />
            <h3 className="font-medium text-base sm:text-lg">ML Integration</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            The app connects to TensorFlow/Scikit-Learn models through prediction endpoints.
            Mock implementations are provided for development, ready to connect to real ML models.
          </p>
        </div>
        
        <div className="border rounded-lg p-3 sm:p-4 bg-gray-50">
          <div className="flex items-center mb-1 sm:mb-2">
            <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-accent mr-2" />
            <h3 className="font-medium text-base sm:text-lg">Cloud & Mobile</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Integration points for AWS services and mobile clients (Flutter/React Native)
            are implemented through secure API communication and shared data models.
          </p>
        </div>
        
        <div className="border rounded-lg p-3 sm:p-4 bg-gray-50 md:col-span-2">
          <div className="flex items-center mb-1 sm:mb-2">
            <Code className="h-4 w-4 sm:h-5 sm:w-5 text-accent mr-2" />
            <h3 className="font-medium text-base sm:text-lg">External API Integration</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            The application is designed to integrate with Twilio (for SMS notifications),
            Google Safe Browsing (for URL checking), and OpenAI (for advanced text analysis).
            API endpoints are configured in the service layer.
          </p>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-5 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs sm:text-sm text-blue-700">
          <strong>Note:</strong> For production deployment, configure environment variables 
          with actual API endpoints and credentials. The current implementation includes mock 
          services for demonstration purposes.
        </p>
      </div>
    </div>
  );
};

export default TechnicalInfo;
