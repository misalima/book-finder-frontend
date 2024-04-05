import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AllLists = () => {
  const lists = [
    { id: 1, name: "Favorites" },
    { id: 2, name: "To Read" },
  ];

  return (
    <>
      <Typography variant="h4" color={"primary"} sx={{ p: "20px" }}>
        My Lists
      </Typography>
      <List sx={{ padding: "20px" }}>
        {lists.map((list) => (
          <ListItem
            key={list.id}
            component={Link}
            to={`/lists/${list.id}`}
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.12)",
              margin: "8px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderColor: "rgba(0, 0, 0, 0.24)",
              },
            }}
          >
            <ListItemText primary={list.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AllLists;
