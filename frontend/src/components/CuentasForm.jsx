import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

function CuentasForm({ onSave }) {
  const [form, setForm] = useState({
    name: '',
    accountNumber: '',
    bank: '',
    currency: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la cuenta, por ahora solo llamamos onSave
    if (onSave) onSave(form);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Añadir / Editar Cuenta
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre de la Cuenta"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Número de Cuenta"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Banco"
            name="bank"
            value={form.bank}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Moneda"
            name="currency"
            value={form.currency}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Guardar Cuenta
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default CuentasForm;
