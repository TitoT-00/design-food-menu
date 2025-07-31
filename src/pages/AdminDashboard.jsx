import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  MenuItem,
  Snackbar,
  Alert,
  Avatar,
  Chip,
  Divider,
  Paper,
  Fade,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Edit as EditIcon, 
  Visibility as VisibilityIcon, 
  Store as StoreIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  Receipt as ReceiptIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useMenu } from '../contexts/MenuContext';
import { useTitle } from '../contexts/TitleContext';
import { useTaxTip } from '../contexts/TaxTipContext';
import { useTheme } from '../contexts/ThemeContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const { storeName, updateStoreName, updateTitle } = useTitle();
  const { salesTax, defaultTipOptions, updateSalesTax, updateTipOptions } = useTaxTip();
  const { themeColors, updateTheme } = useTheme();

  // Update page title when component mounts
  useEffect(() => {
    updateTitle(`${storeName} - Admin Dashboard`);
    return () => updateTitle(storeName);
  }, [storeName]);

  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newTipOption, setNewTipOption] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    imageUrl: '',
  });

  const handleOpen = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData({
        name: item.name,
        price: item.price,
        category: item.category,
        description: item.description || '',
        imageUrl: item.imageUrl || '',
      });
    } else {
      setEditItem(null);
      setFormData({ name: '', price: '', category: '', description: '', imageUrl: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditItem(null);
    setFormData({ name: '', price: '', category: '', description: '', imageUrl: '' });
  };

  const handleSubmit = () => {
    if (formData.name && formData.price && (formData.category || formData.newCategory)) {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        category: formData.category === 'new' ? formData.newCategory : formData.category
      };
      
      if (editItem) {
        updateMenuItem({ ...itemData, id: editItem.id });
        setSnackbar({
          open: true,
          message: 'Item updated successfully!',
          severity: 'success'
        });
      } else {
        addMenuItem(itemData);
        setSnackbar({
          open: true,
          message: 'Item added successfully!',
          severity: 'success'
        });
      }
      handleClose();
    }
  };

  const handleDelete = (id) => {
    deleteMenuItem(id);
    setSnackbar({
      open: true,
      message: 'Item deleted successfully!',
      severity: 'info'
    });
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)',
        zIndex: 0,
      }
    }}>
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Fade in timeout={500}>
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <DashboardIcon />
                  </Avatar>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                    Menu Management
                  </Typography>
                </Box>
                <Paper 
                  elevation={0}
                  sx={{
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Store Settings
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Store Name"
                        value={storeName}
                        onChange={(e) => updateStoreName(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Sales Tax (%)"
                        type="number"
                        value={salesTax}
                        onChange={(e) => updateSalesTax(e.target.value)}
                        variant="outlined"
                        fullWidth
                        inputProps={{ 
                          step: 0.001,
                          min: 0,
                          max: 100
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpen()}
                sx={{ 
                  borderRadius: 2,
                  py: 1.5,
                  px: 3,
                  background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Add Item
              </Button>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0}
                  sx={{
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    height: 'fit-content',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                      <ReceiptIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Tip Options
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      label="New Tip Option (%)"
                      value={newTipOption}
                      onChange={(e) => setNewTipOption(e.target.value)}
                      variant="outlined"
                      size="small"
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 100,
                        step: 1
                      }}
                      sx={{ flex: 1 }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        if (newTipOption && !isNaN(parseFloat(newTipOption))) {
                          const tipValue = parseFloat(newTipOption);
                          if (tipValue >= 0 && tipValue <= 100) {
                            if (!defaultTipOptions.includes(tipValue)) {
                              updateTipOptions([...defaultTipOptions, tipValue].sort((a, b) => a - b));
                              setNewTipOption('');
                              setSnackbar({
                                open: true,
                                message: 'Tip option added successfully!',
                                severity: 'success'
                              });
                            } else {
                              setSnackbar({
                                open: true,
                                message: 'This tip percentage already exists!',
                                severity: 'warning'
                              });
                            }
                          }
                        }
                      }}
                      disabled={!newTipOption || 
                        isNaN(parseFloat(newTipOption)) || 
                        defaultTipOptions.includes(parseFloat(newTipOption))}
                      sx={{ 
                        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                        }
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {defaultTipOptions.map((tip) => (
                      <Chip
                        key={tip}
                        label={`${tip}%`}
                        onDelete={() => {
                          updateTipOptions(defaultTipOptions.filter(t => t !== tip));
                          setSnackbar({
                            open: true,
                            message: 'Tip option removed!',
                            severity: 'info'
                          });
                        }}
                        color="primary"
                        variant="outlined"
                        sx={{ 
                          '& .MuiChip-deleteIcon': {
                            color: 'error.main',
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8}>
                <Paper 
                  elevation={0}
                  sx={{
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                      <PaletteIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Theme Settings
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Primary Color"
                        value={themeColors.primaryColor}
                        onChange={(e) => updateTheme({ ...themeColors, primaryColor: e.target.value })}
                        variant="outlined"
                        size="small"
                        type="color"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Secondary Color"
                        value={themeColors.secondaryColor}
                        onChange={(e) => updateTheme({ ...themeColors, secondaryColor: e.target.value })}
                        variant="outlined"
                        size="small"
                        type="color"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Background Color"
                        value={themeColors.backgroundColor}
                        onChange={(e) => updateTheme({ ...themeColors, backgroundColor: e.target.value })}
                        variant="outlined"
                        size="small"
                        type="color"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Card Background"
                        value={themeColors.cardBackground}
                        onChange={(e) => updateTheme({ ...themeColors, cardBackground: e.target.value })}
                        variant="outlined"
                        size="small"
                        type="color"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Text Color"
                        value={themeColors.textColor}
                        onChange={(e) => updateTheme({ ...themeColors, textColor: e.target.value })}
                        variant="outlined"
                        size="small"
                        type="color"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <TextField
                        label="Secondary Text"
                        value={themeColors.secondaryTextColor}
                        onChange={(e) => updateTheme({ ...themeColors, secondaryTextColor: e.target.value })}
                        variant="outlined"
                        size="small"
                        type="color"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => updateTheme({
                      primaryColor: '#6366f1',
                      secondaryColor: '#f59e0b',
                      backgroundColor: '#f8fafc',
                      cardBackground: '#ffffff',
                      textColor: '#1e293b',
                      secondaryTextColor: '#64748b'
                    })}
                    sx={{ mt: 2 }}
                  >
                    Reset to Default
                  </Button>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Menu Items ({menuItems.length})
              </Typography>
              <Grid container spacing={3}>
                {menuItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                          }} 
                        />
                        <Box sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 2,
                          px: 1.5,
                          py: 0.5,
                        }}>
                          <Typography variant="h6" color="primary" fontWeight={700}>
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                      <CardContent sx={{ pb: '16px !important', flex: 1 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                          <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                            {item.name}
                          </Typography>
                          <Box>
                            <IconButton
                              size="small"
                              onClick={() => handleOpen(item)}
                              sx={{ 
                                borderRadius: 1,
                                '&:hover': { background: 'rgba(99, 102, 241, 0.1)' }
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(item.id)}
                              sx={{ 
                                borderRadius: 1,
                                '&:hover': { background: 'rgba(239, 68, 68, 0.1)' }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <Chip 
                          label={item.category} 
                          size="small" 
                          color="secondary"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Container>
      
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editItem ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Name"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Category"
                fullWidth
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
                <MenuItem value="new">+ Add New Category</MenuItem>
              </TextField>
            </Grid>
            {formData.category === 'new' && (
              <Grid item xs={12}>
                <TextField
                  label="New Category"
                  fullWidth
                  value={formData.newCategory || ''}
                  onChange={(e) => setFormData({ ...formData, newCategory: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                fullWidth
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              },
            }}
          >
            {editItem ? 'Save Changes' : 'Add Item'}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 2,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
