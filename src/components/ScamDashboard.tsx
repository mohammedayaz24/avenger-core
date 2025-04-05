
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { AlertCircle, Map, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const scamTypeData = [
  { name: 'Loan Scams', value: 45 },
  { name: 'Phishing', value: 30 },
  { name: 'OTP Fraud', value: 15 },
  { name: 'KYC Fraud', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentScamsData = [
  { type: 'Delhi', count: 200 },
  { type: 'Mumbai', count: 180 },
  { type: 'Bangalore', count: 150 },
  { type: 'Chennai', count: 120 },
  { type: 'Kolkata', count: 90 },
];

const ScamDashboard = () => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
        <TrendingUp className="mr-2 h-5 w-5 text-accent" />
        Scam Dashboard & Alerts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h3 className="text-md font-medium mb-2 sm:mb-3 flex items-center">
            <AlertCircle className="mr-2 h-4 w-4 text-accent" />
            Current Scam Distribution
          </h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scamTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isMobile ? 60 : 80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {scamTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium mb-2 sm:mb-3 flex items-center">
            <Map className="mr-2 h-4 w-4 text-accent" />
            Scam Hotspots
          </h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={recentScamsData}
                margin={{
                  top: 5,
                  right: isMobile ? 10 : 30,
                  left: isMobile ? 10 : 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="type" tick={{ fontSize: isMobile ? 10 : 12 }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                <Bar dataKey="count" fill="#0D9488" name="Reported Cases" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <h3 className="text-md font-medium mb-2 sm:mb-3">Recent Scam Alerts</h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="p-2 sm:p-3 bg-orange-50 border border-orange-200 rounded-md">
            <p className="text-sm font-medium text-orange-800">
              New Alert: Fake 'Government Grant' messages offering free ₹1 lakh!
            </p>
            <p className="text-xs text-orange-600 mt-1">
              Reported 2 hours ago • Several victims already affected
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm font-medium text-red-800">
              Urgent: New WhatsApp scam impersonating bank managers requesting account details
            </p>
            <p className="text-xs text-red-600 mt-1">
              Reported 5 hours ago • High risk • Multiple reports from Delhi
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm font-medium text-yellow-800">
              Warning: Fake job offer emails asking for security deposits
            </p>
            <p className="text-xs text-yellow-600 mt-1">
              Reported 1 day ago • Targeting recent graduates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamDashboard;
