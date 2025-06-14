import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function CuentasList({ onEdit }) {
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/accounts');
      const data = await res.json();
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta cuenta?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/accounts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Error deleting account');
      }
      fetchAccounts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Cuentas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Número de Cuenta</TableCell>
              <TableCell>Banco</TableCell>
              <TableCell>Moneda</TableCell>
              <TableCell>Notas</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((acc) => (
              <TableRow key={acc._id}>
                <TableCell>{acc.name}</TableCell>
                <TableCell>{acc.accountNumber}</TableCell>
                <TableCell>{acc.bank}</TableCell>
                <TableCell>{acc.currency}</TableCell>
                <TableCell>{acc.notes}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => onEdit(acc)}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(acc._id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CuentasList;
