import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const fixedColor = '#00CED1'; // Warna yang tetap atau sesuaikan dengan kebutuhan Anda

const Chartbar = () => {
  const data = [
    { name: 'Laptop', value: 30 },
    { name: 'Smartphone', value: 80 },
    { name: 'Tablet', value: 30 },
    { name: 'Laptop', value: 30 },
  ];

  return (
    <div className='shadow-md pt-4 pr-4 border rounded-md bg-white'>
      <h1 className="mb-4 ml-4 tracking-widest p-1.5 font-semibold rounded-full border shadow-sm text-center bg-cyan-600 text-white"> Barang dengan Kategori</h1>
      <BarChart width={975} height={240} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
          <Bar key={data.name} dataKey="value" fill={fixedColor} />
      </BarChart>
    </div>
  );
};

export default Chartbar;
