import React from "react";
import SidebarDesktop from "../../Components/Navigation/SidebarDesktop";
import { motion, AnimatePresence } from "framer-motion";
import StepNav from "../../Components/StepNav/StepNav";
import { useState, useEffect } from "react";
import DataTable from "../../Components/Table/Table";
import axios from "axios";
import AccountDataModal from "../../Modal/AccountData/AccountDataModal";

import {
  FaChartBar,
  FaUser,
  FaBox,
  FaClipboardList,
  FaTools,
} from "react-icons/fa";

import { MdAssignment } from "react-icons/md";

const AccountDataDesktop = () => {
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
    
      const steps = ["Siswa", "Guru"];

      const [selectedStep, setSelectedStep] = useState(1);

      const handleStepSelect = (step) => {
        setSelectedStep(step);
      };    

      let nomorUrut = 1;
      
      useEffect((nomorUrut) => {
        nomorUrut = 1;
      }, [nomorUrut]);
    

      const columns = [
        { key: 'NO', label: 'NO'},
        { key: 'NIS', label: 'NIS'},
        { key: 'Nama', label: 'Nama'},
        { key: 'Level', label: 'Level'},
        { key: 'Jurusan', label: 'Jurusan' },
      ];
    
      const data = [
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NO: nomorUrut++, NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        // ... tambahkan data lainnya sesuai kebutuhan
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
      <StepNav steps={steps} onSelectStep={handleStepSelect} />
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
      data={data}
      handleRowClick={handleRowClick}
    /> </div>
          )}

{selectedStep === "Guru" && (
            <div className="mb-4">
              <h1>akjsdhauishdioa</h1>
            <DataTable
      columns={columns}
      data={data}
    /> </div>
          )}

        {isModalVisible && (
          <center>
            <AccountDataModal rowData={selectedRowData} closeModal={closeModal} />
          </center>
        )}


        </motion.div>
      </AnimatePresence>
    </div>
  </div>
  );
};

export default AccountDataDesktop;
