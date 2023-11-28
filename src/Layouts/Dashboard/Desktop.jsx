import React, { useEffect, useState } from 'react';
import SidebarDesktop from "../../Components/Navigation/SidebarDesktop";
import AdminName from "../../Components/AdminName/AdminName";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";
import Chartbar from "../../Components/Chartbar/Chartbar";
import {FaChartBar, FaUser, FaBox, FaClipboardList, FaTools} from "react-icons/fa";
import axios from "axios";
import {MdAssignment} from 'react-icons/md';

const DashboardDesktop = () => {
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
  
    const [contentData, setContentData] = useState({
        title: 'Pengguna',
        content: 'Dashboard Content',
        icon: FaUser,
        pages: [
          {
            title: 'Siswa',
            content: 'Loading', // No initial loading placeholder
            link: 'accountdata',
          },
          {
            title: 'Guru',
            content: 'Loading',
            link: 'accountdata',
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
            content: 'Loading',
            link: 'itemdata'
          },
          {
            title: 'Dipinjam',
            content: 'Loading',
            link: 'itemdata'
          },
          {
            title: 'Pemeliharaan',
            content: 'Loading',
            link: 'itemdata'
          },
          {
            title: 'Dihapuskan',
            content: 'Loading',
            link: 'itemdata'
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
            content: 'Loading',
          },
          {
            title: 'Peminjaman',
            content: 'Loading',
          },
          {
            title: 'Pengembalian',
            content: 'Loading',
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
        <div className=" flex">
            <SidebarDesktop items={sidebarItems}/>
            <div className=" px-8 py-4 min-h-screen w-screen">
                <AdminName storageKey="user_name"/>
                <div className="flex flex-wrap -mx-4">
                    <DashboardCard contentData={contentData} iconColor="red" titleTextColor="red"/> {/* Gunakan komponen DashboardCard dengan warna ikon biru dan teks judul pink */}
                    <DashboardCard
                        contentData={contentData3}
                        iconColor="pink"
                        titleTextColor="pink"/>
                    <DashboardCard
                        contentData={contentData2}
                        iconColor="blue"
                        titleTextColor="blue"/>
                        <div className=" px-6">
                        <center>
                        <Chartbar/>
                        </center>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardDesktop;
