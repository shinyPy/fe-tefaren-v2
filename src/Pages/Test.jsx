import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Test = () => {
  const [formData, setFormData] = useState({
    kesetujuan_syarat: '',
    nomor_wa: '',
    alasan_peminjaman: '',
    tanggal_peminjaman: '',
    lama_peminjaman: '',
    nomor_peminjaman: '',
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
      details_barang: [...prevData.details_barang, { nama_barang: '', jumlah: 0 }],
    }));
  };

  const handleDetailsBarangChange = (selectedOptions) => {
    setSelectedBarangIds(selectedOptions ? selectedOptions.map((option) => option.value) : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const userResponse = await axios.get('http://127.0.0.1:8000/api/user', config);
      const id_pengguna = userResponse.data.id;

      const payload = {
        ...formData,
        id_pengguna,
        details_barang: selectedBarangIds,
      };

      const response = await axios.post('http://127.0.0.1:8000/api/add-permohonan', payload, config);

      console.log(response.data);
    } catch (error) {
      console.error('Error creating Permohonan:', error.response.data);
    }
  };

  useEffect(() => {
    const fetchBarangData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/barangShow', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const barangData = response.data.map((barang) => ({
          value: barang.id_barang,
          label: barang.nama_barang,
        }));

        setBarangOptions(barangData);
      } catch (error) {
        console.error('Error fetching barang data:', error);
      }
    };

    fetchBarangData();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Kesetujuan Syarat:
        <input type="text" name="kesetujuan_syarat" value={formData.kesetujuan_syarat} onChange={handleChange} />
      </label>

      
    

      <label>
        Nomor WhatsApp:
        <input type="text" name="nomor_wa" value={formData.nomor_wa} onChange={handleChange} />
      </label>

      <label>
        Alasan Peminjaman:
        <textarea name="alasan_peminjaman" value={formData.alasan_peminjaman} onChange={handleChange} />
      </label>

      

      <label>
        Tanggal Peminjaman:
        <input type="date" name="tanggal_peminjaman" value={formData.tanggal_peminjaman} onChange={handleChange} />
      </label>

      <label>
        Lama Peminjaman:
        <input type="text" name="lama_peminjaman" value={formData.lama_peminjaman} onChange={handleChange} />
      </label>

      <label>
        Nomor Peminjaman:
        <input type="text" name="nomor_peminjaman" value={formData.nomor_peminjaman} onChange={handleChange} />
      </label>

      {/* Details Barang */}
      <label>
        Details Barang:
        <Select
          options={barangOptions}
          isMulti
          onChange={handleDetailsBarangChange}
          value={barangOptions.filter((option) => selectedBarangIds.includes(option.value))}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;
