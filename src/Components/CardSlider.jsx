import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CardSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const cards = [
    { icon: 'fa-sticky-note', text: 'Peminjaman' }, // Replace with your desired icon class
    { icon: 'fa-cube', text: 'Pengambilan' },
    { icon: 'fa-reply', text: 'Pengembalian' },
  ];

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const handleCardHover = (index) => {
    setActiveIndex(index);
  };

  const handleCardLeave = () => {
    // Set activeIndex to the default value when the mouse leaves a card
    setActiveIndex(1); // Change this to the default index you want
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="flex space-x-16">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.65 }}
            animate={{ scale: index === activeIndex ? 1.3 : 0.9 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 bg-white tracking-widest font-awesome p-4 rounded-lg cursor-pointer`}
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
          >
            <center>
              <div className='text-6xl w-full bg-white text-gray-700 rounded-lg p-4'>
                <i className={`fa ${card.icon}`} />
              </div>
            </center>
            <p className="leading-7 font-semibold text-xl text-center text-gray-700">{card.text} <br /> Barang</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
