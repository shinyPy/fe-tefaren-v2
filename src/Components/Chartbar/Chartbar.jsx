import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';

const fixedColor = '#00CED1'; // Warna yang tetap atau sesuaikan dengan kebutuhan Anda

const Chartbar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Get the Authorization bearer token from localStorage
    const token = localStorage.getItem('accessToken'); // replace 'your_token_key' with the actual key you used to store the token

    // Fetch data from the API with Authorization header
    axios.get('https://shiniya.top/api/count-barangkategori', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const apiData = response.data;

        // Transform the API data into the format expected by your chart
        const chartData = apiData.map(item => ({
          name: item.kategori,
          value: item.total,
        }));

        // Set the chart data in the state
        setData(chartData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  // Your chart rendering code here, using the 'data' state

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
