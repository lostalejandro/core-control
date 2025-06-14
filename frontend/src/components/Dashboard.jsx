import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard (Inicio)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
            <AccountBalanceWalletIcon color="primary" sx={{ fontSize: 40, marginRight: 2 }} />
            <Box>
              <Typography variant="h6">Saldos Disponibles</Typography>
              <Typography variant="subtitle1">USD 12,345.67</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
            <MonetizationOnIcon color="success" sx={{ fontSize: 40, marginRight: 2 }} />
            <Box>
              <Typography variant="h6">Total Comprado</Typography>
              <Typography variant="subtitle1">USD 8,900.00</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
            <TrendingUpIcon color="error" sx={{ fontSize: 40, marginRight: 2 }} />
            <Box>
              <Typography variant="h6">Ganancia Neta</Typography>
              <Typography variant="subtitle1">USD 3,445.67</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
