import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import SellIcon from '@mui/icons-material/Sell';
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Users from '../Layouts/Users'; 
import Orders from '../Layouts/Orders';
import Products from '../Layouts/Products';
import Home from '../Layouts/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Component/AuthContext';


const demoTheme = createTheme({
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});


const NAVIGATION = [
  { title: 'Home', icon: <HomeIcon />, component: <Home/> },
  { title: 'Users', icon: <GroupIcon />, component: <Users /> },
  { title: 'Orders', icon: <InventoryIcon />, component: <Orders /> },
  { title: 'Product', icon: <SellIcon />, component: <Products /> },
  { title: 'Category', icon: <CategoryIcon />, component: <Typography>Category Component</Typography> },
];

const drawerWidth = 240;

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(<Home/>);

  const {logout} = useAuth();

  const navigate = useNavigate()

  
  const logoutbtn = () => {
    logout();
    navigate('/');
  }

  return (
    <ThemeProvider theme={demoTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
            <Button variant="contained" sx={{width:'auto'}} onClick={logoutbtn}><LogoutIcon/> Logout</Button>
          </Toolbar>
        </AppBar>

        
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {NAVIGATION.map((item, index) => (
                <ListItem
                  button
                  key={item.title}
                  onClick={() => setSelectedComponent(item.component)} 
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            ml: '5px',
          }}
        >
          <Toolbar />
          
          {selectedComponent}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
