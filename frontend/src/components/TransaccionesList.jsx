import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function TransaccionesList({ onEdit }) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta transacción?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Error deleting transaction');
      }
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Transacciones
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Cuenta</TableCell>
              <TableCell>Cantidad Recibida</TableCell>
              <TableCell>Moneda</TableCell>
              <TableCell>Tasa de Cambio</TableCell>
              <TableCell>Notas</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>{tx.counterparty}</TableCell>
                <TableCell>{tx.account}</TableCell>
                <TableCell>{tx.amountReceived}</TableCell>
                <TableCell>{tx.currency}</TableCell>
                <TableCell>{tx.exchangeRate}</TableCell>
                <TableCell>{tx.notes}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => onEdit(tx)}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(tx._id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TransaccionesList;
