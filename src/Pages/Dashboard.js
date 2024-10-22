import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import SellIcon from '@mui/icons-material/Sell';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Users from '../Layouts/Users'; 
import Orders from '../Layouts/Orders';


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
  { title: 'Users', icon: <GroupIcon />, component: <Users /> },
  { title: 'Orders', icon: <InventoryIcon />, component: <Orders /> },
  { title: 'Product', icon: <SellIcon />, component: <Typography>Product Component</Typography> },
  { title: 'Category', icon: <CategoryIcon />, component: <Typography>Category Component</Typography> },
];

const drawerWidth = 240;

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(<Typography>Welcome to the admin dashboard!</Typography>);

  return (
    <ThemeProvider theme={demoTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
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
