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

      const [jurusanOptions, setJurusanOptions] = useState([]);
      const [filtersData, setFiltersData] = useState({
          Nama: ['Name','John', 'Jane', 'Doe'], 
          Jurusan: ['Jurusan'], 
          Level: ['Name','John', 'Jane', 'Doe'], 
          NIS: ['NIS', '25', '30', '35'], 
      });
      useEffect(() => {
        const fetchData = async () => {
          try {
            // Retrieve the access token from localStorage
            const accessToken = localStorage.getItem("accessToken");
    
            // Check if the access token exists
            if (!accessToken) {
              console.error("Access token not found in localStorage");
              return;
            }
    
            // Make the Axios request with the Bearer token
            const response = await axios.get("http://127.0.0.1:8000/api/jurusan-values", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
    
            // Assuming the response data is an array of jurusan objects
            const data = response.data;
    
            // Set the Jurusan options in state
            setJurusanOptions(data);
    
            // Update the Jurusan options in filtersData
            setFiltersData((prevFiltersData) => ({
              ...prevFiltersData,
              Jurusan: ["Jurusan", ...data.map((jurusan) => jurusan)],
            }));
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, [setJurusanOptions, setFiltersData]);

      const columns = [
        { key: 'NIS', label: 'NIS', isHidden:true },
        { key: 'Nama', label: 'Nama', isHidden:true },
        { key: 'Level', label: 'Level', isHidden:true },
        { key: 'Jurusan', label: 'Jurusan' },
        // ... tambahkan kolom lainnya sesuai kebutuhan
      ];
    
      const data = [
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },

        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },

        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },

        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },

        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },


        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },

        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'RPL' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'ANIMASI' },
        { NIS: '543221073', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'DKV' },
        { NIS: '54322107', Nama: 'Yehosyua Priha Wijcaksana', Level : '01-01io2-218318', Jurusan : 'TJKT' },
        
        // ... tambahkan data lainnya sesuai kebutuhan
      ];

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
      filtersData={filtersData}
    /> </div>
          )}

{selectedStep === "Guru" && (
            <div className="mb-4">
              <h1>akjsdhauishdioa</h1>
            <DataTable
      columns={columns}
      data={data}
      filtersData={filtersData}
    /> </div>
          )}


        </motion.div>
      </AnimatePresence>
    </div>
  </div>
  );
};

export default AccountDataDesktop;
