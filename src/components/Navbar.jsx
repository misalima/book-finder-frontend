import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import logo from "../resources/logo-svg.svg";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 8px",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "85%",
  display: "flex",
  alignItems: "center",
  gap: "5px",
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position="sticky" sx={{ p: { md: "0 60px" } }}>
      <StyledToolbar>
        <Link to={`/`}>
        <img src={logo} alt="logo" width={"100px"} />
        </Link>
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "no-wrap",
            justifyContent: "center",
          }}
        >
          <Search>
            <SearchIcon color="disabled" />
            <InputBase sx={{ width: "100%" }} placeholder="Search..." />
          </Search>
          <Button variant="contained" color="secondary" size="small">
            <DoneIcon color="primary" />
          </Button>
        </div>

        <UserBox>
          <Link to={`/about`}>
            <Button size="small" variant="outlined" color="secondary">
              About
            </Button>
          </Link>
          <Avatar
            sx={{ width: 50, height: 50 }}
            onClick={(e) => {
              setAnchorEl(e.target);
              setOpen(true);
            }}
          />

          <Typography variant="span">User</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="user-menu"
        aria-labelledby="user-menu-button"
        open={open}
        onClose={(e) => {
          setOpen(false);
          setAnchorEl(null);
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Settings</MenuItem>
        <MenuItem>My Lists</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};
