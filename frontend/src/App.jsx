import Dashboard from "./components/Dashboard";
import Transacciones from "./components/Transacciones";
import TransaccionesForm from "./components/TransaccionesForm";
import TransaccionesList from "./components/TransaccionesList";
import Reportes from "./components/Reportes";
import Cuentas from "./components/Cuentas";
import Proveedores from "./components/Proveedores";
import Clientes from "./components/Clientes";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider, useAuth } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import { Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

const drawerWidth = 240;

function Menu({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [transaccionesOpen, setTransaccionesOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTransaccionesClick = () => {
    setTransaccionesOpen(!transaccionesOpen);
  };

  if (!user) return null;

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/inicio">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Inicio" />}
        </ListItem>
        <ListItem button onClick={handleTransaccionesClick}>
          <ListItemIcon><ReceiptIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Transacciones" />}
        </ListItem>
        {transaccionesOpen && !collapsed && (
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button component={Link} to="/transacciones/anadir">
              <ListItemText primary="Añadir Transacción" />
            </ListItem>
            <ListItem button component={Link} to="/transacciones/lista">
              <ListItemText primary="Lista de Transacciones" />
            </ListItem>
          </List>
        )}
        <ListItem button component={Link} to="/reportes">
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Reportes" />}
        </ListItem>
        <ListItem button component={Link} to="/cuentas">
          <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Cuentas" />}
        </ListItem>
        <ListItem button component={Link} to="/clientes">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Clientes" />}
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Salir" />}
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle menú"
            edge="start"
            onClick={() => {
              if (window.innerWidth < 600) {
                handleDrawerToggle(); // para móviles
              } else {
                setCollapsed((prev) => !prev); // para escritorio
              }
            }}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Core Control
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Bienvenido, {user.email}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: collapsed ? 80 : 240 }, flexShrink: { sm: 0 } }}
        aria-label="menú principal"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '80%' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? 80 : 240,
              transition: 'width 0.3s',
            },
            overflowX: 'hidden',
            position: 'relative',
            zIndex: 1200,
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <AuthProvider>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${collapsed ? '10%' : '20%'})` }, transition: 'width 0.3s', minHeight: '100vh' }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<Navigate to="/inicio" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/inicio"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transacciones/anadir"
                element={
                  <PrivateRoute>
                    <TransaccionesForm onTransactionAdded={() => {}} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transacciones/lista"
                element={
                  <PrivateRoute>
                    <TransaccionesList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reportes"
                element={
                  <PrivateRoute>
                    <Reportes />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cuentas"
                element={
                  <PrivateRoute>
                    <Cuentas />
                  </PrivateRoute>
                }
              />
              <Route
                path="/proveedores"
                element={
                  <PrivateRoute>
                    <Proveedores />
                  </PrivateRoute>
                }
              />
              <Route
                path="/clientes"
                element={
                  <PrivateRoute>
                    <Clientes />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
