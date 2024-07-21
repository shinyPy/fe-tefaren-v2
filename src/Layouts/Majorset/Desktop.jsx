import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarDesktop from "../../Components/Navigation/SidebarDesktop";
import StepNav from "../../Components/StepNav/StepNav";
import DataTable from "../../Components/Table/Table";
import axios from "axios";
import MajorsetModal from "../../Modal/Majorset/MajorsetModal";
import MajorSetAddModal from "../../Modal/Majorset/MajorsetAddModal";
import { API_BASE_URL } from "../../var";
import { FaChartBar, FaUser, FaBox, FaClipboardList, FaTools } from "react-icons/fa";

const MajorSetDesktop = () => {
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
      const response = await axios.get(```${API_BASE_URL}api/get-jurusan`, {
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

  return (
    <div className="flex">
      <SidebarDesktop items={sidebarItems} />
      <div className="px-8 py-4 min-h-screen w-screen">
        <StepNav steps={steps} onSelectStep={handleStepSelect} Name="Data Jurusan" />
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

        <AnimatePresence mode="wait">
          {isModalVisible && (
            <MajorsetModal
              rowData={selectedRowData}
              closeModal={closeModal}
              onEditSuccess={handleEditSuccess}
              onDeleteSuccess={handleDeleteSuccess}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isModalOpen && (
            <MajorSetAddModal
              isOpen={isModalOpen}
              onClose={closeModal2}
              onAddSuccess={handleAddSuccess}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MajorSetDesktop;
