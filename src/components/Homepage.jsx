import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Productcard from "./Productcard";
import { useCart } from "../context/Cartcontext";

function Homepage({ mysearchquery, myfilters,myCategory }) {
  const { cartProducts, setCartProducts } = useCart();
  const [products, setProducts] = useState([]);
  const [searchProducts, setsearchProducts] = useState([]);
  console.log("myfilters ",myfilters);
  const getProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const result = response.data;
      if (result) {
        setProducts(result);
        setsearchProducts(result);
      } else {
        console.log("error in fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getsearchProducts = () => {
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(mysearchquery.toLowerCase())
    );
    setsearchProducts(result);
  };

  const handleAddtoCart = (product) => {
    const updatedCart = [...cartProducts, product];
    setCartProducts(updatedCart);
    console.log("product is added ", product);
    console.log("cart products are ", updatedCart);
  };

  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    if (myfilters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        myfilters.categories.includes(product.category)
      );
    }

    if (myfilters.subCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        myfilters.subCategories.includes(product.category)
      );
    }

    if (myfilters.brands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        myfilters.brands.includes(product.brand)
      );
    }

    if (myfilters.ratings.length > 0) {
      console.log(myfilters.ratings);
      filteredProducts = filteredProducts.filter((product) =>
        myfilters.ratings.includes(Math.ceil(product.rating.rate))
      );
    }

    if (myfilters.priceRange.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= myfilters.priceRange[0] &&
          product.price <= myfilters.priceRange[1]
      );
    }

    setsearchProducts(filteredProducts);
  };
  const getProductsbycategory=()=>{
    if(myCategory==="All Categories")
      {
        setCartProducts(products);
      }
      else{

        const result=products.filter((product)=>product.category.toLowerCase().includes(myCategory.toLowerCase()));
        if(result)
          {
            setsearchProducts(result);
          }
        }
  }
  useEffect(() => {
    getProductsbycategory();
  }, [myCategory]);
  useEffect(() => {
    getFilteredProducts();
  }, [myfilters]);

  useEffect(() => {
    getsearchProducts();
  }, [mysearchquery]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {searchProducts.length === 0 && <h2>No Products found</h2>}
      <Grid container spacing={2}>
        {searchProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Productcard product={product} handleAddtoCart={handleAddtoCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Homepage;
