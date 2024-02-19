import {
  Box,
  Container,
  IconButton,
  InputBase,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export const Home = () => {
  const Search = styled("div")(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: "lightgray",
    },
    width: "50%",
    padding: "8px 16px",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "5px",
  }));
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          p={"100px 40px"}
        >
          <Typography mb={"40px"} variant="h3" textAlign={"center"}>
            Find out the books you need!
          </Typography>
          <Typography variant="h6" fontWeight={300} textAlign={"center"}>
            Discover your next favorite read with Book Finder. Effortlessly
            explore a world of literature and knowledge using specialized
            filters or by typing your desired subject/genre. Start searching now
            and find your next adventure in the pages of a book.
          </Typography>
          <Search sx={{ mt: "60px" }}>
            <InputBase
              sx={{ width: "100%" }}
              placeholder="Search for books..."
            />
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </Search>
        </Box>
      </Container>
    </>
  );
};
