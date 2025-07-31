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
  Chip,
  Avatar,
  Fade,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  ShoppingCart as ShoppingCartIcon, 
  Store as StoreIcon,
  LocalOffer as LocalOfferIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Fade in timeout={500}>
                <Box>
                  {categories.map((category, categoryIndex) => (
                    <Box key={category} sx={{ mb: 4 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        pb: 2,
                        borderBottom: '2px solid',
                        borderImage: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%) 1',
                      }}>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {category}
                        </Typography>
                        <Chip 
                          label={`${menuItems.filter(item => item.category === category).length} items`}
                          size="small"
                          sx={{ 
                            ml: 2,
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: 'primary.main',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
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
                                            borderRadius: 3,
                                            transition: 'all 0.3s ease-in-out',
                                            cursor: 'grab',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            '&:hover': {
                                              transform: 'translateY(-8px)',
                                              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                                            },
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden',
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              height: 200,
                                              overflow: 'hidden',
                                              position: 'relative',
                                              '& img': {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease-in-out',
                                              },
                                              '&:hover img': {
                                                transform: 'scale(1.1)'
                                              },
                                              '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                height: '30%',
                                                background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                                              }
                                            }}
                                          >
                                            <img src={item.imageUrl} alt={item.name} />
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
                                          <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                                              {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1, lineHeight: 1.6 }}>
                                              {item.description}
                                            </Typography>
                                            <Button
                                              variant="contained"
                                              fullWidth
                                              startIcon={<AddIcon />}
                                              onClick={() => addItem(item)}
                                              sx={{ 
                                                borderRadius: 2,
                                                py: 1.5,
                                                background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                                                '&:hover': {
                                                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                                                  transform: 'translateY(-1px)',
                                                },
                                                transition: 'all 0.2s ease-in-out',
                                              }}
                                            >
                                              Add to Cart
                                            </Button>
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
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  maxHeight: 'calc(100vh - 100px)',
                  overflow: 'auto',
                  position: 'sticky',
                  top: 24,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <ShoppingCartIcon />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Shopping Cart
                  </Typography>
                  <Chip 
                    label={cart.items.length}
                    size="small"
                    sx={{ 
                      ml: 'auto',
                      background: 'primary.main',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                
                <Box sx={{ minHeight: 200, mb: 3 }}>
                  {cart.items.length === 0 ? (
                    <Box sx={{ 
                      textAlign: 'center', 
                      py: 4,
                      color: 'text.secondary'
                    }}>
                      <ShoppingCartIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                      <Typography variant="body1">
                        Your cart is empty
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Drag items here or click "Add to Cart"
                      </Typography>
                    </Box>
                  ) : (
                    cart.items.map((item) => (
                      <Box key={item.id} sx={{ mb: 2 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${item.price.toFixed(2)} each
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                              sx={{ 
                                borderRadius: 1,
                                '&:hover': { background: 'rgba(239, 68, 68, 0.1)' }
                              }}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ mx: 2, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                              sx={{ 
                                borderRadius: 1,
                                '&:hover': { background: 'rgba(16, 185, 129, 0.1)' }
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <Typography color="text.secondary" sx={{ textAlign: 'right', fontWeight: 600 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                      </Box>
                    ))
                  )}
                </Box>

                {cart.items.length > 0 && (
                  <Box sx={{ mt: 3, borderTop: '1px solid rgba(0, 0, 0, 0.12)', pt: 2 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <span>Subtotal:</span>
                        <span>${getTotal().toFixed(2)}</span>
                      </Typography>
                      
                      <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <span>Tax ({salesTax}%):</span>
                        <span>${(getTotal() * (salesTax / 100)).toFixed(2)}</span>
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        Tip:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {defaultTipOptions.map((tip) => (
                          <Button
                            key={tip}
                            variant={selectedTip === tip ? 'contained' : 'outlined'}
                            size="small"
                            onClick={() => {
                              setSelectedTip(tip);
                              setCustomTip('');
                            }}
                            sx={{ 
                              borderRadius: 2,
                              minWidth: 60,
                              '&.MuiButton-contained': {
                                background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                              }
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
                          sx={{ 
                            borderRadius: 2,
                            minWidth: 80,
                            '&.MuiButton-contained': {
                              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                            }
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
                          sx={{ width: 120 }}
                        />
                      )}
                    </Box>

                    <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <span>Tip ({customTip !== '' ? customTip : selectedTip}%):</span>
                      <span>${(getTotal() * ((customTip !== '' ? parseFloat(customTip) : selectedTip) / 100)).toFixed(2)}</span>
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h5" sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      <span>Total:</span>
                      <span>
                        ${(getTotal() * (1 + salesTax / 100 + (customTip !== '' ? parseFloat(customTip) : selectedTip) / 100)).toFixed(2)}
                      </span>
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<PaymentIcon />}
                  sx={{ 
                    mt: 3, 
                    borderRadius: 2, 
                    py: 1.5,
                    background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
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
