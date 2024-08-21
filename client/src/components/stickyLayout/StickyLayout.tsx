import React, { useContext } from 'react';
import { Grid, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { DarkModeContext } from '../../context/darkModeContext';

const StickyLayout = () => {
  const { darkMode } = useContext<{ darkMode: boolean }>(DarkModeContext);

  return (
    <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
      <Grid container direction='column' style={{ flexDirection: 'unset' }}>
        {/* Sticky Header */}
        <Grid
          item
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: '#fff',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box p={2}>
            <Navbar />
          </Box>
        </Grid>

        {/* Scrollable Content */}
        <Grid
          item
          style={{
            flexGrow: 1,
            overflowY: 'auto',
          }}
        >
          <Box p={2}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default StickyLayout;
