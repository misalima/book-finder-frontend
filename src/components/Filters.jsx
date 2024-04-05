import React, { useState } from "react";
import {
  Drawer,
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";

const FilterDrawer = ({ onFilterChange }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    genres: {
      Fiction: false,
      "Non-Fiction": false,
      Mystery: false,
      // ... add other genres as needed
    },
    startYear: "",
    endYear: "",
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleGenreChange = (event) => {
    const { name, checked } = event.target;
    const updatedGenres = { ...filters.genres, [name]: checked };
    setFilters({ ...filters, genres: updatedGenres });
  };

  const handleYearChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setDrawerOpen(false); // Close the drawer after applying filters
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Filters
      </Typography>
      <FormGroup sx={{ p: 2 }}>
        <Typography variant="subtitle1">Genres</Typography>
        {Object.keys(filters.genres).map((genre) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.genres[genre]}
                onChange={handleGenreChange}
                name={genre}
              />
            }
            label={genre}
            key={genre}
          />
        ))}
      </FormGroup>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">Publication Year Range</Typography>
        <TextField
          name="startYear"
          label="Start Year"
          variant="outlined"
          size="small"
          value={filters.startYear}
          onChange={handleYearChange}
          fullWidth
        />
        <TextField
          name="endYear"
          label="End Year"
          variant="outlined"
          size="small"
          value={filters.endYear}
          onChange={handleYearChange}
          fullWidth
        />
      </Box>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        color="primary"
        onClick={applyFilters}
      >
        Apply
      </Button>
    </Box>
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px", paddingRight: "20px", paddingLeft: "20px" }}>
      <Typography variant="h6" color={"primary"}>Advanced Search</Typography>
      <Button onClick={toggleDrawer(true)}>
        Filters
      </Button>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
