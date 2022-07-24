import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function CrudTopBar({ title, onCreate, children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "#d02f27"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 22 }}>
            {title}
          </Typography>
          {children}
          <Button onClick={() => onCreate()} color="inherit">
            Crear {title}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
