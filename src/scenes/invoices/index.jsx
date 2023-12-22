// scenes/providers.tsx
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';

const Providers = () => {
  const theme = useTheme();

  const [providers, setProviders] = useState([]);
  const colors = theme.palette.mode;

  useEffect(() => {
    // Cuando el componente se monta, realiza la solicitud para obtener los proveedores
    getProviders();
  }, []); // El segundo argumento asegura que se llama solo una vez al montar el componente

  const getProviders = async () => {
    try {
      // Reemplaza la URL con la ruta correcta de tu API de proveedores
      const response = await fetch('http://localhost:4000/providers');
      const data = await response.json();
      // Asegúrate de que cada fila tenga una propiedad 'id' única
      const providersWithId = data.map((provider, index) => ({ ...provider, id: index + 1 }));
      setProviders(providersWithId);
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
    }

  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'proveedor', headerName: 'Proveedor', width: 200 },
    { field: 'contacto_comercial', headerName: 'Contacto Comercial', width: 250 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'telefono', headerName: 'Telefono', width: 150 },
    // Agrega más columnas según la estructura de tus datos
  ];
  

  return (
    <Box m="20px">
      <Header title="PROVIDERS" subtitle="List of Providers" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          // ... Agrega estilos adicionales según tus necesidades
        }}
      >
        <DataGrid
          rows={providers}
          columns={columns}
          pageSize={10}
          checkboxSelection
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default Providers;
