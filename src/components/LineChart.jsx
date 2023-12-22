import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    getLineChartDataFromApi();
  }, []);

  const getLineChartDataFromApi = async () => {
    try {
      const response = await fetch('http://localhost:4000/totales'); // Reemplaza con la URL correcta
      const data = await response.json();

      const formattedData = data.reduce((acc, record) => {
        const monthYear = `${record.mes.trim()}`;
        
        const existingIndex = acc.findIndex((item) => item.id === 'totalFacturas');
        if (existingIndex !== -1) {
          acc[existingIndex].data.push({ x: monthYear, y: record.totalFacturas });
        } else {
          acc.push({
            id: 'totalFacturas',
            data: [{ x: monthYear, y: record.totalFacturas }],
          });
        }

        const existingBoletasIndex = acc.findIndex((item) => item.id === 'totalRecaudacion');
        if (existingBoletasIndex !== -1) {
          acc[existingBoletasIndex].data.push({ x: monthYear, y: record.totalRecaudacion });
        } else {
          acc.push({
            id: 'totalRecaudacion',
            data: [{ x: monthYear, y: record.totalRecaudacion }],
          });
        }

        return acc;
      }, []);

      setLineChartData(formattedData);
    } catch (error) {
      console.error('Error al obtener datos desde la API:', error);
    }
  };

  return (
    <ResponsiveLine
      data={lineChartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: '#FFF',
            },
          },
          legend: {
            text: {
              fill: '#FFF',
            },
          },
          ticks: {
            line: {
              stroke: '#FFF',
              strokeWidth: 1,
            },
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
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,  // Establecer el mínimo a 0 o al valor mínimo que desees
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : null,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'Total',
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
