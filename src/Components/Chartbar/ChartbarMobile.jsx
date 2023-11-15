import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const fixedColor = '#00CED1'; // Warna yang tetap atau sesuaikan dengan kebutuhan Anda

const ChartbarMobile = () => {
  const data = [
    { name: 'Laptop', value: 30 },
    { name: 'Android', value: 80 },
    { name: 'IOS', value: 30 },
    { name: 'MAC', value: 30 },
  ];

  return (
    <div className='shadow-md pt-4 pr-4 border rounded-md bg-white'>
      <h1 className="mb-5 ml-4 tracking-widest p-1.5 font-semibold rounded-full border shadow-sm text-center bg-cyan-600 text-white"> Barang dengan Kategori</h1>
      <div className="scrollable-container" style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
        <BarChart width={700} height={275} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar key={data.name} dataKey="value" fill={fixedColor} />
        </BarChart>
      </div>
    </div>
  );
};

export default ChartbarMobile;
