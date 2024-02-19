import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../resources/logo-svg.svg";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
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
    <AppBar position="sticky" sx={{ p: "0 60px" }}>
      <StyledToolbar>
        <img src={logo} alt="logo" width={"100px"} />
        <Search>
          <InputBase placeholder="Search..." />
        </Search>
        <UserBox>
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
          setOpen(false)
          setAnchorEl(null)
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
