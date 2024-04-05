import React from "react";
import BookCard from "./BookCard";
import Grid from "@mui/material/Grid";

const ResultsArea = ({ books }) => {

  return (
    <Grid container spacing={2} sx={{padding: "20px"}}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ResultsArea;
