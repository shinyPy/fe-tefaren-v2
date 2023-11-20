import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StepNavItem = ({ step, active, onClick}) => {
  return (
    <div className="relative text-base tracking-widest">
      <span
        onClick={onClick}
        className={`cursor-pointer font-semibold ${active ? 'text-gray-600' : 'text-gray-400'}`}
      >
        {step}
      </span>
      {active && (
        <motion.div
          className="absolute w-full bg-gray-600 h-0.5 rounded-full mt-0.5 transform scale-x-100 origin-left transition-transform duration-300"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
        />
      )}
    </div>
  );
};

const StepNav = ({ onSelectStep, steps, Name }) => {
    const [activeStep, setActiveStep] = useState(1);
  
    const handleStepClick = (step) => {
      setActiveStep(step);
      onSelectStep(step);
    };

  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("id-ID", options);

  
    return (
      <nav className=' border shadow-md rounded-lg'>
     <div className="w-full bg-gray-700 shadow-md flex mx-auto rounded-t-lg">
      <div className="w-5/12 bg-gray-700 rounded-t-lg text-white p-3 justify-start font-semibold">
        <h1 className="text-base tracking-widest"> {Name}</h1>
      </div>
      <div
        className="w-7/12 rounded-t-lg text-white bg-gray-700 py-3 px-4 relative justify-end font-semibold"
      >
        <p className="text-base text-right">{formattedDate}</p>
      </div>
    </div>   <div className="flex bg-white items-center rounded-b-lg space-x-6 px-4 py-3 ">
          {steps.map((step, index) => (
            <StepNavItem
              key={step}
              step={step}
              active={activeStep === step || (index === 0 && activeStep === 1)}
              onClick={() => handleStepClick(step)}
            />
          ))}
        </div>
      </nav>
    );
  };
  

export default StepNav;
