import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const ItemDataAddModal = ({ isOpen, onClose, onAdd }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageTxt, setSelectedImageTxt] = useState(
    "Silahkan Pilih Gambar"
  );
  
  const formRef = useRef(null);
  const customContentStyle = {
    marginBottom: "100vh",
  };

  const modalVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -300 }, // Atur nilai y sesuai dengan tinggi yang diinginkan
  };

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

  const [formData, setFormData] = useState({
    kategori: "",
    kode_barang: "",
    nama_barang: "",
    ketersediaan_barang: "Tersedia",
    status_barang: "baik",
    gambar_barang: null,
    additionalField1: "",
    additionalField2: "",
  });

  const [barangList, setBarangList] = useState([]);

  useEffect(() => {
    const fetchBarangData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://127.0.0.1:8000/api/barangShow",
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
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  const [step, setStep] = useState(1);
  const [validasiForm, setValidasiForm] = useState(false);

  const totalSteps = 2;

  useEffect(() => {
    if (step < 1) {
      setStep(1);
    } else if (step > totalSteps) {
      setStep(totalSteps);
    }
  }, [step]);

  const [validasiStep, setValidasiStep] = useState([]);

  const isFormValid = () => {
    return formData.gambar_barang !== null;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const reader = new FileReader();

    // Jika ada file yang diunggah, baca dan atur gambar terpilih
    if (files && files[0]) {
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setSelectedImageTxt(value.replace("C:\\fakepath\\", ""));
        setValidasiForm(false);
      };
      reader.readAsDataURL(files[0]);
    }

    // Update state formData sesuai dengan nilai input
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

  const handleNext = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      const requiredFields = ["kode_barang", "nama_barang", "kategori"];
      const missingFields = requiredFields.filter((field) => !formData[field]);
  
      if (missingFields.length > 0) {
        const validationMessages = missingFields.map((field) => ({
          fieldName: field,
          message: `Field ${field.replace("_", " ")} harus diisi`, // Sesuaikan pesan sesuai kebutuhan
        }));
  
        setValidasiStep(validationMessages);
        console.log(validasiStep);
        return;
      }
  
      // Jika tidak ada field yang kosong, lanjutkan ke langkah berikutnya
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

  const [kategoriOptions, setKategoriOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve access token from local storage
        const accessToken = localStorage.getItem("accessToken");

        // Check if the access token exists before making the request
        if (accessToken) {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/kategori-values",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setValidasiForm(true);
      return;
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/barangAdd",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);

      // After submitting the form, refetch the barang list
      const updatedResponse = await axios.get(
        "http://127.0.0.1:8000/api/barangShow",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBarangList(updatedResponse.data);
      onAdd();
      Swal.fire({
        icon: "success",
        title: "Penambahan Berhasil",
        text: "Data Barang telah berhasil di tambah.",
      });
    } catch (error) {
      console.error(error.response.data);
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
        className="bg-white px-8 pt-8 pb-4 left-0 rounded-2xl w-5/12"
        ref={formRef}
        style={customContentStyle}
      >
        <div className="mb-4 flex w-full justify-center">
          <h1 className="text-3xl tracking-widest rounded-l-lg text-gray-700 font-semibold px-5">
            Tambah Barang
          </h1>
        </div>

        <div className=" w-full border-b-2 mb-4"></div>

        <form onSubmit={handleSubmit}>
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
                  onChange={handleKategoriChange}
                  value={formData.kategori}
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg ${
                    validasiStep.find(
                      (message) => message.fieldName === "kategori"
                    )
                      ? "border-red-500 mb-2"
                      : "mb-4"
                  }`}
                >
                  <option value="" disabled="disabled">
                    Kategori Barang
                  </option>
                  {kategoriOptions.map((kategori, index) => (
                    <option                   name="kategori" key={index} value={kategori}>
                      {kategori}
                    </option>
                  ))}
                </select>
                {validasiStep.find((message) => message.fieldName === "kategori") ? (
  <p className="mb-2 ml-0 text-red-700">Mohon pilih terlebih dahulu</p>
) : null}

                <input
                  type="text"
                  name="kode_barang"
                  value={formData.kode_barang}
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg ${
                    validasiStep.find(
                      (message) => message.fieldName === "kode_barang"
                    )
                      ? "border-red-500 mb-2"
                      : "mb-4"
                  }`}
                  onChange={handleChange}
                  placeholder="Kode barang"
                />

{validasiStep.find((message) => message.fieldName === "kode_barang") ? (
  <p className="mb-2 ml-0 text-red-700">Mohon isi terlebih dahulu</p>
) : null}


                <input
                  type="text"
                  name="nama_barang"
                  value={formData.nama_barang}
                  onChange={handleChange}
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg ${
                    validasiStep.find(
                      (message) => message.fieldName === "nama_barang"
                    )
                      ? "border-red-500 mb-2"
                      : "mb-4"
                  }`}
                  placeholder="Nama Barang"
                />
                {validasiStep.find((message) => message.fieldName === "nama_barang") ? (
  <p className="mb-2 ml-0 text-red-700">Mohon isi terlebih dahulu</p>
) : null}

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
                  className={`p-2 tracking-widest rounded-lg bg-white border-2 ${
                    validasiForm
                      ? "border-red-500"
                      : "mb-4"
                  }`}
                >
                  Upload File
                </label>

                {validasiForm ? (
  <p className="mt-4 ml-0 text-red-700">Mohon pilih gambar terlebih dahulu</p>
) : null}

                {!selectedImage && (
                  <label
                    for="file"
                    className={`elative mt-4 mb-4 flex min-h-[200px] tracking-widest1 items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center border-2 ${
                      validasiForm
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <div>
                      <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                        Taroh filenya disini
                      </span>
                      <span class="mb-2 block text-base font-medium text-[#6B7280]">
                        Atau
                      </span>
                      <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                        Cari
                      </span>
                    </div>
                  </label>
                )}

                {selectedImage && (
                  <div className=" mt-4">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="min-h-[300px] max-h-[250px] w-full mb-2"
                    />
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

          <div className="">
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

          <div className="mt-4">
            {step === 1 ? (
              <motion.button
                initial={{
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="py-2 px-2 w-full bg-blue-600 text-white rounded-lg ripple"
                onClick={handleNext}
                type="button"
              >
                Selanjutnya
              </motion.button>
            ) : (
              <div className="flex justify-between space-x-4">
                <motion.button
                  initial={{
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="py-2 w-1/2 bg-blue-600 text-white rounded-lg ripple"
                  onClick={handlePrev}
                  type="button"
                >
                  Kembali
                </motion.button>
                <motion.button
                  initial={{
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 20,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="py-2 w-1/2 bg-blue-600 text-white rounded-lg ripple"
                  type="submit"
                >
                  Kirim
                </motion.button>
              </div>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ItemDataAddModal;
