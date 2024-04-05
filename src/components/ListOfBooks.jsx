import React from "react";
import Grid from "@mui/material/Grid";
import BookCard from "./BookCard"; // Import the Book component
import { Typography } from "@mui/material";

const BookList = () => {
  const myBooks = [
    {
      title: "1984",
      author: "George Orwell",
      coverImageUrl:
        "https://m.media-amazon.com/images/I/61NAx5pd6XL._AC_UF1000,1000_QL80_.jpg",
      summary: "A dystopian social science fiction novel and cautionary tale.",
      publicationDate: "June 8, 1949",
      isbn: "978-0451524935",
      pageCount: 328,
    },
    // ... more books
  ];

  return (
    <>
      <Typography variant="h4" color={"primary"} sx={{ p: "20px" }}>
        List
      </Typography>
      <hr />
      <Grid container spacing={2} sx={{ padding: "30px" }}>
        {myBooks.map((myBooks, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <BookCard
              title={myBooks.title}
              author={myBooks.author}
              coverImageUrl={myBooks.coverImageUrl}
              summary={myBooks.summary}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BookList;
