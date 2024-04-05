import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 20px",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearchSubmit}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
