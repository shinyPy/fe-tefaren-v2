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
    nomor_barang: "",
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const reader = new FileReader();

    // Jika ada file yang diunggah, baca dan atur gambar terpilih
    if (files && files[0]) {
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setSelectedImageTxt(value.replace("C:\\fakepath\\", ""));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const [step, setStep] = useState(1);
  const [validasiForm, setValidasiForm] = useState(0);

  const totalSteps = 2;

  useEffect(() => {
    if (step < 1) {
      setStep(1);
    } else if (step > totalSteps) {
      setStep(totalSteps);
    }
  }, [step]);

  const isStep1Valid = () => {
    return (
      formData.kategori !== "" &&
      formData.kode_barang !== "" &&
      formData.nomor_barang !== "" &&
      formData.nama_barang !== ""
    );
  };

  const isStep2Valid = () => {
    return formData.gambar_barang !== null;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      if (step === 1 && !isStep1Valid()) {
        setValidasiForm(1);
        return;
      }

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
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg ${
                    validasiForm === 1 ? "" : "mb-4"
                  }`}
                  onChange={handleKategoriChange}
                  value={formData.kategori}
                >
                  <option value="" disabled="disabled">
                    Kategori Barang
                  </option>
                  {kategoriOptions.map((kategori, index) => (
                    <option key={index} value={kategori}>
                      {kategori}
                    </option>
                  ))}
                </select>

                {validasiForm === 1 && (
                  <p className=" px-2 text-red-500 left-0 text-left text-sm mt-2 mb-2">
                    Kategori Barang harus diisi
                  </p>
                )}

                <input
                  type="text"
                  name="kode_barang"
                  value={formData.kode_barang}
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg ${
                    validasiForm === 1 ? "" : "mb-4"
                  }`}
                  onChange={handleChange}
                  placeholder="Kode barang"
                />
                {validasiForm === 1 && (
                  <p className=" px-2 text-red-500 left-0 text-left text-sm mt-2 mb-2">
                    Kode Barang harus diisi
                  </p>
                )}

                <input
                  type="text"
                  name="nomor_barang"
                  value={formData.nomor_barang}
                  onChange={handleChange}
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg ${
                    validasiForm === 1 ? "" : "mb-4"
                  }`}
                  placeholder="Nomor Barang"
                />

                {validasiForm === 1 && (
                  <p className=" px-2 text-red-500 left-0 text-left text-sm mt-2 mb-2">
                    Nomor Barang harus diisi
                  </p>
                )}

                <input
                  type="text"
                  name="nama_barang"
                  value={formData.nama_barang}
                  onChange={handleChange}
                  className={`left-0 text-left w-full bg-white tracking-widest px-4 py-3 border-2 rounded-lg text-lg ${
                    validasiForm === 1 ? "" : ""
                  }`}
                  placeholder="Nama Barang"
                />

                {validasiForm === 1 && (
                  <p className=" px-2 text-red-500 left-0 text-left text-sm mt-2 mb-2">
                    Nama Barang harus diisi
                  </p>
                )}
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
                  className=" p-2 tracking-widest rounded-lg bg-white border"
                >
                  Upload File
                </label>
                {!selectedImage && (
                  <label
                    for="file"
                    class="relative mt-4 flex min-h-[200px] tracking-widest1 items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
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