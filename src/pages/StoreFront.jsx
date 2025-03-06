import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Box,
  IconButton,
  Divider,
  AppBar,
  Toolbar,
  Badge,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, ShoppingCart as ShoppingCartIcon, Store as StoreIcon } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useTitle } from '../contexts/TitleContext';
import { useTaxTip } from '../contexts/TaxTipContext';
import { useMenu } from '../contexts/MenuContext';
import { useNavigate } from 'react-router-dom';

const StoreFront = () => {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const { menuItems, categories } = useMenu();
  const { storeName, updateTitle } = useTitle();
  const { salesTax, defaultTipOptions } = useTaxTip();
  const [selectedTip, setSelectedTip] = useState(defaultTipOptions[1]); // Default to middle option
  const [customTip, setCustomTip] = useState('');

  // Update page title when component mounts
  useEffect(() => {
    updateTitle(storeName);
  }, [storeName]);
  const { cart, addItem, removeItem, updateQuantity, getTotal } = useCart();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const item = menuItems.find(item => item.id === result.draggableId);
    if (item) {
      addItem(item);
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 0,
    margin: 0,
    ...draggableStyle
  });

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Food Menu POS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {isAdmin && (
              <>
                <Button color="inherit" onClick={() => navigate('/admin')}>
                  Admin Dashboard
                </Button>
                <Button
                  color="inherit"
                  startIcon={<StoreIcon />}
                  onClick={() => navigate('/store')}
                >
                  Store View
                </Button>
              </>
            )}
            <Badge badgeContent={cart.length} color="secondary">
              <IconButton color="inherit">
                <ShoppingCartIcon />
              </IconButton>
            </Badge>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar> */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {categories.map((category) => (
                <Box key={category} sx={{ mb: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ borderBottom: '2px solid #1976d2', pb: 1, mb: 3 }}>
                    {category}
                  </Typography>
                  <Droppable droppableId={`menu-${category}`} direction="horizontal">
                    {(provided) => (
                      <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
                        {menuItems
                          .filter(item => item.category === category)
                          .map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                              <Draggable draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                  >
                                    <Card
                                      elevation={snapshot.isDragging ? 8 : 2}
                                      sx={{
                                        height: '100%',
                                        borderRadius: 2,
                                        transition: 'all 0.2s',
                                        cursor: 'grab',
                                        '&:hover': {
                                          transform: 'translateY(-4px)',
                                          boxShadow: 4
                                        },
                                        display: 'flex',
                                        flexDirection: 'column'
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          height: 180,
                                          overflow: 'hidden',
                                          '& img': {
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease-in-out',
                                          },
                                          '&:hover img': {
                                            transform: 'scale(1.1)'
                                          }
                                        }}
                                      >
                                        <img src={item.imageUrl} alt={item.name} />
                                      </Box>
                            <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                              <Typography variant="h6" gutterBottom>{item.name}</Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                                {item.description}
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                                <Typography variant="h6" color="primary">
                                  ${item.price.toFixed(2)}
                                </Typography>
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<AddIcon />}
                                  onClick={() => addItem(item)}
                                  sx={{ borderRadius: 2 }}
                                >
                                  Add
                                </Button>
                              </Box>
                                      </CardContent>
                                    </Card>
                                  </div>
                                )}
                              </Draggable>
                            </Grid>
                          ))}
                        {provided.placeholder}
                      </Grid>
                    )}
                  </Droppable>
                </Box>
              ))}
            </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                maxHeight: 'calc(100vh - 100px)',
                overflow: 'auto',
                position: 'sticky',
                top: 24,
                borderRadius: 2
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ borderBottom: '2px solid #1976d2', pb: 1, mb: 3 }}>
                Shopping Cart
              </Typography>
              <Box sx={{ minHeight: 200, mb: 3 }}>
                {cart.items.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1">
                        {item.name}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography color="textSecondary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 3, borderTop: '1px solid rgba(0, 0, 0, 0.12)', pt: 2 }}>
                <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <span>Subtotal:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </Typography>
                
                <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <span>Tax ({salesTax}%):</span>
                  <span>${(getTotal() * (salesTax / 100)).toFixed(2)}</span>
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" gutterBottom>Tip:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    {defaultTipOptions.map((tip) => (
                      <Button
                        key={tip}
                        variant={selectedTip === tip ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => {
                          setSelectedTip(tip);
                          setCustomTip('');
                        }}
                      >
                        {tip}%
                      </Button>
                    ))}
                    <Button
                      variant={customTip !== '' ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => {
                        setSelectedTip(null);
                        setCustomTip(customTip || '0');
                      }}
                    >
                      Custom
                    </Button>
                  </Box>
                  {customTip !== '' && (
                    <TextField
                      size="small"
                      type="number"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                      sx={{ width: 100 }}
                    />
                  )}
                </Box>

                <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <span>Tip ({customTip !== '' ? customTip : selectedTip}%):</span>
                  <span>${(getTotal() * ((customTip !== '' ? parseFloat(customTip) : selectedTip) / 100)).toFixed(2)}</span>
                </Typography>

                <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, borderTop: '2px solid rgba(0, 0, 0, 0.12)', pt: 2 }}>
                  <span>Total:</span>
                  <span>
                    ${(getTotal() * (1 + salesTax / 100 + (customTip !== '' ? parseFloat(customTip) : selectedTip) / 100)).toFixed(2)}
                  </span>
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2, borderRadius: 2, py: 1.5 }}
                disabled={cart.items.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </DragDropContext>
      </Container>
    </Box>
  );
};

export default StoreFront;
