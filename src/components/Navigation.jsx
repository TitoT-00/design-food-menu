import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
import { 
  ShoppingCart, 
  Store as StoreIcon, 
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cart } = useCart();
  const { themeColors } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: `linear-gradient(135deg, ${themeColors.primaryColor || '#6366f1'} 0%, ${themeColors.primaryColor ? themeColors.primaryColor + 'ee' : '#818cf8'} 100%)`,
        boxShadow: `0 4px 20px ${themeColors.primaryColor || '#6366f1'}30`,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        mb: 3,
      }}
    >
      <Toolbar sx={{ px: 3, py: 1.5, minHeight: 70 }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              mr: 2,
              width: 36,
              height: 36,
            }}
          >
            <RestaurantIcon sx={{ fontSize: 18 }} />
          </Avatar>
          
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.2,
              }}
            >
              Food Menu POS
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 500,
              }}
            >
              Restaurant Management
            </Typography>
          </Box>
        </Box>

        {/* Mode Indicator */}
        <Chip 
          label={isAdmin ? "ADMIN" : "STORE"} 
          size="small"
          sx={{ 
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: 600,
            mr: 2,
          }}
        />

        {/* Navigation Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAdmin ? (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/admin')}
                startIcon={<DashboardIcon />}
                sx={{ 
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                startIcon={<StoreIcon />}
                onClick={() => navigate('/store')}
                sx={{ 
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                Store
              </Button>
            </>
          ) : (
            <Badge 
              badgeContent={cart.items.length} 
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  background: themeColors.secondaryColor || '#f59e0b',
                  color: 'white',
                  fontWeight: 600,
                }
              }}
            >
              <IconButton 
                color="inherit"
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <ShoppingCart />
              </IconButton>
            </Badge>
          )}

          {/* User Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                background: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <PersonIcon sx={{ fontSize: 16 }} />
            </Avatar>
            
            <Button 
              color="inherit" 
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ 
                borderRadius: 2,
                px: 2,
                py: 0.5,
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
