import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMobile from "../../Components/Navigation/SidebarMobile";
import SubNav from "../../Components/Navigation/SubSideMobile";
import AdminNameMobile from "../../Components/AdminName/AdminNameMobile";
import DashboardCard from "../../Components/DashboardCard/DashboardCardMobile";
import Chartbar from "../../Components/Chartbar/ChartbarMobile";
import ScrollMobile from "../../Components/ScrollButton/ScrollMobile";

import {
  FaChartBar,
  FaUser,
  FaBox,
  FaClipboardList,
  FaTools,
} from "react-icons/fa";

import { MdAssignment } from "react-icons/md";

const DashboardMobile = () => {
    const sidebarItems = [
        {
          text: "Dashboard",
          icon: <FaChartBar />,
          subtext: "Panel Informasi",
          path: "/dashboard",
        },
        {
          text: "Pengguna",
          icon: <FaUser size={14} />,
          subtext: "Menajemen Data",
          path: "/account"
        },
        {
          text: "Barang",
          icon: <FaBox size={14} />,
          path : "item"
        },
        {
          text: "Peminjaman",
          icon: <FaClipboardList />,
          children: [
            {
              sub: "Pengajuan",
              path : "submission"
            },
            {
              sub: "Peminjaman",
              path : "borrow"
            },
            {
              sub: "Pengembalian",
              path : "return"
            },
          ],
        },
        {
          text: "Utilitas",
          icon: <FaTools />,
          subtext: "Konfigurasi Web",
          children: [
            {
              sub: "Jabatan",
              path : "jobset"
            },
            {
              sub: "Jurusan",
              path : "majorset"
            },
            {
              sub: "Kategori Barang",
              path: "cataset"
            },
          ],
        },
      ];
    
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Ref untuk SidebarMobile dan SubNav.

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        // Menutup sidebar jika terbuka dan mengklik di luar sidebar atau SubNav.
        setSidebarOpen(false);
      }
    };

    // Menambahkan event listener ke elemen SidebarMobile dan SubNav saat komponen
    // dimount.
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Membersihkan event listener saat komponen di-unmount.
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    open: {
      x: 0,
    },
    closed: {
      x: "-100%",
    },
  };

  const contentData = {
    title: "Pengguna",
    content: "Dashboard Content",
    icon: FaUser,
    pages: [
      {
        title: "Siswa",
        content: "6/10",
      },
      {
        title: "Guru",
        content: "4/10",
      },
    ],
  };

  const contentData2 = {
    title: "Barang",
    content: "Dashboard Content",
    icon: FaBox,
    pages: [
      {
        title: "Tersedia",
        content: "12",
      },
      {
        title: "Dipinjam",
        content: "12",
      },
      {
        title: "Pemeliharaan",
        content: "12",
      },
      {
        title: "Dihapuskan",
        content: "12",
      },
    ],
  };

  const contentData3 = {
    title: "Peminjaman",
    content: "Dashboard Content",
    icon: MdAssignment,
    pages: [
      {
        title: "Pengajuan",
        content: "12",
      },
      {
        title: "Peminjaman",
        content: "12",
      },
      {
        title: "Pengembalian",
        content: "12",
      },
    ],
  };

  return (
    <div ref={sidebarRef}>
      <SubNav isOpen={isSidebarOpen} toggleNavbar={toggleSidebar} />
      <div className=" mt-24 px-4">
        <AdminNameMobile storageKey="user_name" />
        <center>
          <DashboardCard
            contentData={contentData}
            iconColor="red"
            titleTextColor="red"
          />
          <DashboardCard
            contentData={contentData3}
            iconColor="pink"
            titleTextColor="pink"
          />
          <DashboardCard
            contentData={contentData2}
            iconColor="blue"
            titleTextColor="blue"
          />
          <div className=" pb-8">
            <Chartbar />
          </div>
        </center>
        <ScrollMobile />
      </div>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{
              duration: 0.3,
            }}
            className="fixed overflow-y-auto bg-white w-8/12 z-10 min-h-screen inset-0 flex flex-col shadow-xl"
          >
            <SidebarMobile items={sidebarItems} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardMobile;
