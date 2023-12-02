import React from "react";
import SidebarMobile from "../../Components/Navigation/SidebarMobile";
import SubNav from "../../Components/Navigation/SubSideMobile";
import { motion, AnimatePresence } from "framer-motion";
import StepNav from "../../Components/StepNav/StepNavMobile";
import { useState, useEffect, useRef } from "react";
import DataTable from "../../Components/Table/TableMobile";
import axios from "axios";
import MajorSetAddModalMobile from "../../Modal/Majorset/MajorsetAddModalMobile";
import MajorsetModalMobile from "../../Modal/Majorset/MajorsetModalMobile";
import ScrollMobile from "../../Components/ScrollButton/ScrollMobile";

import {
  FaChartBar,
  FaUser,
  FaBox,
  FaClipboardList,
  FaTools,
} from "react-icons/fa";

const MajorSetMobile = () => {
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
          path: "/submission",
        },
        {
          sub: "Peminjaman",
          path: "/borrow",
        },
        {
          sub: "Pengembalian",
          path: "/return",
        },
      ],
    },
    {
      text: "Utilitas",
      icon: <FaTools />,
      children: [
        {
          sub: "Jabatan",
          path: "/jobset",
        },
        {
          sub: "Jurusan",
          path: "/majorset",
        },
        {
          sub: "Kategori Barang",
          path: "/cataset",
        },
      ],
    },
  ];

  const steps = [];

  const [selectedStep, setSelectedStep] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStepSelect = (step) => {
    setSelectedStep(step);
  };
  
  const fetchDataFromApi = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://127.0.0.1:8000/api/get-jurusan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data Jabatan:", response.data);

      return response.data;
    } catch (error) {
      console.error("Terjadi error:", error);
      // Handle error (e.g., show a notification to the user)
      throw error;
    }
  };

  const fillDataAutomatically = async () => {
    try {
      const apiData = await fetchDataFromApi();
  
      const jurusanArray = apiData;
  
      const filteredData = jurusanArray.map((item, index) => ({
        NO: index + 1,
        ID: item.id_jurusan,
        Jurusan: item.jurusan,
      }));
  
      setTableData(filteredData);
    } catch (error) {
      console.error("Terjadi error:", error);
    }
  };

  const handleEditSuccess = () => {
    fillDataAutomatically();
    closeModal();
  };

  const handleDeleteSuccess = () => {
    fillDataAutomatically();
    closeModal();
  };

  const handleAddSuccess = () => {
    fillDataAutomatically();
    closeModal2();
  };

  useEffect(() => {
    fillDataAutomatically();
  }, []);

  const columns = [
    { key: "NO", label: "NO" },
    { key: "Jurusan", label: "Jurusan" },
  ];

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal2 = () => {
    setIsModalOpen(false);
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

  return (
    <div ref={sidebarRef}>
      <SubNav isOpen={isSidebarOpen} toggleNavbar={toggleSidebar} />
      <div className="mt-16 px-2 py-4 min-h-screen w-screen">
        <StepNav steps={steps} onSelectStep={handleStepSelect} Name="Data Jurusan"/>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStep}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
                <div className="mb-4">
                  <DataTable
                    columns={columns}
                    data={tableData}
                    handleRowClick={handleRowClick}
                    addData="true"
                    onClickData={openModal}
                  />
                </div>

          </motion.div>
        </AnimatePresence>
        <ScrollMobile />

       
        <AnimatePresence mode="wait">
          {isModalVisible && (
              <MajorsetModalMobile
                rowData={selectedRowData}
                closeModal={closeModal}
                onEditSuccess={handleEditSuccess}
                onDeleteSuccess={handleDeleteSuccess}
              />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isModalOpen && (
            <MajorSetAddModalMobile
              isOpen={openModal}
              onClose={closeModal2}
              onAddSuccess={handleAddSuccess}
            />
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

export default MajorSetMobile;
