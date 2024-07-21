import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../var";
import imgform from "../Assets/Image/3173478.jpg";

const SubmissionForm = ({ openImg }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmationApproved, setConfirmationApproved] = useState(false);
  // ... (existing state variables)

  // Function to move to the next step
  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  // Function to move to the previous step
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const [formData, setFormData] = useState({
    nomor_wa: "",
    alasan_peminjaman: "",
    tanggal_peminjaman: "",
    lama_peminjaman: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    nomor_wa: "",
    alasan_peminjaman: "",
    tanggal_peminjaman: "",
    lama_peminjaman: "",
    details_barang: "",
  });

  const [barangOptions, setBarangOptions] = useState([]);
  const [selectedBarangIds, setSelectedBarangIds] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDetailsBarang = () => {
    setFormData((prevData) => ({
      ...prevData,
      details_barang: [
        ...prevData.details_barang,
        { nama_barang: "", jumlah: 0 },
      ],
    }));
  };

  const handleDetailsBarangChange = (selectedOptions) => {
    setSelectedBarangIds(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

// ...

// ...

const handleSubmit = async (e) => {
  e.preventDefault();
  if (currentStep === 1) {
    // Handle confirmation step
    setConfirmationApproved(true);
    nextStep();
  } else if (currentStep === 2) {
    if (validateForm()) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const userResponse = await axios.get(
          `${API_BASE_URL}/api/user`,
          config
        );
        const id_pengguna = userResponse.data.id;

        const payload = {
          ...formData,
          id_pengguna,
          details_barang: selectedBarangIds,
        };

        const response = await axios.post(
          `${API_BASE_URL}api/add-permohonan`,
          payload,
          config
        );

        // SweetAlert success message
        Swal.fire({
          title: "Success!",
          text: "Permohonan Anda telah dikirim.",
          icon: "success",
        });

        // Reset form values
        resetForm();

        console.log(response.data);
      } catch (error) {
        // SweetAlert error message
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });

        console.error("Error creating Permohonan:", error.response ? error.response.data : error);
        resetForm();
      }
    }
  }
};

// ...

