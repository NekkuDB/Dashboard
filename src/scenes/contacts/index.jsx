// scenes/contacts.tsx
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';

const Contacts = () => {
  const theme = useTheme();

  const [products, setProducts] = useState([]);
  const colors = theme.palette.mode;

  useEffect(() => {
    // Cuando el componente se monta, realiza la solicitud para obtener los productos
    getProducts();
  }, []); // El segundo argumento asegura que se llama solo una vez al montar el componente

  const getProducts = async () => {
    try {
      // Reemplaza la URL con la ruta correcta de tu API de productos
      const response = await fetch('http://localhost:4000/products');
      const data = await response.json();
      // Asegúrate de que cada fila tenga una propiedad 'id' única
      const productsWithId = data.map((product, index) => ({ ...product, id: index + 1 }));
      setProducts(productsWithId);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'Description', headerName: 'Description', width: 300 },
    { field: 'Quantity', headerName: 'Quantity', width: 120 },
    // Agrega más columnas según la estructura de tus datos
  ];

  return (
    <Box m="20px">
      <Header title="PRODUCTS" subtitle="List of Products" />
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
          rows={products}
          columns={columns}
          pageSize={10}
          checkboxSelection
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default Contacts;


