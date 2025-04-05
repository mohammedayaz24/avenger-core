
import { useState } from 'react';
import { Shield, Check, AlertTriangle, Bell, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    // Simulate loading and redirect to login page
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 overflow-hidden relative">
      {/* Glass overlay elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Nav */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-accent" />
          <span className="text-lg font-semibold">AvengerCore</span>
        </div>
        <div>
          <Button 
            variant="ghost" 
            className="border border-slate-300 hover:bg-white/50 text-slate-700"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-4 pt-20 pb-32 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            className="inline-block mb-4 p-2 rounded-full bg-white/70 backdrop-blur-sm"
            variants={fadeInUp}
          >
            <span className="text-xs font-medium px-3 py-1 text-slate-700">Trusted by Security Experts</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-800"
            variants={fadeInUp}
          >
            AI-Powered Security at Its Core
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Protect yourself from financial fraud with our advanced AI detection tools designed to identify scams, assess risks, and provide real-time alerts.
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white rounded-full px-8"
              onClick={handleGetStarted}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="bg-white/50 backdrop-blur-sm py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Advanced Protection Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive tools to keep you safe from financial fraud and scams.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-sm"
              variants={fadeInUp}
            >
              <div className="bg-accent/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <AlertTriangle className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Real-time Fraud Detection</h3>
              <p className="text-slate-600">
                Our AI scans suspicious links and messages to identify phishing attempts and fraud schemes in real-time.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-sm"
              variants={fadeInUp}
            >
              <div className="bg-accent/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Check className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">AI-Powered Risk Analysis</h3>
              <p className="text-slate-600">
                Evaluate the legitimacy of loan applications with our comprehensive risk assessment system.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-sm"
              variants={fadeInUp}
            >
              <div className="bg-accent/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Bell className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Secure & Seamless Transactions</h3>
              <p className="text-slate-600">
                Receive instant notifications about potential threats and process transactions securely and efficiently.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Trusted By Experts</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Join thousands of users who trust our platform for their security needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {/* Company Logos - Using placeholder content */}
            {['National Security Agency', 'FinTech Alliance', 'Global Cyber Trust', 'SecureBank'].map((company, index) => (
              <motion.div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-lg border border-slate-200 w-full flex items-center justify-center h-20 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <p className="text-slate-700 font-medium text-center">{company}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-8 max-w-3xl mx-auto shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xl italic mb-6 text-slate-700">
                "AvengerCore has revolutionized how we combat financial fraud in the digital banking sector. Their AI detection system has helped us prevent numerous scam attempts."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-blue-600">PB</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Priya Bansal</p>
                  <p className="text-sm text-slate-500">Chief Security Officer, Digital Banking Alliance</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-sm py-8 border-t border-slate-200 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-accent" />
              <span className="text-lg font-semibold text-slate-800">AvengerCore</span>
            </div>
            <div className="text-sm text-slate-500">
              &copy; 2023 AvengerCore. All rights reserved. Protecting digital finance.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
