import React, { useState } from 'react';
import axios from 'axios';

const Test = ({ peminjamanId }) => {
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
      formData.append('_method', 'PUT'); // Add this line for a PUT request
      formData.append('status_peminjaman', statusPeminjaman);
      formData.append('bukti_pengembalian', buktiPengembalian);

      const accessToken = localStorage.getItem('accessToken');

      // Make sure to update the API endpoint and include the Authorization header
      const response = await axios.post(`http://127.0.0.1:8000/api/edit-peminjaman/9`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log(response.data);
      // Handle success, maybe redirect or update UI
    } catch (error) {
      console.error('Error submitting form:', error.response.data);
      // Handle error, maybe show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Status Peminjaman:</label>
        <select value={statusPeminjaman} onChange={(e) => setStatusPeminjaman(e.target.value)}>
          <option value="dipinjam">Dipinjam</option>
          <option value="dikembalikan">Dikembalikan</option>
        </select>
      </div>

      <div>
        <label>Bukti Pengembalian:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;
