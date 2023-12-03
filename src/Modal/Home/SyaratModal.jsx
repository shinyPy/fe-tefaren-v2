import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import logo from "../../Assets/Image/logo-telkom-schools-horisontal-1024x320.png"

const SyaratModal = ({ openModal, closeModal }) => {
  const formRef = useRef(null);
  const customContentStyle = {
    marginBottom: "100vh",
  };

  const modalVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -300 },
  };

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      console.log(typeof closeModal); // Add this line to check the type
      closeModal(); // Check if this is correct
    }
  };

  useEffect(() => {
    if (openModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openModal, closeModal]);

  return (
    <motion.div
      initial="closed"
      animate={openModal ? "open" : "closed"}
      exit="closed"
      variants={modalVariants}
      transition={{
        duration: 0.35,
      }}
      style={{ height: "200vh" }}
      className="fixed z-20 top-0 left-0 p-4 w-full bg-opacity-50 bg-gray-700 flex justify-center items-center backdrop-blur-sm"
    >
      <div
        className="bg-white p-4 left-0 rounded-2xl w-1/2"
        ref={formRef}
        style={customContentStyle}
      >
        <div className=" w-36 h-14">
        <img src={logo} alt="jkhasjkdh" />
        </div>
        <div className=" bg-red-500 h-1 w-full mb-2 rounded-full"></div>
        <p className=" text-sm">
          Dengan Ini Saya selaku Peminjam / Pemohon secara sadar lahiriyah
          menyadari bahwa terikat terhadap hukum tertulis yang berlaku di SMK
          Telkom Banjarbaru. Pemohon Bersedia bertanggung jawab jika pada
          dikemudian hari. Alat atau diruangan yang dipinjam ditemukan bukti
          atau terjadinya kerusakan baik disengaja ataupun tidak disengaja. Maka
          saya yang terdata pada bagian selanjutnya bersedia secara Sadar akan
          memenuhi tanggung jawab. Mengganti barang senilai Barang atau
          kerusakan yang Terjadi. Dan jika saya mengingkari pemenuhan tanggung
          jawab saya bersedia akan dilaporkan dan melalui proses Hukum yang
          berlaku pada NKRI Peminjam secara sadar mengetahui :
        </p>
        <ul className="list-disc text-sm p-4 space-y-2">
      <li>
        Menjaga Alat/Ruangan sebaik-baiknya.
      </li>
      <li>
        Pemohon bertanggung jawab penuh menjaga kondisi alat dan atau ruangan seperti sedia kala sebelum dipinjam.
      </li>
      <li>
        Pemohon mengetahui segala bentuk alat yang berhubungan dengan alat yang dipinjam yang bukan alat/barang dengan status kepemilikan SMK Telkom Banjarbaru, jika hilang bukan menjadi tanggung jawab SMK Telkom Banjarbaru.
      </li>
      <li>
        Pemohon mengetahui jika alat pribadi yang berhubungan dengan alat yang dipinjam yang tidak diamankan pemohon sebelum pengembalian, dalam proses claim barang pribadi tersebut diharap dapat membuktikan kepemilikan sah terhadap alat pribadi tersebut.
      </li>
      <li>
        Pemohon mengetahui barang yang dipinjam tidak boleh dibawa keluar dari kawasan SMK Telkom Banjarbaru tanpa sepengetahuan oleh Wakil Kepala Sekolah Bidang Sarana Prasarana, Kepala Program Pendidikan bersangkutan, dan Kepala Urusan Laboratorium.
      </li>
      <li>
        Pemohonan menyadari bahwa PERMOHONAN akan diproses maksimal satu hari sebelum waktu pemakaian, segala PERMOHONAN yang dilakukan mendadak akan diproses setelah mendapat persetujuan dari Wakil Kepala Sekolah Bidang Sarana Prasarana dan Kepala Urusan Laboratorium.
      </li>
    </ul>
      </div>
    </motion.div>
  );
};

export default SyaratModal;
