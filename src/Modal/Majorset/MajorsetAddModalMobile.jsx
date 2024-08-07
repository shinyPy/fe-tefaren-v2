import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../var";
const MajorSetAddModalMobile = ({ isOpen, onClose, onAddSuccess }) => {
  const formRef = useRef(null);
  const customContentStyle = {
    marginBottom: "100vh",
  };

  const modalVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -300 },
  };

  const [formData, setFormData] = useState({
    jurusan: "",
  });

  const [barangList, setBarangList] = useState([]);
  const [step, setStep] = useState(1);
  const [validasiForm, setValidasiForm] = useState(false);
  const totalSteps = 2;
  const [validasiStep, setValidasiStep] = useState([]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  useEffect(() => {
    const fetchBarangData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${API_BASE_URL}api/get-jurusan`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setBarangList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBarangData();
  }, []); 

  useEffect(() => {
    if (step < 1) {
      setStep(1);
    } else if (step > totalSteps) {
      setStep(totalSteps);
    }
  }, [step]);

  const isFormValid = () => {
    return formData.jabatan !== null;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.jurusan) {
      setValidasiForm(true);
      return;
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.post(`${API_BASE_URL}api/add-jurusan`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const updatedResponse = await axios.get(
        `${API_BASE_URL}api/get-jurusan`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBarangList(updatedResponse.data);
      onAddSuccess();
      Swal.fire({
        icon: "success",
        title: "Penambahan Berhasil",
        text: "Data Jurusan telah berhasil di tambah.",
      });
    } catch (error) {
      console.error(error);
    
      if (error.response && error.response.status === 422) {
        // Validation error
        const validationErrors = error.response.data.errors;
    
        // Check if the 'jurusan' field has an error
        if (validationErrors && validationErrors.jurusan) {
          const errorMessage = validationErrors.jurusan[0];
          Swal.fire({
            icon: "error",
            title: "Gagal Menambah Jurusan",
            text: errorMessage,
          });
        } else {
          // Handle other validation errors if needed
          Swal.fire({
            icon: "error",
            title: "Gagal Menambah Jurusan",
            text: "Terjadi kesalahan validasi.",
          });
        }
      } else {
        // Handle other types of errors
        Swal.fire({
          icon: "error",
          title: "Gagal Menambah Jurusan",
          text: "Terjadi kesalahan pada server.",
        });
      }
    }
    
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      variants={modalVariants}
      transition={{
        duration: 0.35,
      }}
      className="fixed top-0 left-0 w-full bg-opacity-50 bg-gray-700 flex justify-center items-center backdrop-blur-sm"
      style={{
        height: "200vh",
      }}
    >
      <div
        className="bg-white px-8 pt-8 pb-4 left-0 rounded-2xl w-11/12"
        ref={formRef}
        style={customContentStyle}
      >
        <div className="mb-4 flex w-full justify-center">
          <h1 className="text-xl tracking-widest rounded-l-lg text-gray-700 font-semibold px-5">
            Tambah Jurusan
          </h1>
        </div>

        <div className=" w-full border-b-2 mb-4"></div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="jurusan"
            value={formData.jurusan}
            className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg ${
              validasiForm ? "border-red-500 mb-2" : "mb-4"
            }`}
            onChange={handleChange}
            placeholder="Jurusan"
          />

          {validasiForm && (
            <p className="ml-0 mb-2 text-red-700">Mohon isi terlebih dahulu</p>
          )}

          <button
            className="py-2 bg-blue-600 w-full text-white rounded-lg ripple"
            type="submit"
          >
            Kirim
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default MajorSetAddModalMobile;
