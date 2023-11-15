import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const data = [
  { name: 'Rusak', value: 800 },
  { name: 'Baik', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Piechart = () => {
  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend/>
    </PieChart>
  );
};

export default Piechart;
