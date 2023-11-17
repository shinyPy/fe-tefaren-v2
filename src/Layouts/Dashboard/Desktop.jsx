import React from "react";
import SidebarDesktop from "../../Components/Navigation/SidebarDesktop";
import AdminName from "../../Components/AdminName/AdminName";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";
import Chartbar from "../../Components/Chartbar/Chartbar";
import {
  FaChartBar,
  FaUser,
  FaBox,
  FaClipboardList,
  FaTools,
} from "react-icons/fa";

import { MdAssignment } from "react-icons/md";

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

  const contentData = {
    title: "Pengguna",
    content: "Dashboard Content",
    icon: FaUser,
    pages: [
      {
        title: "Siswa",
        content: "6/10",
        link: "pengguna",
      },
      {
        title: "Guru",
        content: "4/10",
        link: "pengguna",
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
      // Tambahkan halaman lain sesuai kebutuhan
    ],
  };

  const contentData3 = {
    title: "Peminjaman",
    content: "Dashboard Content",
    icon: MdAssignment, // Sesuaikan dengan ikon yang ingin ditampilkan
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
      // Tambahkan halaman lain sesuai kebutuhan
    ],
  };

  const data1 = [
    {
      name: "Guru",
      value: 30,
    },
    {
      name: "Siswa",
      value: 80,
    },
  ];

  return (
    <div className=" flex">
      <SidebarDesktop items={sidebarItems} />
      <div className=" px-8 py-4 min-h-screen w-screen">
        <AdminName storageKey="user_name" />
        <div className="flex flex-wrap -mx-4">
          <DashboardCard
            contentData={contentData}
            iconColor="red"
            titleTextColor="red"
          />{" "}
          {/* Gunakan komponen DashboardCard dengan warna ikon biru dan teks judul pink */}
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
          <div className=" px-6">
            <center>
              <Chartbar />
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;
