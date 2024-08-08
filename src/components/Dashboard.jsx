import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import TaskList from './TaskList';

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        backgroundImage:'url(https://images.pexels.com/photos/5717455/pexels-photo-5717455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', // Warm gradient background
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <TaskList />
      </Container>
    </Box>
  );
};

export default Dashboard;
