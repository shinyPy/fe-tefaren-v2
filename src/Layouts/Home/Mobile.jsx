import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RegisterModal from "../../Modal/Home/RegisterMobile";
import NavbarMobile from "../../Components/Navigation/NavbarMobile";
import LoginModal from "../../Modal/Home/LoginMobile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useModal } from "../../Utils/ModalUtils";

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

const HomeMobile = () => {
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

  return (
    <div>
      <NavbarMobile menuItems={items} login={openLogin} />
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
      <div className="grid grid-cols-4 gap-4 grid-flow-row mb-10 mt-20">
        <div className="bg-blue-300 col-start-1 col-span-2">01</div>
        <div className="bg-yellow-300">02</div>
        <div className="bg-green-300">03</div>
        <div className="bg-blue-300">04</div>
        <div className="bg-yellow-300 col-span-2">05</div>
        <div className="bg-blue-300">06</div>
        <div className="bg-red-300 col-span-4">07</div>
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

export default HomeMobile;
