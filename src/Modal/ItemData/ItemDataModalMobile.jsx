import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../var";
const ItemDataModal = ({
  rowData,
  closeModal,
  onEditSuccess,
  onDeleteSuccess,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [validasiForm, setValidasiForm] = useState([]);
  const formRef = useRef(null);

  const customContentStyle = {
    marginBottom: "95vh",
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
    kategori: rowData.Kategori,
    kode_barang: rowData.Kode,
    nama_barang: rowData.Nama,
    ketersediaan_barang: rowData.Ketersediaan,
    status_barang: rowData.Status,
    gambar_barang: rowData.Gambar,
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

  const handleKategoriChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      kategori: e.target.value,
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      status_barang: e.target.value,
    }));
  };

  const handleKetersediaanChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      ketersediaan_barang: e.target.value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const requiredFields = ["kode_barang", "nama_barang"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      const validationMessages = missingFields.map((field) => ({
        fieldName: field,
        message: `Field ${field.replace("_", " ")} harus diisi`, // Adjust the message as needed
      }));

      setValidasiForm(validationMessages);
      console.log(validasiForm);
      return;
    }

    const formDataToSend = formData;
    try {
      const token = localStorage.getItem("accessToken");
      let hasil_upload = null;

      if (formDataToSend.gambar_barang instanceof File) {
        await axios
          .post(
            `${API_BASE_URL}upload-gambar-barang`,
            {
              gambar_barang: formDataToSend.gambar_barang,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Ensure correct content type for file upload
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              hasil_upload = res.data.gambar_barang;
            }
          });
      }

      formDataToSend.gambar_barang = hasil_upload;
      await axios.put(
        `${API_BASE_URL}api/barangUpdate/${rowData.ID}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onEditSuccess();
      Swal.fire({
        icon: "success",
        title: "Edit Berhasil",
        text: "Data Barang telah berhasil di edit.",
      });
    } catch (error) {
      console.error("Error during update:", error);
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
      const apiUrl = `${API_BASE_URL}api/barangDelete/${rowData.ID}`;
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
          text: "Data Barang telah berhasil dihapus.",
        });
      } else {
        console.error("Delete failed with status", result.status);
      }
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const [step, setStep] = useState(1);
  const totalSteps = 2;

  useEffect(() => {
    if (step < 1) {
      setStep(1);
    } else if (step > totalSteps) {
      setStep(totalSteps);
    }
  }, [step]);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progress = (step / totalSteps) * 100;

  const stepStyles = {
    1: {
      display: step === 1 ? "block" : "none",
    },
    2: {
      display: step === totalSteps ? "block" : "none",
    },
  };

  const buttonVariants = {
    inactive: {
      backgroundColor: "rgb(55 65 81)",
    },
    active: {
      backgroundColor: "rgb(37 99 235)",
    },
  };

  const [kategoriOptions, setKategoriOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve access token from local storage
        const accessToken = localStorage.getItem("accessToken");

        // Check if the access token exists before making the request
        if (accessToken) {
          const response = await axios.get(
            `${API_BASE_URL}api/kategori-values`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          // Assuming data response is an array of objects for kategoriOptions
          setKategoriOptions(response.data);
        } else {
          console.error("Access token not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        className="bg-white px-4 pt-3 pb-2 left-0 rounded-2xl w-11/12"
        ref={formRef}
        style={customContentStyle}
      >
        <div className="mb-3 flex w-full justify-center">
          <span className="text-xl px-2.5 py-0.5 rounded-full bg-gray-700 text-white">
            {rowData.NO}
          </span>
          <h1 className="text-xl tracking-widest rounded-l-lg text-gray-700 font-semibold px-2.5 py-0.5">
            Detail Barang
          </h1>
        </div>

        <div className=" w-full border-b-2"></div>

        <div className={`mt-4 flex mb-4 rounded-lg text-xs bg-gray-700`}>
          <motion.button
            className={`flex-1 py-2 px-2 text-white rounded-lg`}
            variants={buttonVariants}
            initial="inactive"
            animate={step === 2 ? "inactive" : "active"}
            onClick={handlePrev}
            type="button"
          >
            Deskripsi
          </motion.button>

          <motion.button
            className={`flex-1 py-2 px-2 text-white rounded-lg`}
            variants={buttonVariants}
            initial="inactive"
            animate={step === 1 ? "inactive" : "active"}
            onClick={handleNext}
            type="button"
          >
            Gambar
          </motion.button>
        </div>

        <form onSubmit={handleEdit} className="text-base">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key={1}
                initial={{
                  opacity: 0,
                }}
                // Atur opacity awal menjadi 0
                animate={{
                  opacity: 1,
                }}
                // Animasikan opacity menjadi 1
                transition={{
                  duration: 0.5,
                }}
                style={stepStyles[1]}
              >
                <select
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-xs mb-4`}
                  onChange={handleKategoriChange}
                  value={formData.kategori}
                >
                  {kategoriOptions.map((kategori, index) => (
                    <option key={index} value={kategori}>
                      {kategori}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="nama_barang"
                  value={formData.nama_barang}
                  onChange={handleChange}
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-xs ${
                    validasiForm.find(
                      (message) => message.fieldName === "nama_barang"
                    )
                      ? "border-red-500 mb-2"
                      : "mb-4"
                  }`}
                  placeholder="Nama Barang"
                />
                {validasiForm.find((message) => message.fieldName === "nama_barang") ? (
  <p className="mb-2 ml-0 text-red-700">Mohon isi terlebih dahulu</p>
) : null}
                <input
                  type="text"
                  name="kode_barang"
                  value={formData.kode_barang}
                  onChange={handleChange}
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-xs ${
                    validasiForm.find(
                      (message) => message.fieldName === "kode_barang"
                    )
                      ? "border-red-500 mb-2"
                      : "mb-4"
                  }`}
                  placeholder="Kode Barang"
                />
                                                {validasiForm.find((message) => message.fieldName === "kode_barang") ? (
  <p className="mb-2 ml-0 text-red-700">Mohon isi terlebih dahulu</p>
) : null}

                <select
                  className="left-0 bg-white text-left w-full tracking-widest px-4 py-3 mb-4 border-2 rounded-lg text-xs"
                  onChange={handleStatusChange}
                  value={formData.status_barang}
                >
                  <option value="rusak">Rusak</option>
                  <option value="baik">Baik</option>
                </select>
                <select
                  className="left-0 bg-white text-left w-full tracking-widest px-4 py-3 border-2 rounded-lg text-xs"
                  onChange={handleKetersediaanChange}
                  value={formData.ketersediaan_barang}
                >
                  <option value="Tersedia">Tersedia</option>
                  <option value="Dipinjam">Dipinjam</option>
                  <option value="Pemeliharaan">Pemeliharaan</option>
                  <option value="Dihapuskan">Dihapuskan</option>
                </select>
              </motion.div>
            )}

            {step === totalSteps && (
              <motion.div
                key={2}
                initial={{
                  opacity: 0,
                }}
                // Atur opacity awal menjadi 0
                animate={{
                  opacity: 1,
                }}
                // Animasikan opacity menjadi 1
                transition={{
                  duration: 0.5,
                }}
                style={stepStyles[2]}
              >
                <input
                  type="file"
                  name="gambar_barang"
                  id="file"
                  onChange={handleChange}
                  className=" hidden"
                />
                <label
                  for="file"
                  className=" p-2 text-xs tracking-widest rounded-lg bg-white border"
                >
                  Upload File
                </label>

                {!selectedImage && (
                  <div className=" mt-4">
                    <img
                      src={`${API_BASE_URL}storage/${formData.gambar_barang}`}
                      alt="preview"
                      className="min-h-[300px] max-h-[250px] w-full"
                    />
                  </div>
                )}

                {selectedImage && (
                  <div className=" mt-4">
                    <img
                      src={selectedImage}
                      alt="preview"
                      className="min-h-[300px] max-h-[250px] w-full"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4">
            <div className="w-full h-2 bg-blue-200 rounded-full">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <motion.div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{
                    width: `${progress}%`,
                  }}
                  initial={{
                    width: "0%",
                  }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                ></motion.div>
              </motion.div>
            </div>
          </div>
          <div className=" w-full mt-4 flex space-x-4">
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

export default ItemDataModal;
