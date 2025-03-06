import React from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndPoint';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/AuthSlice';
import { AppBar, Toolbar, Box, TextField, Button } from '@mui/material';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const request = await post('/auth/logout');
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ mx: 2, flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
