import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BookIcon from "@mui/icons-material/Book";

const drawerWidth = "240px";
const navbarHeight = "82px"; // Replace with the actual height of your navbar

const Sidebar = () => {
  return (
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
      variant="permanent"
      anchor="left"
    >
      <List>
        {["Home", "Advanced Search", "My Lists", "Browse Books"].map(
          (text, index) => {
            let icon;

            switch (text) {
              case "Home":
                icon = <HomeIcon />;
                break;
              case "Advanced Search":
                icon = <SearchIcon />;
                break;
              case "My Lists":
                icon = <ListAltIcon />;
                break;
              case "Browse Books":
                icon = <BookIcon />;
                break;
              default:
                icon = <HomeIcon />; // Default icon
            }

            return (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          }
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
