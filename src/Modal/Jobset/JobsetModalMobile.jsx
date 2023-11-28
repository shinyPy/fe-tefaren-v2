import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const JobsetModalMobile = ({
  rowData,
  closeModal,
  onEditSuccess,
  onDeleteSuccess,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [validasiForm, setValidasiForm] = useState(false);

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

  const [formData, setFormData] = useState({
    Jabatan: rowData.Jabatan,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const reader = new FileReader();

    if (files && files[0]) {
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
  
    if (!formData.Jabatan) {
      setValidasiForm(true);
      return;
    }
  
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `http://127.0.0.1:8000/api/edit-jabatan/${rowData.ID}`,
        { jabatan: formData.Jabatan },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      onEditSuccess();
      Swal.fire({
        icon: "success",
        title: "Pengeditan Berhasil",
        text: "Data Jabatan telah berhasil diubah.",
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
      const apiUrl = `http://127.0.0.1:8000/api/delete-jabatan/${rowData.ID}`;
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
          text: "Data Jabatan telah berhasil dihapus.",
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
        className="bg-white px-8 pt-8 pb-4 left-0 rounded-2xl w-11/12"
        ref={formRef}
        style={customContentStyle}
      >
        <div className="mb-4 flex w-full justify-center">
          <span className="text-3xl px-5 py-2.5 rounded-full bg-gray-700 text-white">
            {rowData.NO}
          </span>
          <h1 className="text-xl tracking-widest rounded-l-lg text-gray-700 font-semibold px-5 py-2.5">
            Detail Jabatan
          </h1>
        </div>

        <div className=" w-full border-b-2 mb-4"></div>

        <form onSubmit={handleEdit}>
          <AnimatePresence mode="wait">
                <input
                  type="text"
                  name="Jabatan"
                  value={formData.Jabatan}
                  onChange={handleChange}
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg ${
                    validasiForm ? "border-red-500 mb-2" : "mb-4"
                  }`}
                  placeholder="jabatan"
                />

{validasiForm && (
            <p className="ml-0 mb-2 text-red-700">Mohon isi terlebih dahulu</p>
          )}

          </AnimatePresence>

          <div className=" w-full flex space-x-4">
            <button
              type="submit"
              className=" w-1/2 p-2 tracking-widest text-white rounded-md bg-blue-600 mb-4"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className=" w-1/2 p-2 tracking-widest text-white rounded-md bg-red-600 mb-4"
            >
              Hapus
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default JobsetModalMobile;
