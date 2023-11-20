import React from "react";
import SidebarMobile from "../../Components/Navigation/SidebarMobile";
import SubNav from "../../Components/Navigation/SubSideMobile";
import { motion, AnimatePresence } from "framer-motion";
import StepNav from "../../Components/StepNav/StepNavMobile";
import { useState, useEffect, useRef } from "react";
import DataTable from "../../Components/Table/TableMobile";
import axios from "axios";
import AccountDataModal from "../../Modal/AccountData/AccountDataModalMobile";
import ScrollMobile from "../../Components/ScrollButton/ScrollMobile";

import {
  FaChartBar,
  FaUser,
  FaBox,
  FaClipboardList,
  FaTools,
} from "react-icons/fa";

const ItemDataMobile = () => {
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
          path: "/accountdata",
        },
        {
          text: "Barang",
          icon: <FaBox size={14} />,
          path: "/itemdata",
        },
        {
          text: "Peminjaman",
          icon: <FaClipboardList />,
          children: [
            {
              sub: "Pengajuan",
              path: "submission",
            },
            {
              sub: "Peminjaman",
              path: "borrow",
            },
            {
              sub: "Pengembalian",
              path: "return",
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
              path: "jobset",
            },
            {
              sub: "Jurusan",
              path: "majorset",
            },
            {
              sub: "Kategori Barang",
              path: "cataset",
            },
          ],
        },
      ];

  const steps = ["Siswa", "Guru"];

  const [selectedStep, setSelectedStep] = useState(1);

  const handleStepSelect = (step) => {
    setSelectedStep(step);
  };

  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  
  const fetchDataFromApi = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // Fetch total counts for each type of user
      const countPenggunaResponse = await axios.get(
        "http://127.0.0.1:8000/api/pengguna",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Data Pengguna:", countPenggunaResponse.data);

      return countPenggunaResponse.data;
    } catch (error) {
      console.error("Terjadi error:", error);
      throw error;
    }
  };

  const fillDataAutomatically = async () => {
    try {
      const apiData = await fetchDataFromApi();

      const filteredData = apiData
        .filter((item) => item.jurusan && item.jurusan.jurusan !== "N/A")
        .map((item, index) => ({
          NO: index + 1,
          NIS: item.nomorinduk_pengguna,
          Nama: item.nama_pengguna,
          Level: item.level_pengguna,
          Jurusan: item.jurusan.jurusan,
          Email: item.email,
        }));

      setTableData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Terjadi error:", error);
    }
  };

  const fillDataAutomatically2 = async () => {
    try {
      const apiData = await fetchDataFromApi();

      const filteredData = apiData
        .filter((item) => item.jabatan && item.jabatan.jabatan !== "N/A")
        .map((item, index) => ({
          NO: index + 1,
          NIS: item.nomorinduk_pengguna,
          Nama: item.nama_pengguna,
          Level: item.level_pengguna,
          Jabatan: item.jabatan.jabatan,
          Email: item.email,
        }));

      setTableData2(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Terjadi error:", error);
    }
  };

  const handleEditSuccess = () => {
    fillDataAutomatically();
    fillDataAutomatically2();
    closeModal();
  };

  const handleDeleteSuccess = () => {
    fillDataAutomatically();
    fillDataAutomatically2();
    closeModal();
  };


  useEffect(() => {
    fetchDataFromApi();
    handleEditSuccess();
    fillDataAutomatically();
    fillDataAutomatically2();
  }, []);

  const columns = [
    { key: "NO", label: "NO" },
    { key: "NIS", label: "NIS" },
    { key: "Nama", label: "Nama" },
    { key: "Level", label: "Level" },
    { key: "Jurusan", label: "Jurusan" },
    { key: "Email", label: "Email" },

  ];

  const columns2 = [
    { key: "NO", label: "NO" },
    { key: "NIS", label: "NIS" },
    { key: "Nama", label: "Nama" },
    { key: "Level", label: "Level" },
    { key: "Jabatan", label: "Jabatan" },
    { key: "Email", label: "Email" },

  ];

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalVisible(true);
  };

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

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div ref={sidebarRef}>
      <SubNav isOpen={isSidebarOpen} toggleNavbar={toggleSidebar} />
      <div className="mt-16 px-2 py-4 min-h-screen w-screen">
        <StepNav steps={steps} onSelectStep={handleStepSelect} Name="Data Akun"/>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStep}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {selectedStep !== "Guru" && (
              <div className="mb-4">
                <DataTable
                  columns={columns}
                  data={tableData}
                  handleRowClick={handleRowClick}
                />{" "}
              </div>
            )}

            {selectedStep === "Guru" && (
              <div className="mb-4">
                <DataTable
                  columns={columns2}
                  data={tableData2}
                  handleRowClick={handleRowClick}
                />{" "}
              </div>
            )}
            
          </motion.div>
        </AnimatePresence>
        <ScrollMobile />

        <AnimatePresence mode="wait">
        {isModalVisible && (
              <center>
                <AccountDataModal
                  rowData={selectedRowData}
                  closeModal={closeModal}
                  onEditSuccess={handleEditSuccess}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              </center>
            )}
            </AnimatePresence>

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
    </div>
  );
};

export default ItemDataMobile;
