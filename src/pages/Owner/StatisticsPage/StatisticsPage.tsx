import { Typography } from '@material-ui/core';
import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const data = [
  { name: 'January', uv: 400, pv: 2400, amt: 2400 },
  { name: 'February', uv: 200, pv: 2400, amt: 2400 },
  { name: 'March', uv: 100, pv: 2400, amt: 2400 },
  { name: 'April', uv: 350, pv: 2400, amt: 2400 },
  { name: 'May', uv: 200, pv: 2400, amt: 2400 },
  { name: 'June', uv: 500, pv: 2400, amt: 2400 },
  { name: 'July', uv: 450, pv: 2400, amt: 2400 },
  { name: 'August', uv: 476, pv: 2400, amt: 2400 },
  { name: 'September', uv: 380, pv: 2400, amt: 2400 },
  { name: 'October', uv: 550, pv: 2400, amt: 2400 },
  { name: 'November', uv: 490, pv: 2400, amt: 2400 },
  { name: 'December', uv: 390, pv: 2400, amt: 2400 },
];

const renderLineChart = (
  <LineChart
    width={1200}
    height={300}
    data={data}
    margin={{ top: 30, right: 20, bottom: 5, left: 0 }}
  >
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);

const data2 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StatisticsPage = () => {
  return (
    <div style={{ margin: 'auto' }}>
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Number of sold products per month
      </Typography>
      {renderLineChart}
      <PieChart width={400} height={400}>
        <Pie
          data={data2}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default StatisticsPage;
