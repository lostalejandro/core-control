import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Typography, Paper, Select, InputLabel, FormControl } from '@mui/material';

const transactionTypes = [
  { value: 'compra', label: 'Compra' },
  { value: 'venta', label: 'Venta' },
];

function TransaccionesForm({ onTransactionAdded }) {
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

  useEffect(() => {
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
  }, []);

  const handleFileChange = (e) => {
    setForm({ ...form, receiptFile: e.target.files[0] });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      if (onTransactionAdded) onTransactionAdded();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Añadir Transacción
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
          <TextField
            label="Cliente"
            name="counterparty"
            value={form.counterparty}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="account-label">Cuenta</InputLabel>
            <Select
              labelId="account-label"
              id="account"
              name="account"
              value={form.account}
              label="Cuenta"
              onChange={handleChange}
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
            Registrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default TransaccionesForm;
