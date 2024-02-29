import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const SubmissionModal = ({
  rowData,
  closeModal,
  onEditSuccess,
  onDeleteSuccess,
}) => {

  const formRef = useRef(null);
  const customContentStyle = {
    marginBottom: "100vh",
  };

  const modalVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -300 },
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (rowData) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [rowData, closeModal]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      
      // Make sure to replace 'terima' with the actual value you want to send
      const requestData = {
        status_permohonan: "terima", // Replace 'terima' with the actual value you want to send
      };
  
      await axios.put(
        `https://shiniya.000webhostapp.com/api/edit-permohonan/${rowData.ID}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      onEditSuccess();
      Swal.fire({
        icon: "success",
        title: "Status berhasil diubah",
        text: "Permohonan telah diterima",
      });
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleEdit2 = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      
      // Make sure to replace 'terima' with the actual value you want to send
      const requestData = {
        status_permohonan: "tolak", // Replace 'terima' with the actual value you want to send
      };
  
      await axios.put(
        `https://shiniya.000webhostapp.com/api/edit-permohonan/${rowData.ID}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      onEditSuccess();
      Swal.fire({
        icon: "success",
        title: "Status berhasil diubah",
        text: "Permohonan telah diterima",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus data ini?",
      icon: "warning",
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-red-600 mr-2 text-white py-2 px-4 rounded",
        cancelButton: "bg-blue-600 ml-2 text-white py-2 px-4 rounded",
      },
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        performDelete();
      }
    });
  };

  const performDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const apiUrl = `https://shiniya.000webhostapp.com/api/delete-permohonan/${rowData.ID}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await axios.delete(apiUrl, config);

      if (result.status >= 200 && result.status < 300) {
        console.log("Delete successful", result.data);
        onDeleteSuccess();
        Swal.fire({
          icon: "success",
          title: "Hapus Berhasil",
          text: "Data Telah berhasil dihapus.",
        });
      } else {
        console.error("Delete failed with status", result.status);
      }
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };
  
  return (
    <motion.div
      initial="closed"
      animate={rowData ? "open" : "closed"}
      exit="closed"
      variants={modalVariants}
      transition={{
        duration: 0.35,
      }}
      style={{ height: "200vh" }}
      className="fixed top-0 left-0 w-full bg-opacity-50 bg-gray-700 flex justify-center items-center backdrop-blur-sm"
    >
      <div
        className="bg-white px-8 pt-8 pb-4 left-0 rounded-2xl w-5/12"
        ref={formRef}
        style={customContentStyle}
      >
        <div className="mb-4 flex w-full justify-center">
          <span className="text-3xl px-5 py-2.5 rounded-full bg-gray-700 text-white">
            {rowData.NO}
          </span>
          <h1 className="text-3xl tracking-widest rounded-l-lg text-gray-700 font-semibold px-5 py-2.5">
            Detail Permohonan
          </h1>
        </div>

        <div className=" w-full border-b-2 mb-4"></div>

<div className="left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg mb-4">
    {rowData.NIS}
</div>

<div className="left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg mb-4">
    {rowData.Nama}
</div>

<div className="left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg mb-4">
    {rowData.WA}
</div>

<div className="left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg mb-4">
    {rowData.Barang}
</div>

<div className="left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg mb-4">
    {rowData.Alasan}
</div>

<div className="left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg mb-4">
    {rowData.Tanggal}
</div>

<div className="left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg mb-4">
    {rowData.Lama}
</div>


<div className=" flex space-x-3.5"> 
  <form onSubmit={handleEdit}>
    <button
      type="submit"
      className="py-3 px-10 text-xl tracking-widest text-white rounded-md bg-blue-700"
    >
      Terima
    </button>
  </form>

  <form onSubmit={handleEdit2}>
    <button
      type="submit"
      className="py-3 px-10 text-xl tracking-widest text-white rounded-md bg-gray-600"
    >
      Tolak
    </button>
  </form>

  <button type="button" onClick={handleDelete} 
        className="py-3 px-10 text-xl tracking-widest text-white rounded-md bg-red-600">
    Delete
  </button>
  </div>

      </div>
    </motion.div>
  );
};

export default SubmissionModal;