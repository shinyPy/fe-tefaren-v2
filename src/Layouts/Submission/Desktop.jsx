import React from "react";
import SidebarDesktop from "../../Components/Navigation/SidebarDesktop";
import { motion, AnimatePresence } from "framer-motion";
import StepNav from "../../Components/StepNav/StepNav";
import { useState, useEffect } from "react";
import DataTable from "../../Components/Table/Table";
import axios from "axios";
import SubmissionModal from "../../Modal/Submission/SubmissionModal";

import {
  FaChartBar,
  FaUser,
  FaBox,
  FaClipboardList,
  FaTools,
} from "react-icons/fa";

const SubmissionDesktop = () => {
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

  const steps = ["Diajukan", "Diterima", "Ditolak"];

  const [selectedStep, setSelectedStep] = useState(1);

  const handleStepSelect = (step) => {
    setSelectedStep(step);
  };

  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData3, setTableData3] = useState([]);
  
  const fetchDataFromApi = async () => {
    try {
      const token = localStorage.getItem("accessToken");
  
      // Fetch total counts for each type of user
      const countPenggunaResponse = await axios.get(
        "http://127.0.0.1:8000/api/show-permohonan",
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
        .filter((item) => item.status_permohonan === "diajukan")
        .map((item, index) => {
          const detailsBarangArray = JSON.parse(item.details_barang);
          const barangDetailsArray = item.barang_details;
  
          const barangCountMap = detailsBarangArray.reduce((acc, detailsBarang) => {
            const existingBarang = acc.find((barang) => barang.id_barang === detailsBarang.id);
  
            if (existingBarang) {
              existingBarang.jumlah++;
            } else {
              const nama_barang = barangDetailsArray.find((barangDetail) => barangDetail.id_barang === detailsBarang.id)?.nama_barang || "Nama Barang Tidak Ditemukan";
  
              acc.push({
                id_barang: detailsBarang.id,
                nama_barang: nama_barang,
                jumlah: 1,
              });
            }
  
            return acc;
          }, []);
  
          const barangDetails = barangCountMap.map((barang) => `${barang.nama_barang}(${barang.jumlah})`);
  
          return {
            NO: index + 1,
            ID: item.id,
            NIS: item.pengguna.nomorinduk_pengguna,
            Nama: item.pengguna.nama_pengguna,
            WA: item.nomor_wa,
            Barang: barangDetails.join(", "),
            Alasan: item.alasan_peminjaman,
            Status: item.status_permohonan,
            Tanggal: item.tanggal_peminjaman,
            Lama: item.lama_peminjaman,
          };
        });
  
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
        .filter((item) => item.status_permohonan === "terima")
        .map((item, index) => {
          const detailsBarangArray = JSON.parse(item.details_barang);
          const barangDetailsArray = item.barang_details;
  
          const barangCountMap = detailsBarangArray.reduce((acc, detailsBarang) => {
            const existingBarang = acc.find((barang) => barang.id_barang === detailsBarang.id);
  
            if (existingBarang) {
              existingBarang.jumlah++;
            } else {
              const nama_barang = barangDetailsArray.find((barangDetail) => barangDetail.id_barang === detailsBarang.id)?.nama_barang || "Nama Barang Tidak Ditemukan";
  
              acc.push({
                id_barang: detailsBarang.id,
                nama_barang: nama_barang,
                jumlah: 1,
              });
            }
  
            return acc;
          }, []);
  
          const barangDetails = barangCountMap.map((barang) => `${barang.nama_barang}(${barang.jumlah})`);
  
          return {
            NO: index + 1,
            ID: item.id,
            NIS: item.pengguna.nomorinduk_pengguna,
            Nama: item.pengguna.nama_pengguna,
            WA: item.nomor_wa,
            Barang: barangDetails.join(", "),
            Alasan: item.alasan_peminjaman,
            Status: item.status_permohonan,
            Tanggal: item.tanggal_peminjaman,
            Lama: item.lama_peminjaman,
          };
        });
  
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
        .filter((item) => item.status_permohonan === "tolak")
        .map((item, index) => {
          const detailsBarangArray = JSON.parse(item.details_barang);
          const barangDetailsArray = item.barang_details;
  
          const barangCountMap = detailsBarangArray.reduce((acc, detailsBarang) => {
            const existingBarang = acc.find((barang) => barang.id_barang === detailsBarang.id);
  
            if (existingBarang) {
              existingBarang.jumlah++;
            } else {
              const nama_barang = barangDetailsArray.find((barangDetail) => barangDetail.id_barang === detailsBarang.id)?.nama_barang || "Nama Barang Tidak Ditemukan";
  
              acc.push({
                id_barang: detailsBarang.id,
                nama_barang: nama_barang,
                jumlah: 1,
              });
            }
  
            return acc;
          }, []);
  
          const barangDetails = barangCountMap.map((barang) => `${barang.nama_barang}(${barang.jumlah})`);
  
          return {
            NO: index + 1,
            ID: item.id,
            NIS: item.pengguna.nomorinduk_pengguna,
            Nama: item.pengguna.nama_pengguna,
            WA: item.nomor_wa,
            Barang: barangDetails.join(", "),
            Alasan: item.alasan_peminjaman,
            Status: item.status_permohonan,
            Tanggal: item.tanggal_peminjaman,
            Lama: item.lama_peminjaman,
          };
        });
  
      setTableData3(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Terjadi error:", error);
    }
  };
  
  

  const handleEditSuccess = () => {
    fillDataAutomatically();
    fillDataAutomatically2();
    fillDataAutomatically3();
    closeModal();
  };

  const handleDeleteSuccess = () => {
    fillDataAutomatically();
    fillDataAutomatically2();
    fillDataAutomatically3();
    closeModal();
  };


  useEffect(() => {
    fetchDataFromApi();
    handleEditSuccess();
    fillDataAutomatically();
    fillDataAutomatically2();
    fillDataAutomatically3();
  }, []);

  const columns = [
    { key: "NO", label: "NO" },,
    { key: "NIS", label: "Nomor Induk" },
    { key: "Nama", label: "Nama"},
    { key: "WA", label: "Nomor WhatsApp"},
    { key: "Barang", label: "Barang"},
    { key: "Alasan", label: "Alasan Peminjaman"},
    { key: "Tanggal", label: "Tanggal Pengajuan"},
    { key: "Lama", label: "Lama Peminjaman"},
  ];

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex">
      <SidebarDesktop items={sidebarItems} />
      <div className="px-8 py-4 min-h-screen w-screen">
        <StepNav steps={steps} onSelectStep={handleStepSelect} Name="Data Pengajuan Peminjaman" />
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStep}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {selectedStep !== "Diterima" && selectedStep !== "Ditolak" && (
              <div className="mb-4">
                <DataTable
                  columns={columns}
                  data={tableData}
                  handleRowClick={handleRowClick}
                />{" "}
              </div>
            )}

            {selectedStep === "Diterima" && (
              <div className="mb-4">
                <DataTable
                  columns={columns}
                  data={tableData2}
                  handleRowClick={handleRowClick}
                />{" "}
              </div>
            )}

{selectedStep === "Ditolak" && (
              <div className="mb-4">
                <DataTable
                  columns={columns}
                  data={tableData3}
                  handleRowClick={handleRowClick}
                />{" "}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
        {isModalVisible && (
                <SubmissionModal
                  rowData={selectedRowData}
                  closeModal={closeModal}
                  onEditSuccess={handleEditSuccess}
                  onDeleteSuccess={handleDeleteSuccess}
                />
            )}
            </AnimatePresence>
      </div>
    </div>
  );
};

export default SubmissionDesktop;
