import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

function Filterpage({ setmyfilters }) {
  const categories = [
    {
      name: "Electronics",
      subCategories: ["Mobile", "TV", "Laptops", "Cameras"],
    },
    {
      name: "Books",
      subCategories: ["Science", "Fiction", "Non-fiction", "Comics"],
    },
    { name: "Fashion", subCategories: ["Men", "Women", "Kids"] },
  ];
  const brands = ["Dnmx", "Levis", "Indian Cargo", "Sparx", "Samsung"];
  const ratings = [5, 4, 3, 2, 1];
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleToggle = (value, setState) => {
    setState((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
      );
    
  };

  const handleFilters = () => {
    const filters = {
      categories: checkedCategories,
      subCategories: subCategories,
      brands: selectedBrands,
      ratings: selectedRatings,
      priceRange: priceRange,
    };
   
    setmyfilters(filters);
  };

  const resetFilter = () => {
    setCheckedCategories([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setPriceRange([0, 1000]);
    setSubCategories([]);
    setMinPrice(0);
    setMaxPrice(1000);
    setmyfilters({
      categories: [],
      subCategories: [],
      brands: [],
      ratings: [],
      priceRange: [0, 1000],
    })
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  return (
    <Box >
      <FormGroup sx={{ marginBottom: "20px" }}>
        <Typography variant="h6">Categories</Typography>
        {categories.map((category) => (
          <Box key={category.name}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedCategories.includes(category.name.toLowerCase())}
                  onChange={() =>
                    handleToggle(category.name.toLowerCase(), setCheckedCategories)
                  }
                />
              }
              label={category.name}
            />
            {checkedCategories.includes(category.name.toLowerCase()) && (
              <FormGroup sx={{ paddingLeft: "20px" }}>
                {category.subCategories.map((cat) => (
                  <FormControlLabel
                    key={cat}
                    control={
                      <Checkbox
                        checked={subCategories.includes(cat.toLowerCase())}
                        onChange={() => handleToggle(cat.toLowerCase(), setSubCategories)}
                      />
                    }
                    label={cat}
                  />
                ))}
              </FormGroup>
            )}
          </Box>
        ))}
      </FormGroup >
      <Typography variant="h6">Brands</Typography>
      <FormGroup sx={{ marginBottom: "20px" }}>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand.toLowerCase())}
                onChange={() => handleToggle(brand.toLowerCase(), setSelectedBrands)}
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>
      <FormGroup sx={{ marginBottom: "20px" }}>
        <Typography variant="h6">Ratings</Typography>
        {ratings.map((rating) => (
          <FormControlLabel
            key={rating}
            control={
              <Checkbox
                checked={selectedRatings.includes(rating)}
                onChange={() => handleToggle(rating, setSelectedRatings)}
              />
            }
            label={<Rating value={rating} readOnly />}
          />
        ))}
      </FormGroup>
      <Typography variant="h6" >Price</Typography>
      <Slider
        min={0}
        max={1000}
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
      />
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="min"
          size="small"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <TextField
          label="max"
          size="small"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button variant="contained" color="success" onClick={handleFilters}>
          Apply
        </Button>
        <Button variant="contained" color="info" onClick={resetFilter}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Filterpage;
