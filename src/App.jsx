import React from "react";
import Navbar from "./components/Navbar";
import Filterpage from "./components/Filterpage";
import Homepage from "./components/Homepage";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
// import CategoryList from "./components/CategoryList";

function App() {
  const [mysearchquery, setmysearchquery] = useState("");
  const [category,setcategory]=useState("");
  const [filters, setFilters] = useState({
    categories: [],
    subCategories: [],
    brands: [],
    ratings: [],
    priceRange: [0, 1000],
  });
  const handleSearch = (query) => {
    setmysearchquery(query);
  };
  const handleCategory=(cat)=>{
    console.log("category is ",cat);
    setcategory(cat); 
  }
  return (
    <div>
      <Navbar handleSearch={handleSearch}  myCategory={handleCategory}/>
     
      <Container sx={{ marginTop: "10px" }}>
        <Grid container spacing={2} sx={{marginTop:2}}>
          <Grid item xs={12} sm={3} sx={{paddingRight:"25px"}}>
            <Filterpage  setmyfilters={setFilters} />
          </Grid>
          <Grid item xs={9} sm={9}>
            <Homepage mysearchquery={mysearchquery}  myfilters={filters} myCategory={category}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
