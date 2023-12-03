import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      // Handle confirmation step
      setConfirmationApproved(true);
      nextStep();
    } else if (currentStep === 2) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const userResponse = await axios.get(
          "http://127.0.0.1:8000/api/user",
          config
        );
        const id_pengguna = userResponse.data.id;

        const payload = {
          ...formData,
          id_pengguna,
          details_barang: selectedBarangIds,
        };

        const response = await axios.post(
          "http://127.0.0.1:8000/api/add-permohonan",
          payload,
          config
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error creating Permohonan:", error.response.data);
      }
    }
  };

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

  return (
    <div className=" flex px-8 space-x-2 mt-6">
      <div className=" w-5/12">
        {currentStep === 1 && (
         <form onSubmit={handleSubmit} className="bg-white shadow-md border rounded-lg p-6 max-w-md mx-auto">
         <div className="text-center">
           <h1 className="text-4xl font-semibold tracking-wide mb-4">Persetujuan Peminjam</h1>
           <p className="text-lg mb-6">
             Sebelum melanjutkan pengajuan, harap baca dan pahami lembar persetujuan yang tersedia. Jika anda setuju dengan ketentuan yang ada, tekan tombol "Setuju" di bawah untuk melanjutkan pengajuan peminjaman.
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
            <label className="block mb-4">
              <span className="text-gray-800">Nomor WhatsApp:</span>
              <input
                type="text"
                name="nomor_wa"
                value={formData.nomor_wa}
                onChange={handleChange}
                className="form-input mt-1 block w-full p-2 border shadow-sm rounded-lg"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-800">Alasan Peminjaman:</span>
              <textarea
                name="alasan_peminjaman"
                value={formData.alasan_peminjaman}
                onChange={handleChange}
                className="form-input mt-1 block w-full p-2 border shadow-sm rounded-lg"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-800">Tanggal Peminjaman:</span>
              <input
                type="date"
                name="tanggal_peminjaman"
                value={formData.tanggal_peminjaman}
                onChange={handleChange}
                className="form-input mt-1 block w-full p-2 border shadow-sm rounded-lg"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-800">Lama Peminjaman:</span>
              <input
                type="text"
                name="lama_peminjaman"
                value={formData.lama_peminjaman}
                onChange={handleChange}
                className="form-input mt-1 block w-full p-2 border shadow-sm rounded-lg"
              />
            </label>

            {/* Details Barang */}
            <label className="block mb-4">
              <span className="text-gray-800">Details Barang:</span>
              <Select
                options={barangOptions}
                isMulti
                onChange={handleDetailsBarangChange}
                value={barangOptions.filter((option) =>
                  selectedBarangIds.includes(option.value)
                )}
                className="mt-1 block w-full"
              />
            </label>

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
            <h1 className=" px-8 -translate-y-10 text-2xl font-semibold tracking-widest text-gray-700 capitalize">
              silahkan isi form berikut untuk mengajukan permohonan
            </h1>
          </center>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;