const resetForm = () => {
  // Reset the form values to their initial state or empty values
  setFormData({
    nomor_wa: "",
    alasan_peminjaman: "",
    tanggal_peminjaman: "",
    lama_peminjaman: "",
  });

  // You may need to reset other form-related states as well
  // ...

  // Clear the selectedBarangIds
  setSelectedBarangIds([]);

  // Set any other state variables to their initial values
  // ...
};



  const validateForm = () => {
    const { nomor_wa, alasan_peminjaman, tanggal_peminjaman, lama_peminjaman } =
      formData;

    const errors = {};

    if (!nomor_wa) {
      errors.nomor_wa = "Nomor WhatsApp harus diisi";
    }
    if (!alasan_peminjaman) {
      errors.alasan_peminjaman = "Alasan Peminjaman harus diisi";
    }
    if (!tanggal_peminjaman) {
      errors.tanggal_peminjaman = "Tanggal Peminjaman harus diisi";
    }
    if (!lama_peminjaman) {
      errors.lama_peminjaman = "Lama Peminjaman harus diisi";
    }
    if (selectedBarangIds.length === 0) {
      errors.details_barang = "Barang harus diisi";
    }

    setErrorMessages(errors); // Corrected: Set errors conditionally

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  useEffect(() => {
    const fetchBarangData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${API_BASE_URL}api/barangShow`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const tersediaBarangData = response.data
          .filter((barang) => barang.ketersediaan_barang === "Tersedia")
          .map((barang) => ({
            value: barang.id_barang,
            label: barang.kode_barang + " " + barang.nama_barang,
          }));

        setBarangOptions(tersediaBarangData);
      } catch (error) {
        console.error("Error fetching barang data:", error);
      }
    };

    fetchBarangData();
  }, []);

  const [isInputDate, setIsInputDate] = useState(false);

  const handleFocus = () => {
    setIsInputDate(true);
  };

  const handleBlur = () => {
    setIsInputDate(false);
  };

  const isDateValue = !!formData.tanggal_peminjaman;
  
  return (
    <div className=" flex px-8 space-x-2 mt-6">
      <div className=" w-5/12">
        {currentStep === 1 && (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md border rounded-lg p-6 max-w-md mx-auto"
          >
            <div className="text-center">
              <h1 className="text-4xl font-semibold tracking-wide mb-4">
                Persetujuan Peminjam
              </h1>
              <p className="text-lg mb-6">
                Sebelum melanjutkan pengajuan, harap baca dan pahami lembar
                persetujuan yang tersedia. Jika anda setuju dengan ketentuan
                yang ada, tekan tombol "Setuju" di bawah untuk melanjutkan
                pengajuan peminjaman.
              </p>
              <button
                type="button"
                className="w-full bg-blue-700 py-2 px-4 rounded-lg font-semibold text-white"
                onClick={openImg}
              >
                Lihat Lembar Persetujuan
              </button>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 rounded-lg bg-green-600 text-white font-semibold tracking-widest"
            >
              Setuju
            </button>
          </form>
        )}

        {currentStep === 2 && confirmationApproved && (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md border rounded-lg p-6 max-w-md mx-auto"
          >
            <center>
            <h1 className="text-2xl font-semibold tracking-wide mb-4">
                Pengajuan Peminjaman
              </h1>
              </center>
            <input
              type="text"
              name="nomor_wa"
              value={formData.nomor_wa}
              onChange={handleChange}
              className={`form-input mt-1 block w-full p-2 border shadow-sm rounded-lg ${
                !errorMessages.nomor_wa ? "mb-4" : ""
              }`}
              placeholder="Silahkan isi nomor wa disini"
            />
            {errorMessages.nomor_wa && (
              <p className="text-red-500">{errorMessages.nomor_wa}</p>
            )}

            <textarea
              name="alasan_peminjaman"
              value={formData.alasan_peminjaman}
              onChange={handleChange}
              className={`form-input mt-1 block w-full p-2 border shadow-sm rounded-lg ${
                !errorMessages.alasan_peminjaman ? "mb-4" : ""
              }`}
              placeholder="Berikan alasan peminjaman"
            />

            {errorMessages.alasan_peminjaman && (
              <p className="text-red-500">{errorMessages.alasan_peminjaman}</p>
            )}

            {isInputDate ? (
              <input
                type="date"
                name="tanggal_peminjaman"
                value={formData.tanggal_peminjaman}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input mt-1 block w-full p-2 border shadow-sm rounded-lg mb-4"
              />
            ) : (
              <input
                type={isDateValue ? "date" : "text"}
                name="tanggal_peminjaman"
                value={formData.tanggal_peminjaman}
                onChange={handleChange}
                onFocus={handleFocus}
                className={`form-input mt-1 block w-full p-2 border shadow-sm rounded-lg ${
                  !errorMessages.tanggal_peminjaman ? "mb-4" : ""
                }`}
                placeholder="masukkan tanggal Peminjaman"
              />
            )}

            {errorMessages.tanggal_peminjaman && (
              <p className="text-red-500">{errorMessages.tanggal_peminjaman}</p>
            )}

            <input
              type="text"
              name="lama_peminjaman"
              value={formData.lama_peminjaman}
              onChange={handleChange}
              className={`form-input mt-1 block w-full p-2 border shadow-sm rounded-lg ${
                !errorMessages.lama_peminjaman ? "mb-4" : ""
              }`}
              placeholder="Lama pinjam, contoh : 2 hari"
            />

            {errorMessages.lama_peminjaman && (
              <p className="text-red-500">{errorMessages.lama_peminjaman}</p>
            )}

            {/* Details Barang */}
            <Select
              options={barangOptions}
              isMulti
              onChange={handleDetailsBarangChange}
              value={barangOptions.filter((option) =>
                selectedBarangIds.includes(option.value)
              )}
              placeholder="Pilih Barang yang dipinjam"
              className={`form-input mt-1 block w-full border shadow-sm rounded-lg ${
                !errorMessages.details_barang ? "mb-4" : ""
              }`}
            />

            {errorMessages.details_barang && (
              <p className="text-red-500">{errorMessages.details_barang}</p>
            )}

            <button
              type="submit"
              className="bg-blue-700 w-full text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Kirim
            </button>
          </form>
        )}
      </div>
      <div className=" w-7/12">
        <div className="-translate-y-10 object-cover">
          <center>
            <img src={imgform} alt="ajkhs" />
            {currentStep === 2 ? (
              <h1 className=" px-8 -translate-y-10 text-2xl font-semibold tracking-widest text-gray-700 capitalize">
                silahkan isi form berikut untuk mengajukan permohonan
              </h1>
            ) : null}
          </center>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;
