import React, { useState } from 'react';
import { FaCompass, FaRocket, FaBinoculars } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CardSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const cards = [
    { icon: <FaCompass />, text: 'Eksplorasi', text2: 'Potensi' },
    { icon: <FaRocket />, text: 'Optimalkan', text2: 'Kemampuan' },
    { icon: <FaBinoculars />, text: 'Gali', text2: 'Pengalaman' },
  ];

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const handleCardHover = (index) => {
    setActiveIndex(index);
  };

  const handleCardLeave = () => {
    // Set activeIndex to the default value when mouse leaves a card
    setActiveIndex(1); // Change this to the default index you want
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="flex space-x-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.75 }}
            animate={{ scale: index === activeIndex ? 1.25 : 0.75 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 bg-blue-700 tracking-widest shadow-md border font-semibold p-4 rounded-lg cursor-pointer`}
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
          >
            <center>
              <div className='text-5xl w-full bg-blue-700 text-white rounded-lg p-4'>
                {card.icon}
              </div>
            </center>
            <p className="leading-5 text-white">{card.text} <br/> {card.text2}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
