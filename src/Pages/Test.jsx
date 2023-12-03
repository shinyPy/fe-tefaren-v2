import React, { useState } from 'react';
import axios from 'axios';

const Test = ({ filteredPeminjamanData, onSelectPeminjaman }) => {
  const [selectedPeminjamanId, setSelectedPeminjamanId] = useState('');
  const [statusPeminjaman, setStatusPeminjaman] = useState('');
  const [buktiPengembalian, setBuktiPengembalian] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBuktiPengembalian(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('status_peminjaman', statusPeminjaman);
      formData.append('bukti_pengembalian', buktiPengembalian);

      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.post(
        `http://127.0.0.1:8000/api/edit-peminjaman/${selectedPeminjamanId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);
      // Handle success, maybe redirect or update UI
    } catch (error) {
      console.error('Error submitting form:', error.response.data);
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
            <div className="mb-4">
              <label
                htmlFor="selectStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Status Peminjaman:
              </label>
              <select
                id="selectStatus"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={statusPeminjaman}
                onChange={(e) => setStatusPeminjaman(e.target.value)}
              >
                <option value="dipinjam">Dipinjam</option>
                <option value="dikembalikan">Dikembalikan</option>
              </select>
            </div>

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
