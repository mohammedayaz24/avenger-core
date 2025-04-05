
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Navigate to landing page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.4
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="flex flex-col items-center text-center"
        variants={itemVariants}
      >
        <motion.div 
          className="flex items-center justify-center w-28 h-28 bg-white/80 backdrop-blur-sm rounded-full shadow-xl mb-8"
          animate={{ 
            boxShadow: [
              "0px 0px 15px 0px rgba(75, 160, 255, 0.2)",
              "0px 0px 30px 5px rgba(75, 160, 255, 0.4)",
              "0px 0px 15px 0px rgba(75, 160, 255, 0.2)"
            ],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Shield className="h-14 w-14 text-accent" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold text-slate-800 mb-3"
          variants={itemVariants}
        >
          AvengerCore
        </motion.h1>
        
        <motion.p 
          className="text-lg text-slate-500"
          variants={itemVariants}
        >
          AI-Powered Security Solutions
        </motion.p>
        
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="flex gap-2">
            <span className="h-2 w-2 bg-accent/60 rounded-full animate-pulse"></span>
            <span className="h-2 w-2 bg-accent/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
            <span className="h-2 w-2 bg-accent/60 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
