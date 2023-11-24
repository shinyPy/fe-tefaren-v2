import React from "react";
import SidebarDesktop from "../../Components/Navigation/SidebarDesktop";
import { motion, AnimatePresence } from "framer-motion";
import StepNav from "../../Components/StepNav/StepNav";
import { useState, useEffect } from "react";
import DataTable from "../../Components/Table/Table";
import axios from "axios";
import ItemDataModal from "../../Modal/ItemData/ItemDataModal";
import ItemDataAddModal from "../../Modal/ItemData/itemDataAddModal";

import {
  FaChartBar,
  FaUser,
  FaBox,
  FaClipboardList,
  FaTools,
} from "react-icons/fa";

const ItemDataDesktop = () => {
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

  const steps = ["Tersedia", "Dipinjam", "Pemeliharaan", "Dihapuskan"];

  const [selectedStep, setSelectedStep] = useState(1);

  const handleStepSelect = (step) => {
    setSelectedStep(step);
  };

  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData3, setTableData3] = useState([]);
  const [tableData4, setTableData4] = useState([]);

  const fetchDataFromApi = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // Fetch data from the API
      const barangResponse = await axios.get(
        "http://127.0.0.1:8000/api/barangShow",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Data Barang:", barangResponse.data);

      return barangResponse.data;
    } catch (error) {
      console.error("Terjadi error:", error);
      throw error;
    }
  };

  const fillDataAutomatically = async () => {
    try {
      const apiData = await fetchDataFromApi();

      const filteredData = apiData
        .filter((item) => item.ketersediaan_barang === "Tersedia")
        .map((item, index) => ({
          NO: index + 1,
          ID: item.id_barang,
          Ketersediaan: item.ketersediaan_barang,
          Kode: item.kode_barang,
          Nomor: item.nomor_barang,
          Nama: item.nama_barang, // Adjust this according to your data structure
          Kategori: item.kategori.kategori, // Adjust this according to your data structure// Adjust this according to your data structure
          Status: item.status_barang, // Adjust this according to your data structure
          Gambar: item.gambar_barang, // Adjust this according to your data structure
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
        .filter((item) => item.ketersediaan_barang === "Dipinjam")
        .map((item, index) => ({
          NO: index + 1,
          ID: item.id_barang,
          Ketersediaan: item.ketersediaan_barang,
          Kode: item.kode_barang,
          Nomor: item.nomor_barang,
          Nama: item.nama_barang, // Adjust this according to your data structure
          Kategori: item.kategori.kategori, // Adjust this according to your data structure// Adjust this according to your data structure
          Status: item.status_barang, // Adjust this according to your data structure
          Gambar: item.gambar_barang, // Adjust this according to your data structure
        }));

      setTableData2(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Terjadi error:", error);
    }
  };

  const fillDataAutomatically3 = async () => {
    try {
      const apiData = await fetchDataFromApi();

      const filteredData = apiData
        .filter((item) => item.ketersediaan_barang === "Pemeliharaan")
        .map((item, index) => ({
          NO: index + 1,
          ID: item.id_barang,
          Ketersediaan: item.ketersediaan_barang,
          Kode: item.kode_barang,
          Nomor: item.nomor_barang,
          Nama: item.nama_barang, // Adjust this according to your data structure
          Kategori: item.kategori.kategori, // Adjust this according to your data structure// Adjust this according to your data structure
          Status: item.status_barang, // Adjust this according to your data structure
          Gambar: item.gambar_barang, // Adjust this according to your data structure
        }));

      setTableData3(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Terjadi error:", error);
    }
  };

  const fillDataAutomatically4 = async () => {
    try {
      const apiData = await fetchDataFromApi();

      const filteredData = apiData
        .filter((item) => item.ketersediaan_barang === "Dihapuskan")
        .map((item, index) => ({
          NO: index + 1,
          ID: item.id_barang,
          Ketersediaan: item.ketersediaan_barang,
          Kode: item.kode_barang,
          Nomor: item.nomor_barang,
          Nama: item.nama_barang, // Adjust this according to your data structure
          Kategori: item.kategori.kategori, // Adjust this according to your data structure// Adjust this according to your data structure
          Status: item.status_barang, // Adjust this according to your data structure
          Gambar: item.gambar_barang, // Adjust this according to your data structure
        }));

      setTableData4(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Terjadi error:", error);
    }
  };

  const handleEditSuccess = () => {
    fillDataAutomatically();
    fillDataAutomatically2();
    fillDataAutomatically3();
    fillDataAutomatically4();
    closeModal();
  };

  const handleDeleteSuccess = () => {
    fillDataAutomatically();
    fillDataAutomatically2();
    fillDataAutomatically3();
    fillDataAutomatically4();
    closeModal();
  };

  const handleAddSuccess = () => {
    fillDataAutomatically();
    fillDataAutomatically2();
    fillDataAutomatically3();
    fillDataAutomatically4();
    closeModal2();
  };

  useEffect(() => {
    fillDataAutomatically();
    fillDataAutomatically2();
    fillDataAutomatically3();
    fillDataAutomatically4();
  }, []); // Removed fetchDataFromApi() and handleEditSuccess() from useEffect, as they are already called inside the other functions

  const columns = [
    { key: "NO", label: "NO" },
    { key: "Kode", label: "Kode" },
    { key: "Nomor", label: "Nomor" },
    { key: "Nama", label: "Nama" },
    { key: "Kategori", label: "Kategori" },
    { key: "Status", label: "Status" },
    { key: "Gambar", label: "Gambar" },
  ];

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <StepNav
          steps={steps}
          onSelectStep={handleStepSelect}
          Name="Data Barang"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStep}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {selectedStep !== "Dipinjam" &&
              selectedStep !== "Dihapuskan" &&
              selectedStep !== "Pemeliharaan" && (
                <div className="mb-4">
                  <DataTable
                    columns={columns}
                    data={tableData}
                    handleRowClick={handleRowClick}
                    addData="true"
                    onClickData={openModal}
                  />
                </div>
              )}

            {selectedStep === "Dipinjam" && (
              <div className="mb-4">
                <DataTable
                  columns={columns}
                  data={tableData2}
                  handleRowClick={handleRowClick}
                  addData="true"
                  onClickData={openModal}
                />
              </div>
            )}

{selectedStep === "Pemeliharaan" && (
              <div className="mb-4">
                <DataTable
                  columns={columns}
                  data={tableData3}
                  handleRowClick={handleRowClick}
                  addData="true"
                  onClickData={openModal}
                />
              </div>
            )}


{selectedStep === "Dihapuskan" && (
              <div className="mb-4">
                <DataTable
                  columns={columns}
                  data={tableData4}
                  handleRowClick={handleRowClick}
                  addData="true"
                  onClickData={openModal}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>



        <AnimatePresence mode="wait">
          {isModalVisible && (
              <ItemDataModal
                rowData={selectedRowData}
                closeModal={closeModal}
                onEditSuccess={handleEditSuccess}
                onDeleteSuccess={handleDeleteSuccess}
              />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isModalOpen && (
            <ItemDataAddModal
              isOpen={openModal}
              onClose={closeModal2}
              onAdd={handleAddSuccess}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ItemDataDesktop;
