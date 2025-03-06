import React, { useState } from 'react';
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
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon, Store as StoreIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useMenu } from '../contexts/MenuContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();

  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
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
      });
    } else {
      setEditItem(null);
      setFormData({ name: '', price: '', category: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditItem(null);
    setFormData({ name: '', price: '', category: '' });
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
      } else {
        addMenuItem(itemData);
      }
      handleClose();
    }
  };

  const handleDelete = (id) => {
    deleteMenuItem(id);
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Food Menu POS - Admin
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Button
              color="inherit"
              startIcon={<StoreIcon />}
              onClick={() => navigate('/store')}
            >
              Store View
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar> */}

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            Menu Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add Item
          </Button>
        </Box>

        <Grid container spacing={3}>
          {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ mb: 2 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ height: 200, overflow: 'hidden' }}>
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
              </Box>
              <CardContent sx={{ pb: '16px !important', flex: 1 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">{item.name}</Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary">
                  ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {item.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{item.category}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mt: 2 }}>
            <TextField
              select
              label="Category"
              fullWidth
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              sx={{ flex: 1 }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
              <MenuItem value="new">+ Add New Category</MenuItem>
            </TextField>
            {formData.category === 'new' && (
              <TextField
                label="New Category"
                fullWidth
                value={formData.newCategory || ''}
                onChange={(e) => setFormData({ ...formData, newCategory: e.target.value })}
                sx={{ flex: 1 }}
              />
            )}
          </Box>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editItem ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
