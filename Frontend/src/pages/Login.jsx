import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndPoint';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/AuthSlice';
import { Button, Container, TextField, Typography, Box, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [value, setValue] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const request = await post('/auth/login', value);
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        dispatch(addUser(response.user));
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ p: 4, borderRadius: 2, boxShadow: 3, bgcolor: 'white', width: '100%' }}>
        <Typography variant="h4" fontWeight="bold" align="center" color="primary" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            value={value.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            fullWidth
            variant="outlined"
            value={value.password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to={'/register'} style={{ color: '#1976d2' }}>Register</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
