import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Avatar,
  Divider,
} from '@mui/material';
import { 
  Lock as LockIcon, 
  Restaurant as RestaurantIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(credentials.username, credentials.password)) {
      navigate(credentials.username === 'admin' ? '/admin' : '/store');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        p: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper 
          elevation={0}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 450,
            mx: 'auto',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'primary.main',
              width: 64,
              height: 64,
              mb: 2,
            }}
          >
            <RestaurantIcon sx={{ fontSize: 32 }} />
          </Avatar>
          
          <Typography 
            component="h1" 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 1
            }}
          >
            Welcome Back
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Sign in to your POS system
          </Typography>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#ef4444'
                }
              }}
            >
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                  },
                },
                mb: 2
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                  },
                },
                mb: 3
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={<LockIcon />}
              sx={{ 
                mt: 2,
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Sign In
            </Button>
          </Box>
          
          <Divider sx={{ width: '100%', my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Demo Credentials
            </Typography>
          </Divider>
          
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Admin Mode:</strong> admin / admin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Store Mode:</strong> store / store
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
