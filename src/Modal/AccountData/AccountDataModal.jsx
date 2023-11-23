import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

const AccountDataModal = ({
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
    closed: { opacity: 0, y: -300 }, // Atur nilai y sesuai dengan tinggi yang diinginkan
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

  const [nisValue, setNisValue] = useState(rowData.NIS);
  const handleNisChange = (e) => {
    setNisValue(e.target.value);
  };

  const [namaValue, setNamaValue] = useState(rowData.Nama);
  const handleNamaChange = (e) => {
    setNamaValue(e.target.value);
  };
  const [levelValue, setLevelValue] = useState(rowData.Level);
  const handleLevelChange = (e) => {
    setLevelValue(e.target.value);
  };
  const [jurusanValue, setJurusanValue] = useState(
    rowData.Jurusan || rowData.Jabatan
  );
  const handleJurusanChange = (e) => {
    setJurusanValue(e.target.value);
  };
  const [emailValue, setEmailValue] = useState(rowData.Email);
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      // Check if rowData and other values are defined
      if (
        !rowData ||
        !rowData.NIS ||
        !nisValue ||
        !namaValue ||
        !levelValue ||
        !jurusanValue ||
        !emailValue
      ) {
        console.error("Invalid data for editing");
        return;
      }

      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://127.0.0.1:8000/api/editpengguna/${rowData.NIS}`,
        {
          nomorinduk_pengguna: nisValue,
          nama_pengguna: namaValue,
          level_pengguna: levelValue,
          ...(rowData.hasOwnProperty("Jurusan")
            ? { jurusan_pengguna: jurusanValue }
            : { jabatan_pengguna: jurusanValue }),
          email: emailValue,
          // Tambahkan field lain sesuai kebutuhan
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sertakan token di header permintaan
          },
        }
      );

      // Check if the response status indicates success
      if (response.status >= 200 && response.status < 300) {
        console.log("Edit successful", response.data);
        onEditSuccess();
        Swal.fire({
          icon: "success",
          title: "Edit Berhasil",
          text: "Data pengguna telah berhasil diubah.",
        });
      } else {
        // Handle specific error cases based on the status code
        console.error("Edit failed with status", response.status);
      }
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error editing data", error);
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
        // User clicked "Ya, hapus!" button
        performDelete();
      }
    });
  };

  const performDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const apiUrl = `http://127.0.0.1:8000/api/deletepengguna/${rowData.NIS}`;
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
          text: "Data pengguna telah berhasil dihapus.",
        });
      } else {
        console.error("Delete failed with status", result.status);
      }
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const [jurusanOptions, setJurusanOptions] = useState([]);

  useEffect(() => {
    if (rowData.hasOwnProperty("Jurusan")) {
      // Fetch data from the backend and populate the jurusanOptions state
      fetch("http://127.0.0.1:8000/api/jurusan-values") // Ganti dengan URL API yang sebenarnya
        .then((response) => response.json())
        .then((data) => {
          // Asumsikan data respons adalah array objek jurusan
          setJurusanOptions(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      fetch("http://127.0.0.1:8000/api/jabatan-values") // Ganti dengan URL API yang sebenarnya
        .then((response) => response.json())
        .then((data) => {
          setJurusanOptions(data); // Perbarui state jabatanOptions dengan respons API
        })
        .catch((error) => {
          console.error("Error fetching jabatan data:", error);
        });
    }
  }, [rowData]);

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
            Detail Pengguna
          </h1>
        </div>

        <div className=" w-full border-b-2 mb-8"></div>

        <form onSubmit={handleEdit}>
          <input
            className="left-0 text-left w-full tracking-widest px-4 py-3 mb-4 border-2 rounded-lg text-lg"
            value={nisValue}
            onChange={handleNisChange}
          ></input>

          <input
            className="left-0 text-left w-full tracking-widest px-4 py-3 mb-4 border-2 rounded-lg text-lg"
            value={namaValue}
            onChange={handleNamaChange}
          ></input>
          <select
            className="left-0 text-left w-full bg-white tracking-widest bg- px-4 py-3 border-2 mb-4 rounded-lg text-lg"
            onChange={handleLevelChange}
            value={levelValue}
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
          <select
            className="left-0 text-left w-full bg-white tracking-widest bg- px-4 py-3 border-2 mb-4 rounded-lg text-lg"
            onChange={handleJurusanChange}
            value={jurusanValue}
          >
            {jurusanOptions.map((jurusan, index) => (
              <option key={index} value={jurusan}>
                {jurusan}
              </option>
            ))}
          </select>
          <input
            className="left-0 text-left w-full tracking-widest px-4 py-3 border-2 rounded-lg text-lg"
            value={emailValue}
            onChange={handleEmailChange}
          ></input>

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

export default AccountDataModal;
