import React, { useState } from 'react';
import { IoIosAlert } from 'react-icons/io';
import { useNavigation } from '../../Utils/Navigation';

const StepBar = ({ steps, currentStep, onStepClick, bg }) => {
  const totalSteps = steps.length;
  const isFourSteps = totalSteps === 4;
  const isTwoSteps = totalSteps === 2; // Corrected this line

  const getIconColor = () => {
    switch (bg) {
      case 'red':
        return 'bg-red-600';
      case 'blue':
        return 'bg-blue-600';
      case 'pink':
        return 'bg-pink-600';
      default:
        return 'bg-red-600'; // Default color
    }
  };

  const renderStepLine = (index) => (
    <div
      className={`h-1 ${
        index + 1 === currentStep ? getIconColor() : 'bg-gray-300'
      } ${
        index === 2
          ? isFourSteps
            ? 'w-5' // Jika isFourSteps true, ubah w-11 menjadi w-7
            : 'w-10'
          : isFourSteps
          ? 'w-6' // Jika isFourSteps true, ubah w-12 menjadi w-9
          : 'w-11'
      } ${
        isTwoSteps ? ' w-[100px]' : '' // Deteksi untuk isTwoSteps
      }`}
    />
  );

  const renderStepCircle = (index) => (
    <div
      onClick={() => onStepClick(index + 1)}
      className={`${
        index + 1 === currentStep
          ? `${getIconColor()} text-white`
          : 'bg-gray-300 text-gray-600'
      } px-3 py-1.5 rounded-full border-white flex text-sm items-center justify-center`}
    >
      {index + 1}
    </div>
  );

  return (
    <div className="flex items-center justify-between mb-4">
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-center font-semibold">
          {index !== 0 && renderStepLine(index)}
          {renderStepCircle(index)}
          {index !== totalSteps - 1 && renderStepLine(index)}
        </div>
      ))}
    </div>
  );
};

const DashboardCard = ({ contentData, iconColor, titleTextColor }) => {
  const { title, content, icon } = contentData;
  const Icon = icon ? icon : IoIosAlert;

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < contentData.pages.length ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const currentContent = contentData.pages[currentPage - 1];

  const getIconColor = () => {
    switch (iconColor) {
      case 'red':
        return 'bg-red-600';
      case 'blue':
        return 'bg-blue-600';
      case 'pink':
        return 'bg-pink-600';
      default:
        return 'bg-red-600'; // Default color
    }
  };

  const getTitleColor = () => {
    switch (titleTextColor) {
      case 'red':
        return 'text-red-600';
      case 'blue':
        return 'text-blue-600';
      case 'pink':
        return 'text-pink-600';
      default:
        return 'text-red-600'; // Default color
    }
  };

  const navigate = useNavigation();

  return (
    <div className="w-1/3 p-6">
      <div className="rounded-lg p-4 border shadow-md items-center bg-white">
        <h1 className="text-2xl tracking-widest font-semibold text-gray-800 mb-1">
          {title}
        </h1>
        <StepBar
          steps={contentData.pages.map((page, index) => `Step ${index + 1}`)}
          currentStep={currentPage}
          onStepClick={setCurrentPage}
          bg={iconColor}
        />
        <div className="flex">
          <div className="w-4/12">
            <Icon
              className={`text-white p-4 rounded-md ${getIconColor()}`}
              size={90}
            />
          </div>
          <div className="w-8/12">
            <center>
              <h2
                className={`text-xl tracking-widest font-bold mb-2 ${getTitleColor()}`}
              >
                {currentContent.title}
              </h2>
              <p className="text-5xl  text-gray-600 tracking-wide font-semibold">
                {currentContent.content}
              </p>
            </center>
          </div>
        </div>
        <button type='button' onClick={() => navigate(`/${currentContent.link}`)}className={`text-white py-2 px-4 w-full mt-4 rounded-md flex ${getIconColor()}`}
        >
          Lihat Selengkapnya Disini
          <svg class="w-4 h-4 ml-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default DashboardCard;
