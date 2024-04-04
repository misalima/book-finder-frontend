import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BookIcon from "@mui/icons-material/Book";
import { Link } from "react-router-dom";

const drawerWidth = "240px";
const navbarHeight = "82px"; // Replace with the actual height of your navbar

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      {["Home", "Advanced Search", "My Lists", "Browse Books"].map((text) => {
        let icon, link;
        switch (text) {
          case "Home":
            icon = <HomeIcon />;
            link = `/`;
            break;
          case "Advanced Search":
            icon = <SearchIcon />;
            link = `/advanced-search`;
            break;
          case "My Lists":
            icon = <ListAltIcon />;
            link = `/my-lists`;
            break;
          case "Browse Books":
            icon = <BookIcon />;
            link = `/browse`;
            break;
          default:
            icon = <HomeIcon />;
        }
        return (
          <Link to={link} style={{ textDecoration: "none", color: "black" }}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        );
      })}
    </List>
  );

  return (
    <div>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            ml: "8px",
            position: "fixed",
            zIndex: theme.zIndex.drawer + 1,
            ...(mobileOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: navbarHeight,
            zIndex: 1,
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default Sidebar;
