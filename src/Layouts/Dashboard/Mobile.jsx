import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMobile from "../../Components/Navigation/SidebarMobile";
import SubNav from "../../Components/Navigation/SubSideMobile";
import AdminNameMobile from "../../Components/AdminName/AdminNameMobile";
import DashboardCard from "../../Components/DashboardCard/DashboardCardMobile";
import Chartbar from "../../Components/Chartbar/ChartbarMobile";
import ScrollMobile from "../../Components/ScrollButton/ScrollMobile";
import axios from "axios";

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

  const [contentData, setContentData] = useState({
    title: 'Pengguna',
    content: 'Dashboard Content',
    icon: FaUser,
    pages: [
      {
        title: 'Siswa',
        content: '', // No initial loading placeholder
        link: 'pengguna',
      },
      {
        title: 'Guru',
        content: '',
        link: 'pengguna',
      },
    ],
  });
  const [contentData2, setContentData2] = useState({
    title: 'Barang',
    content: 'Dashboard Content',
    icon: FaBox,
    pages: [
      {
        title: 'Tersedia',
        content: '',
      },
      {
        title: 'Dipinjam',
        content: '',
      },
      {
        title: 'Pemeliharaan',
        content: '',
      },
      {
        title: 'Dihapuskan',
        content: '',
      },
      // Add other pages as needed
    ],
  });
  const [contentData3, setContentData3] = useState({
    title: 'Peminjaman',
    content: 'Dashboard Content',
    icon: MdAssignment,
    pages: [
      {
        title: 'Permohonan',
        content: '',
      },
      {
        title: 'Peminjaman',
        content: '',
      },
      {
        title: 'Pengembalian',
        content: '',
      },
      // Add other pages as needed
    ],
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        // Fetch total counts for each type of user
        const countPenggunaResponse = await axios.get('http://127.0.0.1:8000/api/count-pengguna', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const countPenggunaData = countPenggunaResponse.data;

        // Fetch data for tipepengguna
        const countTipePenggunaResponse = await axios.get('http://127.0.0.1:8000/api/count-tipepengguna', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const countTipePenggunaData = countTipePenggunaResponse.data;

        // Update contentData with the fetched values
        setContentData((prevContentData) => ({
          ...prevContentData,
          pages: [
            {
              ...prevContentData.pages[0],
              content: `${countTipePenggunaData.total_siswa}/${countPenggunaData.total}`,
            },
            {
              ...prevContentData.pages[1],
              content: `${countTipePenggunaData.total_guru}/${countPenggunaData.total}`,
            },
          ],
        }));

        // Fetch data for tipebarang
        const countTipeBarangResponse = await axios.get('http://127.0.0.1:8000/api/count-tipebarang', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const countBarangResponse = await axios.get('http://127.0.0.1:8000/api/count-barang', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  

        const countTipeBarangData = countTipeBarangResponse.data;
        const countBarangData = countBarangResponse.data;
        // Update contentData2 with the fetched values
        setContentData2((prevContentData2) => ({
          ...prevContentData2,
          pages: [
            {
              ...prevContentData2.pages[0],
              content: `${countTipeBarangData.total_baik}/${countBarangData.total}`,
            },
            {
              ...prevContentData2.pages[1],
              content: `${countTipeBarangData.total_rusak}/${countBarangData.total}`,
            },
            {
              ...prevContentData2.pages[2],
              content: `${countTipeBarangData.total_pemeliharaan}/${countBarangData.total}`,
            },
            {
              ...prevContentData2.pages[3],
              content: `${countTipeBarangData.total_dihapuskan}/${countBarangData.total}`,
            },
            // Add other pages as needed
          ],
        }));
        const countPermohonanResponse = await axios.get('http://127.0.0.1:8000/api/count-permohonan', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const countPermohonanData = countPermohonanResponse.data;
  
          // Fetch data for peminjaman
          const countPeminjamanResponse = await axios.get('http://127.0.0.1:8000/api/count-peminjaman', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const countPeminjamanData = countPeminjamanResponse.data;
  
          // Fetch data for pengembalian
          const countPengembalianResponse = await axios.get('http://127.0.0.1:8000/api/count-pengembalian', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const countPengembalianData = countPengembalianResponse.data;
  
          // Update contentData3 with the fetched values
          setContentData3((prevContentData3) => ({
            ...prevContentData3,
            pages: [
              {
                ...prevContentData3.pages[0],
                content: `${countPermohonanData.total}`,
              },
              {
                ...prevContentData3.pages[1],
                content: `${countPeminjamanData.total}`,
              },
              {
                ...prevContentData3.pages[2],
                content: `${countPengembalianData.total}`,
              },
              // Add other pages as needed
            ],
          }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call the async function
    }, []); // Empty dep

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
