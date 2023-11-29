import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const Scroll = () => {
  const [isPastTriggerPoint, setIsPastTriggerPoint] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = 200;

      setIsPastTriggerPoint(scrollPosition > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const buttonVariants = {
    hidden: { opacity: 1, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 1, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isPastTriggerPoint && (
        <motion.div
          className='fixed bottom-0 right-0 p-4'
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={buttonVariants}
        >
          <motion.button
            onClick={scrollToTop}
            className='p-3 bg-red-600 text-white rounded-md'
            whileHover={{ scale: 1.1 }}
          >
            <FaArrowUp />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Scroll;
