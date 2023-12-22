import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

const BarChart2 = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    getBarChartDataFromApi();
  }, []);

  const getBarChartDataFromApi = async () => {
    try {
      const response = await fetch('http://localhost:4000/totales'); // Reemplaza con la URL correcta
      const data = await response.json();

      const formattedData = data.map((record) => ({
        mes: record.mes.trim(),
        diferencia: record.diferencia,
      }));

      setBarChartData(formattedData);
    } catch (error) {
      console.error('Error al obtener datos desde la API:', error);
    }
  };

  return (
    <ResponsiveBar
      data={barChartData}
      theme={{
        axis: {
          legend: {
            text: {
              fill: '#FFF',
            },
          },
          ticks: {
            text: {
              fill: '#FFF',
            },
          },
        },
        legends: {
          text: {
            fill: '#FFF',
          },
        },
      }}
      keys={['diferencia']}
      indexBy="mes"
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : null,
        legendPosition: 'middle',
        legendOffset: 32,
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : null,
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'Diferencia',
        legendPosition: 'middle',
        legendOffset: -40,
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : null,
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[]}
    />
  );
};

export default BarChart2;

