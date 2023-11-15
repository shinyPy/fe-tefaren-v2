import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../Components/Modal";
import Navbar from "../Components/Navigation/NavbarDesktop";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Baca nilai dari local storage saat komponen dimuat
    const storedModalState = localStorage.getItem('modalState');
    if (storedModalState) {
      setIsModalOpen(JSON.parse(storedModalState));
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    // Simpan nilai modal ke local storage saat dibuka
    localStorage.setItem('modalState', JSON.stringify(true));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Simpan nilai modal ke local storage saat ditutup
    localStorage.setItem('modalState', JSON.stringify(false));
  };

  const customContentStyle = {
    // Custom style for the modal content
    background: "lightblue",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    marginBottom: "100vh",
  };

  const modalVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -300 }, // Atur nilai y sesuai dengan tinggi yang diinginkan
  };

  const items = [
    {
      text: "Beranda",
      display: "display"
    },
    {
      text: "Barang",
      display: "display"
    },
    {
      text: "Tentang Kami",
      display: "display"
    },
    {
      text: "Peminjaman",
      subnav: [
        {
          text: "Ajukan Peminjaman",
        },
        {
          text: "Surat Peminjaman",
        },
        {
          text: "Pengembalian",
        },
      ],
      isSub: true,
      display: localStorage.getItem('user_role') === 'admin' || localStorage.getItem('user_role') === 'user' ? 'display' : 'none',
    },
    {
      text: "Dashboard",
      display: localStorage.getItem('user_role') === 'admin' ? 'display' : 'none',
      isLink: true,
      link: "/malas"
    },
  ];
  
  

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    window.location.reload();
  };

  // Fungsi untuk memberikan nilai user_role baru ke local storage
  const handleSetUserRole = () => {
    localStorage.setItem('user_role', 'user'); // Gantilah 'admin' dengan nilai yang diinginkan
    window.location.reload();
  };

  return (
    <div>
 <Navbar items={items}/>
 <button onClick={handleLogout}>Logout</button>
      <button onClick={handleSetUserRole}>Set User Role to Admin</button>
      <button onClick={openModal}>Open Modal</button>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={modalVariants}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 w-full bg-opacity-50 bg-gray-700 flex justify-center items-center"
          style={{ height: '200vh' }}
            
          >
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              contentStyle={customContentStyle}
            >
              <h2>Custom Modal Content</h2>
              <p>This is a custom modal content.</p>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>

      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>

      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>

      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
      <p>
        akshioahdkahdioashidgasudiahsdah
      </p>
    </div>
  );
}

export default App;

import React, {useState} from 'react';
import {IoIosAlert} from 'react-icons/io';

const StepBar = ({ steps, currentStep, onStepClick }) => {
  return (
      <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
              <div key={index} className="relative flex items-center font-semibold">
                  {index !== 0 && (
                      <div
                          className={`h-1 ${
                              index + 1 === currentStep
                                  ? 'bg-blue-600'
                                  : 'bg-gray-300'
                              } ${
                              index === 2 ? 'w-11' : 'w-12'
                              }`}
                      />
                  )}
                  <div
                      onClick={() => onStepClick(index + 1)} // Tambahkan event onClick di sini
                      className={`${
                          index + 1 === currentStep
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-300 text-gray-600'
                          } px-2 py-0.5 rounded-full border-white flex text-sm items-center justify-center z-10`}
                  >
                      {index + 1}
                  </div>
                  {index !== steps.length - 1 && (
                      <div
                          className={`h-1 ${
                              index + 1 === currentStep
                                  ? 'bg-blue-600'
                                  : 'bg-gray-300'
                              } ${
                              index === 2 ? 'w-11' : 'w-12'
                              }`}
                      />
                  )}
              </div>
          ))}
      </div>
  );
};

const DashboardCard = ({contentData}) => {
    const {title, content, icon} = contentData;
    const Icon = icon
        ? icon
        : IoIosAlert;

    // State untuk melacak halaman saat ini
    const [currentPage, setCurrentPage] = useState(1);

    // Handler untuk tombol selanjutnya
    const handleNextPage = () => {
        setCurrentPage((prevPage) => (
            prevPage < contentData.pages.length
                ? prevPage + 1
                : prevPage
        ));
    };

    // Handler untuk tombol kembali
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (
            prevPage > 1
                ? prevPage - 1
                : prevPage
        ));
    };

    // Mengambil konten sesuai dengan halaman saat ini
    const currentContent = contentData.pages[currentPage - 1];

    return (
        <div className="w-1/3 p-6">
            <div className="bg-white rounded-lg p-4 border shadow-md items-center">
            <StepBar
                    steps={contentData.pages.map((page, index) => `Step ${index + 1}`)}
                    currentStep={currentPage}
                    onStepClick={setCurrentPage} // Gunakan setCurrentPage sebagai handler onStepClick
                />
                <div className="flex">
                    <div className="w-4/12">
                        <Icon className="text-white p-4 rounded-md bg-blue-600" size={75}/>
                    </div>
                    <div className="w-9/12">
                      <center>
                        {/* Tampilkan judul dan konten sesuai dengan halaman saat ini */}
                        <h2 className="text-xl tracking-widest text-blue-700 font-bold mb-2">{currentContent.title}</h2>
                        <p className=' text-4xl text-gray-600 tracking-wide font-semibold'>{currentContent.content}</p>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
