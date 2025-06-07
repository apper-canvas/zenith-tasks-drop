import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-brutal"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="AlertTriangle" className="w-24 h-24 text-accent mx-auto mb-brutal" />
        </motion.div>
        <h1 className="text-display font-display text-caps mb-4">404</h1>
        <h2 className="text-title font-display text-caps mb-6">PAGE NOT FOUND</h2>
        <p className="text-surface-300 mb-brutal max-w-md">
          THE REQUESTED RESOURCE HAS BEEN ELIMINATED FROM THE SYSTEM.
          RETURN TO BASE OPERATIONS.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="bg-surface-800 text-surface-50 px-8 py-4 border-structure border-surface-600 
                   hover:border-surface-50 hover:shadow-brutal-medium transition-brutal"
        >
          RETURN TO ZENITH
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;