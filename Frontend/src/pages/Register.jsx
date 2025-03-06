import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndPoint';
import toast from 'react-hot-toast';
import {
  TextField, Button, Typography, Container, Paper, Grid, CircularProgress, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ userName: false, email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!value.userName || !value.email || !value.password) {
      setErrors({
        userName: !value.userName,
        email: !value.email,
        password: !value.password,
      });
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const request = await post('/auth/register', value);
      const response = request.data;

      if (response.success) {
        toast.success(response.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 3,
              textAlign: 'center',
              backgroundColor: 'white',
              color: '#1976d2',
            }}
          >
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Register
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <TextField
                label="Name"
                type="text"
                name="userName"
                value={value.userName}
                onChange={handleChange}
                required
                error={errors.userName}
                helperText={errors.userName ? "Name is required" : ""}
                fullWidth
              />

              <TextField
                label="Email"
                type="email"
                name="email"
                value={value.email}
                required
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email ? "Email is required" : ""}
                fullWidth
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={value.password}
                onChange={handleChange}
                required
                error={errors.password}
                helperText={errors.password ? "Password is required" : ""}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#1976d2', color: 'white', padding: '10px' }}
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>

              <Typography align="center" sx={{ mt: 2 }}>
                Already have an account? <Link to="/login" style={{ color: '#1976d2' }}>Login</Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
