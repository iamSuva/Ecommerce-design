import React from "react";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Badge,
  Box,
  InputBase,
  Modal,
  Rating,
  Button,
  InputLabel,
  Divider,
} from "@mui/material";

import { useState } from "react";
import {
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
  Close,
  Favorite as FavoriteIcon,
  AddCircleOutline,
 
} from "@mui/icons-material";

import { useCart } from "../context/Cartcontext";


function Navbar({ handleSearch ,myCategory}) {
  const categories = [
    "All Categories",
    "electronics",
    "men's clothing",
    "women's clothing",
    "jewelery"
  ];

  const [category, setcategory] = useState("All Categories");
  const [openmodal, setopenmodal] = useState(false);
  const searchHandler = (e) => {
    handleSearch(e.target.value);
  };
  const handleCategory = (e) => {
    setcategory(e.target.value);
    myCategory(e.target.value);
  };
  const { cartProducts, setCartProducts } = useCart();
  const getTotalAmount = () => {
    let totalAmount = 0;
    cartProducts.forEach((product) => {
      totalAmount += product.price;
    });
    return totalAmount;
  };
  const handleRemove = (pid) => {
    const updatedProducts = cartProducts.filter((product) => product.id != pid);
    setCartProducts(updatedProducts);
  };

  return (
    <div>
      <AppBar
        position="static"
        color="default"
        sx={{
          backgroundColor: "white",
          padding: "10px",
          borderBottom: "2px solid grey",
          boxShadow:"none"
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">
           <a href="/">
           Ecommerce
           </a>
            </Typography>
          <Stack spacing={1} direction="row">
            <FormControl  sx={{ minWidth: 150 }}>
            
              <Select value={category} onChange={handleCategory}>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                position: "relative",
                borderRadius: 1,
                backgroundColor: "white",
                width: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                placeholder="Search products…"
                sx={{ padding: 1 }}
                inputProps={{ "aria-label": "search" }}
                onChange={searchHandler}
              />
              <SearchIcon sx={{ padding: "0 16px", pointerEvents: "none" }} />
            </Box>
          </Stack>
          <Box>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit">
              <Badge
                badgeContent={cartProducts.length ? cartProducts.length : 0}
                color="secondary"
              >
                <ShoppingCart onClick={() => setopenmodal(true)} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Modal open={openmodal} onClose={() => setopenmodal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "10%",
            height: "80%",
            width: "400px",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            overflowY: "auto",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Shopping Carts</Typography>
            <IconButton onClick={() => setopenmodal(false)}>
              <span>Close </span> <Close />
            </IconButton>
          </Box>
          <Box>
            {cartProducts &&
              cartProducts.map((product) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: "10px",
                    borderBottom: "1px solid grey",
                  }}
                  key={product.id}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", mr:2 }}>
                    <Box>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column",fontSize:"15px" ,mr:2}}>
                      <IconButton sx={{ fontSize: "10px" }}>
                        <FavoriteIcon /> <span >Wishlist</span>
                      </IconButton>
                      <IconButton sx={{ fontSize: "10px" }}>
                        <Close onClick={() => handleRemove(product.id)} /> <span>Remove</span>
                      </IconButton>
                    </Box>
                  </Box>
                  <Box>
                    <Typography>
                      
                      Title: {product.title.substring(0, 10)}
                    </Typography>
                    <Typography>Farm: Indian Cargo</Typography>
                    <p>Freshness: 1 day old</p>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        mb: 2,
                      }}
                    >
                      
                      <Rating
                        name="read-only"
                        value={product.rating.rate}
                        readOnly
                      />
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                      <Typography>{product.price} USD</Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        //onClick={() => handleIncrement(product.id)}
                      >
                       {1} 
                       <Divider orientation="vertical" flexItem sx={{mx:1}}/>
                       <AddCircleOutline/>
                      </Button>
                    </Box>
                    
                  </Box>
                </Box>
              ))}
            {cartProducts.length > 0 ? (
             <Box
             sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               bottom: 0,
               mt:5
               
             }}
           >
             <Typography variant="h6">
               Total: <strong>${getTotalAmount()}</strong>
             <Typography variant="h6">
               continue shopping
             </Typography>
             </Typography>
             <Button variant="contained" color="success">
               Payment
             </Button>
           </Box>
               
             
            ) : (
              <h3>Cart is Empty</h3>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Navbar;
