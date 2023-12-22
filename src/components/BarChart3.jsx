import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { ResponsiveBar, Tooltip as NivoTooltip } from '@nivo/bar';
import { tokens } from '../theme';

const BarChart3 = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    getSalesData();
  }, []);

  const getSalesData = async () => {
    try {
      const response = await fetch('http://localhost:4000/pietotal');
      const rawData = await response.json();

      const formattedData = rawData.map((pie) => ({
        id: `${pie.mes.trim()} - ${pie.proveedor.trim()}`, // Combine mes y proveedor
        value: pie.totalProductos,
        mes: pie.mes.trim(),
        proveedor: pie.proveedor.trim(),
      }));

      setSalesData(formattedData);
      console.log('Datos de ventas:', formattedData);
    } catch (error) {
      console.error('Error al obtener datos de ventas:', error);
    }
  };

  return (
    <ResponsiveBar
      data={salesData}
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
      keys={['value']}
      indexBy="id" // Utiliza la combinación de mes y proveedor como identificador único
      margin={{ top: 80, right: 130, bottom: 80, left: 60 }} // Aumenta el espacio en la parte inferior para las etiquetas
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[]}
      borderColor={{
        from: 'color',
        modifiers: [['darker', '1.6']],
      }}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : null,
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'total',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[]}
      role="application"
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in mes: ${e.indexValue}`}
      tooltip={({ id, value, color, data }) => (
        <NivoTooltip
          id={id}
          theme={theme}
          position={{ x: 0, y: 0 }}
          offset={-12}
          anchor="top-left"
          render={({ id, value, color, data }) => (
            <div
              style={{
                background: '#FFF',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                color: '#000',
                textAlign: 'center',
                zIndex: 9999,
              }}
            >
              <strong>{data.mes}</strong>
              <br />
              <span style={{ fontWeight: 'bold', color: colors[0] }}>{data.proveedor}</span>: {value}
            </div>
          )}
        />
      )}
    />
  );
};

export default BarChart3;
