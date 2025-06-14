import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, InputLabel, FormControl } from '@mui/material';

const transactionTypes = [
  { value: 'compra', label: 'Compra' },
  { value: 'venta', label: 'Venta' },
];

function Transacciones() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: 'compra',
    date: new Date().toISOString().slice(0, 10),
    counterparty: '',
    account: '',
    amountReceived: '',
    currency: '',
    exchangeRate: '',
    notes: '',
    receiptFile: null,
  });

  const [accounts, setAccounts] = useState([]);
  const [currencies] = useState(['USDT', 'BRL', 'VES', 'ORO']);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch accounts from backend
    async function fetchAccounts() {
      try {
        const res = await fetch('http://localhost:5000/api/accounts');
        const data = await res.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    }
    fetchAccounts();

    // Fetch clients from backend
    async function fetchClients() {
      try {
        const res = await fetch('http://localhost:5000/api/clients');
        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }
    fetchClients();
  }, []);

  const handleFileChange = (e) => {
    setForm({ ...form, receiptFile: e.target.files[0] });
  };

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare form data for file upload
      const formData = new FormData();
      for (const key in form) {
        if (key === 'receiptFile' && form[key]) {
          formData.append('receipt', form[key]);
        } else {
          formData.append(key, form[key]);
        }
      }

      const res = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Error creating transaction');
      }
      setForm({
        type: 'compra',
        date: new Date().toISOString().slice(0, 10),
        counterparty: '',
        account: '',
        amountReceived: '',
        currency: '',
        exchangeRate: '',
        notes: '',
        receiptFile: null,
      });
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <Box sx={{ maxWidth: 900, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Transacciones
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="type-label">Tipo de Operación</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={form.type}
                label="Tipo de Operación"
                onChange={handleChange}
                required
              >
                {transactionTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Fecha"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
<FormControl fullWidth margin="normal" required>
  <InputLabel id="client-label">Cliente</InputLabel>
  <Select
    labelId="client-label"
    id="client"
    name="counterparty"
    value={form.counterparty}
    label="Cliente"
    onChange={handleChange}
  >
    {clients.length > 0 ? clients.map((client) => (
      <MenuItem key={client._id} value={client._id}>
        {client.name}
      </MenuItem>
    )) : (
      <MenuItem disabled>No hay clientes disponibles</MenuItem>
    )}
  </Select>
  <Button
    variant="text"
    size="small"
    onClick={() => window.location.href = '/clientes'}
    sx={{ mt: 1 }}
  >
    Gestionar clientes
  </Button>
</FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="account-label">Cuenta</InputLabel>
              <Select
                labelId="account-label"
                id="account"
                name="account"
                value={form.account}
                label="Cuenta"
                onChange={handleChange}
                endAdornment={
                  <Button
                    size="small"
                    onClick={() => window.location.href = '/cuentas'}
                    sx={{ ml: 1 }}
                  >
                    Gestionar
                  </Button>
                }
              >
                {accounts.map((acc) => (
                  <MenuItem key={acc._id} value={acc._id}>
                    {acc.name || acc.accountNumber || acc._id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Cantidad Recibida"
              name="amountReceived"
              type="number"
              value={form.amountReceived}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="currency-label">Moneda</InputLabel>
              <Select
                labelId="currency-label"
                id="currency"
                name="currency"
                value={form.currency}
                label="Moneda"
                onChange={handleChange}
              >
                {currencies.map((cur) => (
                  <MenuItem key={cur} value={cur}>
                    {cur}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Tasa de Cambio"
              name="exchangeRate"
              type="number"
              value={form.exchangeRate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Notas"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2, mb: 1 }}
            >
              Subir Comprobante
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {form.receiptFile && <Typography variant="body2">{form.receiptFile.name}</Typography>}
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Registrar Transacción
            </Button>
          </form>
        </Paper>
        <Typography variant="h5" gutterBottom>
          Lista de Transacciones
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Proveedor/Cliente</TableCell>
                <TableCell>Cuenta</TableCell>
                <TableCell>Cantidad Recibida</TableCell>
                <TableCell>Moneda</TableCell>
                <TableCell>Tasa de Cambio</TableCell>
                <TableCell>Notas</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Transacciones;
