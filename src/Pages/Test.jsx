import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../var';
const Test = ({ filteredPeminjamanData, onSelectPeminjaman }) => {
  const [selectedPeminjamanId, setSelectedPeminjamanId] = useState('');
  const [statusPeminjaman, setStatusPeminjaman] = useState('dikembalikan');
  const [buktiPengembalian, setBuktiPengembalian] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBuktiPengembalian(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedPeminjamanId) {
        Swal.fire('Error', 'Pilih Barang terlebih dahulu', 'error');
        return;
      }

      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('status_peminjaman', 'dikembalikan');
      formData.append('bukti_pengembalian', buktiPengembalian);

      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.post(
        `${API_BASE_URL}api/edit-peminjaman/${selectedPeminjamanId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);
      Swal.fire('Success', 'Form sukses disubmit', 'success');

      // Handle success, maybe redirect or update UI
    } catch (error) {
      console.error('Error submitting form:', error.response.data);
      Swal.fire('Error', 'Error submitting form', 'error');
      // Handle error, maybe show an error message
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-50">
      <h2 className="text-xl font-semibold mb-4">Form Peminjaman</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="selectPeminjaman" className="block text-sm font-medium text-gray-700">
            Pilih Barang:
          </label>
          <select
            id="selectPeminjaman"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={selectedPeminjamanId}
            onChange={(e) => {
              setSelectedPeminjamanId(e.target.value);
              onSelectPeminjaman(e.target.value);
            }}
          >
            <option value="">Pilih Barang</option>
            {filteredPeminjamanData.map((peminjamanItem) => (
              <option key={peminjamanItem.id_peminjaman} value={peminjamanItem.id_peminjaman}>
                {peminjamanItem.barang.nama_barang} - {peminjamanItem.barang.kode_barang}
              </option>
            ))}
          </select>
        </div>

        {selectedPeminjamanId && (
          <div>
            <div className="mb-4"></div>

            <div className="mb-4">
              <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">
                Bukti Pengembalian:
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Test;
