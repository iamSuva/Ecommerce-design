import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating, Button, Stack } from '@mui/material';
import { green } from '@mui/material/colors';

const ProductCard = ({ product ,handleAddtoCart}) => {
    const discount=35;
    return (
        <Card sx={{position:"relative", display: 'flex', flexDirection: 'column', justifyContent: 'space-between',width:"268px", height:"360px", border: '1px solid #e0e0e0', borderRadius:"12px" }}>
            <CardMedia
                component="img"
                width="236px"
                height="180px"
                image={product.image}
                alt="product"
                sx={{ objectFit: 'contain'}}
            />
            <Box sx={{position:"absolute",left:10,top:10,color:"green"}}>
                <Typography>
                  -{discount}%
                </Typography>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography>
                   {product.title.substring(0,20)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                {product.description.substring(0,25)}...
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2,mb:2 }}>
                    
                    <Rating name="read-only" value={product.rating.rate} readOnly />
                </Box>
                <Box sx={{display:"flex", justifyContent:"space-between"}} >
                    <Typography  color="text.primary">
                        {product.price} USD
                    </Typography>
                    <Button variant="contained" color="success" sx={{borderRadius:"12px"}} onClick={()=>handleAddtoCart(product)}>
                        Add to Cart
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
