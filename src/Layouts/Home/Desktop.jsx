import React, { useState, useEffect } from "react";
import NavbarDesktop from "../../Components/Navigation/NavbarDesktop";
import LoginModal from "../../Modal/Home/LoginDesktop";
import RegisterModal from "../../Modal/Home/RegisterDesktop";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useModal } from "../../Utils/ModalUtils";
import vectorImage from "../../Assets/Image/business-team-and-work-process-steps-from-idea-to-target-business-workflow-business-process-efficiency-working-activity-pattern-concept-flat-modern-illustration-vector.jpg"

const items = [
  {
    text: "Beranda",
    display: "display",
  },
  {
    text: "Barang",
    display: "display",
  },
  {
    text: "Tentang Kami",
    display: "display",
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
    display:
      localStorage.getItem("user_role") === "admin" ||
      localStorage.getItem("user_role") === "user"
        ? "display"
        : "none",
  },
  {
    text: "Dashboard",
    display: localStorage.getItem("user_role") === "admin" ? "display" : "none",
    isLink: true,
    link: "/dashboard",
  },
  {
    login: true,
  },
];

const HomeDesktop = () => {
  const [isLoginOpen, setIsLoginOpen] = useModal("login", false);

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const [isRegisterOpen, setIsRegisterOpen] = useModal("register", false);

  const openRegister = () => {
    setIsRegisterOpen(true);
  };

  const closeRegister = () => {
    setIsRegisterOpen(false);
  };

  const linkToRegister = () => {
    closeLogin();

    // Menunggu selama 0.35 detik sebelum memanggil openRegister
    setTimeout(() => {
      openRegister();
    }, 350); // Waktu dalam milidetik (0.35 detik = 350 milidetik)
  };

  const linkToLogin = () => {
    closeRegister();

    // Menunggu selama 0.35 detik sebelum memanggil openRegister
    setTimeout(() => {
      openLogin();
    }, 350); // Waktu dalam milidetik (0.35 detik = 350 milidetik)
  };

  useEffect(() => {
    const loginSuccessMessage = localStorage.getItem("login_success_message");

    if (loginSuccessMessage) {
      // Menampilkan toast jika ada pesan login sukses
      toast.success(loginSuccessMessage);

      // Hapus pesan dari localStorage agar tidak tampil lagi setelah hard refresh
      localStorage.removeItem("login_success_message");
    }
  }, []);

  const imgStyle = {
    height: '65vh',
    width: '130vh',
    objectFit: 'cover',

  };

  return (
    <div>
      <NavbarDesktop items={items} login={openLogin} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div id='elemenHome' className="min-h-screen min-w-full">
        <div className=" flex">
      <div className=' ml-14 mt-14'>
              <img src={vectorImage} alt="shhd" style={imgStyle} />
            </div>
            <div className=' text-center mt-40'>
              <h1 className='text-5xl mb-1 font-semibold text-red-700'>
                Teaching Factory Resource Empowerment Network
              </h1>
              <p className='text-2xl py-3 mb-1 font-semibold text-gray-700'>Wujudkan inovasi pada dunia industri</p>
              </div>
              </div>
              </div>

              <div id='elemenHome' className=" bg-red-200 min-h-screen min-w-full">
            <h1 className='text-5xl mb-1 font-semibold text-red-700'>
                Teaching Factory Resource Empowerment Network
              </h1>
              </div>
      <AnimatePresence mode="wait">
        {isLoginOpen && (
          <LoginModal
            isOpen={isLoginOpen}
            onClose={closeLogin}
            onLink={linkToRegister}
          />
        )}
        {isRegisterOpen && (
          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={closeRegister}
            onLink={linkToLogin}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeDesktop;
